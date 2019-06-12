/**
 * link 上的事件
 */

export default {
  methods: {
    ev_linkMouseClick(e, node) {
      if (node.fromNode.data.type === '15') {
        // 关系分析详情
        this.relationDetailClose = false
        this.relationDetailId = node.fromNode.data.ywid
        this.relationDetailIdPeople = node.toNode.data.ywid
        return false
      }
    },
    ev_linkMouseEnter(e, link) {
      link.diagram.clearHighlighteds()
      // 高亮当前经过的关系
      this.highlightLink(link)
    },
    ev_linkMouseLeave(e, link) {
      link.diagram.clearHighlighteds()
    }
  }
}
