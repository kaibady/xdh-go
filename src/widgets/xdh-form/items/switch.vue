<template>
  <el-switch v-bind="$attrs" v-on="$listeners" v-model="fieldValue"></el-switch>
</template>

<script>
  /**
   * 开关
   * @module widgets/xdh-form/items/switch
   */
  export default {
    /**
     * 属性参数, 继承 <a href="/xdh-web-doc/#/element/switch">el-switch</a>
     * @member props
     */
    props: {
      value: {
        type: Boolean
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
