<template>
  <!-- 选择组件 -->
  <div>
    <el-alert
      :title="`${alertTips}`"
      v-show="['rect', 'multi'].includes(selectMode)"
      :closable="false"
      type="warning"
      class="xdh-go__tips"
    ></el-alert>
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
                  :class="{active: item1.name === selectModeMap[selectMode]}"
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
  {
    name: '选择',
    icon: 'iconfont icon-indicator',
    subMenu: [
      { name: '框选', tips: '点击框选或按住shift点击鼠标左键可框选' },
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
  components: {},
  props: {
    diagram: {
      type: Object,
      default() {
        return null
      }
    }
  },
  watch: {
    diagram: {
      handler(diagram) {
        if (diagram) {
          this.unbindDiagramEvent()
          setTimeout(() => {
            this.bindDiagramEvent(diagram, go.GraphObject.make, go)
          }, 300)
        }
      }
    }
  },
  data() {
    return {
      menus: viewMenus.filter(r => {
        return r.visible !== false
      }),
      disabledAll: false,
      selectMode: 'normal',
      selectModeMap: {
        normal: '',
        rect: '框选',
        multi: '多选',
        all: '全选',
        reverse: '反选',
        child: '选中子节点'
      }
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
      let diagram = this.diagram
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
        this.diagram.toolManager.dragSelectingTool.delay = 200
      }
      this.$emit('change', mode)
    },
    getSelections(isObject = true) {
      if (isObject) {
        return this.diagram.selection
      } else {
        let res = []
        this.diagram.selection.each(node => {
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
      switch (name) {
        // 选择功能
        case '框选':
          this.setSelectMode('rect')
          break
        case '多选':
          this.setSelectMode('multi')
          break
        case '全选':
          this.setSelectMode('all')
          break
        case '反选':
          this.setSelectMode('reverse')
          break
        case '选中子节点':
          this.setSelectMode('child')
          break
      }
    },
    bindDiagramEvent(diagram, $, go) {
      this.diagram.addDiagramListener(
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
          console.log('multi')
          if (e.button === 0) {
            let node = diagram.findObjectAt(
              e.documentPoint,
              x => x.part,
              x => x.canSelect()
            )
            if (node) {
              node.isSelected = true
            }
            diagram.clearHighlighteds()
          }
        } else {
          console.log('not multi')
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
      console.log('select node')
      let node = obj.subject.part
      let isMultiSelect = false
      if (this.selectMode === 'multi') {
        this.diagram.clearHighlighteds()
        isMultiSelect = true
      } else {
        this.diagram.clearSelection()
      }
      node.isSelected = true
      return isMultiSelect
    },
    backgroundClick() {
      console.log('ffffff')
      this.resetMode()
      this.diagram.clearSelection()
    },
    unbindDiagramEvent() {
      this.diagram.removeDiagramListener(
        'BackgroundSingleClicked',
        this.backgroundClick
      )
      this.diagram.removeDiagramListener(
        'ObjectSingleClicked',
        this.nodeClickSelect
      )
      this.diagram.toolManager.draggingTool.doMouseMove =
        go.DraggingTool.prototype.doMouseMove
      this.diagram.toolManager.clickSelectingTool.doMouseUp =
        go.ClickSelectingTool.prototype.doMouseUp
      this.diagram.commandHandler.doKeyDown =
        go.CommandHandler.prototype.doKeyDown
    }
  },
  mounted() {
    window.addEventListener('keyup', this.keyupHandler)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.keyupHandler)
    this.unbindDiagramEvent()
  }
}
</script>
<style type="text/scss" lang="scss" scoped>

</style>