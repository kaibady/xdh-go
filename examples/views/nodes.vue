<template>
  <example>
    <xdh-go-tool :diagram="diagram"></xdh-go-tool>
    <el-tabs v-model="activeName" @tab-click="tabChange">
      <el-tab-pane label="类型" name="circleimage">
        <node1 ref="circleimage" @diagram-change="diagramChange"></node1>
      </el-tab-pane>
      <el-tab-pane label="样式" name="style">
        <node2  ref="style"></node2>
      </el-tab-pane>
    </el-tabs>
  </example>
</template>
<script>
import node1 from './nodes/node1'
import node2 from './nodes/node2'
export default {
  components: {
    node1,
    node2
  },
  data() {
    return {
      activeName: 'circleimage',
      diagram: null
    }
  },
  methods: {
    tabChange(tab) {
      this.diagram = this.$refs[tab.name].diagram
      this.$refs[tab.name].$refs.go.resize()
    },
    diagramChange(diagram) {
      this.diagram = diagram
    }
  }
}
</script>