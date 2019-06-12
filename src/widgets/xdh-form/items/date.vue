<template>
  <el-date-picker v-bind="$attrs" v-on="$listeners" v-model="fieldValue"></el-date-picker>
</template>

<script>
  /**
   * 日期选择器
   * @module widgets/xdh-form/items/date
   */

  export default {
    /**
     * 属性参数, 继承 <a href="/xdh-web-doc/#/element/date-picker">el-date-picker</a>
     * @member props
     */
    props: {
      value: {
        type: [String, Array, Date]
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

