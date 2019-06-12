<template>
  <el-input v-bind="$attrs" v-on="$listeners" v-model="fieldValue"></el-input>
</template>

<script>
  /**
   * 输入框
   * @module widgets/xdh-form/items/input
   */
  export default {
    /**
     * 属性参数, 继承 <a href="/xdh-web-doc/#/element/input">el-input</a>
     * @member props
     */
    props: {
      value: {
        type: String
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


