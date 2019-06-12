<template>
  <xdh-slide-panel title="''" :style="styles" :collapsed.sync="collapsed" position="right">
    <span slot="title"></span>
    <el-tabs type="border-card" class="slide-panel">
      <el-tab-pane label="基本信息" class="base-info">
        <div class="info">
          <span>串并名称：</span>
          <span></span>
        </div>
        <div class="info">
          <span>创建时间：</span>
          <span></span>
        </div>
        <div class="info">
          <span>串并类型：</span>
          <span></span>
        </div>
        <el-table border>
          <el-table-column label="案件编号" prop="caseId"></el-table-column>
          <el-table-column label="案件名称" prop="caseId"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button icon="el-icon-plus" @click="addCase(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="统计信息" class="statistic">
        <div class="title">节点</div>
        <div class="info"></div>
        <div class="title">关系</div>
        <div class="info"></div>
      </el-tab-pane>
      <el-tab-pane label="导侦轨迹" class="track">
        <div class="info">
          <span>研判对象：</span>
          <span></span>
        </div>
        <div class="info">
          <span>研判战法：</span>
          <span></span>
        </div>
        <div class="info">
          <span>研判时间：</span>
          <span></span>
        </div>
        <div class="info">
          <span>研判人：</span>
          <span></span>
        </div>
        <div class="info">
          <span>研判成果：</span>
          <span></span>
        </div>
      </el-tab-pane>
    </el-tabs>
  </xdh-slide-panel>
</template>
<script>
import xdhSlidePanel from '@/widgets/xdh-slide-panel'
export default {
  components: {
    xdhSlidePanel
  },
  props: {
    slideShow: {
      type: Boolean
    }
  },
  data() {
    return {
      collapsed: false,
      styles: {
        width: '380px',
        height: 'calc(100% - 40px)',
        'margin-top': '20px'
      }
    }
  },
  watch: {
    collapsed(val) {
      this.$emit('update:slideShow', !val)
    },
    slideShow: {
      immediate: true,
      handler(val) {
        this.collapsed = !val
      }
    }
  },
  computed: {},
  methods: {},
  created() {}
}
</script>
<style type="text/scss" lang="scss" scoped>
</style>