<template>
  <div class="layout-menu">
    <ul>
      <!--环形-->
      <!--<li @click="changeLayout('RadialLayout')">-->
        <!--<el-tooltip :content="'环形'" placement="left" effect="light" popper-class="invest-graph">-->
          <!--<i class="iconfont icon-bullseye icon"></i>-->
        <!--</el-tooltip>-->
      <!--</li>-->
      <!--分层-->
      <!--GenogramLayout  LayeredDigraphLayout-->
      <li @click="changeLayout('LayeredDigraphLayout')">
        <el-tooltip :content="'分层'" placement="left" effect="light" popper-class="invest-graph">
          <i class="iconfont icon-Tandem icon"></i>
        </el-tooltip>
      </li>
      <!--力导向-->
      <li @click="changeLayout('ForceDirectedLayout')">
        <el-tooltip :content="'力导向'" placement="left" effect="light" popper-class="invest-graph">
          <i class="iconfont icon-relation icon"></i>
        </el-tooltip>
      </li>
      <!--网格-->
      <li @click="changeLayout('GridLayout')">
        <el-tooltip :content="'网格'" placement="left" effect="light" popper-class="invest-graph">
          <i class="iconfont icon-nine-squares icon"></i>
        </el-tooltip>
      </li>
      <!--圆形-->
      <li @click="changeLayout('CircularLayout')">
        <el-tooltip :content="'圆形'" placement="left" effect="light" popper-class="invest-graph">
          <i class="iconfont icon-collaboration-system icon"></i>
        </el-tooltip>
      </li>
      <!--树形-->
      <li @click="changeLayout('TreeLayout')">
        <el-tooltip :content="'树形'" placement="left" effect="light" popper-class="invest-graph">
          <i class="iconfont icon-map-site icon"></i>
        </el-tooltip>
      </li>
    </ul>
  </div>
</template>
<script>
// import go from 'gojs'
export default {
  components: {},
  props: {},
  data() {
    return {
      // go
    }
  },
  computed: {},
  methods: {
    changeLayout(type) {
      this.$emit('item-click', type)
    }
  },
  created() {}
}
</script>
<style type="text/scss" lang="scss" scoped>
.layout-menu {
  position: absolute;
  z-index: 4;
  left: 20px;
  bottom: 20px;
  width: 40px;
  ul {
    list-style: none;
    padding: 0;
    li {
      background-color: rgba(28, 34, 55, 0.8);
      color: #fff;
      padding: 10px 9px;
      border-color: #121417;
      border-style: solid;
      border-width: 0 1px;
      cursor: pointer;
      .icon {
        font-size: 20px;
      }
    }
    li + li {
      border-top-width: 1px;
    }
    li:first-child {
      border-top-width: 1px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    li:last-child {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
}
</style>
