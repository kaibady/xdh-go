<template>
  <div v-show="viewerVisible" class="xdh-go-viewer" v-draggable>
    <slot>
      <el-card class="xdh-go-viewer__container">
        <div slot="header" class="xdh-go-viewer__header">
          <span>数据管理器</span>
          <el-button
            type="text"
            style="float:right;padding:0;"
            circle
            icon="iconfont icon-multiply"
            size="mini"
            @click="close"
          ></el-button>
        </div>
        <div class="xdh-go-viewer__content">
          <el-tabs v-model="activeName">
            <el-tab-pane label="节点信息" name="nodes">
              <el-tree :data="nodes" :expand-on-click-node="false" :ref="'nodeTree'" node-key="key">
                <template slot-scope="{node, data}">
                  <div
                    :class="['item', {active: data.key === currKey}]"
                    @click.prevent="findNode(data)"
                  >
                    <span v-if="data.level === 0">
                      {{node.label}}
                      <i
                        class="iconfont icon-inquiry search"
                        @click.prevent="findNode(data)"
                      ></i>
                    </span>
                    <span v-else>{{node.label}}</span>
                  </div>
                </template>
              </el-tree>
            </el-tab-pane>
            <el-tab-pane label="关系信息" name="links">
              <el-tree :data="links" :expand-on-click-node="false" ref="linkTree">
                <template slot-scope="{node, data}">
                  <div
                    :class="['item', {active: `${data.data.from}_${data.data.to}` === currKey}]"
                    @click.prevent="findNode(data)"
                  >
                    <span v-if="data.level === 0">
                      {{node.label}}
                      <i
                        class="iconfont icon-inquiry search"
                        @click.prevent="findNode(data)"
                      ></i>
                    </span>
                    <span v-else>{{node.label}}</span>
                  </div>
                </template>
              </el-tree>
            </el-tab-pane>
            <el-tab-pane label="其它" name="others">
              <el-tree :data="others" :expand-on-click-node="false">
                <template slot-scope="{node, data}">
                  <div class="item">
                    <span v-if="data.level === 0">
                      {{node.label}}
                      <i
                        class="iconfont icon-inquiry search"
                        @click.prevent="findNode(data)"
                      ></i>
                    </span>
                    <span v-else>{{node.label}}</span>
                  </div>
                </template>
              </el-tree>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </slot>
  </div>
</template>
<script>
/**
 * XdhGoViewer 组件
 * @module xdh-go-viewer
 * @description 数据管理器
 */
// import go from 'gojs'
import draggable from '../../../utils/directives/draggable'
import diagramManager from '../../../utils/dataManager/diagramManager'

