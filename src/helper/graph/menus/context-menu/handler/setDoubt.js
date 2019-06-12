export default function(data) {
  let kyName
  switch (data.type) {
    case '01': // 身份证号
      kyName = 'getModelKyry'
      this.confirmType = 'person'
      break
    case '03': // 手机号
      kyName = 'getModelKysj'
      this.confirmType = 'phone'
      break
  }
  this.loading = true
  this[kyName](this.caseId, data.ywid)
    .then(res => {
      console.log(res)
      this.confirmDialogVisible = true
      this.confirmData = res
      this.currConfirmData = data
      this.loading = false
    })
    .catch(err => {
      this.$message.error(err.msg)
    })
}
