<template>
  <!-- 布局组件 -->
  <div class="xdh-go-layout__menu">
    <slot :toggleLock="toggleLock" :changeLayout="changeLayout">
      <ul>
        <li @click="toggleLock()">
          <el-tooltip
            :content="'固定布局切换'"
            placement="left"
            effect="light"
          >
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
          <ul>
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
let $ = go.GraphObject.make
export default {
  name: 'XdhGoLayout',
  components: {},
  props: {
    diagram: {
      type: Object,
      default() {
        return null
      }
    },
    lock: {
      type: Boolean,
      default: false
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
    toggleLock() {
      this.lockState = !this.lockState
      if (this.lockState) {
        let layout = $(go.Layout)
        this.diagram.layout = layout
        this.diagram.layoutDiagram(true)
      } else {
        let type = this.currLayout
        let options = this.currOption
        if (type === 'GridLayout') {
          let nodeLength = this.diagram.model.nodeDataArray.length
          let num = Math.floor(Math.sqrt(nodeLength)) + 1
          options.wrappingColumn = num
        }
        let set = this.getAllNodesAndLinks()
        this.setNodesFixed(set, false)
        let layout = getLayout[type]($, go, options)
        layout.isOngoing = true
        this.diagram.layout = layout
        this.diagram.layoutDiagram(true)
      }
    },
    changeLayout(type, options = {}) {
      this.$emit('change', type)
      this.currOption = options
      this.currLayout = type
      if (this.lockState) {
        // 设置简单布局，使position定位生效
        this.diagram.layout = $(go.Layout)
        this.diagram.layoutDiagram(true)
        if (this.diagram.selection.count !== 0) {
          let set = new go.Set()
          // 获得点集合的左上角坐标
          let posXmin, posYmin
          this.diagram.selection.each(N => {
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
        if (this.diagram.selection.count !== 0) {
          set = new go.Set()
          this.diagram.nodes.each(N => {
            N.isLayoutPositioned = false
          })
          this.diagram.selection.each(N => {
            set.add(N)
          })
        } else {
          set = this.getAllNodesAndLinks()
        }
        this.setNodesFixed(set, false)
        if (type === 'GridLayout') {
          let nodeLength = this.diagram.model.nodeDataArray.length
          let num = Math.floor(Math.sqrt(nodeLength)) + 1
          options.wrappingColumn = num
        }
        let layout = getLayout[type]($, go, options)
        layout.isOngoing = true
        this.diagram.layout = layout
        this.diagram.layoutDiagram(true)
      }
    },
    getAllNodesAndLinks() {
      let set = new go.Set()
      this.diagram.nodes.each(N => {
        set.add(N)
      })
      this.diagram.links.each(L => {
        set.add(L)
      })
      return set
    },
    layoutNodes($, go, type, nodes, position, options = {}) {
      if (type === 'GridLayout') {
        let nodeLength = this.diagram.model.nodeDataArray.length
        let num = Math.floor(Math.sqrt(nodeLength)) + 1
        options.wrappingColumn = num
      }
      let layout = getLayout[type]($, go, options)
      // 如果不设置isOngoing为false, 添加完的节点会自动按照diagram.layout布局，节点集布局会失效
      this.diagram.layout.isOngoing = false
      this.setNodesFixed(nodes, false)
      layout.doLayout(nodes)
      this.setNodesFixed(nodes, true)
      this.diagram.layout.isOngoing = true
      // 如果是力布局，会以原有位置为基础布局，因此不需要再设置偏移
      if (position && type !== 'ForceDirectedLayout') {
        this.diagram.moveParts(nodes, position)
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
          node = this.diagram.findNodeForData(d)
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
          node = this.diagram.findNodeForData(nodes[0])
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
          node = this.diagram.findNodeForData(d)
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
            link = this.diagram.findLinkForData(l)
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
<style type="text/scss" lang="scss" scoped>

</style>