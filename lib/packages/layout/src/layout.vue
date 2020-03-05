<template>
  <!-- 布局组件 -->
  <div :class="`xdh-go-layout__menu ${customClass}`" :style="customStyle">
    <slot :toggleLock="toggleLock" :changeLayout="changeLayout">
      <ul>
        <li @click="toggleLock()">
          <el-tooltip :content="'固定布局切换'" placement="left" effect="light">
            <i class="iconfont icon-pin icon" v-if="lock"></i>
            <i class="iconfont icon-map-thumbtack icon" v-if="!lock"></i>
          </el-tooltip>
        </li>
        <li>
          <el-tooltip :content="'分层'" placement="left" effect="light" popper-class="invest-graph">
            <i class="iconfont icon-Tandem icon"></i>
          </el-tooltip>
          <ul>
            <li @click="changeLayout('LayeredDigraphLayout', {direction:270})">
              <i class="iconfont icon-arrow-up icon"></i>
            </li>
            <li @click="changeLayout('LayeredDigraphLayout', {direction:90})">
              <i class="iconfont icon-arrow-down icon"></i>
            </li>
            <li @click="changeLayout('LayeredDigraphLayout', {direction:180})">
              <i class="iconfont icon-arrow-left icon"></i>
            </li>
            <li @click="changeLayout('LayeredDigraphLayout', {direction:0})">
              <i class="iconfont icon-arrow-right icon"></i>
            </li>
          </ul>
        </li>
        <!--力导向-->
        <li @click="changeLayout('ForceDirectedLayout')">
          <el-tooltip :content="'力导向'" placement="left" effect="light" popper-class="invest-graph">
            <i class="iconfont icon-relation icon"></i>
          </el-tooltip>
        </li>
        <!--网格-->
        <li @click="changeLayout('GridLayout')">
          <el-tooltip :content="'网格'" placement="left" effect="light" popper-class="invest-graph">
            <i class="iconfont icon-nine-squares icon"></i>
          </el-tooltip>
        </li>
        <!--圆形-->
        <li @click="changeLayout('CircularLayout')">
          <el-tooltip :content="'圆形'" placement="left" effect="light" popper-class="invest-graph">
            <i class="iconfont icon-collaboration-system icon"></i>
          </el-tooltip>
        </li>
        <!--树形-->
        <li>
          <el-tooltip :content="'树形'" placement="left" effect="light" popper-class="invest-graph">
            <i class="iconfont icon-map-site icon"></i>
          </el-tooltip>
          <ul class="bottom">
            <li @click="changeLayout('TreeLayout', {angle:270})">
              <i class="iconfont icon-arrow-up icon"></i>
            </li>
            <li @click="changeLayout('TreeLayout', {angle:90})">
              <i class="iconfont icon-arrow-down icon"></i>
            </li>
            <li @click="changeLayout('TreeLayout', {angle:180})">
              <i class="iconfont icon-arrow-left icon"></i>
            </li>
            <li @click="changeLayout('TreeLayout', {angle:0})">
              <i class="iconfont icon-arrow-right icon"></i>
            </li>
          </ul>
        </li>
      </ul>
    </slot>
  </div>
</template>
<script>
import getLayout from '../../../utils/layout'
import go from 'gojs'
import diagramManager from '../../../utils/dataManager/diagramManager'
let $ = go.GraphObject.make
/**
   * XdhGoLayout功能组件
   * @module xdh-go-layout
   * @description 布局组件
   * @example
   *  <xdh-go-layout
      :diagram="diagram"
      :lock.sync="lock"
      ref="layout"
      custom-class="my-layout"
    ></xdh-go-layout>
   */
/**
 * 插槽
 * @member slot
 * @property {String} [default] 默认插槽
 * @property {Function} [default.toggleLock] 设置lock开关
 * @property {Function} [default.changeLayout] 布局方法
 */
