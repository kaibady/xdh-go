<template>
  <el-rate v-bind="$attrs" v-on="$listeners" v-model="fieldValue"></el-rate>
</template>

<script>
  /**
   * 评分
   * @module widgets/xdh-form/items/rate
   */
  export default {
    /**
     * 属性参数, 继承 <a href="/xdh-web-doc/#/element/rate">el-rate</a>
     * @member props
     */
    props: {
      value: {
        type: Number
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


