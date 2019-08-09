<template>
  <div :style="menuStyle">
    <slot></slot>
  </div>
</template>
<script>
/**
   * XdhHtml功能组件
   * @module xdh-html
   * @description 生成go.HtmlInfo对象，用于绑定到事件
   * @example
   * // use it with menu components
   *  <xdh-html ref="menu1">
          <circle-menu
          :menu-list="listData1"
          @item-click="itemClick">
          </circle-menu>
      </xdh-html>
   */
/**
 * 插槽
 * @member slot [default]
 */
// import go from 'gojs'
// let $ = go.GraphObject.make
export default {
  name: 'XdhGoHtml',
  inject: ['$', 'go', 'diagram'],
  /**
   * 属性参数
   * @property {Function} [beforeShowMenu = () => {}] 显示菜单前须做的操作，可用于调整菜单项
   * @property {Function} [showContextMenu] 显示菜单，可选
   */
  props: {
    appendToBody: {
      type: Boolean,
      default: true
    },
    menuName: {
      type: String,
      default: ''
    },
    menuStyle: {
      type: Object,
      default() {
        return {
          'z-index': 10000,
          position: 'fixed'
        }
      }
    },
    beforeShowMenu: {
      type: Function,
      default: () => {}
    },
    showContextMenu: {
      type: Function
    },
    hideContextMenu: {
      type: Function
    },
    autoHide: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      menu: null, // $el 对象
      menuObj: null, // 组件对象
      name: 'XdhGoHtml'
    }
  },
  computed: {},
  methods: {
    /**
     * 返回用于绑定到contextMenu参数的HTMLInfo对象
     * @function bindMenu
     */
    bindMenu() {
      let go = this.go,
        $ = this.$
      this.menuObj = this.$children[0]
      this.menu = this.$children[0].$el
      // 取消原生右键点击事件
      this.menu.addEventListener(
        'contextmenu',
        function(e) {
          e.preventDefault()
          return false
        },
        false
      )
      let option = {
        show: this.showMenu,
        mainElement: this.menu
      }
      if (this.autoHide) {
        option.hide = this.hideMenu
      }
      return $(go.HTMLInfo, option)
    },
    // 组件内部使用的方法
    showMenu(obj, diagram, tool) {
      this.beforeShowMenu(obj, diagram, tool, this.menu)
      // 有时你可能想在指定的位置显示菜单，而不是在节点上，可自定义方法实现
      // 传回diagram 方便将菜单通过lastInput定位到指定坐标
      if (this.showContextMenu) {
        this.showContextMenu(obj, diagram, tool, this.menu)
      } else {
        this.menu.style.display = 'block'
        let event = diagram.lastInput.event
        this.menu.style.left = event.pageX + 'px'
        this.menu.style.top = event.pageY + 'px'
      }
    },
    hideMenu(diagram, tool) {
      if (this.hideContextMenu) {
        this.hideContextMenu(diagram, tool, this.menu)
      } else {
        this.menu.style.display = 'none'
      }
    }
  }
}
</script>
<style type="text/scss" lang="scss" scoped>

</style>
