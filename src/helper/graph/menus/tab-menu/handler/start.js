import axios from '@/utils/axios'
import {POST_YP_SNAPSHOT} from '@/base/api/single-ypzp'
let graphStyle = `position: fixed;left:0;right:0;top:0;bottom:0;z-index:2;`

export default function(name, vm) {
  console.log(name);
  switch (name) {
    case '线索采录':
      vm.$router.push({
        path: `/clue-collection-add/${vm.caseId}_${new Date().getTime()}/01`
      })
      break;
    case '最大化':
      let el = document.getElementById('investGraph')
      vm.isFullscreen = !vm.isFullscreen
      el.style = vm.isFullscreen ? graphStyle : ''
      vm.$refs.tabMenu.startMenu[1].name = '还原';
      vm.$refs.tabMenu.startMenu[1].icon = 'iconfont icon-mid';
      break;
    case '还原':
      let el1 = document.getElementById('investGraph')
      vm.isFullscreen = !vm.isFullscreen
      el1.style = vm.isFullscreen ? graphStyle : ''
      vm.$refs.tabMenu.startMenu[1].name = '最大化';
      vm.$refs.tabMenu.startMenu[1].icon = 'iconfont icon-expand';
      break;
    case '保存':
      vm.setDiagramGray(false)
      vm.$refs.tabMenu.getLcmc().then(data => {
        let go = vm.$refs.go.go;
        let bounds = vm.$refs.go.diagram.documentBounds, scale = 0.3;
        let size = new go.Size((bounds.width + 500) * scale, (bounds.height + 500) * scale + 500);
        let imageData = vm.$refs.go.diagram.makeImageData({
          scale: scale,
          maxSize: size,
          type: 'image/jpg',
          background: 'rgba(35,49,63,1)'
        })
        let kz = {}, kzStr = '', formData = new FormData();
        kz.nodes = vm.$refs.go.diagram.model.nodeDataArray;
        kz.links = vm.$refs.go.diagram.model.linkDataArray;
        kz.layout = vm.currLayout;
        kz.viewport = vm.viewportCache;
        kzStr = JSON.stringify(kz);
        formData.append('asjbh', vm.caseId);
        formData.append('kz', kzStr);
        formData.append('lcmc', data.lcmc);
        formData.append('tp', imageData)
        axios({
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          url: POST_YP_SNAPSHOT,
          data: formData,
          method: 'post'
        }).then(res => {
          vm.$message({
            type: 'success',
            message: '快照保存成功'
          });
        })

      })
      break;
    case '历史快照':
      vm.determineDialogVisible = true
      break;
    case '刷新':
      // 刷新导图
      vm.loadGraph()
      break;
  }
}
