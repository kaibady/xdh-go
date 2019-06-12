function getTacticsSelection(vm) {
  let selections = vm.$refs.go.diagram.selection;
  let dataArr = [];
  selections.each(N => {
    // 把线排除掉
    if (!['custom', 'solid', 'dashed'].includes(N.data.category)) {
      if (N.data.category === 'oper') {
        let children = N.findTreeChildrenNodes();
        children.each(N1 => {
          dataArr.push(N1.data)
        })
      } else {
        dataArr.push(N.data)
      }
    }
  });
  return dataArr
}

export default function (name, vm) {
  // console.log(vm);
  let dataArr = getTacticsSelection(vm)
  console.log(name);
  console.log(dataArr);
  // vm.$message({type: 'success', message: `${name}  ${dataArr.map(r => r.key).join(',')}`})
  switch (name) {
    case '智能串并':
      vm.sameCaseId = vm.caseId
      vm.sameDialogVisible = true
      break;
    case '人工串并':
      vm.$router.push(`/feature-join/${dataArr[0].ywid}`)
      break;
    case '多点碰撞':
      vm.dialogVisible = true
      // 发起碰撞需要加入当前案件
      const cases = dataArr.map(n => n.ywid)
      const params = {asjbhs: cases.join(',')}
      vm.getPzaj(params).then(res => {
        vm.impactData = res
      }).catch(err => {
        vm.$message.error(err.msg)
      })
      break;
    case '物品追查':
      break;
    case '视频侦查':
      let ajbh = dataArr.map(r => r.ywid).join(',')
      vm.$router.push(`/video-model?ajbh=${ajbh}`)
      break;
    case '高危分析':
      vm.highRiskVisible = true;
      break;
    case '技术比对':
      break;
    case '话单调取':
      break;
  }
}
