/**
 * node 上的鼠标等事件
 */
export default {
  methods: {
    nodeShowPort(node, show) {
      let diagram = node.diagram;
      if (!diagram || diagram.isReadOnly || !diagram.allowLink) {
        return;
      }
      if (node.ports.count !== 0) {
        node.ports.each(port => {
          if (port.portId === 'linkPort') {
            port.stroke = show ? 'red' : null;
          }
        })
      }
    },
    ev_nodeMouseDragEnter(e, node) {
      this.nodeShowPort(node, true)
    },
    ev_nodeMouseEnter(e, node) {
      this.getDiagram().clearHighlighteds()
      this.highlightNode(node)
      this.nodeShowPort(node, true)
    },
    ev_nodeMouseHold(e, node) {
      console.log('hold')
    },
    ev_nodeMouseLeave(e, node) {
      node.diagram.clearHighlighteds()
      this.nodeShowPort(node, false)
    },
    ev_nodeMouseDbClick(e, node) {
      let connectNodes = node.findNodesConnected()
      let links = node.findLinksConnected();
      links.each(N => {
        N.isSelected = true;
      })
      connectNodes.each(N => {
        N.isSelected = N.data.category !== 'mainCase';
      })
      this.tb_toggleDisabledItems()
    },
    nodeClickSelect(e, node) {
      let model = node.diagram.model;
      let goOnLoadData = false;
      if (e.control || model.modelData.selectMode === 'multi') {
        node.diagram.clearHighlighteds()
      } else {
        this.setDiagramGray()
        node.diagram.clearSelection();
        this.setFrontNode(node.data.key)
        goOnLoadData = true;
      }
      this.tb_toggleDisabledItems()
      return goOnLoadData;
    },
    ev_nodeMouseClick(e, node, type) {
      console.log(e, node.data, type)
      let data = node.data;
      let goingLoad = this.nodeClickSelect(e, node)
      if (!goingLoad) {
        return;
      }
      const getEntityModel = (url) => {
        this.moreLoading = true
        return new Promise(resolve => {
          this[url](data.ywid).then(res => {
            resolve(res)
            this.moreIndex = 0
            this.slideCollapsed = false
            this.moreLoading = false
          }).catch(err => {
            this.moreLoading = false
            this.$message.error(err.msg)
          })
        })
      }
      switch (type) {
        case 'person':
          getEntityModel('getRydaJyxx').then(res => {
            this.moreProps.type = 'entity'
            this.moreProps.entityType = 'identity'
            this.moreProps.entityData = res
          })
          break
        case 'tel':
          getEntityModel('getSjclsjxx').then(res => {
            this.moreProps.type = 'entity'
            this.moreProps.entityType = 'phone'
            this.moreProps.entityData = res && res[0]
          })
          break
        case 'case':
          getEntityModel('getAsjxx').then(res => {
            this.moreProps.type = 'entity'
            this.moreProps.entityType = 'case'
            this.moreProps.entityData = res
          })
          break
        case 'car':
          this.moreLoading = true
          this.getSjclClxx({asjbh: this.caseId, hphm: data.ywid})
            .then(res => {
              this.moreProps.type = 'entity'
              this.moreProps.entityType = 'car'
              this.moreProps.entityData = res
              this.moreIndex = 0
              this.slideCollapsed = false
              this.moreLoading = false
            })
            .catch(err => {
              this.moreLoading = false
              this.$message.error(err.msg)
            })
          break;
        case 'goods':
          getEntityModel('getJyssxq').then(res => {
            this.moreProps.type = 'entity'
            this.moreProps.entityType = 'valuables'
            this.moreProps.entityData = res
          })
          break;
        case 'oper':
          if (data.type === '06') {
            // 碰撞id
            this.moreLoading = true
            this.getResultData(
              'ddpz',
              {ddpzid: data.ywid},
              {ddpzid: data.ywid, type: 1}
            ).then(res => {
              this.moreProps.type = 'impact'
              this.moreProps.impactId = data.ywid
              this.moreProps.impactData = res

              this.moreIndex = 0
              this.slideCollapsed = false
              this.moreLoading = false
            })
          } else if (data.type === '07') {
            // 阵控比对id
            // this.moreLoading = true
            // this.getResultData('zkbd', data.ywid).then(res => {
            // })
          } else if (data.type === '08') {
            // 路线寻人id
            this.moreLoading = true
            this.getResultData('spzc', data.ywid).then(res => {
              this.moreProps.type = 'video'
              this.moreProps.videoParams = res
              this.moreProps.videoData = [] // 接口暂时没对上结果集的数据

              this.moreIndex = 0
              this.slideCollapsed = false
              this.moreLoading = false
            })
          } else if (data.type === '09') {
            // 高危分析id
            this.moreLoading = true
            this.getResultData('gwfx', data.ywid).then(res => {
              this.moreProps.type = 'high'
              this.moreProps.highId = data.ywid
              this.moreProps.highParams = res
              this.moreProps.highData = res.gwfxRyModel.map((n, i) =>
                Object.assign({}, n, {xh: i + 1, sfzh: n.zjhm})
              ) || []

              this.moreIndex = 0
              this.slideCollapsed = false
              this.moreLoading = false
            })
          } else if (data.type === '10') {
            // 技术比对id，未做
          } else if (data.type === '11') {
            // 物品追踪（金银首饰），未做
          } else if (['12', '13', '14'].includes(data.type)) {
            // 串并案
            this.moreLoading = true
            this.getResultData('cb', {cbbh: data.ywid, asjbh: this.caseId}).then(res => {
              this.moreProps.type = 'cb'
              this.moreProps.cardInfo = res
              this.moreProps.cardData = res.ajList
              this.moreIndex = 0
              this.slideCollapsed = false
              this.moreLoading = false
            })
          } else if (data.type === '15') {
            this.moreLoading = true
            this.getModel().setDataProperty(data, 'loading', true)
            this.getResultData('gxfx', data.ywid).then(res => {
              this.getModel().setDataProperty(data, 'loading', false)
              this.moreProps.type = 'relation'
              this.moreProps.relationId = res.relData.fxtjid
              this.moreProps.relationParams = res
              this.moreProps.relationData = res.relData.mxDatas || []
              this.moreIndex = 0
              this.slideCollapsed = false
              this.moreLoading = false
            })
          }
          break;
      }
    }
  }
}
