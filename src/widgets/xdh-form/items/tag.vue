<template>
  <div class="xdh-form-tag">
    <el-tag v-for="(item,index) in fieldValue"
            :key="index"
            :type="theme"
            :closable="closable"
            @close="handleClose"
            @click.native="handleClick(item)"
            :disable-transitions="false">{{item}}
    </el-tag>
    <el-input v-if="inputVisible"
              ref="saveTagInput"
              class="xdh-form-tag__input"
              size="small"
              @keyup.enter.native.stop="handleInputConfirm"
              @blur="handleInputConfirm"
              v-model="inputValue"></el-input>
    <el-button v-else
               class="xdh-form-tag__new"
               size="small"
               plain
               icon="el-icon-plus"
               :type="theme"
               @click="showInput">{{addText}}
    </el-button>
  </div>
</template>

<script>
  /**
   * 标签
   * @module widgets/xdh-form/items/tag
   */
  export default {
    /**
     * 属性参数
     * @member props
     * @property {string[]} [value] 输入框值，支持双向绑定
     * @property {string} [theme] 主题，可选'success', 'info', 'warning', 'danger'
     * @property {boolean} [closable=true] 是否允许删除
     * @property {string} [addText='添加'] 新增按钮文本
     */
    props: {
      value: {
        type: Array,
        default() {
          return []
        }
      },
      theme: {
        type: String,
        default: '',
        validator(val) {
          return ['success', 'info', 'warning', 'danger', ''].includes(val)
        }
      },
      closable: {
        type: Boolean,
        default: true
      },
      addText: {
        type: String,
        default: '添加'
      }
    },
    data() {
      return {
        inputValue: '',
        inputVisible: false
      }
    },
    computed: {
      fieldValue: {
        get() {
          return this.value || []
        },
        set(val) {
          this.$emit('input', val)
        }
      }
    },
    methods: {
      handleClick(tag) {
        this.$emit('click', tag)
      },
      showInput() {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue
        if (inputValue) {
          this.fieldValue = [...this.fieldValue, inputValue]
          this.$emit('add', inputValue, this.fieldValue)
        }
        this.inputVisible = false;
        this.inputValue = ''
      },
      handleClose(tag) {
        const tags = [...this.fieldValue]
        tags.splice(tags.indexOf(tag), 1);
        this.fieldValue = tags
        this.$emit('remove', tag, this.fieldValue)
      }
    }
  }
</script>

