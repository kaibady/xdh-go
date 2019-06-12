export default function(data) {
  let qxGzObj = null
  switch (data.type) {
    case '01': // 身份证号
      qxGzObj = {
        gzlx: '02',
        gzxxbh: data.ywid
      }
      break
    case '02': // 案件编号
      qxGzObj = {
        gzlx: '01',
        gzxxbh: data.ywid
      }
      break
  }

  this.cancelWdgz(qxGzObj)
    .then(res => {
      this.$message.success('已取消关注！')
      this.getModel().setDataProperty(data, 'sfgz', false)
    })
    .catch(err => {
      this.$message.error(err.msg)
    })
}
