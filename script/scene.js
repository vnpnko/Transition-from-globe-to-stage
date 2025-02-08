import { WebGLRenderer, PerspectiveCamera, Scene, Box3, Vector3 } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { LumaSplatsThree } from '@lumaai/luma-web';

document.getElementById('introVideo').addEventListener('ended', function() {
    this.style.display = 'none';
});

// document.getElementById('introVideo').style.display = 'none';

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
        let splat = new LumaSplatsThree({
            source: athensLocation.source
        });
        scene.add(splat);
    });

let lastFrameTime = 0;
const maxFPS = 20; // Limit the frame rate

function frameLoop(time) {
    let canvas = renderer.domElement;
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    if (canvas.width !== width || canvas.height !== height) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
    }

    controls.update();

    if (time - lastFrameTime >= 1000 / maxFPS) {
        renderer.render(scene, camera);
        lastFrameTime = time;
    }

    requestAnimationFrame(frameLoop);
}

requestAnimationFrame(frameLoop);
