<template>
  <component :is="component" v-on="$listeners" v-bind="bindProps" v-model="fieldValue"></component>
</template>

<script>
  /**
   * 时间输入框
   * @module widgets/xdh-form/items/time
   */
  export default {
    /**
     * 属性参数  继承 <a href="/xdh-web-doc/#/element/time-picker">el-time-picker</a>
     * @member props
     * @property {*} [value] 回填值
     * @property {string} [format] 时间格式化(TimePicker)
     * @property {boolean} [picker] 是否picker模式
     * @property {string} [start] 开始值 for time-select
     * @property {string} [end] 结束值 for time-select
     * @property {string} [step]  间隔时间 for time-select
     * @property {string} [minTime]  最小时间，小于该时间的时间段将被禁用 for time-select
     * @property {string} [maxTime]  最大时间，大于该时间的时间段将被禁用 for time-select
     * @property {Object|Array} [selectableRange] for time-picker 可选时间段，例如'18:30:00 - 20:30:00'或者传入数组['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']
     */
    props: {
      value: {
        type: [String, Date, Array]
      },
      // 是否picker模式
      picker: Boolean,
      // for time-select
      start: String,
      // for time-select
      end: String,
      // for time-select
      step: String,
      // for time-select
      minTime: String,
      // for time-select
      maxTime: String,
      // for time-picker
      selectableRange: [String, Array]
    },
    computed: {
      fieldValue: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit('input', val)
        }
      },
      component() {
        return this.picker ? 'el-time-picker' : 'el-time-select'
      },
      bindProps() {
        const picker = {
          start: this.start,
          end: this.end,
          step: this.step,
          minTime: this.minTime,
          maxTime: this.maxTime,
          selectableRange: this.selectableRange,
          format: this.$attrs.format
        }
        const pickerOptions = {}
        Object.keys(picker).forEach(n => {
          if (picker[n]) {
            pickerOptions[n] = picker[n]
          }
        })
        return {
          pickerOptions: pickerOptions,
          ...this.$attrs
        }
      }
    }
  }
</script>
