<template>
  <el-slider v-bind="$attrs" v-on="$listeners" v-model="fieldValue"></el-slider>
</template>

<script>
  /**
   * 滑块
   * @module widgets/xdh-form/items/slider
   */
  export default {
    /**
     * 属性参数, 继承 <a href="/xdh-web-doc/#/element/slider">el-slider</a>
     * @member props
     */
    props: {
      value: {
        type: [Number, Array]
      }
    },
    computed: {
      fieldValue: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit('input', val)
        }
      }
    }
  }
</script>


