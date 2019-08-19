<template>
  <example>
    <el-tabs v-model="activeName">
      <el-tab-pane label="图片" name="circleimage">
        <node1></node1>
      </el-tab-pane>
    </el-tabs>
  </example>
</template>
<script>
import node1 from './nodes/node1'
export default {
  components: {
    node1
  },
  data() {
    return {
      activeName: 'circleimage'
    }
  },
  methods: {}
}
</script>