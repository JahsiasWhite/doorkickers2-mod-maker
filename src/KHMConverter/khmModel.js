export const KHM_VERSION = 101;

export class KHMLoader {
  constructor(arrayBuffer) {
    this.view = new DataView(arrayBuffer);
    this.offset = 0;
  }

  readBytes(numBytes) {
    const start = this.offset;
    const end = this.offset + numBytes;
    this.offset = end;
    return new Uint8Array(this.view.buffer.slice(start, end));
  }

  readUint8() {
    const val = this.view.getUint8(this.offset);
    this.offset += 1;
    return val;
  }

  readUint16() {
    const val = this.view.getUint16(this.offset, true);
    this.offset += 2;
    return val;
  }

  readUint32() {
    const val = this.view.getUint32(this.offset, true);
    this.offset += 4;
    return val;
  }

  readFloat32() {
    const val = this.view.getFloat32(this.offset, true);
    this.offset += 4;
    return val;
  }

  readString(len) {
    const bytes = this.readBytes(len);
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(bytes).replace(/\0/g, '');
  }

  readHeader() {
    const sig = [
      this.readUint8(),
      this.readUint8(),
      this.readUint8(),
      this.readUint8(),
    ];
    const ver = this.readUint32();
    const header = new sHeader(sig, ver);
    return header;
  }

  readBones(model) {
    const count = this.readUint8();
    if (!count) return;

    model.numBones = count;
    model.lBones = [];

    for (let i = 0; i < count; i++) {
      const bone = sObjectBase.fromLoader(this);
      model.lBones.push(bone);
    }
  }

  /**
   * TODO: Find out exactly what these are and what game objects they belong to
   */
  readHelpers(model) {
    const count = this.readUint8();
    if (!count) return;

    model.numHelpers = count;
    model.lHelpers = [];

    for (let i = 0; i < count; i++) {
      const helper = sObjectBase.fromLoader(this);
      model.lHelpers.push(helper);
    }
  }

  /**
   * Reads skin weight and bone index data per vertex.
   * @param {sObjectMesh} mesh
   */
  readSkin(mesh) {
    const hasSkin = this.readUint8();
    if (!hasSkin) return;

    // Read Vector4 weights
    for (let i = 0; i < mesh.numVertices; i++) {
      const weight = new Float32Array([
        this.readFloat32(),
        this.readFloat32(),
        this.readFloat32(),
        this.readFloat32(),
      ]);
      mesh.pSkinWeights.push(weight);
    }

    // Read bone indices (4 bytes per vertex)
    for (let i = 0; i < mesh.numVertices; i++) {
      const indices = new Uint8Array([
        this.readUint8(),
        this.readUint8(),
        this.readUint8(),
        this.readUint8(),
      ]);
      mesh.pSkinBoneIndices.push(indices);
    }
  }
  /**
   * Reads collision shape data into the mesh.
   * @param {sObjectMesh} mesh
   */
  readCollisionData(mesh) {
    mesh.numCollisions = this.readUint32();
    if (!mesh.numCollisions) return;

    for (let i = 0; i < mesh.numCollisions; i++) {
      const col = { type: this.readUint32(), transform: [] };

      for (let j = 0; j < 16; j++) col.transform.push(this.readFloat32());

      switch (col.type) {
        case 0: // SPHERE
          col.params = { radius: this.readFloat32() };
          break;

        case 1: // BOX
          col.params = {
            extents: [
              this.readFloat32(),
              this.readFloat32(),
              this.readFloat32(),
            ],
          };
          break;

        case 2: // CAPSULE
          col.params = {
            radius: this.readFloat32(),
            halfHeight: this.readFloat32(),
          };
          break;

        case 3: // CONVEX_MESH
          col.bShared = true;
          col.params = {};

          const numPolys = this.readUint32();
          col.params.pPolygons = [];
          for (let j = 0; j < numPolys; j++) {
            col.params.pPolygons.push({
              indices: [
                this.readUint16(),
                this.readUint16(),
                this.readUint16(),
              ],
            });
          }

          const numIndices = this.readUint32();
          col.params.pIndices = [];
          for (let j = 0; j < numIndices; j++) {
            col.params.pIndices.push(this.readUint16());
          }

          const numVerts = this.readUint32();
          col.params.pVertices = [];
          for (let j = 0; j < numVerts; j++) {
            col.params.pVertices.push(
              new Float32Array([
                this.readFloat32(),
                this.readFloat32(),
                this.readFloat32(),
              ])
            );
          }
          break;

        default:
          throw new Error(`Unknown collision type ${col.type}`);
      }

      mesh.pCollisions.push(col);
    }
  }

