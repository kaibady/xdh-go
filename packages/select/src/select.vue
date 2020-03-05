<template>
  <!-- 选择组件 -->
  <div :class="`xdh-go__select ${customClass}`" :style="customStyle">
    <slot name="tips" :alertTips="alertTips" :showTips="showTips">
      <el-alert
        :title="`${alertTips}`"
        v-if="showTips"
        v-show="['rect', 'multi'].includes(selectMode)"
        :closable="false"
        type="warning"
        class="xdh-go__tips"
      ></el-alert>
    </slot>
    <slot :menus="menus" :menuClick="menuClick">
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
                  :class="{active: item1.name === itemMap[selectMode]}"
                  :key="idx"
                  v-for="(item1, idx) in item.subMenu"
                  :command="item1.name"
                  :disabled="item1.disabled"
                >
                  <el-popover
                    ref="popover"
                    placement="right"
                    :trigger="'hover'"
                    :content="item1.tips"
                    class="xdh-go__dropitem"
                  >
                    <div slot="reference">{{item1.name}}</div>
                  </el-popover>
                </el-dropdown-item>
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
 * XdhGoSelect 组件
 * @module xdh-go-select
 * @description 选择组件
 */
/**
 * 插槽
 * @member slots
 * @property {String} [default] 菜单选项插槽,slot-scope =
 * @property {Function} [default.menu] 菜单数组
 *                                     [
  {
    name: '选择',
    icon: 'iconfont icon-indicator',
    subMenu: [
      { name: '框选', tips: '点击框选或长按鼠标拖动可框选' },
      { name: '多选', tips: '点击多选或按住ctrl可多选' },
      {
        name: '全选',
        tips: '全选节点'
      },
      { name: '反选', tips: '反选节点' },
      { name: '选中子节点', tips: '选中指定节点的子节点' }
    ]
  }
]
 * @property {String} [default.menuClick] 菜单点击方法
 */
/**
 * 插槽
 * @member slots
 * @property {String} [tips] 操作提示插槽,slot-scope =
 * @property {String} [tips.alertTips] 提示信息
 * @property {Boolean} [tips.showTips] 是否显示提示信息
 */
