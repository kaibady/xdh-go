<template>
  <example>
    <xdh-go-draft ref="draft" :visible.sync="draftShow" :diagram="diagram"></xdh-go-draft>
    <xdh-go
      :nodes="nodes"
      :links="links"
      :type="model"
      :node-template-map="nodeTemplateMap"
      :link-template="linkTemplate"
      :config="config"
      :layout="layout"
      @on-ready="diagramReady"
      height="200px"
    ></xdh-go>
  </example>
</template>
<script>
import nodeMixin from './nodeMixin'
export default {
  mixins: [nodeMixin],
  data() {
    return {
      diagram: null,
      draftShow: true
    }
  },
  methods: {
    diagramReady(diagram, $, go) {
      this.diagram = diagram
    },
    nodeTemplate(
      $,
      go,
      color
    ) {
      return $(
        go.Node,
        'Auto',
        { background: color },
        $(
          go.TextBlock,
          'Default Text',
          { margin: 12, stroke: '#ffffff' },
          new go.Binding('text', 'key')
        ),
        new go.Binding('location').makeTwoWay()
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
    },
    layout($, go) {
      return new go.Layout()
    }
  }
}
</script>