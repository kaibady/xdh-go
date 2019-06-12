/**
 * diagram操作: 搜索，突显，高亮，置灰，获取当前已选
 */

// import {CustomLink} from '@/helper/graph/linkT';
export default {
    methods: {
      getGraph() {
        return this.$refs.go;
      },
      getDiagram() {
        return this.$refs.go.diagram;
      },
      getModel() {
        return this.getDiagram().model;
      },
      // 置灰功能相关方法
      setDiagramGray(state = true) {
        let model = this.getModel();
        model.setDataProperty(model.modelData, 'grayMode', state);
      },
      // 设置突出显示的节点
      setFrontNode(nodeKey) {
        let model = this.getModel();
        this.setDiagramGray();
        let centerNode = this.$refs.go.findNode(item => item && item.key && item.key === nodeKey, true)
        this.getDiagram().clearSelection()
        centerNode.isSelected = true;
        this.setConnectedFront(centerNode)
        // 查找通往主案的链接
        let chain = centerNode.findTreeParentChain();
        if (chain) {
          model.setDataProperty(model.modelData, 'frontRoute', chain.toArray().map(N => N.data.key));
        }
      },
      setConnectedFront(centerNode) {
        let model = this.getModel();
        let frontNode = [];
        centerNode.linksConnected.each(L => {
          frontNode.push(L.data.key);
          if (L.fromNode) {
            frontNode.push(L.fromNode.data.key)
          }
          if (L.toNode) {
            frontNode.push(L.toNode.data.key)
          }
        })
        model.setDataProperty(model.modelData, 'frontNode', frontNode)
      },
      searchNode(keyword, prop, pullToCenter = true) {
        this.getDiagram().clearHighlighteds()
        let node = this.$refs.go.findNode(item => item && item.text && item.text.includes(keyword) || item[prop] === keyword, true)
        if (node) {
          this.setFrontNode(node.data.key)
        } else {
          this.$message({
            type: 'warning',
            message: '找不到节点"' + keyword + '"'
          })
          return
        }
        if (pullToCenter) {
          let rect = node.actualBounds;
          this.getDiagram().centerRect(rect)
        }
      },
      getLastSelection(isObject = false) {
        let res
        this.$refs.go.diagram.selection.each(node => {
          res = isObject ? node : node.data;
        })
        return res
      },
      getSelections(isObject = true) {
        if (isObject) {
          return this.getDiagram().selection
        } else {
          let res = []
          this.getDiagram().selection.each(node => {
            res.push(node.data);
          })
          return res
        }
      },
      highlightNode(node) {
        node.linksConnected.each(L => {
          L.isHighlighted = true
          if (L.fromNode) {
            L.fromNode.isHighlighted = true
          }
          if (L.toNode) {
            L.toNode.isHighlighted = true
          }
        })
        node.isHighlighted = true
      },
      highlightLink(link) {
        let fromNode = link.fromNode;
        let toNode = link.toNode;
        fromNode.isHighlighted = true;
        toNode.isHighlighted = true;
        link.isHighlighted = true
      }
    }
  }
  