export default {
  name: 'XdhGoLayout',
  /**
   * 属性参数
   * @property {String} diagramName go.Diagram对象名称
   * @property {Boolean} lock 增删节点后其它节点是否重新布局
   * @property {String} customClass 自定义类名
   * @property {Object} customStyle 自定义style对象
   */
  props: {
    diagramName: {
      type: String,
      default: 'dig'
    },
    lock: {
      type: Boolean,
      default: false
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
    }
  },
  data() {
    return {
      currLayout: 'LayeredDigraphLayout',
      lockState: false,
      currOption: {}
    }
  },
  watch: {
    lock: {
      immediate: true,
      handler(val) {
        this.lockState = val
      }
    },
    lockState(val) {
      this.$emit('update:lock', val)
    },
    diagram: {
      handler(val) {
        if (val) {
          this.unbindEvents()
          setTimeout(() => {
            this.bindEvents()
          }, 100)
        }
      }
    }
  },
  computed: {},
  methods: {
    /**
     * @function
     * @name toggleLock
     * @description 设置lock开关
     */
    toggleLock() {
      this.lockState = !this.lockState
      if (this.lockState) {
        let layout = $(go.Layout)
        diagramManager[this.diagramName].layout = layout
        diagramManager[this.diagramName].layoutDiagram(true)
      } else {
        let type = this.currLayout
        let options = this.currOption
        if (type === 'GridLayout') {
          let nodeLength =
            diagramManager[this.diagramName].model.nodeDataArray.length
          let num = Math.floor(Math.sqrt(nodeLength)) + 1
          options.wrappingColumn = num
        }
        let set = this.getAllNodesAndLinks()
        this.setNodesFixed(set, false)
        let layout = getLayout[type]($, go, options)
        layout.isOngoing = true
        diagramManager[this.diagramName].layout = layout
        diagramManager[this.diagramName].layoutDiagram(true)
      }
    },
    /**
     * @function
     * @name changeLayout
     * @param {String} type ForceDirectedLayout/GridLayout/CircularLayout/TreeLayout/LayeredDigraphLayout
     * @param {Object} options 布局类型参数
     * @description 设置布局
     * @example
     *   changeLayout('LayeredDigraphLayout', {direction:270})
     *   changeLayout('TreeLayout', {angle:270})
     *   changeLayout('CircularLayout')
     */
    changeLayout(type, options = {}) {
      /**
       * 切换布局时触发
       * @event on-search
       * @param {String} type 布局类型
       */
      this.$emit('on-change', type)
      this.currOption = options
      this.currLayout = type
      if (this.lockState) {
        // 设置简单布局，使position定位生效
        diagramManager[this.diagramName].layout = $(go.Layout)
        diagramManager[this.diagramName].layoutDiagram(true)
        if (diagramManager[this.diagramName].selection.count !== 0) {
          let set = new go.Set()
          // 获得点集合的左上角坐标
          let posXmin, posYmin
          diagramManager[this.diagramName].selection.each(N => {
            set.add(N)
            if (!posXmin || N.position.x < posXmin) {
              posXmin = N.position.x
            }
            if (!posYmin || N.position.y < posYmin) {
              posYmin = N.position.y
            }
          })
          let position = new go.Point(posXmin, posYmin)
          this.layoutNodes($, go, type, set, position, options)
        } else {
          let set = this.getAllNodesAndLinks()
          this.setNodesFixed(set, true)
          this.layoutNodes($, go, type, set, undefined, options)
        }
      } else {
        let set
        if (diagramManager[this.diagramName].selection.count !== 0) {
          set = new go.Set()
          diagramManager[this.diagramName].nodes.each(N => {
            N.isLayoutPositioned = false
          })
          diagramManager[this.diagramName].selection.each(N => {
            set.add(N)
          })
        } else {
          set = this.getAllNodesAndLinks()
        }
        this.setNodesFixed(set, false)
        if (type === 'GridLayout') {
          let nodeLength =
            diagramManager[this.diagramName].model.nodeDataArray.length
          let num = Math.floor(Math.sqrt(nodeLength)) + 1
          options.wrappingColumn = num
        }
        let layout = getLayout[type]($, go, options)
        layout.isOngoing = true
        diagramManager[this.diagramName].layout = layout
        diagramManager[this.diagramName].layoutDiagram(true)
      }
    },
    getAllNodesAndLinks() {
      let set = new go.Set()
      diagramManager[this.diagramName].nodes.each(N => {
        set.add(N)
      })
      diagramManager[this.diagramName].links.each(L => {
        set.add(L)
      })
      return set
    },
    layoutNodes($, go, type, nodes, position, options = {}) {
      if (type === 'GridLayout') {
        let nodeLength =
          diagramManager[this.diagramName].model.nodeDataArray.length
        let num = Math.floor(Math.sqrt(nodeLength)) + 1
        options.wrappingColumn = num
      }
      let layout = getLayout[type]($, go, options)
      // 如果不设置isOngoing为false, 添加完的节点会自动按照diagram.layout布局，节点集布局会失效
      diagramManager[this.diagramName].layout.isOngoing = false
      this.setNodesFixed(nodes, false)
      layout.doLayout(nodes)
      this.setNodesFixed(nodes, true)
      diagramManager[this.diagramName].layout.isOngoing = true
      // 如果是力布局，会以原有位置为基础布局，因此不需要再设置偏移
      if (position && type !== 'ForceDirectedLayout') {
        diagramManager[this.diagramName].moveParts(nodes, position)
      }
    },
    setNodesFixed(nodes, isFixed = true) {
      nodes.each(N => {
        N.isLayoutPositioned = !isFixed
      })
    },
    layoutAfterAdd(nodes, links) {
      if (nodes && nodes.length === 0) {
        return
      }
      let nodeMap = {}
      let type = 'data'
      if (nodes[0].diagram) {
        type = 'node'
      }
      nodes.forEach(d => {
        nodeMap[d.key] = d
      })
      let parent = null
      nodes.forEach(d => {
        let node
        if (type === 'node') {
          node = d
        } else {
          node = diagramManager[this.diagramName].findNodeForData(d)
        }
        if (node) {
          node.findNodesConnected().each(N => {
            if (!nodeMap[N.key]) {
              parent = N
            }
          })
        }
      })
      if (!parent) {
        let node
        if (type === 'node') {
          node = nodes[0]
        } else {
          node = diagramManager[this.diagramName].findNodeForData(nodes[0])
        }
        let connects = node.findNodesConnected()
        connects.each(N => {
          parent = N
        })
      }
      let set = new go.Set()
      let cNodes = parent.findTreeChildrenNodes()
      let cLinks = parent.findTreeChildrenLinks()
      let posXmin = parent.position.x
      let posYmin = parent.position.y
      set.add(parent)
      if (cNodes) {
        cNodes.each(N => {
          set.add(N)
          if (N.position.x !== 0 && N.position.y !== 0) {
            if (!posXmin || N.position.x < posXmin) {
              posXmin = N.position.x
            }
            if (!posYmin || N.position.y < posYmin) {
              posYmin = N.position.y
            }
          }
        })
      }
      let position = new go.Point(posXmin, posYmin)
      nodes.forEach(d => {
        let node
        if (type === 'node') {
          node = d
        } else {
          node = diagramManager[this.diagramName].findNodeForData(d)
        }
        node.position = position
        set.add(node)
      })
      if (links && links.length !== 0) {
        links.forEach(l => {
          let link
          if (type === 'node') {
            link = l
          } else {
            link = diagramManager[this.diagramName].findLinkForData(l)
          }
          set.add(link)
        })
      }
      if (cLinks) {
        cLinks.each(L => {
          set.add(L)
        })
      }
      this.layoutNodes($, go, this.currLayout, set, position, this.currOption)
    },
    bindEvents() {},
    unbindEvents() {}
  },
  created() {}
}
</script>
