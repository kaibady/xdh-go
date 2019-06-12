<template>
  <div class="xdh-form-divider">
    <el-divider direction="horizontal" :content-position="contentPosition">
      <slot>
        <i v-if="icon" :class="icon"></i>
        {{content}}
      </slot>
    </el-divider>
    <slot name="body"></slot>
  </div>
</template>

<script>
  /**
   * 分隔线
   * @module widgets/xdh-form/items/divider
   */

  export default {
    /**
     * 属性参数, 继承 <a href="/xdh-web-doc/#/element/divider">el-divider</a>
     * @member props
     * @property {string} [icon] 图标样式名称
     * @property {string} [content] 内容文本
     * @property {string} [contentPosition=center] 设置分割线文案的位置 left / right / center
     */
    props: {
      icon: String,
      contentPosition: {
        type: String,
        default: 'center',
        validator(val) {
          return ['left', 'right', 'center'].includes(val)
        }
      },
      content: {
        type: String,
        default: ''
      }
    }
  }
</script>
