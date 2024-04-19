import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MeshTransmissionMaterial } from './MeshTransmissionMaterial.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { MeshPhongMaterial } from 'three';

let camera, scene, renderer, cubes, knots, flower_knots;
cubes = [];
flower_knots = [];



function updateCamera() {
  camera.updateProjectionMatrix();
}



function main() {
  const canvas = document.querySelector('#c');
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 5;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  scene = new THREE.Scene();
  const boxWidth = 2;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);


  const color = 0xFFFFFF;
  const intensity = 0.8;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);

  const intensity2 = 0.9;
  const color2 = 0xe667c6;
  const light2 = new THREE.AmbientLight(color2, intensity2);
  light2.position.set(1, 2, -2);


  const intensity3 = 1;
  const light3 = new THREE.PointLight(color, intensity3);
  light3.position.set(-1.5, 1, 0);
  light3.scale.set(0.1, 0.1, 0.1)
  scene.add(light, light2, light3);


  knots = [makeKnot(),]


  const loader2 = new THREE.TextureLoader();
  loader2.load(
    './assets/flower-transparent.png', // Ensure this is the correct path
    function (texture) {
      // Texture loaded
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true, // Important for transparency
        opacity: 1.0
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.z = 0.4;
      cube.position.y = -0.45;
      cube.position.x = -1.5;

      cube.rotation.x = 0;
      cube.rotation.y = 0.7;
      cube.rotation.z = -0.3;
      scene.add(cube);
    }
  );

  const loader3 = new THREE.TextureLoader();
  loader3.load(
    './assets/flower-transparent2.png', // Ensure this is the correct path
    function (texture) {
      // Texture loaded
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true, // Important for transparency
        opacity: 1.0
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.z = 0;
      cube.position.y = 0.2;
      cube.position.x = -2.3;
      cube.scale.y = 1.4;

      cube.rotation.x = 0;
      cube.rotation.y = 0.7;
      cube.rotation.z = 0;
      scene.add(cube);
    }
  );

  const loader = new GLTFLoader();

  loader.load(
    './assets/flower-gltf.gltf',
    function (gltf) {
      gltf.scene.scale.x = 0.2;
      gltf.scene.scale.y = 0.3;
      gltf.scene.scale.z = 0.3;
      //gltf.scene.rotation.x = 50;
      //gltf.scene.rotation.y = 28;
      gltf.scene.rotation.x = 0;
      gltf.scene.rotation.y = 39;
      gltf.scene.position.x = 2;
      gltf.scene.position.z = 0;


      scene.add(gltf.scene);

      const clone = gltf.scene.clone();

      // Optionally, modify the clone's properties
      clone.scale.y -= 0.05;
      clone.rotation.x = 5.3;
      clone.rotation.y = 1.2;
      clone.rotation.z += 1;
      clone.position.x = 3;
      clone.position.y = -2.5;
      clone.position.z = -0.4;
      scene.add(clone);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
      console.log("error");
    }
  );

  const torus_geometry1 = new THREE.TorusGeometry(0.8, 0.02, 100, 40);
  const torus_mat1 = new MeshPhongMaterial({ color: 0x141414, specular: 0xA9A9A9, shininess: 100 });

  const torus1 = new THREE.Mesh(torus_geometry1, torus_mat1);
  const torus2 = new THREE.Mesh(torus_geometry1, torus_mat1);
  const torus3 = new THREE.Mesh(torus_geometry1, torus_mat1);
  torus1.position.x = 2;
  torus1.position.y = 1.5;
  torus1.position.z = 0.4;

  torus2.position.x = -2;
  torus2.position.y = 1.5;
  torus2.position.z = 0.7;

  torus3.position.x = -3;
  torus3.position.y = 1.1;
  torus3.position.z = 0.3;
  scene.add(torus1, torus2, torus3);

  cubes = [
    //addCubes(-1.3,-0.5,0,0.25),
    //addCubes(-1.4,-0.1,0,0.14),
    //addCubes(-1.3,0.05,0,0.10),

    addCubes(1.6, 0.6, 0.4, 0.3),
    addCubes(1.4, 1.2, 0.1, 0.3),
    addCubes(1.9, 1.2, 0.1, 0.3),
    addCubes(2.5, 0.8, 0.2, 0.4),
    //addCubes(2.5,0.5,0.4,0.4),
  ];

  let spheres = [
    makeSphere(1, 0, 0, 0.05),
    makeSphere(1.03, 0.15, 0, 0.05),
    makeSphere(1.06, 0.3, 0, 0.048),
    makeSphere(1.08, 0.45, 0, 0.044),
    makeSphere(1.09, 0.6, 0, 0.04),
    makeSphere(1.1, 0.75, 0, 0.035),
    makeSphere(1.11, 0.85, 0, 0.03),
    makeSphere(1.12, 0.95, 0, 0.025),
    makeSphere(1.13, 1.05, 0, 0.02),
    makeSphere(1.14, 1.15, 0, 0.015),

    makeSphere(-1.11, 0.2, 0, 0.08),
    makeSphere(-1.15, 0, 0, 0.08),
    makeSphere(-1.15, -0.2, 0, 0.08),
    makeSphere(-1.15, -0.4, 0.05, 0.08),


  ]

  flower_knots = [
    addKnot(-2, 0.2, 0.2, 0.2, 0),
    addKnot(-2.6, 0.5, 0.2, 0.2, 30),
    addKnot(-2, -0.6, 0.3, 0.2, 20),
    addKnot(-2.1, -0.1, 0.3, 0.05, 20),
    addKnot(-2.2, -0.25, 0.2, 0.05, 450),
  ]


  const torusknot_geometry = new THREE.TorusKnotGeometry(11, 3, 100, 35);
  const torusknot_mat = Object.assign(new MeshTransmissionMaterial(10), {
    //map:texture,
    clearcoatRoughness: 0,
    transmission: 0.5,
    chromaticAberration: 0.1,

    transparent: true,
    opacity: 0.85,
    //anisotropy: 0.5,
    // Set to > 0 for diffuse roughness
    roughness: 0,
    ior: 1.0,
    envMapIntensity: 1,

  });
  const loader_torus = new THREE.TextureLoader();

  const torusknot = new THREE.Mesh(torusknot_geometry, torusknot_mat);
  scene.add(torusknot);

  // HDRI MAP
  const rgbeLoader = new RGBELoader();
  rgbeLoader.load('./assets/belfast.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 0.4;
    
    // Set the scene background or environment
    //scene.background = texture;
    const loader = new THREE.TextureLoader();
    loader.load('./assets/background.png', function (texture) {
      //scene.background = texture;
    });
    scene.background = texture;  // Optional: use the same texture as environment
    scene.environment = texture;
  });


  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
  });


  /*const spiral_mat = Object.assign(new MeshTransmissionMaterial(8), {
    //map:texture,
    clearcoatRoughness: 1,
    transmission: 0.92,
    //anisotropy: 0.5,
    // Set to > 0 for diffuse roughness
    roughness: 0.1,
    thickness: 10,
    ior: 1.3,
    envMapIntensity: 0.5,
    bloomstrength: 50,

  });*/

  const spiral_mat = new THREE.MeshPhysicalMaterial({
    transmission: 1,
    roughness: 0,
    transparent: true,
    opacity: 0.8,
    envMap: scene.environment,
  });



  const spiral = new OBJLoader();
  const spiral2 = new OBJLoader();

  spiral.load('./assets/spiral.obj', (root) => {
    root.traverse((child) => {
      if (child.isMesh) {
        child.material = spiral_mat;
        child.position.y = 1.9;
        child.position.z = -1;
        child.position.x = -1.2;
        child.rotation.set(2.2, 0, 0.6);
        child.scale.z = 0.3;
        child.scale.x = 0.4;
        child.scale.y = 0.4;
      }
    });
    scene.add(root);

  });

  spiral2.load('./assets/spiral.obj', (root) => {
    root.traverse((child) => {
      if (child.isMesh) {
        child.material = spiral_mat;
        child.position.y = -0.4;
        child.position.z = 0.1;
        child.position.x = 3.3;
        child.rotation.set(3.7, 0.1, 0.6);
        child.scale.z = 0.3;
        child.scale.x = 0.4;
        child.scale.y = 0.4;
      }
    });
    scene.add(root);

  });

  //});


  //HEAVEN
  const Heaven = new OBJLoader();
  Heaven.load('./assets/heaven.obj', (root) => {
    root.traverse((child) => {
      if (child.isMesh) {
        child.material = material;  // Apply the material to each mesh
        child.position.y = 1.3;
        child.position.x = 0;
        child.scale.z = 0.4;
        child.scale.x = 1.3;
        child.scale.y = 1.2;
      }
    });
    scene.add(root);
  });


  // const gui = new dat.GUI();
  // gui.add(camera, 'fov', 1, 180).onChange(updateCamera);
  // const minMaxGUIHelper = new MinMaxGUIHelper(camera, 'near', 'far', 0.1);
  // gui.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('near').onChange(updateCamera);
  // gui.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('far').onChange(updateCamera);


  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  renderer.render(scene, camera);
  renderer.setSize(window.innerWidth, window.innerHeight);
  requestAnimationFrame(render);
  window.addEventListener('resize', onWindowResize, false);

}


