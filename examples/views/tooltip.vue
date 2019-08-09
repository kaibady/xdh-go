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
      <xdh-go-html menu-name="tool1">
        <xdh-go-tooltip :text="'提示'"></xdh-go-tooltip>
      </xdh-go-html>
    </xdh-go>
  </example>
</template>
<script>
import nodeMixin from './nodeMixin'
export default {
  mixins: [nodeMixin],
  data() {
    return {}
  },
  methods: {
    config($, go) {
      return {
         initialContentAlignment: go.Spot.Center,
         'toolManager.hoverDelay': 100
      }
    },
    nodeTemplate(
      $,
      go,
      color,
      {
        htmlInfo: { tool1 }
      }
    ) {
      return $(
        go.Node,
        'Auto',
        { background: color, toolTip: tool1 },
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