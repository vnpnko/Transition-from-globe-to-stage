import * as THREE from 'https://esm.sh/three';

const arcsData = [
    {
        startLat: 21.2339,
        startLng: -11.0653,   // Mauritania
        endLat: 37.5903,
        endLng: 23.4341       // Athens
    },
    {
        startLat: 47.2954,
        startLng: 19.0207,    // Budapest
        endLat: 37.5903,
        endLng: 23.4341       // Athens
    }
];

const marker =
    `
        <div style="transform: translate(-50%, -50%) translateX(-15px) translateY(10px) ">
          <img src="assets/globe/geotag.png" alt="Geotag" style="width:50px; height:50px" />
        </div>
    `;

const globe = new Globe(document.getElementById('globe'))
    .globeImageUrl('assets/globe/earth_surface_old.jpg')
    .backgroundImageUrl("assets/globe/night-sky.png")

    // labels
    .labelText('label')
    .labelSize(2)
    .labelColor(() => "red")
    .labelDotOrientation('top')
    .onLabelClick(d => window.open(d.url, '_self'))

    // arcs
    .arcsData(arcsData)
    .arcColor(() => "yellow")
    .arcStroke(1)
    .arcAltitude(0)

    // geotags
    .htmlElement(d => {
        const el = document.createElement('div');
        el.innerHTML = marker;
        el.style.width = '10px';
        el.style['pointer-events'] = 'auto';
        el.style.cursor = 'pointer';
        el.onclick = () => window.open(d.url, '_self');
        return el;
    })
;


const CLOUDS_ALT = 0.004;
const CLOUDS_ROTATION_SPEED = -0.006;

new THREE.TextureLoader().load('assets/globe/clouds_compressed.png', cloudsTexture => {
    const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(globe.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75),
        new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
    );
    globe.scene().add(clouds);

    (function rotateClouds() {
        clouds.rotation.y += CLOUDS_ROTATION_SPEED * Math.PI / 180;
        requestAnimationFrame(rotateClouds);
    })();
});

fetch('data/locations.json')
    .then(r => r.json())
    .then(landingSites => {
    globe
        .labelsData(landingSites)
        .htmlElementsData(landingSites);
});

