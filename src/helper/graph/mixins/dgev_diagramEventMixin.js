export default {
  methods: {
    LinkDrawn(obj) {
      let fromNode = this.$refs.go.findNode(r => r && r.key && r.key === obj.subject.data.from);
      let toNode = this.$refs.go.findNode(r => r && r.key && r.key === obj.subject.data.to)
      this.$refs.addLinkDialog.showDialog().then(res => {
        // 新建的关系线应当删除,自行添加一条
        this.nl_removeCustomLink(fromNode, toNode)
        this.addCustomLink({
          asjbh: this.caseId,
          fromid: fromNode.key,
          fromtype: fromNode.type,
          text: res.name,
          toid: toNode.key,
          totype: toNode.type
        }).then(res2 => {
          this.graphChanged = true
          this.$message({type: 'success', message: '添加关系成功'})
          this.loadGraph()
          // TODO 如果要无刷新添加自定义连线，告诉建华需要返回新link的id,否则添加完马上删除没有对应的id可以传，删除会失败
          // this.$refs.go.addLink(new CustomLink({
          //   key: res2 && res2.id || '',
          //   from: fromNode.key,
          //   to: toNode.key,
          //   text: res.name
          // }))
        })
      }).catch(() => {
        // 如果填写关系的对话框取消了，新建的关系线应当删除
        this.nl_removeCustomLink(fromNode, toNode)
      })
    },
    ViewportBoundsChanged(obj) {
      if (obj && obj.diagram.viewportBounds && obj.diagram.scale && !this.firstLoad) {
        this.configCache.initialScale = obj.diagram.scale;
        this.configCache.initialPosition = obj.diagram.position;
        this.viewportCache = JSON.parse(JSON.stringify(obj.diagram.viewportBounds))
      }
    },
    DiagramSingleClick(obj) {
      this.slideCollapsed = true;
      let model = obj.diagram.model;
      this.setDiagramGray(false)
      model.setDataProperty(model.modelData, 'frontNode', []);
      model.setDataProperty(model.modelData, 'frontRoute', []);
      obj.diagram.clearSelection()
      obj.diagram.clearHighlighteds()
    },
    ChangedSelection(obj) {
      this.tb_toggleDisabledItems()
    },
    bindDiagramEvent(diagram, $, go) {
      // 框选按esc后默认会取消所有已选项，禁用
      diagram.commandHandler.doKeyDown = () => {
        let e = diagram.lastInput;
        let cmd = diagram.commandHandler;
        if (e.key !== 'Esc') {
          go.CommandHandler.prototype.doKeyDown.call(cmd)
        }
      }
      // 点击节点默认会只选当前节点，而取消之前选择的节点。多选状态下须取消此行为
      diagram.toolManager.clickSelectingTool.doMouseUp = () => {
        let e = diagram.lastInput;
        let cmd = diagram.toolManager.clickSelectingTool;
        if (['multi'].includes(diagram.model.modelData.selectMode)) {
          if (e.button === 0) {
            let node = diagram.findObjectAt(e.documentPoint, x => x.part, x => x.canSelect())
            if (node) {
              node.isSelected = true;
            }
            diagram.clearHighlighteds()
          }
        } else {
          go.ClickSelectingTool.prototype.doMouseUp.call(cmd)
        }
      }
      // 框选状态下禁用拖拽
      diagram.toolManager.draggingTool.doMouseMove = () => {
        let cmd = diagram.toolManager.draggingTool;
        go.DraggingTool.prototype.doMouseMove.call(cmd)
        diagram.layout.invalidateLayout();
      }
    }
  },
  created() {
    this.diagramEvents.BackgroundSingleClicked = this.DiagramSingleClick
    this.diagramEvents.ViewportBoundsChanged = this.ViewportBoundsChanged;
    this.diagramEvents.ChangedSelection = this.ChangedSelection;
    this.diagramEvents.LinkDrawn = this.LinkDrawn;
  }
}
