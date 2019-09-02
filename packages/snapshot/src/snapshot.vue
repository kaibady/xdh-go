<template>
  <span class="xdh-go__snapshot">
    <slot :makeImage="makeImage" :makeImageData="makeImageData" :makeSvg="makeSvg">
      <el-button size="mini" type="primary" @click="makeImage()">保存图片</el-button>
      <el-button size="mini" type="primary" @click="makeImageData()">保存图片字符串</el-button>
      <el-button size="mini" type="primary" @click="makeSvg()">保存svg</el-button>
    </slot>
  </span>
</template>
<script>
import go from 'gojs'
export default {
  name: 'XdhGoSnapshot',
  components: {},
  props: {
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
      let options = Object.assign({}, this.imageDefaultOption, {
        size: size
      })
      let data = this.diagram.makeImage(options)
      this.$emit('on-snap', 'image', data)
    },
    makeImageData() {
      let bounds = this.diagram.documentBounds
      let size = new go.Size(bounds.width + 20, bounds.height + 20)
      let options = Object.assign({}, this.imageDefaultOption, {
        size: size
      })
      let data = this.diagram.makeImageData(options)
      this.$emit('on-snap', 'imageData', data)
    },
    makeSvg() {
      let bounds = this.diagram.documentBounds
      let size = new go.Size(bounds.width + 20, bounds.height + 20)
      let options = Object.assign({}, this.svgDefaultOption, {
        size: size
      })
      let data = this.diagram.makeSvg(options)
      this.$emit('on-snap', 'svg', data)
    }
  },
  created() {}
}
</script>
<style type="text/scss" lang="scss" scoped>
</style>