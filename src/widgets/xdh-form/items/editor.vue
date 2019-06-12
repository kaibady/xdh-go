<template>
  <xdh-ckeditor v-bind="$attrs" v-on="$listeners" v-model="fieldValue"></xdh-ckeditor>
</template>

<script>
  /**
   * 富文本编辑器
   * @module widgets/xdh-form/items/editor
   */

  import XdhCkeditor from '@/widgets/xdh-ckeditor'

  export default {
    components: {
      XdhCkeditor
    },
    /**
     * 属性参数, 继承 <a href="/xdh-web-doc/#/widgets/form/ckeditor">xdh-ckeditor</a>
     * @member props
     */
    props: {
      value: {
        type: String,
        default: ''
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
