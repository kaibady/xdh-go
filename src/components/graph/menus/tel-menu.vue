<template>
  <go-menu ref="menu">
    <circle-menu
      :menu-list="menuItems"
      @on-item-click="itemClick"
      :trigger="'mouseover'"
      :inner-radius="80"
      :angle-range="[0,180]"
      :item-width="80"
      :active-color="'rgba(100, 203, 104, 0.9)'"
      :normal-color="'rgba(100, 203, 104, 0.7)'"
      :item-style="{color: '#fff'}"
      text-rotate
    >
      <template slot="list-item" slot-scope="{item}">
        <div
          class="text"
          :style="{color: '#000', position: 'relative', left: (item.offset[0] || 0) + 'px', top: (item.offset[1] || 0) + 'px'}"
        >
          <i :class="(item.icon || '')" style="font-size: 25px;"></i>
          <div style="margin-top:-14px;">{{item.text}}</div>
        </div>
      </template>
    </circle-menu>
  </go-menu>
</template>
<script>
import goMenu from '@/widgets/xdh-go/go-menu'
import circleMenu from '@/widgets/xdh-go/menus/circle-menu'
import menuItems from '@/helper/graph/menus/telMenu'
export default {
  components: {
    goMenu,
    circleMenu
  },
  props: {},
  data() {
    return {
      menuItems
    }
  },
  computed: {},
  methods: {
    itemClick(event, val) {
      // this.$message({ type: 'info', message: `点击了${val.text}` })
      this.$emit('item-click', 'telMenu', val)
    },
    bindMenu() {
      return this.$refs.menu.bindMenu()
    }
  },
  created() {}
}
</script>
<style type="text/scss" lang="scss" scoped>
</style>