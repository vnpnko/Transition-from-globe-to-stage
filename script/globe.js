const labelsTopOrientation = new Set(['Mauritania']);

const moon = new Globe(document.getElementById('globe'))
    .globeImageUrl('assets/moon/earth_surface.jpg')
    .labelText('label')
    .showAtmosphere(false)
    .backgroundImageUrl("assets/moon/night-sky.png")
    .labelSize(2)
    .labelDotRadius(0.4)
    .labelDotOrientation(d => labelsTopOrientation.has(d.label) ? 'top' : 'bottom')
    .labelColor(() => "white")
    .onLabelClick(d => window.open(d.url, '_self'));

fetch('data/locations.json').then(r => r.json()).then(landingSites => {
    moon.labelsData(landingSites);
});

