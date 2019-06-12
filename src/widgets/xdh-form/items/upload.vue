<template>
  <el-upload ref="upload" class="xdh-form-upload" v-bind="$attrs" v-on="$listeners" :on-change="handleChange">
    <slot>
      <template v-if="$attrs.drag">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </template>
      <template v-else>
        <el-button v-if="$attrs.autoUpload" :size="size" type="primary">{{uploadText}}</el-button>
        <slot name="trigger">
          <el-button v-if="!$attrs.autoUpload" slot="trigger" :size="size" type="primary">{{selectText}}</el-button>
        </slot>
        <el-button v-if="!$attrs.autoUpload" :size="size" type="success" @click="submitUpload">{{submitText}}
        </el-button>
      </template>
    </slot>
    <div slot="tip" class="xdh-form-upload__tip">{{tipText}}</div>
  </el-upload>
</template>

<script>
  /**
   * 文件上传组件
   * @module widgets/xdh-form/items/upload
   */
  export default {
    inject: ['xdhForm'],
    /**
     * 属性参数  继承 <a href="/xdh-web-doc/#/element/upload">el-upload</a>
     * @member props
     * @property {array} [value] 回填数据
     * @property {string} [uploadText] 上传按钮文本
     * @property {string} [selectText] 选择文件按钮文本
     * @property {string} [submitText] 上传按钮文本
     * @property {string} [tipText] 提示文本
     * @property {string} [size] 尺寸
     */
    props: {
      value: {
        type: Array,
        default() {
          return []
        }
      },
      uploadText: {
        type: String,
        default: '点击上传'
      },
      selectText: {
        type: String,
        default: '选取文件'
      },
      submitText: {
        type: String,
        default: '上传到服务器'
      },
      tipText: {
        type: String,
        default: '只能上传jpg/png文件，且不超过500kb'
      },
      size: {
        type: String
      }
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleChange(file, list) {
        this.$emit('input', list)
        if (this.$attrs.onChange) {
          this.$attrs.onChange(file, list)
        }
      }
    }
  }
</script>