function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function render(time) {
  time *= 0.001;  // convert time to seconds


  flower_knots.forEach(knots => {
    knots.rotation.x += 0.01;
    knots.rotation.y += 0.01;
    knots.rotation.z += 0.005;
  });

  cubes.forEach(cube => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  });

  knots.forEach((knots, ndx) => {
    const speed = 1 + ndx * .1;
    const rot = time * speed;
    knots.rotation.x = rot;
    knots.rotation.y = rot;

  });



  renderer.render(scene, camera);

  requestAnimationFrame(render);
}
function makeCube(geometry, color, x, y, path) {
  const loader = new THREE.TextureLoader();
  const texture = loader.load(path);
  texture.colorSpace = THREE.SRGBColorSpace;

  const material = new THREE.MeshPhongMaterial({
    map: texture,
  });

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  cube.position.x = x;
  cube.position.y = y;
  cube.scale.x = 0.3;
  cube.scale.y = 0.3;
  cube.scale.z = 0.3;
  return cube;
}

function addCubes(x, y, z, s) {
  const rect_geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const rect_mat = Object.assign(new MeshTransmissionMaterial(8), {
    //map:texture,
    transmission: 0.9,
    chromaticAberration: 0,
    transparent: true,
    opacity: 0.8,
    //anisotropy: 0.5,
    // Set to > 0 for diffuse roughness
    roughness: 0.5,
    ior: 1.4,
    thickness: 0.5,
    envMapIntensity: 1,
    bloomstrength: 50,


  });
  const rect = new THREE.Mesh(rect_geo, rect_mat);
  rect.position.set(x, y, z);
  rect.scale.set(s, s, s);

  scene.add(rect);
  return rect;
}

