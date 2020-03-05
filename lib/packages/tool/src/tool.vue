<template>
  <!--开发工具条-->
  <div :class="['xdh-go-tool',{collapsed: collapsed}]" v-draggable="dragOption">
    <div class="expand">
      <i class="iconfont icon-expand btn" @click.prevent="collapsed=!collapsed"></i>
    </div>
    <div :class="'xdh-go-tool__handle'">
      <span class="title">
        gojs开发工具条
        <i class="iconfont icon-mid btn" @click.prevent="collapsed=!collapsed"></i>
      </span>
    </div>
    <div class="xdh-go-tool__container">
      <el-tooltip effect="dark" content="清空画布" placement="top-start">
        <el-button size="mini" type="primary" @click="clear()" circle icon="iconfont icon-delete"></el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="草稿箱" placement="top-start">
        <el-button size="mini" type="primary" @click="draft()" circle icon="iconfont icon-paste"></el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="查看图数据" placement="top-start">
        <el-button
          size="mini"
          type="primary"
          @click="viewDiagram()"
          circle
          icon="iconfont icon-collaboration"
        ></el-button>
      </el-tooltip>
    </div>
    <xdh-go-draft :visible.sync="draftShow" :diagram-name="diagramName" ref="draft"></xdh-go-draft>
    <xdh-go-viewer :visible.sync="viewerShow" v-if="viewerShow" :diagram-name="diagramName" ref="viewer"></xdh-go-viewer>
  </div>
</template>
<script>
/**
 * XdhGoTool组件
 * @module xdh-go-tool
 * @description 工具条组件
 */
import draggable from '../../../utils/directives/draggable'
import XdhGoDraft from '../../draft'
import XdhGoViewer from '../../viewer'
import diagramManager from '../../../utils/dataManager/diagramManager'
export default {
  name: 'XdhGoTool',
  components: {
    XdhGoDraft,
    XdhGoViewer
  },
  directives: {
    draggable
  },
  /**
   * 参数属性
     * @property {String} [diagramName='dig'] go.Diagram对象名称

   */
  props: {
    diagramName: {
      type: String,
      default: 'dig'
    }
  },
  data() {
    return {
      collapsed: false,
      draftShow: false,
      viewerShow: false,
      dragOption: {
        handle: '.xdh-go-tool__handle'
      }
    }
  },
  computed: {},
  methods: {
    clear() {
      diagramManager[this.diagramName].clear()
    },
    draft() {
      this.draftShow = !this.draftShow
    },
    viewDiagram() {
      this.viewerShow = !this.viewerShow
      console.log(diagramManager[this.diagramName].model.toJson())
    }
  },
  created() {},
  mounted() {
    document.body.appendChild(this.$el)
  },
  beforeDestroy() {
    this.$refs.draft.destroy()
    this.$refs.viewer.destroy()
    this.$el.parentNode.removeChild(this.$el)
  }
}
</script>
<style type="text/scss" lang="scss" scoped>
</style>