import {DashedLink} from '@/helper/graph/linkT'
import {
  OperNode
} from '@/helper/graph/nodeT'

export default function (data) {
  const params = {
    asjbh: this.caseId,
    zjhm: data.ywid
  }
  this.getModel().setDataProperty(data, 'loading', true)
  this.getYysjfx(params).then(res => {
    this.getModel().setDataProperty(data, 'loading', false)
    if (res && res.length !== 0) {
      let node = this.getDiagram().findNodeForData(data);
      if (node) {
        let coll = node.findTreeChildrenNodes();
        let collNode, fromNode, willAddNode = false, addCollection;
        coll.each(N => {
          if (N.data.type === '16') {
            collNode = N
          }
        })
        if (collNode) {
          fromNode = collNode.data;
        } else {
          willAddNode = true;
          addCollection = new OperNode({
            text: '拥有手机',
            type: '16',
            number: res.length,
            parentCode: data.key,
            newAdded: true,
            key: data.key + '_yysj'
          })
          fromNode = addCollection;
        }
        if (willAddNode) {
          this.$refs.go.addNode(addCollection)
          let link = new DashedLink({
            from: data.key,
            to: data.key + '_yysj',
            key: data.key + '_' + data.key + '_yysj'
          });
          this.$refs.go.addLink(link)
          this.layoutAfterAdd(addCollection)
        }
          res.forEach(r => {
            this.addPhoneNode(r, fromNode)
          })
          this.searchNode(data.key + '_yysj', 'key')
      }
    }
  })
}
