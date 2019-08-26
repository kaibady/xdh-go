<template>
  <!--  -->
  <div>
    <xdh-go
      :nodes="nodes"
      :links="links"
      :type="model"
      :node-template="nodeTemplate"
      :link-template="linkTemplate"
      :config="config"
      :layout="layout"
      @on-ready="diagramReady"
      height="600px"
      ref="go"
    ></xdh-go>
  </div>
</template>
<script>
import node from '../../../utils/template/node'
import link from '../../../utils/template/link'
let DIR = '/docs/node/circleimage/'
let DIR2 = '/docs/node/image/'
export default {
  components: {},
  data() {
    return {
      diagram: null,
      model: 'GraphLinksModel',
      nodes: [
        {
          key: 1,
          shape: 'Rectangle',
          fill: 'yellow',
          stroke: 'blue',
          image: DIR + '1.png',
          label: '1',
          size: 60,
          stroke: {
            select: 'red',
            normal: 'yellow',
            highlight: 'green'
          }
        },
        {
          key: 2,
          shape: 'image',
          image: DIR2 + '1.png',
          label: '2'
        },
        {
          key: 3,
          shape: 'image',
          image: DIR2 + '2.png',
          label: '3'
        },
        {
          key: 4,
          shape: 'icon',
          icon: '\uE7BD',
          label: '4'
        },
        {
          key: 5,
          shape: 'circularImage',
          image: DIR + 'missing.png',
          brokenImage: DIR + 'missingBrokenImage.png',
          label: '5',
          hidden: true
        },
        {
          key: 6,
          shape: 'circularImage',
          image: DIR + 'anotherMissing.png',
          brokenImage: DIR + '9.png',
          label: '6'
        },
        {
          key: 7,
          shape: 'circularImage',
          image: DIR + '3.png',
          label: '7'
        },
        {
          key: 8,
          shape: 'circularImage',
          image: DIR + '4.png',
          label: '8',
          shadow: true
        }
      ],
      links: [
        { from: 1, to: 8, arrows: 'to', dashes: true },
        { from: 1, to: 3, arrows: 'to' },
        { from: 1, to: 2, arrows: 'to, from' },
        { from: 2, to: 4, arrows: 'to, middle' },
        { from: 2, to: 5, arrows: 'to, middle, from' },
        {
          from: 5,
          to: 6,
          arrows: { to: { scaleFactor: 2, type: 'Triangle' } }
        },
        {
          from: 6,
          to: 7,
          arrows: { from: { scaleFactor: 3, type: 'Boomerang' } }
        }
      ]
    }
  },
  computed: {},
  methods: {
    config($, go) {
      return {
        initialContentAlignment: go.Spot.Center
      }
    },
    layout($, go) {
      return $(go.ForceDirectedLayout, {})
    },
    diagramReady(diagram, $, go) {
      this.diagram = diagram
    },
    nodeTemplate($, go) {
      return node($, go, {
        props: {
          font: `30px "iconfont"`
        }
      })
    },
    linkTemplate($, go) {
      return link($, go)
    }
  },
  created() {}
}
</script>
<style type="text/scss" lang="scss" scoped>
</style>