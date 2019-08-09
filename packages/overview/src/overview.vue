<template>
  <div :style="style"></div>
</template>
<script>
export default {
  name: 'XdhGoOverview',
  inject: ['$', 'go', 'diagram'],
  components: {},
  props: {
    divStyle: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      name: 'XdhGoOverview',
      defaultStyle: {
        position: 'absolute',
        left: '10px',
        bottom: '10px',
        width: '150px',
        height: '150px',
        border: '2px solid #75a3fa',
        'z-index': 9999,
        'background-color': 'rgba(100,100,100,0.4)'
      },
      style: {}
    }
  },
  computed: {},
  methods: {},
  mounted() {
    let el = this.$el
    let go = this.go
    this.$parent.$once('on-ready', () => {
      new go.Overview(el).observed = this.$parent.diagram
      this.$parent.$el.appendChild(el)
    })
  },
  created() {
    this.style = Object.assign({}, this.defaultStyle, this.divStyle)
  }
}
</script>
<style type="text/scss" lang="scss" scoped>
</style>