<template>
  <div class="xdh-form-range">
    <component :is="component"
               v-bind="$attrs"
               class="xdh-form-range__min"
               :style="inputStyle"
               v-model="min"
               :placeholder="minPlaceholder"
               :pickerOptions="minPickerOptions"></component>
    <span class="xdh-form-range__separator"
          :style="separatorStyle">{{separator}}</span>
    <component
      :is="component"
      v-bind="$attrs"
      class="xdh-form-range__max"
      :style="inputStyle"
      v-model="max"
      :placeholder="maxPlaceholder"
      :pickerOptions="maxPickerOptions"></component>
  </div>
</template>

<script>
  /**
   * 范围输入框, 支持文本、数字、日期、时间输入
   * @module widgets/xdh-form/items/range
   */
  const components = {
    number: 'el-input-number',
    text: 'el-input',
    date: 'el-date-picker',
    time: 'el-time-select',
    timePicker: 'el-time-picker'
  }
  export default {
    /**
     * 属性参数
     * @member props
     * @property {Array} [value] 回填数据， [最小值，最大值]
     * @property {string} [dataType=text] 数据类型，根据类型显示不同的输入框，支持'number', 'date', 'time', 'text', 'timePicker'
     * @property {string} [minPlaceholder] 最小值占位文本
     * @property {string} [maxPlaceholder] 最大值占位文本
     * @property {string} [separator] 分隔文本
     * @property {number|string} [separatorWidth] 分隔宽度
     */
    props: {
      value: {
        type: Array,
        default() {
          return []
        }
      },
      dataType: {
        type: String,
        default: 'text',
        validator(val) {
          return ['number', 'date', 'time', 'text', 'timePicker'].includes(val)
        }
      },
      minPlaceholder: {
        type: String,
        default: '最小值'
      },
      maxPlaceholder: {
        type: String,
        default: '最大值'
      },
      separator: {
        type: String,
        default: '-'
      },
      separatorWidth: {
        type: [Number, String],
        default: 12
      }
    },
    data() {
      return {
        min: this.value[0],
        max: this.value[1]
      }
    },
    watch: {
      min(val) {
        this.$emit('input', [val, this.max])
      },
      max(val) {
        this.$emit('input', [this.min, val])
      },
      value(val) {
        this.min = val[0]
        this.max = val[1]
      }
    },
    computed: {
      component() {
        return components[this.dataType]
      },
      separatorStyle() {
        return {
          width: `${parseInt(this.separatorWidth)}px`
        }
      },
      inputStyle() {
        return {
          width: `calc(50% - ${parseInt(this.separatorWidth) / 2}px)`
        }
      },
      minPickerOptions() {
        // 如何有定义，按定义有限
        if (this.$attrs.pickerOptions && this.$attrs.pickerOptions.disabledDate) {
          return this.$attrs.pickerOptions
        }
        return {
          ...this.$attrs.pickerOptions,
          disabledDate: date => {
            if (!this.max) return false
            return Date.parse(this.max) < date.getTime()
          }
        }
      },
      maxPickerOptions() {
        // 如何有定义，按定义有限
        if (this.$attrs.pickerOptions && this.$attrs.pickerOptions.disabledDate) {
          return this.$attrs.pickerOptions
        }
        return {
          ...this.$attrs.pickerOptions,
          disabledDate: date => {
            if (!this.min) return false
            return Date.parse(this.min) > date.getTime()
          }
        }
      }
    }
  }
</script>
