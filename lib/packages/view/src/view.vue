<template>
  <!-- 视图组件 -->
  <div :class="`xdh-go__view ${customClass}`" :style="customStyle">
    <slot :menus="menuOption" :menuClick="menuClick">
      <div class="xdh-go__menu">
        <div
          v-for="(item, idx) in menuOption"
          :key="idx"
          :class="{'xdh-go__box': true, disabled: item.disabled || disabledAll}"
        >
          <div v-if="!item.subMenu" @click="menuClick(item)">
            <div class="icon-con">
              <i :class="item.icon"></i>
            </div>
            <div class="box">{{item.name}}</div>
          </div>
          <div v-if="item.subMenu">
            <div class="icon-con">
              <i :class="item.icon"></i>
            </div>
            <el-dropdown @command="(obj) => menuClick(obj)" trigger="click" class="submenu">
              <span :class="{'el-dropdwon-link': true, 'disabled':item.disabled || disabledAll}">
                {{item.name}}
                <i class="iconfont icon-bold-arrow-down" style="margin-left: 5px;"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="xdh-go__dropdown">
                <el-dropdown-item
                  :key="idx"
                  v-for="(item1, idx) in item.subMenu"
                  :command="item1"
                  :disabled="item1.disabled"
                >{{item1.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>
<script>
/**
 * XdhGoView组件
 * @module xdh-go-view
 * @description 视图组件
 */
/**
 * 插槽
 * @member slots
 * @property {String} [default] 菜单按钮插槽,slot-scope =
 * @property {Array} [default.menuOption] 菜单选项
 * @property {Function} [default.menuClick] 菜单点击回调
 */
import go from 'gojs'
import diagramManager from '../../../utils/dataManager/diagramManager'
let viewMenus = [
  {
    name: '隐藏',
    icon: 'iconfont icon-magic',
    subMenu: [
      { name: '隐藏节点' },
      { name: '隐藏子节点' },
      { name: '隐藏关系label' },
      { name: '隐藏关系连线' }
    ]
  },
  {
    name: '显示',
    icon: 'iconfont icon-enlarge',
    subMenu: [
      { name: '显示子节点' },
      { name: '显示关系label' },
      { name: '显示关系连线' }
    ]
  },
  { name: '查看全部', icon: 'iconfont icon-bullseye' },
  {
    name: '缩小',
    icon: 'iconfont icon-zoomout'
  },
  {
    name: '放大',
    icon: 'iconfont icon-enlarge'
  }
]
export default {
  name: 'XdhGoView',
  components: {
  },
  /**
   * 参数属性
   * @property {String} [diagramName='dig'] go.Diagram对象名称

   * @property {String} [customClass=''] 自定义容器类名
   * @property {Object} [customStyle={}] 自定义样式
   * @property {Array} [menus=[]] 自定义菜单
   * @property {Object} [handlers] 自定义菜单对应的处理方法
   
   */
  props: {
    diagramName: {
      type: String,
      default: 'dig'
    },
    customClass: {
      type: String,
      default: ''
    },
    customStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    menus: {
      type: Array,
      default() {
        return []
      }
    },
    handlers: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      menuOption: (() => {
        if (this.menus.length !== 0) {
          return this.menus.filter(r => {
            return r.visible !== false
          })
        } else {
          return JSON.parse(JSON.stringify(viewMenus))
        }
      })(),
      disabledAll: false
    }
  },
  computed: {},
  methods: {
    toggleDisabledAll(disabled = true) {
      this.disabledAll = disabled
    },
    /**
     * @function menuClick
     * @name menuClick
     * @description 菜单点击
     * @param {Object} item 菜单项对象
     */
    menuClick(item) {
      let name = item.name
      /**
       * 菜单点击
       * @event item-click
       * @param {Object} item 菜单选项
       */
      this.$emit('item-click', item)
      if (this.handlers[name]) {
        this.handlers[name](
          diagramManager[this.diagramName],
          go.GraphObject.make,
          go,
          item
        )
        return
      }
      let set = new go.Set()
      let diagram = diagramManager[this.diagramName]
      let model = diagram.model
      switch (name) {
        case '隐藏节点':
          diagram.selection.each(N => {
            if (N instanceof go.Node) {
              set.add(N)
            }
          })
          set.each(N => {
            N.visible = false
          })
          break
        case '隐藏关系label':
          model.setDataProperty(
            diagramManager[this.diagramName].model.modelData,
            'showLinkLabels',
            false
          )
          break
        case '隐藏关系连线':
          model.setDataProperty(
            diagramManager[this.diagramName].model.modelData,
            'showLinks',
            false
          )
          break
        case '隐藏子节点':
          diagram.selection.each(N => {
            if (N instanceof go.Node) {
              set.add(N)
            }
          })
          set.each(N => {
            N.collapseTree(1)
          })
          break
        case '显示子节点':
          diagram.selection.each(N => {
            if (N instanceof go.Node) {
              set.add(N)
            }
          })
          set.each(N => {
            N.expandTree(1)
            N.findTreeChildrenNodes().each(N2 => {
              N2.visible = true
            })
          })
          break
        case '显示关系label':
          model.setDataProperty(model.modelData, 'showLinkLabels', true)
          break
        case '显示关系连线':
          model.setDataProperty(model.modelData, 'showLinks', true)
          break
        case '查看全部':
          diagram.zoomToFit()
          break
        case '缩小':
          diagram.scale = diagram.scale - 0.2
          break
        case '放大':
          diagram.scale = diagram.scale + 0.2
          break
      }
    }
  },
  created() {}
}
</script>
<style type="text/scss" lang="scss" scoped>
.tab-menu {
  background: #3d4c63;
  color: #fff;
  position: fixed;
  z-index: 999;
  left: 250px;
  top: 50px;
  border-radius: 5px;
}
.box-wrapper {
  cursor: pointer;
  background-color: #1c2237;
  padding: 0;
  margin: 10px;
  min-width: 65px;
  border-radius: 5px;
  border: 1px solid #151929;
  font-size: 14px;
  display: inline-block;
  padding: 5px 10px;
  text-align: center;
  .icon-con {
    height: 40px;
    line-height: 40px;
  }
  &.disabled {
    cursor: not-allowed;
    color: #888;
  }
  .submenu {
    color: #fff;
    display: block;
    margin-top: -8px;
    .disabled {
      cursor: not-allowed;
      color: #888;
      pointer-events: none;
    }
  }
}
.box {
  margin-top: -8px;
}
.el-dropdown-menu {
  padding: 5px 0;
  border: 1px solid #3d4c63;
  background-color: #1c2237;
  .el-dropdown-menu__item {
    line-height: 25px;
    color: #fff;
    &.is-disabled {
      color: #666;
    }
    &:not(.is-disabled):hover {
      background-color: #2d69f7;
      color: #fff;
    }
  }
  & /deep/ .popper__arrow {
    border-bottom-color: #3d4c63;
    &:after {
      border-bottom-color: #1c2237;
    }
  }
}
</style>