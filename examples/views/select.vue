<template>
  <!-- 视图 -->
  <example>
    <xdh-go-select :diagram="diagram" ref="view"></xdh-go-select>
 
    <xdh-go
      :nodes="nodes"
      :links="links"
      :type="model"
      :node-template-map="nodeTemplateMap"
      :link-template="linkTemplate"
      :config="config"
      :layout="layout"
      ref="diagram"
      @on-ready="diagramReady"
      height="600px"
    ></xdh-go>
  </example>
</template>
<script>
import nodeMixin from './nodeMixin'
export default {
  mixins: [nodeMixin],
  components: {},
  props: {},
  data() {
    return {
      diagram: null,
      lock: false,
      nodes: [
        { key: 'A', category: 'a' },
        { key: 'B', category: 'b' },
        { key: 'C', category: 'c' },
        { key: 'D', category: 'a' },
        { key: 'E', category: 'b' },
        { key: 'F', category: 'c' }
      ],
      links: [
        { from: 'A', to: 'B' },
        { from: 'A', to: 'C' },
        { from: 'C', to: 'D' },
        { from: 'B', to: 'E' },
        { from: 'E', to: 'F' }
      ],
      timeout: null
    }
  },
  computed: {},
  methods: {
    add() {
       
    },
    diagramReady(diagram, $, go) {
      this.diagram = diagram
    },
    config($, go) {
      return {
        initialContentAlignment: go.Spot.Center,
        'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom
      }
    },
    nodeTemplate($, go, color) {
      return $(
        go.Node,
        'Auto',
        $(go.Shape, 'Rectangle', {
          portId: '',
          stroke: color,
          fill: color
        }),
        $(
          go.TextBlock,
          'Default Text',
          { margin: 12, stroke: '#ffffff' },
          new go.Binding('text', 'key')
        ),
        new go.Binding('location').makeTwoWay(go.Point.stringify)
      )
    },
    linkTemplate($, go) {
      return $(
        go.Link,
        { curve: go.Link.Bezier },
        $(go.Shape, {
          strokeWidth: 3,
          stroke: '#555'
        }),
        $(go.Shape, {
          toArrow: 'Standard'
        })
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
      return $(go.LayeredDigraphLayout, {})
    }
  },
  created() {}
}
</script>
<style type="text/scss" lang="scss" scoped>
</style>