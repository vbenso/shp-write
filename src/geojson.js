module.exports.point = justType('Point', 'POINT');
module.exports.line = justType('LineString', 'POLYLINE');
module.exports.polygon = justType('Polygon', 'POLYGON');

function justType(type, TYPE) {
    return function (gj) {
        var oftype = gj.features.filter(isType(type));
        if (TYPE === 'POLYGON')
            debugger;
        return {
            geometries: (TYPE === 'POLYGON' || TYPE === 'POLYLINE') ? wrap(oftype.map(justCoords)) : oftype.map(justCoords),
            properties: oftype.map(justProps),
            type: TYPE
        };
    };
}
function wrap(t) {
    return t.map((f) => {
        return [f];
    });
}

function justCoords(t) {
    if (t.geometry.coordinates[0] !== undefined &&
        t.geometry.coordinates[0][0] !== undefined &&
        t.geometry.coordinates[0][0][0] !== undefined) {
        return t.geometry.coordinates[0];
    } else {
        return t.geometry.coordinates;
    }
    return t.geometry.coordinates;
}

function justProps(t) {
    return t.properties;
}

function isType(t) {
    return function (f) { return f.geometry.type === t; };
}
