import getLayout from '../layout';
export function getGroupLayout(go, options) {
  let _options = Object.assign({ categoryName: 'Group' }, options);
  function CustomLayout() {
    go.Layout.call(this);
  }
  go.Diagram.inherit(CustomLayout, go.Layout);

  CustomLayout.prototype.doLayout = function(coll) {
    coll = this.collectParts(coll);

    var supers = new go.Set();
    coll.each(function(p) {
      if (p instanceof go.Node && p.category === _options.categoryName)
        supers.add(p);
    });
    // 看有没有元素相同的两个分组
    let superMemberKeys = {},
      sameMemberKeys = {};
    supers.each(sup => {
      let supArr = sup.data._members.map(r => {
        return r.key;
      });
      supArr.sort((a, b) => {
        return a < b ? -1 : 1;
      });
      superMemberKeys[sup.data.key] = supArr.join(',');
    });
    function hasSameMembers(sup) {
      let val = superMemberKeys[sup.data.key];
      let sameMembers = [];
      for (let supname in superMemberKeys) {
        if (val === superMemberKeys[supname]) {
          sameMembers.push(supname);
        }
      }
      if (sameMembers.length !== 0 && !sameMemberKeys[val]) {
        sameMemberKeys[val] = sameMembers;
      }
    }
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
      if (!arr) {
        return true;
      }
      for (var i = 0; i < arr.length; i++) {
        var d = arr[i];
        if (d.category !== _options.categoryName) continue;
        var n = diag.findNodeForData(d);
        if (supers.has(n)) return false;
      }
      return true;
    }

    // implementations of doLayout that do not make use of a LayoutNetwork
    // need to perform their own transactions
    this.diagram.startTransaction('Custom Layout');
    // let nameBounds;
    // 记录只有一个元素的
    // let oneMemberSuper = {}
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
      hasSameMembers(ready);
    }
    for (let val in sameMemberKeys) {
      let superArr = sameMemberKeys[val];
      let top = 0;
      superArr.forEach((r, idx) => {
        let superData = this.diagram.model.nodeDataArray.find(
          d => d.key.toString() === r
        );
        let node = this.diagram.findNodeForKey(superData.key);
        let groupName = node.findObject('GroupName');
        let body = node.findObject('BODY');
        let height =
          groupName.measuredBounds.bottom - groupName.measuredBounds.top;
        body.margin = new go.Margin(top + 35, 25, 0, 10);
        top = top + height;
      });
    }
    this.diagram.commitTransaction('Custom Layout');
  };
  return CustomLayout;
}

export function getGroupDragging(go, options) {
  let _options = Object.assign({ categoryName: 'Group' }, options);
  function CustomDraggingTool() {
    go.DraggingTool.call(this);
  }
  go.Diagram.inherit(CustomDraggingTool, go.DraggingTool);

  CustomDraggingTool.prototype.moveParts = function(parts, offset, check) {
    go.DraggingTool.prototype.moveParts.call(this, parts, offset, check);
    this.diagram.layoutDiagram(true);
  };

  CustomDraggingTool.prototype.computeEffectiveCollection = function(parts) {
    var coll = new go.Set().addAll(parts);
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
    if (sup.category !== _options.categoryName) return;
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
function setInitLayout($, go, diagram, options = {}) {
  let set = new go.Set();
  let _options = Object.assign(
    { categoryName: 'Group', type: 'ForceDirectedLayout', layoutOptions: {} },
    options
  );
  diagram.nodes.each(N => {
    if (N.data.category !== _options.categoryName) {
      set.add(N);
    }
  });
  diagram.links.each(L => {
    set.add(L);
  });
  if (_options.type === 'GridLayout') {
    let nodeLength = diagram.model.nodeDataArray.length;
    let num = Math.floor(Math.sqrt(nodeLength) + 1);
    _options.layoutOptions.wrappingColumn = num;
  }
  let layout = getLayout[_options.type]($, go, _options.layoutOptions);
  layout.isOngoing = true;
  diagram.layout = layout;
  diagram.layoutDiagram();
}
export function setGroupLayout($, go, diagram, options = {}) {
  let afterLayout = () => {
    diagram.removeDiagramListener('LayoutCompleted', afterLayout);
    let arr = diagram.model.nodeDataArray;
    for (var i = 0; i < arr.length; i++) {
      let data = arr[i];
      let supers = data.groups;
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
    for (let j = 0; j < arr.length; j++) {
      if (arr[j].category === options.categoryName && !arr[j]._members) {
        arr[j]._members = [];
      }
    }
    let groupLayout = options.groupLayout;
    let layout = new groupLayout();
    layout.isOngoing = true;
    diagram.layout = layout;
    diagram.layout.doLayout(diagram.nodes);
  };
  diagram.addDiagramListener('LayoutCompleted', afterLayout);
  setInitLayout($, go, diagram, options);
}
