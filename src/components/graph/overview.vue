<template>
  <div class="overview"></div>
</template>
<script>
  import go from 'gojs'
  let $ = go.GraphObject.make;
  export default {
    props: {
      diagram: {
        type: Object,
        default() {
          return null
        }
      }
    },
    methods: {
      setOverview() {
        $(go.Overview, 'myoverview', {observed: this.diagram, contentAlignment: go.Spot.Center})
      }
    },
    created() {
      this.setOverview()
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  .overview {
    position: absolute;
    left: 0;
    top: 0;
    width: 150px;
    height: 150px;
  }
</style>