  /**
   * Reads geometry data into the mesh object
   * @param {sObjectMesh} mesh
   */
  readGeometry(mesh) {
    mesh.numVertices = this.readUint32();

    // Positions
    for (let i = 0; i < mesh.numVertices; i++) {
      mesh.pVertices.push(
        new Float32Array([
          this.readFloat32(),
          this.readFloat32(),
          this.readFloat32(),
        ])
      );
    }

    // Normals
    for (let i = 0; i < mesh.numVertices; i++) {
      mesh.pNormals.push(
        new Float32Array([
          this.readFloat32(),
          this.readFloat32(),
          this.readFloat32(),
        ])
      );
    }

    // Indices
    mesh.numIndices = this.readUint32();
    for (let i = 0; i < mesh.numIndices; i++) {
      mesh.pIndices.push(this.readUint16());
    }

    // Face normals
    const numFaces = mesh.numIndices / 3;
    for (let i = 0; i < numFaces; i++) {
      mesh.pFaceNormals.push(
        new Float32Array([
          this.readFloat32(),
          this.readFloat32(),
          this.readFloat32(),
        ])
      );
    }

    // Vertex colors
    const hasColors = this.readUint8();
    if (hasColors) {
      for (let i = 0; i < mesh.numVertices; i++) {
        mesh.pColors.push(this.readUint32());
      }
    }

    // TexCoords (just slot 0 for now)
    const numTexMaps = this.readUint32();
    for (let i = 0; i < numTexMaps; i++) {
      const coords = [];
      for (let j = 0; j < mesh.numVertices; j++) {
        coords.push(new Float32Array([this.readFloat32(), this.readFloat32()]));
      }
      mesh.pTexCoords[i] = coords;

      // If index 1, we skip reading it (per original C++)
      if (i === 1) {
        continue;
      }
    }

    this.readSkin(mesh);
    this.readCollisionData(mesh);

    // Read min/max
    for (let i = 0; i < 3; i++) mesh.min[i] = this.readFloat32();
    for (let i = 0; i < 3; i++) mesh.max[i] = this.readFloat32();

    // Volume placeholder
    mesh.volume = 0;
  }

  readMeshes(model) {
    const hasMesh = this.readUint8();
    if (!hasMesh) return;

    const mesh = new sObjectMesh();

    // Base data (inherits from sObjectBase)
    mesh.szName = this.readString(48);
    mesh.uiId = this.readUint32();
    mesh.uiParentId = this.readUint32();

    for (let i = 0; i < 16; i++) mesh.matLocal[i] = this.readFloat32();
    for (let i = 0; i < 16; i++) mesh.matGlobal[i] = this.readFloat32();

    this.readGeometry(mesh);
    model.pMesh = mesh;
  }

  /**
   * Reads animation track data for all bones/nodes.
   * @param {sModelDefinition} model
   */
  readAnimation(model) {
    const hasAnim = this.readUint8();
    if (!hasAnim) return;

    const anim = new sAnimation();
    model.pAnimation = anim;

    const numNodes = this.readUint32();
    const startTime = this.readFloat32(); // sometimes > 0 if clipped
    const endTime = this.readFloat32(); // shift to zero-based
    const numFrames = this.readUint32();

    anim.numNodes = numNodes;
    anim.numNodeFrames = numFrames;
    anim.frameDurationMs =
      ((endTime - startTime) * 1000) / Math.max(numFrames - 1, 1);

    // Skip old debug node animation structs
    const nodeAnimSize = 48 + 4; // name + id
    this.offset += nodeAnimSize * numNodes;

    const totalFrames = numFrames * numNodes;
    for (let i = 0; i < totalFrames; i++) {
      const transform = sNodeTransform.fromLoader(this);
      anim.pNodeTransforms.push(transform);
    }
  }

