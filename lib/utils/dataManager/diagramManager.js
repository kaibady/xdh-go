let diagramManager = {}
diagramManager.register = function(name, diagram) {
  if (diagramManager[name]) {
    throw new Error('diagram ' + name + ' is exisit')
  } else {
    diagramManager[name] = diagram
  }
}
export default diagramManager
