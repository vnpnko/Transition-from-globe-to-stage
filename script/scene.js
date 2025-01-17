import {WebGLRenderer, PerspectiveCamera, Scene} from 'three';
// orbit controls
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

import {LumaSplatsThree} from '@lumaai/luma-web';

document.getElementById('introVideo').addEventListener('ended', function() {
    this.style.display = 'none';
});

let renderer = new WebGLRenderer();

renderer.domElement.style.position = 'fixed';
renderer.domElement.style.zIndex = '0';
renderer.domElement.style.width = '100%';
renderer.domElement.style.height = '100%';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';

document.getElementById('stage').appendChild(renderer.domElement);

let camera = new PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.z = 2;

let controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

let scene = new Scene();

const urlParams = new URLSearchParams(window.location.search);
const locationName = urlParams.get('location');

fetch('data/locations.json')
    .then(response => response.json())
    .then(locations => {
        let athensLocation = locations.find(location => location.label === locationName);
        if (athensLocation) {
            let splat = new LumaSplatsThree({
                source: athensLocation.source
            });
            scene.add(splat);
        }
    });

function frameLoop() {
    let canvas = renderer.domElement;
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    if (canvas.width !== width || canvas.height !== height) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
    }

    controls.update();

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(frameLoop);



