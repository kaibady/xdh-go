/**
 * 对话框关闭或成功的回调事件
 */
export default {
  methods: {
    // 关系分析，接收查询结果ID和查询结果，将首次结果包展示
    handleSubmitRelation(data) {
      this.relationClose = true
      this.loadGraph().then(res => {
        data.ryfxDatas[0].relDatas.forEach(n => {
          if (n.mxDatas.length > 0) {
            let node = this.$refs.go.findNode(item => {
              return item.ywid === n.fxtjid
            })
            this.getModel().setDataProperty(node, 'visible', true)
            this.searchNode(n.fxtjid, 'ywid')
          }
        })
      })
    },
    handleSaveConfirm(data) {
      this.confirmLoading = true
      // const index = parseInt(data.xh) - 1
      const model = {...data, xsid: this.id, bzxxid: data.ajid}
      if (this.confirmType === 'person') {
        this.saveKyry(model)
          .then(res => {
            this.confirmDialogVisible = false
            this.getModel().setDataProperty(
              this.currConfirmData,
              'sfky',
              true
            )
            this.addLink({
              key: 'kydx_' + this.currConfirmData.key,
              from: 'kydx',
              to: this.currConfirmData.key,
              category: 'solid'
            })
            this.searchNode(this.currConfirmData.key, 'key')
            this.confirmLoading = false
            this.$message.success('保存成功！')
          })
          .catch(err => {
            this.confirmLoading = false
            this.$message.error(err.msg)
          })
      }
    },
    /**
     * 关掉 智能串并的弹窗，更新导图
     */
    handleCloseSameDialog() {
      this.loadGraph()
    }
  }
}
