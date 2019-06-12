/**
 * 圆形菜单的点击事件方法
 */
// 点击事件方法
import {setDoubt, cancelDoubt, focus, cancelFocus, getOwnTel, delNode} from '@/helper/graph/menus/context-menu/handler'
// 接口
import singleIndex from '@/base/mixin/single-index'
import singleGraph from '@/base/mixin/single-graph'
import singleHighRisk from '@/base/mixin/single-high-risk'
import SingleImpactModel from '@/base/mixin/single-impact-model'
import SingleModelController from '@/base/mixin/single-model-controller'
import SingleModelInfo from '@/base/mixin/single-model-info'
import SingleModelResult from '@/base/mixin/single-model-result'
import SingleEvidence from '@/base/mixin/single-evidence'
// 圆形菜单方法
import {beforeShowMenu, showContextMenu} from '@/helper/graph/menus/context-menu'
export default {
  mixins: [
    singleIndex,
    singleGraph,
    singleHighRisk,
    SingleImpactModel,
    SingleModelController,
    SingleModelInfo,
    SingleModelResult,
    SingleEvidence
  ],
  methods: {
    cr_beforeShowMenu: beforeShowMenu,
    cr_showContextMenu: showContextMenu,
    // 列为可疑
    cr_setDoubt: setDoubt,
    // 取消可疑
    cr_cancelDoubt: cancelDoubt,
    // 关注
    cr_focus: focus,
    // 取消关注
    cr_cancelFocus: cancelFocus,
    // 拥有手机
    cr_getOwnTel: getOwnTel,
    // 删除节点
    cr_delNode: delNode,
    cr_circleMenuClick(event, val) {
      this.$refs.circleMenu.hide()
      const data = this.getLastSelection()
      // console.log(data)
      // console.log(val.tag)
      switch (val.tag) {
        // 删除节点
        case 'sc':
          this.cr_delNode(data);
          break;
        // 高危分析
        case 'gwfx':
          this.highRiskVisible = true;
          break;
        // 多点碰撞
        case 'ddpz':
          this.$router.push(`/impact-model/${this.caseId}`)
          break
        // 路线寻人
        case 'lxxr':
          this.$router.push(`/video-model?ajbh=${this.caseId}`)
          break
        // 人工串并
        case 'rgcb':
          this.$router.push(`/feature-join/${this.caseId}`)
          break
        // 智能串并
        case 'zncb':
          this.sameCaseId = this.caseId
          this.sameDialogVisible = true
          break
        // 列为可疑
        case 'lwky':
          this.cr_setDoubt(data)
          break
        // 取消可疑
        case 'qxky':
          this.cr_cancelDoubt(data)
          break
        // 关注
        case 'gz':
          this.cr_focus(data)
          break
        // 取消关注
        case 'qxgz':
          this.cr_cancelFocus(data)
          break
        // 案件档案
        case 'ajda':
          window.open(`/single/#/invest/archive/${data.ywid || this.caseId}/case-overview`, '_blank', 'menubar=no,toolbar=no,status=no,scrollbars=yes,location=no').resizeTo(window.screen.width, window.screen.height)
          break
        // 人员档案
        case 'ryda':
          window.open(`http://53.1.238.21/bap/bip/archive/ren/${data.ywid}?appId=WJZZ`, '_blank', 'menubar=no,toolbar=no,status=no,scrollbars=yes,location=no').resizeTo(window.screen.width, window.screen.height).resizeTo(window.screen.width, window.screen.height)
          break
        // 研判
        case 'yp':
          window.open(`/archive/#/archive-view/${data.ywid}`, '_blank', 'menubar=no,toolbar=no,status=no,scrollbars=yes,location=no').resizeTo(window.screen.width, window.screen.height)
          break
        // 云搜索
        case 'yss':
          window.open('http://53.1.238.21/bap/home/intf?appId=WJZZ', '_blank', 'menubar=no,toolbar=no,status=no,scrollbars=yes,location=no').resizeTo(window.screen.width, window.screen.height)
          break
        // 关系分析
        case 'gxfx':
          this.relationClose = false
          this.relationId = [data.ywid]
          break
        // 共同关系
        case 'gtgx':
          break
        // 展开
        case 'zk':
          this.getLastSelection(true).expandTree(1)
          break
        // 收缩
        case 'ss':
          this.getLastSelection(true).collapseTree(1)
          break
        // 拥有手机
        case 'yysj':
          this.cr_getOwnTel(data)
          break;
        default:
          this.$message({type: 'info', message: `点击了${val.text}`})
          break
      }
    }
  }
}
