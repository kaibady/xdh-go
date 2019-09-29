
<template>
  <div :class="`xdh-go-search ${customClass}`" :style="customStyle" @keyup.enter="search">
    <slot :search="search" :keyword="keyword">
      <el-popover
        v-model="popoverShow"
        ref="popover"
        placement="bottom"
        :title="searchKey"
        :content="searchResult"
      ></el-popover>
      <el-input
        v-popover:popover
        placeholder="输入检索内容"
        v-model="keyword"
        size="small"
        class="xdh-go-search__input"
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
        return ['node', 'link', 'node,link', 'link,node'].includes(val)
      }
    },
    customClass: {
      type: String,
      default: ''
    },
    customStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    popDuration: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      keyword: '',
      // 用于放置搜索关键词，如果关键词不变，顺次查找下一个节点
      keywordCache: '',
      // 用来放置搜索的结果数组，与index结合实现查找下一个功能
      resultCache: [],
      index: 0,
      searchKey: '',
      searchResult: '',
      popoverShow: false
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
        let result = this.resultCache[this.index]
        this.searchKey = `${result.type}   ${result.keyword}`
        this.searchResult = `比中内容:${result.hit}`
        this.popoverShow = true
        setTimeout(() => {
          this.popoverShow = false
        }, this.popDuration)
        let node = result.node
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
          let hitKeywords = []
          let hitText = []
          this.nodeKeys.forEach(k => {
            let keywords = k.split('.')
            let d = this.getData(n.data, keywords)
            if (typeof d === 'string') {
              if (this.ignoreCase) {
                if (d.toLowerCase().includes(this.keyword.toLowerCase())) {
                  hit = true
                  hitKeywords.push(k)
                  hitText.push(`${k}:${d}`)
                }
              } else {
                if (d.includes(this.keyword)) {
                  hit = true
                  hitKeywords.push(k)
                  hitText.push(`${k}:${d}`)
                }
              }
            }
          })
          if (hit) {
            nodes.push({
              type: '节点',
              keyword: hitKeywords.join(','),
              hit: hitText.join('\n'),
              node: n
            })
          }
        })
      }
      if (this.mode.includes('link')) {
        this.diagram.links.each(n => {
          let hit = false
          let hitKeywords = []
          let hitText = []
          this.linkKeys.forEach(k => {
            let keywords = k.split('.')
            let d = this.getData(n.data, keywords)
            if (typeof d === 'string') {
              if (this.ignoreCase) {
                if (d.toLowerCase().includes(this.keyword.toLowerCase())) {
                  hit = true
                  hitKeywords.push(k)
                  hitText.push(`${k}:${d}`)
                }
              } else {
                if (d.includes(this.keyword)) {
                  hit = true
                  hitKeywords.push(k)
                  hitText.push(`${k}:${d}`)
                }
              }
            }
            if (hit) {
              nodes.push({
                type: '连线',
                keyword: hitKeywords.join(','),
                hit: hitText.join('\n'),
                node: n
              })
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
</style>