export default {
  name: 'XdhGoViewer',
  components: {
  },
  directives: {
    draggable
  },
  /**
   * 参数属性
   * @property {String} [diagramName='dig'] go.Diagram对象名称
   * @property {Boolean} [visible=false] 是否可见
   */
  props: {
    diagramName: {
      type: String,
      default: 'dig'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      viewerVisible: false,
      activeName: 'nodes',
      nodes: [],
      links: [],
      others: [],
      clickTimeout: null,
      currKey: ''
    }
  },
  computed: {
    style() {
      return {
        width: '800px'
      }
    }
  },
  watch: {
    viewerVisible(val) {
      this.$emit('update:visible', val)
    },
    visible(val) {
      this.viewerVisible = val
      this.reloadDiagram()
    },
    diagramName(dig) {
      if (dig) {
        this.unbindEvents()
        setTimeout(() => {
          this.bindEvents()
          this.reloadDiagram()
        }, 100)
      }
    }
  },
  methods: {
    reloadDiagram() {
      let modelJson = diagramManager[this.diagramName].model.toJson()
      let model = JSON.parse(modelJson)
      let nodes = [],
        links = []
      if (model.nodeDataArray) {
        nodes = this.getChildren(model.nodeDataArray, 0)
      }
      if (model.linkDataArray) {
        links = this.getChildren(model.linkDataArray, 0)
      }
      let otherObj = {}
      for (let name in model) {
        if (!['nodeDataArray', 'linkDataArray'].includes(name)) {
          otherObj[name] = model[name]
        }
      }
      let others = this.getChildren(otherObj, 0)
      this.nodes = nodes
      this.links = links
      this.others = others
    },
    getChildren(obj, level) {
      if (obj instanceof Array) {
        let arr = []
        obj.forEach(d => {
          let item = { data: d, level: level }
          if (level === 0) {
            if (d.key) {
              item.key = d.key
            } else if (d.from) {
              item.key = `${d.from}_${d.to}`
            }
          }
          let children = this.getChildren(d, level + 1)
          if (children instanceof Array) {
            item.children = children
            item.label = JSON.stringify(d).substr(0, 50)
          } else {
            if (typeof d === 'string') {
              item.label = `${name}:  '${d}'`
            } else {
              item.label = `${name}:  ${d}`
            }
          }
          arr.push(item)
        })
        return arr
      } else if (obj instanceof Object) {
        let arr = []
        for (let name in obj) {
          let d = obj[name]
          let item = { data: d, level: level }
          let children = this.getChildren(d, level + 1)
          if (children instanceof Array) {
            item.children = children
            item.label = `${name}:  ${JSON.stringify(d).substr(0, 50)}`
          } else {
            if (typeof d === 'string') {
              item.label = `${name}:  '${d}'`
            } else {
              item.label = `${name}:  ${d}`
            }
          }
          arr.push(item)
        }
        return arr
      } else {
        return obj
      }
    },
    findNode(item) {
      let nodeData = diagramManager[this.diagramName].model.nodeDataArray.find(
        r => r.key === item.data.key
      )
      if (nodeData) {
        let node = diagramManager[this.diagramName].findNodeForData(nodeData)
        diagramManager[this.diagramName].clearSelection()
        node.isSelected = true
        let rect = node.actualBounds
        diagramManager[this.diagramName].centerRect(rect)
        this.currKey = node.data.key
      } else {
        let name = this.diagramName
        let linkData = diagramManager[name].model.linkDataArray.find(r => {
          return r.from === item.data.from && r.to === item.data.to
        })
        if (linkData) {
          let node = diagramManager[this.diagramName].findLinkForData(linkData)
          diagramManager[this.diagramName].clearSelection()
          if (node) {
            node.isSelected = true
            let rect = node.actualBounds
            diagramManager[this.diagramName].centerRect(rect)
            this.currKey = `${node.data.from}_${node.data.to}`
          }
        }
      }
    },
    close() {
      this.viewerVisible = false
    },
    destroy() {
      if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
    },
    objectClick(obj) {
      if (this.clickTimeout) {
        clearTimeout(this.clickTimeout)
      }
      this.clickTimeout = setTimeout(() => {
        let nodeData = obj.subject.part.data
        if (nodeData.key) {
          this.activeName = 'nodes'
          this.currKey = nodeData.key
        } else if (nodeData.from) {
          this.activeName = 'links'
          this.currKey = `${nodeData.from}_${nodeData.to}`
        }
      }, 300)
    },
    objectDbClick(obj) {
      if (this.clickTimeout) {
        clearTimeout(this.clickTimeout)
      }
      this.clickTimeout = setTimeout(() => {
        console.log(obj, 'dbclick')
      }, 300)
    },
    bindEvents() {
      diagramManager[this.diagramName].addDiagramListener(
        'ObjectSingleClicked',
        this.objectClick
      )
      diagramManager[this.diagramName].addDiagramListener(
        'ObjectDoubleClicked',
        this.objectDbClick
      )
    },
    unbindEvents() {
      diagramManager[this.diagramName].removeDiagramListener(
        'ObjectSingleClicked',
        this.objectClick
      )
      diagramManager[this.diagramName].removeDiagramListener(
        'ObjectDoubleClicked',
        this.objectDbClick
      )
    }
  },
  created() {
    this.viewerVisible = this.visible
  },
  mounted() {
    document.body.appendChild(this.$el)
    if (diagramManager[this.diagramName]) {
      this.reloadDiagram()
    }
  },
  beforeDestroy() {
    this.destroy()
    this.unbindEvents()
  }
}
</script>
<style type="text/scss" lang="scss" scoped>
</style>