import * as THREE from 'three';

import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

let camera, scene, renderer, cube, cubes;

function main() {
    const canvas = document.querySelector('#c');
    renderer = new THREE.WebGLRenderer({antialias: true, canvas});
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    scene = new THREE.Scene();
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    //const material = new THREE.MeshPhongMaterial({color: 0x44aa88});
    //cube = new THREE.Mesh(geometry, material);
    //scene.add(cube);

    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    cubes = [
        makeInstance(geometry, 0x44aa88,  0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844,  2),
      ];

    const controls = new OrbitControls( camera, renderer.domElement );
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
   
    cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
      });
   
    renderer.render(scene, camera);
   
    requestAnimationFrame(render);
}

function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color});
   
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
   
    cube.position.x = x;
   
    return cube;
}



main();
