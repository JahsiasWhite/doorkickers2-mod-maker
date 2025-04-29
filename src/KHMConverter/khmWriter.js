// TODO: I should have thesee locally
import * as THREE from 'https://unpkg.com/three@0.154.0/build/three.module.js';
import * as BufferGeometryUtils from 'https://esm.sh/three@0.154.0/examples/jsm/utils/BufferGeometryUtils.js';

const MAX_NAME = 48;

export class KHMWriter {
  constructor(model) {
    this.model = model;
    this.buffer = [];
  }

  writeUint8(v) {
    this.buffer.push(v & 0xff);
  }
  writeUint16(v) {
    this.buffer.push(...new Uint8Array(new Uint16Array([v]).buffer));
  }
  writeUint32(v) {
    this.buffer.push(...new Uint8Array(new Uint32Array([v]).buffer));
  }
  writeFloat32(v) {
    this.buffer.push(...new Uint8Array(new Float32Array([v]).buffer));
  }

  writeString(str, length) {
    const bytes = new TextEncoder().encode(str);
    for (let i = 0; i < length; i++) {
      this.buffer.push(bytes[i] || 0x00);
    }
  }

  writeKHM(model) {
    this.writeHeader();

    // Get all meshes from the model
    model.updateMatrixWorld(true);
    const geometries = [];
    model.traverse((child) => {
      if (child.isMesh) {
        const geo = child.geometry.clone();
        geo.applyMatrix4(child.matrixWorld);
        geometries.push(geo);
      }
    });

    if (geometries.length === 0) throw new Error('No meshes found');

    // Merge meshes into one
    const mergedGeometry = BufferGeometryUtils.mergeGeometries(
      geometries,
      false
    );
    const mesh = new THREE.Mesh(mergedGeometry);

    // Normalize size and center of the model
    const position = mesh.geometry.getAttribute('position');
    const box = new THREE.Box3().setFromBufferAttribute(position);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 1.0 / maxDim;
    const center = box.getCenter(new THREE.Vector3());
    mesh.geometry.translate(-center.x, -center.y, -center.z);
    mesh.geometry.scale(scale, scale, scale);

    // Bones (none for now)
    this.writeBones();

    // Helpers (none for now)
    this.writeHelpers();

    // Meshes
    this.writeMeshes(mesh, position, box);

    // Animation
    this.writeAnimation();

    // Animation mask
    this.writeAnimationMask();
  }

  writeMeshes(mesh, position, box) {
    // Mesh present
    this.writeUint8(1);

    // sObjectBase
    this.writeString(mesh.name || 'mesh', MAX_NAME);
    this.writeUint32(1); // id
    this.writeUint32(0); // parent id

    for (let i = 0; i < 16; i++)
      this.writeFloat32(i === 0 || i === 5 || i === 10 || i === 15 ? 1 : 0); // mat local
    for (let i = 0; i < 16; i++)
      this.writeFloat32(i === 0 || i === 5 || i === 10 || i === 15 ? 1 : 0); // mat global

    // Geometry
    const geometry = mesh.geometry;
    this.writeGeometry(geometry, position, box);
  }

  writeGeometry(geometry, position, box) {
    const normal = geometry.getAttribute('normal');
    const uv = geometry.getAttribute('uv');
    const index = geometry.index;

    this.writeUint32(position.count); // num verts

    // Positions
    for (let i = 0; i < position.count; i++) {
      this.writeFloat32(position.getX(i));
      this.writeFloat32(position.getY(i));
      this.writeFloat32(position.getZ(i));
    }

    // Normals
    for (let i = 0; i < normal.count; i++) {
      this.writeFloat32(normal.getX(i));
      this.writeFloat32(normal.getY(i));
      this.writeFloat32(normal.getZ(i));
    }

    // Indices
    this.writeUint32(index.count);
    for (let i = 0; i < index.count; i++) {
      this.writeUint16(index.array[i]);
    }

    // Face normals (placeholder)
    // TODO
    const faceCount = index.count / 3;
    for (let i = 0; i < faceCount; i++) {
      this.writeFloat32(0);
      this.writeFloat32(1);
      this.writeFloat32(0);
    }

    // Vertex colors (placeholder)
    // TODO
    this.writeUint8(0);

    // TexCoord count
    this.writeUint32(1);
    for (let i = 0; i < uv.count; i++) {
      this.writeFloat32(uv.getX(i));
      this.writeFloat32(uv.getY(i));
    }

    // Skinning
    // TODO
    this.writeUint8(0);

    // Collision data
    // TODO
    this.writeUint32(0);

    // Bounding box (min/max)
    this.writeFloat32(box.min.x);
    this.writeFloat32(box.min.y);
    this.writeFloat32(box.min.z);
    this.writeFloat32(box.max.x);
    this.writeFloat32(box.max.y);
    this.writeFloat32(box.max.z);

    this.writeFloat32(0); // volume
  }

  /* KHM + version */
  writeHeader() {
    this.writeUint8('K'.charCodeAt(0));
    this.writeUint8('H'.charCodeAt(0));
    this.writeUint8('M'.charCodeAt(0));

    this.writeUint8(0x00);
    this.writeUint32(101);
  }

  writeBones() {
    this.writeUint8(0);
  }

  writeHelpers() {
    // TODO: Need to figure these out still, they weren't behaving as expected
    this.writeUint8(0);
  }

  writeAnimation() {
    this.writeUint8(0);
  }

  writeAnimationMask() {
    this.writeUint8(0);
  }
}
