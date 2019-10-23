<template>
  <div class="xdh-go-tooltip">
    <slot :text="text">
      <div class="tooltip-text">
         {{text}}
      </div>
    </slot>
  </div>
</template>
<script>
/**
 * XdhGoTooltip组件
 * @module xdh-go-tooltiip
 * @description tooltip组件
 */
/**
 * 插槽
 * @member slots
 * @property {String} [default] 默认插槽,slot-scope =
 * @property {String} [default.text] 提示文字
 */
export default {
  name: 'XdhGoTooltip',
  components: {},
    /**
   * 参数属性
   * @property {String} [text='提示'] 提示信息
   */
  props: {
    text: {
      type: String,
      default: '提示'
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
  },
  created() {},
  beforeDestroy() {
    this.$el.parentNode.removeChild(this.$el)
  }
}
</script>
<style type="text/scss" lang="scss" scoped>

</style>