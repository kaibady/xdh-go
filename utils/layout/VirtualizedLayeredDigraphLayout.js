function computeDocumentBounds(model, go) {
  var b = new go.Rect()
  var ndata = model.nodeDataArray
  for (var i = 0; i < ndata.length; i++) {
    var d = ndata[i]
    if (!d.bounds) continue
    let rect = d.bounds
    if (i === 0) {
      b.set(rect)
    } else {
      b.unionRect(rect)
    }
  }
  return b
}
function onViewportChanged(e, myWholeModel, go, updateCounts) {
  var diagram = e.diagram
  // make sure there are Nodes for each node data that is in the viewport
  // or that is connected to such a Node
  var viewb = diagram.viewportBounds // the new viewportBounds
  var model = diagram.model

  var oldskips = diagram.skipsUndoManager
  diagram.skipsUndoManager = true

  var b = new go.Rect()
  var ndata = myWholeModel.nodeDataArray
  for (var i = 0; i < ndata.length; i++) {
    var n = ndata[i]
    if (!n.bounds) continue
    var bounds = n.bounds
    if (bounds.intersectsRect(viewb)) {
      model.addNodeData(n)
    }
    if (model instanceof go.TreeModel) {
      // make sure links to all parent nodes appear
      var parentkey = myWholeModel.getParentKeyForNodeData(n)
      var parent = myWholeModel.findNodeDataForKey(parentkey)
      if (parent !== null) {
        if (n.bounds.intersectsRect(viewb)) {
          // N is inside viewport
          model.addNodeData(parent) // so that link to parent appears
          var node = diagram.findNodeForData(n)
          if (node !== null) {
            var link = node.findTreeParentLink()
            if (link !== null) {
              // do this now to avoid delayed routing outside of transaction
              link.fromNode.ensureBounds()
              link.toNode.ensureBounds()
              link.updateRoute()
            }
          }
        } else {
          // N is outside of viewport
          // see if there's a parent that is in the viewport,
          // or if the link might cross over the viewport
          b.set(n.bounds)
          b.unionRect(parent.bounds)
          if (b.intersectsRect(viewb)) {
            model.addNodeData(n) // add N so that link to parent appears
            var child = diagram.findNodeForData(n)
            if (child !== null) {
              var link = child.findTreeParentLink()
              if (link !== null) {
                // do this now to avoid delayed routing outside of transaction
                link.fromNode.ensureBounds()
                link.toNode.ensureBounds()
                link.updateRoute()
              }
            }
          }
        }
      }
    }
  }

  if (model instanceof go.GraphLinksModel) {
    var ldata = myWholeModel.linkDataArray
    for (var i = 0; i < ldata.length; i++) {
      var l = ldata[i]
      var fromkey = myWholeModel.getFromKeyForLinkData(l)
      if (fromkey === undefined) continue
      var from = myWholeModel.findNodeDataForKey(fromkey)
      if (from === null || !from.bounds) continue

      var tokey = myWholeModel.getToKeyForLinkData(l)
      if (tokey === undefined) continue
      var to = myWholeModel.findNodeDataForKey(tokey)
      if (to === null || !to.bounds) continue

      b.set(from.bounds)
      b.unionRect(to.bounds)
      if (b.intersectsRect(viewb)) {
        // also make sure both connected nodes are present,
        // so that link routing is authentic
        model.addNodeData(from)
        model.addNodeData(to)
        model.addLinkData(l)
        var link = diagram.findLinkForData(l)
        if (link !== null) {
          // do this now to avoid delayed routing outside of transaction
          link.fromNode.ensureBounds()
          link.toNode.ensureBounds()
          link.updateRoute()
        }
      }
    }
  }

  diagram.skipsUndoManager = oldskips

  if (myRemoveTimer === null) {
    // only remove offscreen nodes after a delay
    myRemoveTimer = setTimeout(function() {
      removeOffscreen(diagram, go, updateCounts)
    }, 3000)
  }
  updateCounts(diagram, diagram.layout.model)
}

var myRemoveTimer = null

function removeOffscreen(diagram, go, updateCounts) {
  myRemoveTimer = null

  var viewb = diagram.viewportBounds
  var model = diagram.model
  var remove = [] // collect for later removal
  var removeLinks = new go.Set() // links connected to a node data to remove
  var it = diagram.nodes
  while (it.next()) {
    var n = it.value
    var d = n.data
    if (d === null) continue
    if (!n.actualBounds.intersectsRect(viewb) && !n.isSelected) {
      // even if the node is out of the viewport, keep it if it is selected or
      // if any link connecting with the node is still in the viewport
      if (
        !n.linksConnected.any(function(l) {
          return l.actualBounds.intersectsRect(viewb)
        })
      ) {
        remove.push(d)
        if (model instanceof go.GraphLinksModel) {
          removeLinks.addAll(n.linksConnected)
        }
      }
    }
  }

  if (remove.length > 0) {
    var oldskips = diagram.skipsUndoManager
    diagram.skipsUndoManager = true
    model.removeNodeDataCollection(remove)
    if (model instanceof go.GraphLinksModel) {
      removeLinks.each(function(l) {
        if (!l.isSelected) model.removeLinkData(l.data)
      })
    }
    diagram.skipsUndoManager = oldskips
  }
  updateCounts(diagram, diagram.layout.model)
}

