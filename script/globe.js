import { scaleOrdinal } from 'https://esm.sh/d3-scale';

const colorScale = scaleOrdinal(['white', 'mediumblue', 'darkgreen', 'yellow']);

const labelsTopOrientation = new Set(['Apollo 11']); // avoid label collisions

const moon = new Globe(document.getElementById('globeViz'))
    .globeImageUrl('assets/moon/lunar_surface.jpg')
    .showGraticules(false)
    .showAtmosphere(false)
    .labelText('label')
    .labelSize(2)
    .width(document.getElementById('globeViz').clientWidth)
    .height(document.getElementById('globeViz').clientHeight)
    .labelDotRadius(0.4)
    .labelDotOrientation(d => labelsTopOrientation.has(d.label) ? 'top' : 'bottom')
    .labelColor(d => colorScale(d.agency))
    .onLabelClick(d => window.open(d.url, '_self'));

fetch('data/moon_landings.json').then(r => r.json()).then(landingSites => {
    moon.labelsData(landingSites);
});