let GeneratorEllipseSpot1 = new go.Spot(0, 0);
let GeneratorEllipseSpot2 = new go.Spot(1, 1);
function registerCustomCircle(go) {
  go.Shape.defineFigureGenerator('CustomCircle', function(shape, w, h) {
    let geo = new go.Geometry(go.Geometry.Ellipse);
    geo.startX = 0;
    geo.startY = 0;
    geo.endX = w;
    geo.endY = h;
    geo.spot1 = GeneratorEllipseSpot1;
    geo.spot2 = GeneratorEllipseSpot2;
    geo.defaultStretch = go.GraphObject.Uniform;
    return geo;
  });
}
let func = {
    registerCustomCircle  
}
export function registerFigure(go, name) {
   func['register' + name](go)
}
