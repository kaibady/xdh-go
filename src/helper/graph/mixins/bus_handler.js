/**
 * 使用bus监听其它页面发送的消息
 */
import bus from '@/utils/bus'

export default {
  methods: {
    addNodeBus(dataObj) {
      console.log('add-node', dataObj)
      let ywid, type, info;
      info = !(dataObj instanceof Array) ? dataObj : dataObj[0];
      ywid = info.xxlyid || info.fxtjid;
      type = info.tacticsType;
      // 获得出发节点,以添加从出发节点到新节点的link
      let parentNode = this.$refs.go.findNode(item => item && item.ywid && item.ywid === ywid, true)
      if (!(dataObj instanceof Array)) {
        this.addSingleNode(parentNode, dataObj, type)
      } else {
        dataObj.forEach(data => {
          this.addSingleNode(parentNode, data, type)
        })
      }
    },
    removeNodeBus(dataObj) {
      console.log('remove-node', dataObj)
      let ywid, type, info;
      info = !(dataObj instanceof Array) ? dataObj : dataObj[0];
      ywid = info.xxlyid || info.fxtjid;
      type = info.tacticsType;
      // 获得出发节点,以删除从出发节点到所删节点的link
      let parentNode = this.$refs.go.findNode(item => item && item.ywid && item.ywid === ywid, true)
      if (!(dataObj instanceof Array) || dataObj.length === 0) {
        this.removeSingleNode(parentNode, dataObj, type)
      } else {
        dataObj.forEach(data => {
          this.removeSingleNode(parentNode, data, type)
        })
      }
    },
    investHighriskBus(data) {
      console.log('invest-highrish', data)
      // 重新加载脑图，获取结果集
      this.loadGraph().then(() => {
        let model = this.getModel();
        let nodeData = this.$refs.go.findNode(item => item.ywid === data.gwfxid)
        // this.getModel().setDataProperty(nodeData, 'visible', true)
        model.setDataProperty(nodeData, 'newAdded', true)
        this.searchNode(data.gwfxid, 'ywid', false)
        // 暂时变回原始的高危分析获取结果弹窗获取高危分析参数
        this.highRiskListVisible = true
        this.highRiskListLoading = true
        this.getResultData('gwfx', data.gwfxid).then(res => {
          this.moreProps.highParams = res
          this.highRiskList = data
          this.highRiskListLoading = false
        })
      })
    },
    investImpactBus(data) {
      console.log('invest-impact', data)
      // 重新加载脑图，获取结果集
      this.loadGraph().then(() => {
        this.getResultData('ddpz',
          {ddpzid: data.resultId},
          {
            ddpzid: data.resultId,
            type: data.caseId ? 0 : 1
          }
        ).then(res => {
        })
      })
    },
    investVideoBus(data) {
      console.log('invest-video', data)
      // 重新加载脑图，获取结果集
      this.loadGraph().then(() => {
        this.moreLoading = true
        this.getResultData('spzc', data.lxxrid).then(res => {
          // 结果接口还没出
          this.moreProps.type = 'video'
          this.moreProps.videoParams = res
          this.moreProps.videoData = data.data

          this.moreIndex = 0
          this.slideCollapsed = false
          this.moreLoading = false
        })
      })
    },
    // 获取各种结果接口请求
    async getResultData(type, params1, params2) {
      let getResultFunMap = {
        'ddpz': 'getDdpzAj', // 多点碰撞
        'gwfx': 'getGwfxjg', // 关系分析
        'cb': 'getZncb', // 案件串并
        'zkbd': 'fetchEvidenceResultEcho', // 阵控比对
        'spzc': 'getLxxrtj', // 视频侦查
        'gxfx': 'getRelationRygx' // 关系分析
      }
      let result;
      try {
        let param = type === 'spzc' ? {id: params1} : params1;
        let res = await this[getResultFunMap[type]](param);
        if (type === 'ddpz') {
          this.moreProps.impactCases = res
          result = await this['getDdpzjg'](params2);
        } else if(type === 'zkbd') {
          result = res.list;
        } else {
          result = res;
        }
        return result;
      } catch (err) {
        this.$message.error(err.msg)
        throw err;
      }
    },
    bindBus() {
      bus.$off('add-node')
      bus.$off('remove-node')
      // 高危分析，接收查询结果ID和查询结果，进行请求获取查询参数
      bus.$off('invest-highrisk')
      bus.$on('add-node', this.addNodeBus)
      bus.$on('remove-node', this.removeNodeBus)
      // 高危分析，接收查询结果ID和查询结果，进行请求获取查询参数
      bus.$on('invest-highrisk', this.investHighriskBus)
      // 多点碰撞，保持原来打开新标签，回来页面使用activated
      // bus.$on('invest-impact', this.investImpactBus)
      // 视频侦查，保持原来打开新标签，回来页面使用activated
      // bus.$on('invest-video', this.investVideoBus)
    },
    unBindBus() {
      bus.$off('add-node', this.addNodeBus)
      bus.$off('remove-node', this.removeNodeBus)
      // 高危分析，接收查询结果ID和查询结果，进行请求获取查询参数
      bus.$off('invest-highrisk', this.investHighriskBus)
      // bus.$off('invest-impact', this.investImpactBus)
      // bus.$off('invest-video', this.investVideoBus)
    }
  },
  mounted() {
    this.bindBus()
  },
  beforeDestroy() {
    this.unBindBus();
  }
}