import diagramManager from '../../../utils/dataManager/diagramManager'
import go from 'gojs'
let viewMenus = [
  {
    name: '选择',
    icon: 'iconfont icon-indicator',
    subMenu: [
      { name: '框选', tips: '点击框选或长按鼠标拖动可框选' },
      { name: '多选', tips: '点击多选或按住ctrl可多选' },
      {
        name: '全选',
        tips: '全选节点'
      },
      { name: '反选', tips: '反选节点' },
      { name: '选中子节点', tips: '选中指定节点的子节点' }
    ]
  }
]
export default {
  name: 'XdhGoSelect',
  components: {
  },
  /**
   * 参数属性
     * @property {String} [diagramName='dig'] go.Diagram对象名称

   * @property {Boolean} [showTips=true] 是否显示顶部操作提示
   * @property {String} [customClass=''] 自定义容器类名
   * @property {Object} [customStyle={}] 自定义样式
   * @property {Object} [itemMap] 选项名称对应关系 {
          normal: '普通',
          rect: '框选',
          multi: '多选',
          all: '全选',
          reverse: '反选',
          child: '选中子节点'
        }
   * @property {Array} [menus] 菜单项，默认
   [
  {
    name: '选择',
    icon: 'iconfont icon-indicator',
    subMenu: [
      { name: '框选', tips: '点击框选或长按鼠标拖动可框选' },
      { name: '多选', tips: '点击多选或按住ctrl可多选' },
      {
        name: '全选',
        tips: '全选节点'
      },
      { name: '反选', tips: '反选节点' },
      { name: '选中子节点', tips: '选中指定节点的子节点' }
    ]
  }
]
   */
  props: {
    diagramName: {
      type: String,
      default: 'dig'
    },
    showTips: {
      type: Boolean,
      default: true
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
    itemMap: {
      type: Object,
      default() {
        return {
          normal: '普通',
          rect: '框选',
          multi: '多选',
          all: '全选',
          reverse: '反选',
          child: '选中子节点'
        }
      }
    },
    menus: {
      type: Array,
      default() {
        return viewMenus.filter(r => {
          return r.visible !== false
        })
      }
    }
  },
  data() {
    return {
      itemReverseMap: {},
      disabledAll: false,
      selectMode: 'normal'
    }
  },
  computed: {
    alertTips() {
      if (this.selectMode === 'rect') {
        return '开始框选，按住ctrl可框选多处，点击esc退出'
      } else if (this.selectMode === 'multi') {
        return '开始多选，点击esc退出'
      } else {
        return '切换到普通模式'
      }
    }
  },
  methods: {
    resetEvents() {
      this.unbindDiagramEvent()
      setTimeout(() => {
        this.bindDiagramEvent(
          diagramManager[this.diagramName],
          go.GraphObject.make,
          go
        )
      }, 300)
    },
    keyupHandler(e) {
      e.preventDefault()
      switch (e.key) {
        case 'Escape':
          this.resetMode()
          break
      }
    },
    resetMode() {
      this.setSelectMode('normal')
    },
    toggleDisabledAll(disabled = true) {
      this.disabledAll = disabled
    },
    setSelectMode(mode) {
      let diagram = diagramManager[this.diagramName]
      let model = diagram.model
      model.setDataProperty(model.modelData, 'selectMode', mode)
      this.selectMode = mode
      diagram.clearHighlighteds()
      if (mode === 'rect') {
        diagram.toolManager.dragSelectingTool.delay = 0
      } else if (mode === 'all') {
        diagram.commandHandler.selectAll()
      } else if (mode === 'reverse') {
        diagram.nodes.each(N => {
          N.isSelected = !N.isSelected
        })
      } else if (mode === 'child') {
        let selections = this.getSelections(true)
        let set = new go.Set()
        selections.each(N => {
          set.add(N)
        })
        diagram.clearSelection()
        set.each(N => {
          this.selectChildren(N)
        })
      } else if (mode === 'multi') {
        diagram.clearSelection()
      } else if (mode === 'normal') {
        let name = this.diagramName
        diagramManager[name].toolManager.dragSelectingTool.delay = 200
      }
      /**
       * 选择模式切换时触发
       * @event on-change
       * @param {String} mode 选择模式
       */
      this.$emit('on-change', mode)
    },
    getSelections(isObject = true) {
      if (isObject) {
        return diagramManager[this.diagramName].selection
      } else {
        let res = []
        diagramManager[this.diagramName].selection.each(node => {
          res.push(node.data)
        })
        return res
      }
    },
    selectChildren(node) {
      let children = node.findTreeChildrenNodes()
      if (children) {
        children.each(N => {
          N.isSelected = true
        })
      }
    },
    menuClick(name) {
      this.$emit('item-click', name)
      let tag = this.itemReverseMap[name]
      switch (tag) {
        // 选择功能
        case 'rect':
          this.setSelectMode('rect')
          break
        case 'multi':
          this.setSelectMode('multi')
          break
        case 'all':
          this.setSelectMode('all')
          break
        case 'reverse':
          this.setSelectMode('reverse')
          break
        case 'child':
          this.setSelectMode('child')
          break
      }
    },
    bindDiagramEvent(diagram, $, go) {
      diagramManager[this.diagramName].addDiagramListener(
        'BackgroundSingleClicked',
        this.backgroundClick
      )
      diagram.addDiagramListener('ObjectSingleClicked', this.nodeClickSelect)
      // 框选按esc后默认会取消所有已选项，禁用
      diagram.commandHandler.doKeyDown = () => {
        let e = diagram.lastInput
        let cmd = diagram.commandHandler
        if (e.key !== 'Esc') {
          go.CommandHandler.prototype.doKeyDown.call(cmd)
        }
      }
      // 点击节点默认会只选当前节点，而取消之前选择的节点。多选状态下须取消此行为
      diagram.toolManager.clickSelectingTool.doMouseUp = () => {
        let e = diagram.lastInput
        let cmd = diagram.toolManager.clickSelectingTool
        if (['multi'].includes(this.selectMode)) {
          if (e.button === 0) {
            let node = diagram.findObjectAt(
              e.documentPoint,
              x => x.part,
              x => x.canSelect()
            )
            if (node) {
              node.isSelected = true
            } else {
              diagram.clearSelection()
              this.resetMode()
            }
            diagram.clearHighlighteds()
          }
        } else {
          go.ClickSelectingTool.prototype.doMouseUp.call(cmd)
        }
      }
      // 框选状态下禁用拖拽
      diagram.toolManager.draggingTool.doMouseMove = () => {
        let cmd = diagram.toolManager.draggingTool
        go.DraggingTool.prototype.doMouseMove.call(cmd)
        diagram.layout.invalidateLayout()
      }
    },
    nodeClickSelect(obj) {
      let node = obj.subject.part
      let isMultiSelect = false
      if (this.selectMode === 'multi') {
        diagramManager[this.diagramName].clearHighlighteds()
        isMultiSelect = true
      }
      node.isSelected = true
      return isMultiSelect
    },
    backgroundClick() {
      this.resetMode()
      diagramManager[this.diagramName].clearSelection()
    },
    unbindDiagramEvent() {
      diagramManager[this.diagramName].removeDiagramListener(
        'BackgroundSingleClicked',
        this.backgroundClick
      )
      diagramManager[this.diagramName].removeDiagramListener(
        'ObjectSingleClicked',
        this.nodeClickSelect
      )
      diagramManager[this.diagramName].toolManager.draggingTool.doMouseMove =
        go.DraggingTool.prototype.doMouseMove
      let name = this.diagramName
      diagramManager[name].toolManager.clickSelectingTool.doMouseUp =
        go.ClickSelectingTool.prototype.doMouseUp
      diagramManager[this.diagramName].commandHandler.doKeyDown =
        go.CommandHandler.prototype.doKeyDown
    }
  },
  mounted() {
    if (diagramManager[this.diagramName]) {
      this.bindDiagramEvent(
        diagramManager[this.diagramName],
        go.GraphObject.make,
        go
      )
    }
    window.addEventListener('keyup', this.keyupHandler)
  },
  created() {
    let itemReverse = {}
    Object.entries(this.itemMap).forEach(r => {
      itemReverse[r[1]] = r[0]
    })
    this.itemReverseMap = itemReverse
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.keyupHandler)
    this.unbindDiagramEvent()
  }
}
</script>
<style type="text/scss" lang="scss" scoped>
</style>