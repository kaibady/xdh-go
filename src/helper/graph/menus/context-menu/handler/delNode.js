export default function (data) {
  const type = data.type
  // 战法结果集的删除
  if (['06', '07', '08', '09', '13', '14', '15'].includes(type)) {
    this.$confirm('您确定要删除该战法吗？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        let url = null;
        let delCode = data.ywid;
        if (['13', '14'].includes(type)) {
          // 13智能串并，14人工串并
          url = 'deleteCbxx'
        } else if (type === '06') {
          // 多点碰撞
          url = 'deleteDdpz'
        } else if (type === '07') {
          // 阵控比对
          url = 'deleteZkxx'
        } else if (type === '08') {
          // 路线寻人
          url = 'deleteLxxrtj'
        } else if (type === '09') {
          // 高危分析
          url = 'deleteGwfx'
        } else if (type === '15') {
          // 关系分析
          url = 'deleteRelationResult'
        }
        this[url](delCode)
          .then(res => {
            this.slideCollapsed = true
            this.$message.success('删除成功！')
            this.loadGraph()
          })
          .catch(err => {
            this.$message.error(err.msg)
          })
      })
      .catch(err => {
        this.$message.error(err.msg)
      })
  } else if (['01', '03', '04', '05', '16'].includes(type)) {
    // 人、手机、车、标识号的删除，案件暂不做删除
    this.$confirm('该操作会引起关联的结果集发生变化，您确定要删除该节点吗？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        let url = null, params = null;
        if (type === '01') {
          url = 'deleteRysj'
          params = {asjbh: this.caseId, zjhm: data.ywid}
        } else if (type === '03') {
          url = 'deleteSjsj'
          params = {asjbh: this.caseId, sjh: data.ywid}
        } else if (type === '04') {
          url = 'deleteClsj'
          params = {asjbh: this.caseId, cphm: data.ywid}
        } else if (type === '05') {
          url = 'deleteBshsj'
          params = {asjbh: this.caseId, bsh: data.ywid}
        } else if (type === '16') {
          url = 'deleteYysj'
          params = {asjbh: this.caseId, zjhm: data.parentCode}
        }
        this[url](params)
          .then(res => {
            this.slideCollapsed = true
            this.$message.success('删除成功！')
            this.loadGraph()
          })
          .catch(err => {
            this.$message.error(err.msg)
          })
      })
      .catch(err => {
        this.$message.error(err.msg)
      })
  }
}
