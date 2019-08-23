<template>
  <!-- 视图组件 -->
  <div>
    <slot>
      <div class="xdh-go__menu">
        <div
          v-for="(item, idx) in menus"
          :key="idx"
          :class="{'xdh-go__box': true, disabled: item.disabled || disabledAll}"
        >
          <div v-if="!item.subMenu" @click="menuClick(item.name)">
            <div class="icon-con">
              <i :class="item.icon"></i>
            </div>
            <div class="box">{{item.name}}</div>
          </div>
          <div v-if="item.subMenu">
            <div class="icon-con">
              <i :class="item.icon"></i>
            </div>
            <el-dropdown @command="(name) => menuClick(name)" trigger="click" class="submenu">
              <span :class="{'el-dropdwon-link': true, 'disabled':item.disabled || disabledAll}">
                {{item.name}}
                <i class="iconfont icon-bold-arrow-down" style="margin-left: 5px;"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="xdh-go__dropdown">
                <el-dropdown-item
                  :key="idx"
                  v-for="(item1, idx) in item.subMenu"
                  :command="item1.name"
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
import go from 'gojs'
let viewMenus = [
  { name: '显示照片', icon: 'iconfont icon-image', visible: false },
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
  components: {},
  props: {
    diagram: {
      type: Object,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      menus: viewMenus.filter(r => {
        return r.visible !== false
      }),
      disabledAll: false
    }
  },
  computed: {},
  methods: {
    toggleDisabledAll(disabled = true) {
      this.disabledAll = disabled
    },
    menuClick(name) {
      this.$emit('item-click', name)
      let set = new go.Set()
      let diagram = this.diagram
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
            this.diagram.model.modelData,
            'showLinkLabels',
            false
          )
          break
        case '隐藏关系连线':
          model.setDataProperty(
            this.diagram.model.modelData,
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
            diagram.scale = diagram.scale - 0.2;
            break
        case '放大':
            diagram.scale = diagram.scale + 0.2;
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