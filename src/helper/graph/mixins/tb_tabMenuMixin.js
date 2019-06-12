// 布局配置文件
import getLayout from '@/helper/graph/layout'
import {toggleDisabled} from '@/helper/graph/menus/tab-menu'

export default {
  methods: {
    setLinkMode(enabled = true) {
      let model = this.getModel()
      // 点击连线，进入连线模式
      this.addLinkMode = enabled;
      model.setDataProperty(model.modelData, 'addLinkMode', enabled)
    },
    // 选择功能相关方法
    setSelectMode(mode) {
      this.$refs.go.diagram.clearHighlighteds()
      let model = this.getModel(), diagram = this.getDiagram();
      model.setDataProperty(model.modelData, 'selectMode', mode);
      this.selectMode = mode;
      diagram.clearHighlighteds();
      model.setDataProperty(model.modelData, 'frontNode', [])
      model.setDataProperty(model.modelData, 'frontRoute', [])
      if (mode === 'rect') {
        diagram.toolManager.dragSelectingTool.delay = 0;
        this.$refs.tabMenu.toggleDisabledAll()
      } else if (mode === 'all') {
        diagram.commandHandler.selectAll();
      } else if (mode === 'reverse') {
        diagram.nodes.each(N => {
          N.isSelected = !N.isSelected;
        })
      } else if (mode === 'child') {
        let selections = this.getSelections(true);
        let go = this.$refs.go.go;
        let set = new go.Set(go.Node);
        selections.each(N => {
          set.add(N);
        })
        diagram.clearSelection();
        set.each(N => {
          this.selectChildren(N)
        })
      } else if (mode === 'multi') {
        diagram.clearSelection();
        this.$refs.tabMenu.toggleDisabledAll()
      } else if (mode === 'normal') {
        this.$refs.go.diagram.toolManager.dragSelectingTool.delay = 200;
      }
      if (['all', 'child', 'reverse'].includes(mode)) {
        this.tb_toggleDisabledItems()
      }
    },
    selectChildren(node) {
      let children = node.findTreeChildrenNodes()
      if (children) {
        children.each(N => {
          N.isSelected = true;
        })
      }
    },
    tb_toggleDisabledItems() {
      toggleDisabled(this)
    },
    setTagging() {
      let lastSelect = this.getLastSelection();
      let model = this.getModel();
      let tagging = lastSelect.tagging;
      model.setDataProperty(lastSelect, 'tagging', !tagging);
    },
    /**
     * layoutNodes 可将节点集布局
     */
    layoutNodes($, go, type, nodes, position) {
      let layout = getLayout[type]($, go, this, {isRouting: false});
      // 如果不设置isOngoing为false, 添加完的节点会自动按照diagram.layout布局，节点集布局会失效
      this.$refs.go.diagram.layout.isOngoing = false;
      this.setNodesFixed(nodes, go, false)
      layout.doLayout(nodes)
      this.setNodesFixed(nodes, go, true)
      this.$refs.go.diagram.layout.isOngoing = true;
      // 如果是力布局，会以原有位置为基础布局，因此不需要再设置偏移
      if (position && type !== 'ForceDirectedLayout') {
        this.$refs.go.diagram.moveParts(nodes, position)
      }
    },
    setNodesFixed(nodes, go, isFixed = true) {
      nodes.each(N => {
          N.isLayoutPositioned = !isFixed;
      })
    }
  }
}
