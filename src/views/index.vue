<template>
  <div class="index-page">
    <div class="graph-con">
      <!--布局菜单 -->
      <layout-menu @item-click="layoutChange"></layout-menu>
      <xdh-go
        style="background-color: #232b45;"
        :nodes="nodes"
        :links="links"
        :type="model"
        :node-template-map="nodeTemplateMap"
        :link-template-map="linkTemplateMap"
        :config="config"
        :layout="layout"
        :events="bindDiagramEvents()"
        @on-ready="diagramReady"
        ref="go"
        height="500px"
      ></xdh-go>
      <go-menu ref="menu" :before-show-menu="beforeShowMenu" :show-context-menu="showContextMenu">
        <circle-menu
          ref="circleMenu"
          :menu-list="nodeMenu.menuItems"
          @on-item-click="contextMenuClick"
          :trigger="'mouseover'"
          :inner-radius="25"
          :angle-range="nodeMenu.angleRange"
          :item-width="70"
          :active-color="nodeMenu.activeColor"
          :normal-color="nodeMenu.normalColor"
          :item-style="{color: '#fff'}"
          :text-rotate="true"
          :item-gap="15"
        >
          <template slot="list-item" slot-scope="{item}">
            <div
              class="text"
              :style="{color: '#fff', position: 'relative', left: (item.offset && item.offset[0] || 0) + 'px', top: (item.offset && item.offset[1] || 0) + 'px'}"
            >
              <i v-if="item.icon" :class="(item.icon || '')" style="font-size: 20px;"></i>
              <div style="margin-top:-12px;font-size: 12px;">{{item.text}}</div>
            </div>
          </template>
        </circle-menu>
      </go-menu>
    </div>
    <node-parts style="height: 500px;"></node-parts>
  </div>
</template>

<script>
import XdhGo from '@/widgets/xdh-go'
import nodeTmpl from '@/helper/relation/node-template'
import linkTmpl from '@/helper/relation/link-template'
import transformData from '@/helper/relation/transformData'
import GoMenu from '@/widgets/xdh-go/go-menu'
import CircleMenu from '@/widgets/xdh-go/menus/circle-menu'
import { nodeMenu } from '@/helper/relation/vars'
import * as dgUtils from '@/helper/relation/utils/diagram'
import * as context from '@/helper/relation/menus/contextMenu'
import * as events from '@/helper/relation/events'
import LayoutMenu from './layout-menu'
import { layoutChange, getLayout } from '@/helper/relation/layout'
import NodeParts from './node-parts'
export default {
  name: 'diagram',
  components: {
    XdhGo,
    GoMenu,
    CircleMenu,
    LayoutMenu,
    NodeParts
  },
  data() {
    return {
      nodeMenu,
      model: 'GraphLinksModel',
      nodes: [],
      links: []
    }
  },
  methods: {
    // 圆形菜单方法
    beforeShowMenu: context.beforeShowMenu,
    showContextMenu: context.showContextMenu,
    contextMenuClick: context.contextMenuClick,
    // digram 的事件监听
    bindToolEvents: events.bindToolEvents,
    bindDiagramEvents: events.bindDiagramEvents,
    // diagram操作方法
    getDiagram: dgUtils.getDiagram,
    getGraph() {
      return this.$refs.go
    },
    getModel: dgUtils.getModel,
    getLastSelection: dgUtils.getLastSelection,
    getSelections: dgUtils.getSelections,
    highlightNode: dgUtils.highlightNode,
    highlightLink: dgUtils.highlightLink,
    // 布局相关方法
    layoutChange,
    layout($, go) {
      return getLayout['ForceDirectedLayout']($, go, this)
    },
    config($, go) {
      return {
        allowZoom: true, // 允许缩放
        initialViewportSpot: go.Spot.Center,
        initialContentAlignment: go.Spot.Center,
        padding: new go.Margin(50, 50, 50, 50),
        hasVerticalScrollbar: false,
        'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom
      }
    },
    linkTemplateMap($, go) {
      return linkTmpl($, go, {
        click: (e, node) => {
          events.linkMouseClick(e, node, this)
        },
        mouseEnter: (e, node) => {
          events.linkMouseEnter(e, node, this)
        },
        mouseLeave: (e, node) => {
          events.linkMouseLeave(e, node, this)
        }
      })
    },
    nodeTemplateMap($, go) {
      return nodeTmpl($, go, {
        contextMenu: this.$refs.menu.bindMenu(),
        mouseEnter: (e, node) => {
          events.nodeMouseEnter(e, node, this)
        },
        mouseLeave: (e, node) => {
          events.nodeMouseLeave(e, node, this)
        },
        click: (e, node) => {
          events.nodeMouseClick(e, node, this)
        },
        doubleClick: (e, node) => {
          events.nodeMouseDbClick(e, node, this)
        },
        mouseHold: (e, node) => {
          events.nodeMouseHold(e, node, this)
        },
        mouseDragEnter: (e, node) => {
          events.nodeMouseDragEnter(e, node, this)
        }
      })
    },
    loadGraph() {
      let data = [
        {
          type: '04',
          nodeCode: '1',
          text: '比亚迪',
          parentCode: ''
        },
        {
          type: '04',
          nodeCode: '2',
          text: '宝马',
          parentCode: '1'
        },
        {
          type: '04',
          nodeCode: '3',
          text: '斯巴鲁',
          parentCode: '1'
        },
        {
          type: '04',
          nodeCode: '4',
          text: '本田',
          parentCode: '2'
        },
        {
          type: '04',
          nodeCode: '5',
          text: '夏利',
          parentCode: '2'
        }
      ]
      setTimeout(() => {
        let { nodes, links } = transformData(data)
        this.nodes = nodes
        this.links = links
      }, 300)
    },
    diagramReady(diagram, $, go) {
      this.bindDiagramEvents(diagram, $, go)
      this.loadGraph()
      setTimeout(() => {
        this.layoutChange('LayeredDigraphLayout')
      }, 100)
    }
  },
  created() {}
}
</script>

<style scoped lang="scss">
.index-page {
  text-align: center;
}
.graph-con {
  position: relative;
}
</style>
