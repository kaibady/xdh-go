export default function(data) {
  let gzObj = null
  switch (data.type) {
    case '01': // 身份证号
      gzObj = {
        gzlx: '02',
        gzxxbh: data.ywid
      }
      break
    case '02': // 案件编号
      gzObj = {
        gzlx: '01',
        gzxxbh: data.ywid
      }
      break
  }

  this.postWdgz(gzObj)
    .then(res => {
      this.$message.success('已关注！')
      this.getModel().setDataProperty(data, 'sfgz', true)
    })
    .catch(err => {
      this.$message.error(err.msg)
    })
}
