
<template>
  <div class="xdh-go__select" @keyup.enter="search">
    <slot>
      <el-input
        placeholder="输入检索内容"
        v-model="keyword"
        size="small"
        class="input-with-select"
        clearable
      >
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </slot>
  </div>
</template>
<script>
export default {
  name: 'XdhGoSearch',
  components: {},
  props: {
    diagram: {
      type: Object,
      default() {
        return null
      }
    },
    pullCenter: {
      type: Boolean,
      default: true
    },
    ignoreCase: {
      type: Boolean,
      default: true
    },
    // 搜索节点的key
    nodeKeys: {
      type: Array,
      default() {
        return ['key']
      }
    },
    // 搜索连接的key
    linkKeys: {
      type: Array,
      default() {
        return ['key']
      }
    },
    // 搜索模式， 可以只搜索节点或者连接，或者两者都搜索
    mode: {
      type: String,
      default() {
        return 'node'
      },
      validator(val) {
        return ['node', 'link', 'node,link'].includes(val)
      }
    }
  },
  data() {
    return {
      keyword: '',
      // 用于放置搜索关键词，如果关键词不变，顺次查找下一个节点
      keywordCache: '',
      // 用来放置搜索的结果数组，与index结合实现查找下一个功能
      resultCache: [],
      index: 0
    }
  },
  computed: {},
  methods: {
    search() {
      if (!this.keyword) {
        this.$emit('error', 'keyword-empty')
        return
      }
      // 如果搜索关键字不变，index加1
      if (this.keyword === this.keywordCache) {
        this.index = (this.index + 1) % this.resultCache.length
      } else {
        this.index = 0
      }
      this.searchNode()
      if (this.resultCache.length !== 0) {
        let node = this.resultCache[this.index]
        node.isSelected = true
        if (this.pullCenter) {
          let rect = node.actualBounds
          this.diagram.centerRect(rect)
        }
        this.$emit('search', node, this.resultCache, this.index, this.keyword)
      } else {
        this.$emit('error', 'no-result')
      }
    },
    searchNode() {
      this.keywordCache = this.keyword
      this.diagram.clearSelection()
      let nodes = []
      // 查找节点数组
      if (this.mode.includes('node')) {
        this.diagram.nodes.each(n => {
          let hit = false // 是否命中
          this.nodeKeys.forEach(k => {
            let keywords = k.split('.')
            let d = this.getData(n.data, keywords)
            if (typeof d === 'string') {
              if (this.ignoreCase) {
                if (d.toLowerCase().includes(this.keyword.toLowerCase())) {
                  hit = true
                }
              } else {
                if (d.includes(this.keyword)) {
                  hit = true
                }
              }
            }
          })
          if (hit) {
            nodes.push(n)
          }
        })
      }
      if (this.mode.includes('link')) {
        this.diagram.links.each(n => {
          let hit = false
          this.linkKeys.forEach(k => {
            let keywords = k.split('.')
            let d = this.getData(n.data, keywords)
            if (this.ignoreCase) {
              if (typeof d === 'string') {
                if (d.toLowerCase().includes(this.keyword.toLowerCase())) {
                  hit = true
                }
              } else {
                if (d.includes(this.keyword)) {
                  hit = true
                }
              }
            }
            if (hit) {
              nodes.push(n)
            }
          })
        })
      }
      //   console.log(nodes.map(r => r.data.key))
      if (nodes.length !== 0) {
        this.resultCache = nodes
      } else {
        this.resultCache = []
      }
    },
    getData(data, keywords) {
      if (keywords.length !== 0) {
        let key = keywords.shift()
        if (data[key]) {
          return this.getData(data[key], keywords)
        } else {
          return ''
        }
      } else {
        return data
      }
    }
  },
  created() {}
}
</script>
<style type="text/scss" lang="scss" scoped>
.input-with-select {
  float: left;
  width: 300px;
  margin-left: 25px;
  & /deep/ .el-input__inner {
    border: 1px solid #151929;
    background-color: #1c2237;
    border-right-width: 0;
    color: #fff;
    &::-webkit-input-placeholder {
      color: #fff;
    }
  }
  & /deep/ .el-input-group__append {
    border: 1px solid #151929;
    background-color: #1c2237;
    border-left-width: 0;
    color: #fff;
    font-size: 18px;
  }
}
.xdh-go__select {
  position: fixed;
  z-index: 999;
  top: 100px;
}
</style>
