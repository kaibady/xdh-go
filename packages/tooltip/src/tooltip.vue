<template>
  <div class="xdh-go-tooltip">
    <slot :text="text">
      <div class="tooltip-text">
         {{text}}
      </div>
    </slot>
  </div>
</template>
<script>
export default {
  name: 'XdhGoTooltip',
  components: {},
  props: {
    text: {
      type: String,
      default: 'tips'
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
  },
  created() {},
  beforeDestroy() {
    this.$el.parentNode.removeChild(this.$el)
  }
}
</script>
<style type="text/scss" lang="scss" scoped>

</style>