  /**
   * Reads an animation mask that enables/disables nodes in the animation.
   * @param {sModelDefinition} model
   */
  readAnimationMask(model) {
    const hasMask = this.readUint8();
    if (!hasMask) return;

    const mask = new sAnimationMask();
    model.pAnimationMask = mask;

    const count = this.readUint32();
    mask.numNodes = count;

    for (let i = 0; i < count; i++) {
      mask.pNodes.push(sAnimationMaskEntry.fromLoader(this));
    }
  }

  loadModel() {
    const header = this.readHeader();
    if (!header.isValid()) {
      return null;
    }

    const model = new sModelDefinition();

    this.readBones(model);

    this.readHelpers(model);

    this.readMeshes(model);

    this.readAnimation(model);

    this.readAnimationMask(model);

    return { header, model };
  }
}

/**
 * KHM Header structure.
 * Represents the file signature + version in the first 8 bytes of a .khm file.
 */
export class sHeader {
  constructor(signature, version) {
    this.uiSig = signature || [0, 0, 0, 0]; // chars 'K', 'H', 'M', '\0'
    this.uiVer = version || 0;
  }

  isValid() {
    return (
      this.uiSig[0] === 'K'.charCodeAt(0) &&
      this.uiSig[1] === 'H'.charCodeAt(0) &&
      this.uiSig[2] === 'M'.charCodeAt(0) &&
      this.uiVer === KHM_VERSION
    );
  }
}

export class sModelDefinition {
  constructor() {
    this.numBones = 0;
    this.lBones = [];

    this.numHelpers = 0;
    this.lHelpers = [];
  }
}

// TODO: Do I really need this class?
export class sObjectBase {
  constructor() {
    this.szName = '';
    this.uiId = 0;
    this.uiParentId = 0;
    this.matLocal = new Float32Array(16); // 4x4 matrix
    this.matGlobal = new Float32Array(16); // 4x4 matrix
  }

  /**
   * Populates the object from a DataView at the current offset.
   * @param {KHMLoader} loader
   */
  static fromLoader(loader) {
    const obj = new sObjectBase();
    obj.szName = loader.readString(48); // KHM_MAX_OBJECT_NAME
    obj.uiId = loader.readUint32();
    obj.uiParentId = loader.readUint32();
    for (let i = 0; i < 16; i++) {
      obj.matLocal[i] = loader.readFloat32();
    }
    for (let i = 0; i < 16; i++) {
      obj.matGlobal[i] = loader.readFloat32();
    }
    return obj;
  }
}

export class sObjectMesh extends sObjectBase {
  constructor() {
    super();
    this.numVertices = 0;
    this.pVertices = [];
    this.pNormals = [];
    this.pColors = [];
    this.pTexCoords = [[], []];
    this.pSkinWeights = [];
    this.pSkinBoneIndices = [];
    this.numIndices = 0;
    this.pIndices = [];
    this.pFaceNormals = [];
    this.numCollisions = 0;
    this.pCollisions = [];
    this.min = new Float32Array(3);
    this.max = new Float32Array(3);
    this.volume = 0;
  }
}

export class sNodeTransform {
  constructor() {
    this.qRot = new Float32Array(4); // quaternion
    this.vTrans = new Float32Array(3); // translation
    this.vScale = new Float32Array(3); // scale
  }

  static fromLoader(loader) {
    const t = new sNodeTransform();
    for (let i = 0; i < 4; i++) t.qRot[i] = loader.readFloat32();
    for (let i = 0; i < 3; i++) t.vTrans[i] = loader.readFloat32();
    for (let i = 0; i < 3; i++) t.vScale[i] = loader.readFloat32();
    return t;
  }
}

export class sAnimation {
  constructor() {
    this.pNodeTransforms = [];
    this.numNodes = 0;
    this.numNodeFrames = 0;
    this.frameDurationMs = 0.0;
  }
}

export class sAnimationMaskEntry {
  constructor() {
    this.szObjectName = '';
    this.mask = 1;
  }

  static fromLoader(loader) {
    const entry = new sAnimationMaskEntry();
    entry.szObjectName = loader.readString(48); // KHM_MAX_OBJECT_NAME
    entry.mask = loader.readUint32(); // 0 or 1
    return entry;
  }
}

export class sAnimationMask {
  constructor() {
    this.pNodes = [];
    this.numNodes = 0;
  }
}
