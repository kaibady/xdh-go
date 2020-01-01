<template>
  <div :style="menuStyle">
    <slot></slot>
  </div>
</template>
<script>
/**
   * XdhHtml功能组件
   * @module xdh-go-html
   * @description 生成go.HtmlInfo对象，用于绑定到事件
   * @example
   * // use it with menu components
   *  <xdh-html ref="menu1" menu-name="menu1">
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
import go from 'gojs'
let $ = go.GraphObject.make
export default {
  name: 'XdhGoHtml',
  inject: ['diagramName'],
  /**
   * 属性参数
   * @property {String} menuName 菜单名称，必须
   * @property {Function} [beforeShowMenu = () => {}] 参数node,diagram,tool,menu, 显示菜单前须做的操作，可用于调整菜单项
   * @property {Function} [showContextMenu] 参数node,diagram,tool,menu,显示菜单，可选
   * @property {Object} [menuStyle={'z-index': 10000,position:'fixed'}] 菜单容器样式
   * @property {Function} [hideContextMenu=null] 参数diagram,tool,menu 菜单关闭方法
   * @property {Boolean} [autoHide=true] 菜单是否自动关闭，设为true时，tooltip和contextMenu表现不一样，tooltip为移出节点时关闭，contentMenu为点击diagram空白处关闭
   */
  props: {
    menuName: {
      type: String,
      required: true
    },
    appendToBody: {
      type: Boolean,
      default: true
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
     * @returns {go.HTMLInfo}
     */
    bindMenu() {
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
  },
  mounted() {
    if (this.appendToBody) {
      document.body.append(this.$children[0].$el)
    } else {
      this.$parent.$parent.$el.append(this.$children[0].$el)
    }
  }
}
</script>
