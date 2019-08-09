<template>
  <example>
    <xdh-go
      :nodes="nodes"
      :links="links"
      :type="model"
      :node-template-map="nodeTemplateMap"
      :link-template="linkTemplate"
      :config="config"
      :layout="layout"
      height="200px"
    >
      <xdh-go-html
        menu-name="circleMenu"
        :before-show-menu="beforeShowMenu"
        :show-context-menu="showMenu"
      >
        <xdh-go-circle-menu v-bind="menuOptions" @on-item-cick="menuClick">
          <template slot="list-item" slot-scope="{item}">
            <div class="text">
              <i v-if="item.icon" :class="(item.icon || '')" style="font-size: 20px"></i>
              <div style="margin-top:-12px;font-size:12px;">{{item.label}}</div>
            </div>
          </template>
        </xdh-go-circle-menu>
      </xdh-go-html>
    </xdh-go>
  </example>
</template>
<script>
import nodeMixin from './nodeMixin'
export default {
  mixins: [nodeMixin],
  data() {
    return {
      menuOptions: {
        menuList: [],
        trigger: 'mouseover',
        innerRadius: 25,
        angleRange: [-90, 270],
        itemWidth: 70,
        activeColor: 'rgba(0, 153, 204, .95)',
        normalColor: 'rgba(0, 114, 172, .95)',
        itemStyle: { color: '#fff' },
        textRotate: true,
        itemGap: 15
      }
    }
  },
  methods: {
    beforeShowMenu(obj, diagram, tool, menu) {
      this.menuOptions.menuList = [
        { tag: 'edit', label: '编辑', icon: 'iconfont icon-edit' },
        { tag: 'delete', label: '删除', icon: 'iconfont icon-delete' }
      ]
      let menuLength = this.menuOptions.menuList.length
      if (menuLength < 5) {
        this.menuOptions.angleRange = {
          1: [45, 135],
          2: [30, 150],
          3: [0, 180],
          4: [-30, 210]
        }[menuLength]
      } else {
        this.menuOptions.angleRange = [-90, 270]
      }
    },
    showMenu(obj, diagram, tool, menu) {
      menu.style.display = 'block'
      let el = diagram.div
      let offset = el.getBoundingClientRect()
      let point = diagram.transformDocToView(obj.actualBounds.center)
      menu.style.left = point.x + offset.left + 'px'
      menu.style.top = point.y + offset.top + 'px'
    },
    menuClick(item) {
      this.$message({
        type: 'info',
        message: `点击了:${item.tag}`
      })
    },
    nodeTemplate(
      $,
      go,
      color,
      {
        htmlInfo: { circleMenu }
      }
    ) {
      return $(
        go.Node,
        'Auto',
        { background: color, contextMenu: circleMenu },
        $(
          go.TextBlock,
          'Default Text',
          { margin: 12, stroke: '#ffffff' },
          new go.Binding('text', 'key')
        )
      )
    },
    linkTemplate($, go) {
      return $(
        go.Link,
        { routing: go.Link.Orthogonal, corner: 5 },
        $(go.Shape, { strokeWidth: 3, stroke: '#555' })
      )
    },
    nodeTemplateMap($, go, vm) {
      const a = this.nodeTemplate($, go, 'red', vm)
      const b = this.nodeTemplate($, go, 'blue', vm)
      const c = this.nodeTemplate($, go, 'green', vm)
      const map = new go.Map()
      map.add('a', a)
      map.add('b', b)
      map.add('c', c)
      return map
    }
  }
}
</script>