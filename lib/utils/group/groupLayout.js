import getLayout from '../layout';
export function getGroupLayout(go) {
  function CustomLayout() {
    go.Layout.call(this);
  }
  go.Diagram.inherit(CustomLayout, go.Layout);

  CustomLayout.prototype.doLayout = function(coll) {
    coll = this.collectParts(coll);

    var supers = new go.Set();
    coll.each(function(p) {
      if (p instanceof go.Node && p.category === 'Super') supers.add(p);
    });

    function membersOf(sup, diag) {
      var set = new go.Set();
      var arr = sup.data._members;
      for (var i = 0; i < arr.length; i++) {
        var d = arr[i];
        set.add(diag.findNodeForData(d));
      }
      return set;
    }

    function isReady(sup, supers, diag) {
      var arr = sup.data._members;
      for (var i = 0; i < arr.length; i++) {
        var d = arr[i];
        if (d.category !== 'Super') continue;
        var n = diag.findNodeForData(d);
        if (supers.has(n)) return false;
      }
      return true;
    }

    // implementations of doLayout that do not make use of a LayoutNetwork
    // need to perform their own transactions
    this.diagram.startTransaction('Custom Layout');

    while (supers.count > 0) {
      var ready = null;
      var it = supers.iterator;
      while (it.next()) {
        if (isReady(it.value, supers, this.diagram)) {
          ready = it.value;
          break;
        }
      }
      supers.remove(ready);
      var b = this.diagram.computePartsBounds(membersOf(ready, this.diagram));
      ready.location = b.position;
      var body = ready.findObject('BODY');
      if (body) body.desiredSize = b.size;
    }

    this.diagram.commitTransaction('Custom Layout');
  };
  return CustomLayout;
}

export function getGroupDragging(go) {
  function CustomDraggingTool() {
    go.DraggingTool.call(this);
  }
  go.Diagram.inherit(CustomDraggingTool, go.DraggingTool);

  CustomDraggingTool.prototype.moveParts = function(parts, offset, check) {
    go.DraggingTool.prototype.moveParts.call(this, parts, offset, check);
    this.diagram.layoutDiagram(true);
  };

  CustomDraggingTool.prototype.computeEffectiveCollection = function(parts) {
    var coll = new go.Set(/*go.Part*/).addAll(parts);
    var tool = this;
    parts.each(function(p) {
      tool.walkSubTree(p, coll);
    });
    return go.DraggingTool.prototype.computeEffectiveCollection.call(
      this,
      coll
    );
  };

  // Find other attached nodes.
  CustomDraggingTool.prototype.walkSubTree = function(sup, coll) {
    if (sup === null) return;
    coll.add(sup);
    if (sup.category !== 'Super') return;
    // recurse through this super state's members
    var model = this.diagram.model;
    var mems = sup.data._members;
    if (mems) {
      for (var i = 0; i < mems.length; i++) {
        var mdata = mems[i];
        this.walkSubTree(this.diagram.findNodeForData(mdata), coll);
      }
    }
  };
  return CustomDraggingTool;
}
function setInitLayout($, go, diagram, type, options = {}) {
  let set = new go.Set();
  diagram.nodes.each(N => {
    if (N.data.category !== 'Group') {
      set.add(N);
    }
  });
  diagram.links.each(L => {
    set.add(L);
  });
  if (type === 'GridLayout') {
    let nodeLength = diagram.model.nodeDataArray.length;
    let num = Math.floor(Math.sqrt(nodeLength) + 1);
    options.wrappingColumn = num;
  }
  let layout = getLayout[type]($, go, options);
  layout.isOngoing = true;
  diagram.layout = layout;
  diagram.layoutDiagram();
}
export function setGroupLayout($, go, diagram, type, options = {}) {
  setInitLayout($, go, diagram, type, options);
  setTimeout(() => {
    console.log(go.CustomLayout);
    let layout = new go.CustomLayout();
    layout.isOngoing = true;
    diagram.layout = layout;
    let arr = diagram.model.nodeDataArray;
    console.log('arr', arr);
    for (var i = 0; i < arr.length; i++) {
      let data = arr[i];
      let supers = data.supers;
      if (supers) {
        for (let j = 0; j < supers.length; j++) {
          let sdata = diagram.model.findNodeDataForKey(supers[j]);
          if (sdata) {
            if (!data._supers) {
              data._supers = [sdata];
            } else {
              data._supers.push(sdata);
            }
            if (!sdata._members) {
              sdata._members = [data];
            } else {
              sdata._members.push(data);
            }
          }
        }
      }
    }
    diagram.nodes.each(N => {
      console.log(N.data);
    });
    diagram.layout.doLayout(diagram.nodes);
  }, 800);
}
