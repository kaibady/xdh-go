<template>
  <example>
    <el-tabs v-model="activeName">
      <el-tab-pane label="颜色" name="color">
        <link1></link1>
      </el-tab-pane>
    </el-tabs>
  </example>
</template>
<script>
import link1 from './links/link1'
export default {
  components: {
    link1
  },
  data() {
    return {
      activeName: 'color'
    }
  },
  methods: {}
}
</script>