function makeKnot() {
  const knot_geo = new THREE.TorusGeometry(0.7, 0.1, 4, 40);
  //const knot_mat = new MeshPhongMaterial();
  const knot_mat = Object.assign(new MeshTransmissionMaterial(10), {
    //map:texture,
    //clearcoatRoughness: 0,
    transmission: 0.95,
    //transparent: true,
    //opacity: 0.5,
    //anisotropy: 0.5,
    // Set to > 0 for diffuse roughness
    roughness: 0.1,
    thickness: 1,
    ior: 1.3,
    envMapIntensity: 1,
    //bloomstrength: 50,

  });
  const knot = new THREE.Mesh(knot_geo, knot_mat);
  knot.scale.x = 1.6;
  knot.scale.y = 0.8;
  scene.add(knot);
  return knot;
}

function makeTorus(geometry, color, x, rotate) {


  const material = Object.assign(new MeshTransmissionMaterial(8), {
    //map:texture,
    clearcoatRoughness: 0,
    transmission: 0.95,
    chromaticAberration: 0.1,

    //anisotropy: 0.5,
    // Set to > 0 for diffuse roughness
    roughness: 0,
    thickness: 1,
    ior: 1.3,
    envMapIntensity: 1,
    bloomstrength: 50,
    distortion: 0.3,
    distortionScale: 0.1,

  });

  const torus = new THREE.Mesh(geometry, material);
  scene.add(torus);

  torus.position.x = x;

  torus.rotation.x = rotate;
  return torus;
}

function makeSphere(x, y, z, s) {
  const sphere_geo = new THREE.SphereGeometry();
  const sphere_mat = Object.assign(new MeshTransmissionMaterial(8), {
    //map:texture,
    transmission: 0.9,
    chromaticAberration: 0.5,
    transparent: true,
    opacity: 0.85,
    //anisotropy: 0.5,
    // Set to > 0 for diffuse roughness
    roughness: 0.1,
    ior: 1.2,
    envMapIntensity: 1,
    bloomstrength: 50,
    distortion: 0,
    distortionScale: 0.1,


  });
  const sphere = new THREE.Mesh(sphere_geo, sphere_mat);
  sphere.position.set(x, y, z);
  sphere.scale.set(s, s, s);

  scene.add(sphere);
  return sphere;
}
function addKnot(x, y, z, s, r) {

  const torusknot2_geometry = new THREE.TorusKnotGeometry(0.8, 0.12, 80, 35);
  const torusknot2_mat = Object.assign(new MeshTransmissionMaterial(8), {
    //map:texture,
    clearcoatRoughness: 1,
    transmission: 0.99,
    transparent: true,
    opacity: 0.8,
    //anisotropy: 0.5,
    // Set to > 0 for diffuse roughness
    roughness: 0.1,
    thickness: 10,
    ior: 5,
    envMapIntensity: 0.8,
    bloomstrength: 50,

  });
  const loader_torus2 = new THREE.TextureLoader();

  const torusknot2 = new THREE.Mesh(torusknot2_geometry, torusknot2_mat);
  torusknot2.position.set(x, y, z);
  torusknot2.scale.set(s, s, s);
  torusknot2.rotation.set(r, r, r);
  scene.add(torusknot2);

  return torusknot2;
}


main();