function getVirtualizedLayeredDigraphLayout(go) {
  function VirtualizedLayeredDigraphLayout() {
    go.LayeredDigraphLayout.call(this)
    this.isOngoing = false
    this.model = null // add this property for holding the whole GraphLinksModel
  }

  go.Diagram.inherit(VirtualizedLayeredDigraphLayout, go.CircularLayout)
  VirtualizedLayeredDigraphLayout.prototype.createNetwork = function() {
    return new VirtualizedLayeredDigraphNetwork(this) // defined below
  }

  // ignore the argument, an (implicit) collection of Parts
  VirtualizedLayeredDigraphLayout.prototype.makeNetwork = function(coll) {
    var net = this.createNetwork()
    net.addData(this.model) // use the model data, not any actual Nodes and Links
    return net
  }

  /** k */
  VirtualizedLayeredDigraphLayout.prototype.commitLayout = function() {
    go.LayeredDigraphLayout.prototype.commitLayout.call(this)
    // can't depend on regular bounds computation that depends on all Nodes existing
    this.diagram.fixedBounds = computeDocumentBounds(this.model, go)
    // update the positions of any existing Nodes
    this.diagram.nodes.each(function(node) {
      node.updateTargetBindings()
    })
  }
  // end VirtualizedLayeredDigraphLayout class

  function VirtualizedLayeredDigraphNetwork(layout) {
    go.LayeredDigraphNetwork.call(this, layout)
  }
  go.Diagram.inherit(VirtualizedLayeredDigraphNetwork, go.LayeredDigraphNetwork)
  VirtualizedLayeredDigraphNetwork.prototype.addData = function(model) {
    if (model instanceof go.GraphLinksModel) {
      var dataVertexMap = new go.Map()
      // create a vertex for each node data
      var ndata = model.nodeDataArray
      for (var i = 0; i < ndata.length; i++) {
        var d = ndata[i]
        var v = this.createVertex()
        v.data = d // associate this Vertex with data, not a Node
        dataVertexMap.set(model.getKeyForNodeData(d), v)
        this.addVertex(v)
      }
      // create an edge for each link data
      var ldata = model.linkDataArray
      for (var i = 0; i < ldata.length; i++) {
        var d = ldata[i]
        // now find corresponding vertexes
        var from = dataVertexMap.get(model.getFromKeyForLinkData(d))
        var to = dataVertexMap.get(model.getToKeyForLinkData(d))
        if (from === null || to === null) continue // skip
        // create and add VirtualizedLayeredDigraphEdge
        var e = this.createEdge()
        e.data = d // associate this Edge with data, not a Link
        e.fromVertex = from
        e.toVertex = to
        this.addEdge(e)
      }
    } else {
      throw new Error('can only handle GraphLinksModel data')
    }
  }

  VirtualizedLayeredDigraphNetwork.prototype.deleteArtificialVertexes = function() {}
  return VirtualizedLayeredDigraphLayout
}
export default getVirtualizedLayeredDigraphLayout
export function handlerVirtualLayeredDigraph(
  go,
  diagram,
  myWholeModel,
  isInit = true,
  updateCounts,
  loader
) {
  diagram.isVirtualized = true
  if (isInit) {
    diagram.layout.model = myWholeModel
    diagram.addDiagramListener('ViewportBoundsChanged', e => {
      onViewportChanged(e, diagram.layout.model, go, updateCounts)
    })
    diagram.addDiagramListener('InitialLayoutCompleted', function(e) {
      var firstdata = diagram.layout.model.findNodeDataForKey('1')
      if (firstdata !== null) {
        diagram.centerRect(firstdata.bounds)
      }
    })
    diagram.addDiagramListener('SelectionDeleted', e => {
      let nodes = e.subject
      let _nodes = [],
        _links = []
      nodes.each(N => {
        if (N instanceof go.Node) {
          _nodes.push(N.data)
        } else if (N instanceof go.Link) {
          _links.push(N.data)
        }
      })
      diagram.layout.model.removeNodeDataCollection(_nodes)
      diagram.layout.model.removeLinkDataCollection(_links)
    })
  }
  if (loader) {
    diagram.delayInitialization(() => {
      loader()
    })
  }
}
