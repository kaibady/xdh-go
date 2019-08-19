<template>
  <!--  -->
  <div>
    <xdh-go-tool :diagram="diagram"></xdh-go-tool>
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
    ></xdh-go>
  </div>
</template>
<script>
import node from '../../../utils/template/node'
import link from '../../../utils/template/link'
let DIR = '/docs/node/'
export default {
  components: {},
  data() {
    return {
      diagram: null,
      model: 'GraphLinksModel',
      nodes: [
        {
          key: 1,
          shape: 'circularImage',
          image: DIR + '1.png',
          label: '1pngfsdfsdfsdafsdaf'
        },
        {
          key: 2,
          shape: 'circularImage',
          image: DIR + '2.png',
          label: '1pngfsdfsdfsdafsdaf'
        },
        {
          key: 3,
          shape: 'circularImage',
          image: DIR + '3.png',
          label: '1pngfsdfsdfsdafsdaf'
        },
        {
          key: 4,
          shape: 'circularImage',
          image: DIR + '4.png',
          label: 'pictures by this guy!'
        },
        {
          key: 5,
          shape: 'circularImage',
          image: DIR + 'missing.png',
          brokenImage: DIR + 'missingBrokenImage.png',
          label: 'when images\nfail\nto load'
        },
        {
          key: 6,
          shape: 'circularImage',
          image: DIR + 'anotherMissing.png',
          brokenImage: DIR + '9.png',
          label: 'fallback image in action'
        },
        {
          key: 7,
          shape: 'circularImage',
          image: DIR + '3.png',
          label: '1pngfsdfsdfsdafsdaf'
        },
        {
          key: 8,
          shape: 'circularImage',
          image: DIR + '4.png',
          label: 'pictures by this guy!'
        }
      ],
      links: [
        { from: 1, to: 8, arrows: 'to', dashes: true },
        { from: 1, to: 3, arrows: 'to' },
        { from: 1, to: 2, arrows: 'to, from' },
        { from: 2, to: 4, arrows: 'to, middle' },
        { from: 2, to: 5, arrows: 'to, middle, from' },
        { from: 5, to: 6, arrows: { to: { scaleFactor: 2 } } },
        { from: 6, to: 7, arrows: { middle: { scaleFactor: 0.5 }, from: true } }
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
      return new go.TreeLayout()
    },
    diagramReady(diagram, $, go) {
      this.diagram = diagram
    },
    nodeTemplate($, go) {
      return node($, go)
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