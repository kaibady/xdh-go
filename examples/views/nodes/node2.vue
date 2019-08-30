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
import { spotPanel, iconfont } from '../../../utils/node-parts'
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
          image: DIR + '1.png',
          label: '1',
          labelBackground: {
            select: 'red'
          },
          labelStroke: {
            select: '#fff'
          },
          size: 60,
          strokeColor: {
            select: 'red',
            normal: 'yellow',
            highlight: 'green'
          },
          strokeWidth: {
            select: 5,
            normal: 1,
            highlight: 3
          }
        },
        {
          key: 2,
          shape: 'image',
          image: DIR2 + '1.png',
          label: { text: '2', editable: true },
          strokeWidth: {
            normal: 0,
            hover: 0
          },
          strokeColor: {
            normal: 'blue',
            hover: 'red'
          },
          clipShape: 'Rectangle',
          tooltip: {
            text: 'fdsfsf',
            background: 'red',
            stroke: 'white'
          }
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
          label: '4',
          loc: '100 100'
        },
        {
          key: 5,
          shape: 'clipImage',
          image: DIR + 'missing.png',
          brokenImage: DIR + 'missingBrokenImage.png',
          label: '5'
        },
        {
          key: 6,
          shape: 'clipImage',
          image: DIR + 'anotherMissing.png',
          brokenImage: DIR + '9.png',
          label: {
            text: '6',
            margin: [10, 0, 0, 0]
          }
        },
        {
          key: 7,
          shape: 'clipImage',
          image: DIR + '3.png',
          label: '7'
        },
        {
          key: 8,
          shape: 'clipImage',
          image: DIR + '4.png',
          label: '8',
          shadow: true,
          clipShape: 'Rectangle',
          strokeWidth: 0
        }
      ],
      links: [
        { from: 1, to: 8, arrows: 'to', dashes: true },
        { from: 1, to: 3, arrows: 'to' },
        { from: 1, to: 2, arrows: 'to, from' },
        { from: 2, to: 4, arrows: { from: { type: 'Triangle', show: true } } },
        { from: 2, to: 5, arrows: 'to,from' },
        {
          from: 5,
          to: 6,
          arrows: { to: { scale: 2, type: 'Triangle' } }
        },
        {
          from: 6,
          to: 7,
          arrows: { from: { scale: 3, type: 'Boomerang' } }
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
          size: 60
        },
        parts: [
          spotPanel($, go, {
            props: {
              alignment: new go.Spot(1, 0)
            },
            parts: [
              iconfont($, go, {
                icon: '\uE6fD'
              })
            ]
          })
        ],
        events: {
          mouseEnter(e, n) {
            console.log('mouseEnter方法')
          }
        }
      })
    },
    linkTemplate($, go) {
      return link($, go, {
        events: {
          mouseEnter(e, n) {
            console.log('link mouseenter')
          }
        }
      })
    }
  },
  created() {}
}
</script>
<style type="text/scss" lang="scss" scoped>
</style>