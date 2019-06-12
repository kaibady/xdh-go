export default function(data) {
  let qxName,
    obj = null
  switch (data.type) {
    case '01': // 身份证号
      qxName = 'saveQxKyry'
      obj = {asjbh: this.caseId, sfzh: data.ywid}
      break
    case '03': // 手机号
      qxName = 'saveQxKysj'
      obj = {asjbh: this.caseId, sjh: data.ywid}
      break
  }
  this.$confirm('确定取消可疑吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    this[qxName](obj)
      .then(res => {
        this.getModel().setDataProperty(data, 'sfky', false)
        this.$message({
          type: 'success',
          message: '取消成功!'
        })
        this.removeLink({
          key: 'kydx_' + data.key,
          from: 'kydx',
          to: data.key,
          category: 'solid'
        })
      })
      .catch(err => {
        this.$message.error(err.msg)
      })
  })
}
