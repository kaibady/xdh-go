<template>
  <span class="xdh-go-snapshot">
    <slot :makeImage="makeImage" :makeImageData="makeImageData" :makeSvg="makeSvg">
      <span v-for="(item, idx) in layout.split(',')" :key="idx" class="btn">
        <el-button size="mini" type="primary" @click="makeImage()" v-if="item === 'image'">保存图片</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="makeImageData()"
          v-if="item === 'imageData'"
        >保存图片base64</el-button>
        <el-button size="mini" type="primary" @click="makeSvg()" v-if="item === 'svg'">保存svg</el-button>
      </span>
    </slot>
  </span>
</template>
<script>
/**
 * XdhGoSnapshot组件
 * @module xdh-go-snapshot
 * @description 提供快照功能
 */
import go from 'gojs'
export default {
  name: 'XdhGoSnapshot',
  components: {},
  /**
   * 参数属性
   * @property {String} [layout='image,imageData,svg'] 按钮布局
   * @property {Object} [diagarm] go.Diagram对象
   * @property {Object} [options={image:{}, imageData: {},svg: {}}] 快照配置
   */
  props: {
    layout: {
      type: String,
      default: 'image,imageData,svg'
    },
    diagram: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      imageDefaultOption: {
        scale: 1,
        size: new go.Size(100, 100),
        type: 'image/png'
      },
      svgDefaultOption: {
        scale: 1,
        size: new go.Size(100, 100)
      }
    }
  },
  computed: {},
  methods: {
    makeImage() {
      let bounds = this.diagram.documentBounds
      let size = new go.Size(bounds.width + 20, bounds.height + 20)
      let options = Object.assign(
        {},
        this.imageDefaultOption,
        {
          size: size
        },
        this.options.image || {}
      )
      let data = this.diagram.makeImage(options)
      this.$emit('on-snap', 'image', data)
    },
    makeImageData() {
      let bounds = this.diagram.documentBounds
      let size = new go.Size(bounds.width + 20, bounds.height + 20)
      let options = Object.assign(
        {},
        this.imageDefaultOption,
        {
          size: size
        },
        this.options.imageData || {}
      )
      let data = this.diagram.makeImageData(options)
      this.$emit('on-snap', 'imageData', data)
    },
    makeSvg() {
      let bounds = this.diagram.documentBounds
      let size = new go.Size(bounds.width + 20, bounds.height + 20)
      let options = Object.assign(
        {},
        this.svgDefaultOption,
        {
          size: size
        },
        this.options.svg || {}
      )
      let data = this.diagram.makeSvg(options)
      this.$emit('on-snap', 'svg', data)
    }
  },
  created() {}
}
</script>
<style type="text/scss" lang="scss" scoped>
</style>