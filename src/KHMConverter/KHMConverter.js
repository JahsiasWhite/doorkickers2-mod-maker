import React, { useEffect, useRef } from 'react';
import * as THREE from 'https://unpkg.com/three@0.154.0/build/three.module.js';
import { OrbitControls } from 'https://esm.sh/three@0.154.0/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'https://esm.sh/three@0.154.0/examples/jsm/controls/TransformControls.js';
import { GLTFLoader } from 'https://esm.sh/three@0.154.0/examples/jsm/loaders/GLTFLoader.js';
import { DDSLoader } from 'https://esm.sh/three@0.154.0/examples/jsm/loaders/DDSLoader.js';

import { KHMLoader } from './khmModel';
import { KHMWriter } from './khmWriter';

import './KHMConverter.css';
import BackButton from '../components/BackButton';

const OUTPUT = 'output.khm';

let exportRotationY = 0;
let model = null;
let meshMaterial = null;
let currentModel = null;
let previewModel = null;

const KHMConverter = ({ setSelectedOption }) => {
  const canvasRef = useRef();
  const vertexHandles = useRef([]);
  const scene = useRef(new THREE.Scene());
  const camera = useRef();
  const renderer = useRef();
  const controls = useRef();
  const transform = useRef();

  useEffect(() => {
    initScene();

    window.addEventListener('pointerdown', onPointerDown);

    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  const initScene = () => {
    // Setup camera, renderer, controls
    camera.current = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.current.position.set(0, 1, 2);

    renderer.current = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvasRef.current,
    });
    renderer.current.setSize(window.innerWidth, window.innerHeight);

    controls.current = new OrbitControls(
      camera.current,
      renderer.current.domElement
    );

    transform.current = new TransformControls(
      camera.current,
      renderer.current.domElement
    );
    transform.current.addEventListener('dragging-changed', (e) => {
      controls.current.enabled = !e.value;
    });
    scene.current.add(transform.current);

    const light = new THREE.DirectionalLight(0xffffff, 0.3);
    light.position.set(5, 10, 5);
    scene.current.add(light);
    scene.current.add(new THREE.AmbientLight(0xffffff, 0.3));

    animate();
  };

  const animate = () => {
    requestAnimationFrame(animate);
    controls.current.update();
    renderer.current.render(scene.current, camera.current);
  };

  const handleLoadModel = async (e) => {
    // Reset current KHM model
    if (currentModel) {
      scene.current.remove(currentModel);
      currentModel.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material)
          Array.isArray(child.material)
            ? child.material.forEach((m) => m.dispose())
            : child.material.dispose();
      });
      currentModel = null;
    }
    if (previewModel) scene.current.remove(previewModel); // Remove the GLB model if it exists

    const buffer = await e.target.files[0].arrayBuffer();
    const loader = new KHMLoader(buffer);
    const result = loader.loadModel();
    model = result.model;

    const geo = new THREE.BufferGeometry();
    const verts = [];
    for (const v of model.pMesh.pVertices) {
      verts.push(v[0], v[1], v[2]);
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    geo.setIndex(model.pMesh.pIndices);

    if (model.pMesh.pColors.length > 0) {
      const colors = model.pMesh.pColors.flatMap((rgba) => {
        const r = ((rgba >> 16) & 0xff) / 255;
        const g = ((rgba >> 8) & 0xff) / 255;
        const b = (rgba & 0xff) / 255;
        return [r, g, b];
      });
      geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    }

    if (model.pMesh.pTexCoords[0].length > 0) {
      const uvs = [];
      for (const uv of model.pMesh.pTexCoords[0]) {
        uvs.push(uv[0], uv[1]);
      }
      geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    }

    geo.computeVertexNormals();

    meshMaterial = new THREE.MeshStandardMaterial({ flatShading: false });
    const mesh = new THREE.Mesh(geo, meshMaterial);
    currentModel = mesh;
    scene.current.add(mesh);

    const position = geo.getAttribute('position');
    const box = new THREE.Box3().setFromBufferAttribute(position);
    const center = box.getCenter(new THREE.Vector3());
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 1.0 / maxDim;
    geo.translate(-center.x, -center.y, -center.z);
    geo.scale(scale, scale, scale);
  };

  const applyDDSTexture = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    const ddsLoader = new DDSLoader();
    const dds = ddsLoader.parse(arrayBuffer, true);

    const texture = new THREE.CompressedTexture(
      dds.mipmaps,
      dds.width,
      dds.height,
      dds.format
    );
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.needsUpdate = true;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    meshMaterial.map = texture;
    meshMaterial.needsUpdate = true;
  };

  const handlePreviewGLB = async (e) => {
    if (previewModel) scene.current.remove(previewModel);
    if (currentModel) scene.current.remove(currentModel);

    const file = e.target.files[0];
    const arrayBuffer = await file.arrayBuffer();
    const blobURL = URL.createObjectURL(new Blob([arrayBuffer]));

    const loader = new GLTFLoader();
    loader.load(blobURL, (gltf) => {
      previewModel = gltf.scene;

      const box = new THREE.Box3().setFromObject(previewModel);
      const size = new THREE.Vector3();
      const center = box.getCenter(new THREE.Vector3());
      box.getSize(size);
      const scale = 1.0 / Math.max(size.x, size.y, size.z);
      previewModel.scale.set(scale, scale, scale);
      previewModel.position.sub(center.multiplyScalar(scale));
      scene.current.add(previewModel);
    });
  };

  const handleRotate = (dir) => {
    if (previewModel) {
      exportRotationY += (dir * Math.PI) / 2;
      previewModel.rotation.y = exportRotationY;
    }
  };

  const exportKHM = async () => {
    if (!previewModel) {
      alert('Please select a GLB file first.');
      return;
    }

    const writer = new KHMWriter(previewModel);
    writer.writeKHM(previewModel);
    // Export texture as a png to be converted to .dds later
    // The user will have to convert it manually
    previewModel.traverse((child) => {
      if (child.isMesh) {
        // console.log('vertexColors', child.material.vertexColors); // If this is true, is a different conversion required?

        const texture = child.material.map;
        // TODO: Can I return if no texture here or will that break too early?
        if (texture) {
          const canvas = extractTextureCanvasFromMap(texture);
          if (canvas) {
            downloadCanvasAsDDSPlaceholder(canvas, 'diffuse.png'); // manually convert to .dds
          }
        }
      }
    });

    const blob = new Blob([new Uint8Array(writer.buffer)], {
      type: 'application/octet-stream',
    });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = OUTPUT;
    link.click();
  };
  function downloadCanvasAsDDSPlaceholder(canvas, filename = 'diffuse.png') {
    canvas.toBlob((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename; // .png for now, convert to .dds later
      link.click();
    }, 'image/png');
  }
  function extractTextureCanvasFromMap(map) {
    const bitmap = map.source?.data;
    if (!(bitmap instanceof ImageBitmap)) {
      console.warn('No image bitmap found in texture source');
      return null;
    }

    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, 0, 0);

    return canvas;
  }

  const onPointerDown = (e) => {
    const mouse = new THREE.Vector2(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera.current);
    const intersects = raycaster.intersectObjects(vertexHandles.current);
    if (intersects.length > 0) {
      transform.current.attach(intersects[0].object);
    }
  };

  return (
    <div style={{ height: '100%', overflow: 'hidden', background: '#000' }}>
      {/* <div style={{ zIndex: '1', position: 'relative' }}>
        <BackButton setEquipmentType={setSelectedOption} />
      </div> */}

      <canvas ref={canvasRef} id="threeCanvas" />

      <div className="ui-container">
        <div className="ui-warning">
          This is a work in progress. There are major limitations when
          converting a GLB to KHM file. There are headers that still need to be
          added to the model to make it fully functional. For example, "muzzle"
          defines where the particle effects will emit from the gun{' '}
        </div>
        {/* KHM Panel */}
        <div className="ui-panel" id="khmPanel">
          <h2>KHM Viewer</h2>
          <label htmlFor="fileInput">KHM File</label>
          <input
            type="file"
            id="fileInput"
            accept=".khm"
            onChange={handleLoadModel}
          />
          <label htmlFor="ddsInput">DDS Texture</label>
          <input
            type="file"
            id="ddsInput"
            accept=".dds"
            onChange={applyDDSTexture}
          />
        </div>

        {/* GLB Panel */}
        <div className="ui-panel" id="glbPanel">
          <h2>GLB Tools</h2>
          <label htmlFor="glbPreviewInput">GLB Preview</label>
          <input
            type="file"
            id="glbPreviewInput"
            accept=".glb"
            onChange={handlePreviewGLB}
          />
          <button onClick={() => handleRotate(-1)}>Rotate Left 90°</button>
          <button onClick={() => handleRotate(1)}>Rotate Right 90°</button>
          <button onClick={exportKHM}>Export GLB to KHM</button>
        </div>
      </div>
    </div>
  );
};

export default KHMConverter;
