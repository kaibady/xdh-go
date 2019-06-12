/**
 * node或link的操作方法，例如增加删除节点或链接，改变节点状态等
 */
import {SolidLink} from '@/helper/graph/linkT'
import {
  PersonNode,
  TelNode
} from '@/helper/graph/nodeT'
import {loadPersonPhoto} from '@/helper/graph/nodeT/personNode'
import singleGraph from '@/base/mixin/single-graph'
import {DEL_NODE_BATH} from '@/base/api/single-graph'
import axios from '@/utils/axios'
import {nodeCanDelete, linkCanDelete} from './utils';

export default {
  mixins: [singleGraph],
  methods: {
    // 批量删除节点
    deleteNodeBath() {
      let nodes = this.getSelections(false);
      let nodeDelData = [], linkDelData = [];
      nodes.forEach(r => {
        if (nodeCanDelete(r)) {
          nodeDelData.push({ywid: r.ywid, type: r.type, text: r.text})
        }
        if (linkCanDelete(r)) {
          linkDelData.push({key: r.key, text: r.text})
        }
      })
      if (nodeDelData.length === 0 && linkDelData.length === 0) {
        this.$message({
          type: 'warning',
          message: '没有可以删除的节点或关系'
        })
      } else {
        let nodeDelTips = nodeDelData.length !== 0 ? `节点：${nodeDelData.map(n => n.text).join(',')},` : '';
        let linkDelTips = linkDelData.length !== 0 ? `关系: ${linkDelData.map(n => n.text).join(',')},` : '';
        let delNodeSuccess = false, delLinkSuccess = false;
        this.$confirm(`即将删除${nodeDelTips}${linkDelTips}是否继续?`).then(res => {
          if (nodeDelData.length !== 0) {
            let param = {
              asjbh: this.caseId,
              data: nodeDelData.map(r => {
                  return {
                    ywid: r.ywid,
                    type: r.type
                  }
                }
              )
            }
            // 生成器的接口在method为delete时会对数据预处理，与后端给的接口参数格式不一致
            axios({
              headers: {
                'Content-Type': 'application/json'
              },
              url: DEL_NODE_BATH,
              data: param,
              method: 'delete'
            }).then(ret => {
              this.$message({type: 'success', message: '删除节点成功'})
              delNodeSuccess = true;
              if (linkDelData.length === 0 || delLinkSuccess) {
                this.loadGraph()
              }
            }).catch(e => {
              this.$message({type: 'danger', message: e})
            })
          }
          if (linkDelData.length !== 0) {
            let proms = [];
            linkDelData.forEach(r => {
              proms.push(this.delCustomLink({id: r.key}))
            })
            Promise.all(proms).then(res => {
              this.$message({type: 'success', message: '删除关系成功'})
              delLinkSuccess = true;
              if (nodeDelData.length === 0 || delNodeSuccess) {
                this.loadGraph()
              }
            }).catch(e => {
              this.$message({type: 'danger', message: e})
            })
          }
        })
      }
    },
    nl_removeCustomLink(fromNode, toNode) {
      let links = this.$refs.go.diagram.findLinksByExample({
        from: fromNode.key,
        to: toNode.key
      })
      links.each(L => {
        if (!['solid', 'dashed'].includes(L.data.category)) {
          this.$refs.go.removeLink(L.data)
        }
      })
    },
    // 异步加载图片头像并更新到节点
    getNodesPhoto() {
      let nodes = this.getDiagram().findNodesByExample({category: 'person'});
      nodes.each(N => {
        loadPersonPhoto(this, N);
      })
    },
    addPhoneNode(data, fromNodeData) {
      this.graphChanged = true;
      let node = this.$refs.go.findNode(item => item && item.key && item.key === data.sjhm);
      if (!node) {
        node = new TelNode(Object.assign(data, {
          text: data.sjhm,
          key: data.sjhm,
          title: data.sjhm,
          ywid: data.sjhm,
          nodeCode: data.sjhm
        }));
        this.$refs.go.addNode(node);
      }
      let _link = this.$refs.go.findLink(item => item && item.key && item.key === fromNodeData.key + '_' + data.sjhm)
      if (!_link) {
        let link = new SolidLink({
          key: fromNodeData.key + '_' + data.sjhm,
          from: fromNodeData.key,
          to: data.sjhm
        })
        this.$refs.go.addLink(link);
      }
      this.layoutAfterAdd(node)
    },
    addNodeByBus(node, link, updateData) {
      this.graphChanged = true;
      if (updateData) {
        console.log(updateData)
        let model = this.getModel();
        for (let key in updateData) {
          model.setDataProperty(node, key, updateData[key]);
        }
      } else {
        this.$refs.go.addNode(node)
      }
      let _link = this.$refs.go.findLink(item => {
        return item && item.key && item.key === link.key
      });

      if (!_link) {
        this.$refs.go.addLink(link)
      }
      this.layoutAfterAdd(node)
    },
    layoutAfterAdd(node) {
      let _node = this.$refs.go.findNode(r => r && r.key && r.key === node.key, true)
      if (_node) {
        let go = this.$refs.go.go;
        let set = new go.Set(go.Node);
        let parent = _node.findTreeParentNode();
        let cNodes = parent.findTreeChildrenNodes();
        let cLinks = parent.findTreeChildrenLinks();
        let posXmin = parent.position.x, posYmin = parent.position.y;
        console.log(parent.position)
        set.add(parent)
        if (cNodes) {
          cNodes.each(N => {
            set.add(N)
            if (N.position.x !== 0 && N.position.y !== 0) {
              if (!posXmin || N.position.x < posXmin) {
                posXmin = N.position.x;
              }
              if (!posYmin || N.position.y < posYmin) {
                posYmin = N.position.y
              }
            }
          })
        }

        let position = new go.Point(posXmin, posYmin)
        _node.position = position;
        if (cLinks) {
          cLinks.each(L => {
            set.add(L)
          })
        }
        set.each(N => {
          console.log(N.position)
        })
        this.layoutNodes(go.GraphObject.make, go, this.currLayout, set, position)
      }
    },
    addLink(link) {
      this.graphChanged = true;
      let _link = this.$refs.go.findLink(item => {
        return item && item.key && item.key === link.key;
      })
      // 如果链接有重复，不加链接
      if (!_link) {
        this.$refs.go.addLink(link)
      }
    },
    removeLink(linkData) {
      this.graphChanged = true;
      let linkNodes = this.getDiagram().findLinksByExample(linkData)
      if (linkNodes) {
        linkNodes.each(L => {
          // 如果没有其它链接，删掉节点
          if (L.toNode.linksConnected.count === 1) {
            this.$refs.go.removeLink(L.data)
            this.$refs.go.removeNode(L.toNode.data.key);
          } else {
            this.$refs.go.removeLink(L.data)
          }
        })
      }
    },
    removeNodeByBus(node, linkData, removeNode) {
      this.graphChanged = true;
      let model = this.getModel();
      if (removeNode) {
        let _nodeData = model.findNodeDataForKey(node.data.key);

        model.removeNodeData(_nodeData);
      }
      let _linkData = this.$refs.go.findLink(item => {
        return item && item.key && item.key === linkData.key
      })

      model.removeLinkData(_linkData)
    },
    addSingleNode(fromNode, toNodeData, type) {
      let _node, keyCode = '';
      if (toNodeData.type === 'person') {
        keyCode = toNodeData.sfzh || toNodeData.zjhm;
      } else if(toNodeData.type === 'tel') {
        keyCode = toNodeData.sjhm || '';
      }
      // 获得叶子节点
      _node = this.$refs.go.findNode(item => {
        return item && item.key && item.key === keyCode
      })
      // 新增连线
      let link = new SolidLink({
        key: fromNode.data.key + '_' + keyCode,
        from: fromNode.data.key,
        to: keyCode
      })
      // 处理记录在节点上的连线数据
      let linkNum = {};
      linkNum[fromNode.data.key] = 0; // 默认值是0
      if (type === 'relation') {
        // 根据关系数组的长度知道关系的数量
        linkNum[fromNode.data.key] = toNodeData.gxxq.length;
      }
      if (_node) {
        // 如果找到叶子节点，不添加，而是更新数据
        let updateData = {linkNum: Object.assign({}, _node.linkNum, linkNum)};
        this.addNodeByBus(_node, link, updateData);
      } else {
        // 如果找不到节点，添加节点
        let _nodeNew
        if (toNodeData.type === 'person') {
          _nodeNew = new PersonNode(Object.assign({}, toNodeData, {ywid: toNodeData.zjhm, linkNum: linkNum}))
        }
        this.addNodeByBus(_nodeNew, link);
      }
    },
    removeSingleNode(ywNode, data, type) {
      let _node, keyCode = '';
      if (data.type === 'person') {
        keyCode = data.sfzh || data.zjhm;
      } else {
        keyCode = data.sjhm || '';
      }
      _node = this.$refs.go.findNode(item => {
        return item && item.key && item.key === keyCode
      }, true)
      if (_node && ywNode) {
        let linkData,
          linkCount = 0;
        // 如果只有一个节点，则连结点一起删除
        _node.linksConnected.each(L => {
          console.log(L.fromNode.data)
          if (L.fromNode && L.fromNode.data.ywid === data.xxlyid) {
            linkData = L.data
          }
          linkCount++
        })
        this.removeNodeByBus(_node, linkData, linkCount === 1)
      }
    }
  }
}
