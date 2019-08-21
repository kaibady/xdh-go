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
          label: '1'
        },
        {
          key: 2,
          shape: 'circularImage',
          image: DIR + '2.png',
          label: '2'
        },
        {
          key: 3,
          shape: 'circularImage',
          image: DIR + '3.png',
          label: '3'
        },
        {
          key: 4,
          shape: 'circularImage',
          image: DIR + '4.png',
          label: '4'
        },
        {
          key: 5,
          shape: 'circularImage',
          image: DIR + 'missing.png',
          brokenImage: DIR + 'missingBrokenImage.png',
          label: '5'
        }
      ],
      links: [
        { from: 1, to: 4, arrows: 'to', dashes: true, hidden: true },
        { from: 1, to: 3, arrows: 'to', color: { color: 'red' } },
        {
          from: 1,
          to: 2,
          arrows: 'to, from',
          color: { color: 'rgba(30,30,30,0.2)', highlight: 'blue' }
        },
        { from: 2, to: 5, arrows: 'to, middle' }
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
      setTimeout(() => {
         let link = this.diagram.findLinkForData(this.links[2])
         link.isHighlighted = true
      }, 2000)
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