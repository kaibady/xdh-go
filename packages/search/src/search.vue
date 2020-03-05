
<template>
  <div :class="`xdh-go-search ${customClass}`" :style="customStyle" @keyup.enter="search">
    <slot
      :search="search"
      :keyword="keyword"
      :searchResult="searchResult"
      :resultCache="resultCache"
      :index="index"
      :popoverShow="popoverShow"
    >
      <el-popover v-model="popoverShow" ref="popover" trigger="manual" popper-class="xdh-go-popover" placement="bottom">
        <slot name="popover" :searchResult="searchResult" :keyword="keyword">
          <div>比中类型: {{searchResult.type}}</div>
          <div>关键字: {{keyword}}</div>
          <div>比中字段: {{searchResult.keyword}}</div>
          <div>比中内容: {{searchResult.hit}}</div>
        </slot>
      </el-popover>
      <el-input
        v-popover:popover
        placeholder="输入检索内容"
        v-model="keyword"
        @change="keywordChange"
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
/**
 * XdhGoSearch组件
 * @module xdh-go-search
 * @description 搜索组件
 */
/**
 * 插槽
 * @member slots
 * @property {String} [default] 搜索框插槽,slot-scope =
 * @property {Function} [default.search] 搜索方法
 * @property {String} [default.keyword] 搜索关键字，用于input数据绑定
 * @property {Array} [default.resultCache] 当前搜索结果列表
 * @property {Function} [default.index] 当前搜索结果下标
 * @property {Object} [default.searchResult] 当前搜索结果
 * @property {String} [default.searchResult.keyword] 比中字段
 * @property {String} [default.searchResult.hit] 比中内容
 * @property {String} [default.searchResult.type] 比中类型
 * @property {Boolean} [default.popoverShow] popover显示
 */
/**
 * 插槽
 * @member slots
 * @property {String} [popover] 提示框内容插槽, 当设置了default插槽时，该插槽无效，slot-scope =
 * @property {Object} [popover.keyword] 关键字
 * @property {Object} [popover.searchResult] 当前搜索结果
 * @property {String} [popover.searchResult.keyword] 比中字段
 * @property {String} [popover.searchResult.hit] 比中内容
 * @property {String} [popover.searchResult.type] 比中类型
 */
import diagramManager from '../../../utils/dataManager/diagramManager'
export default {
  name: 'XdhGoSearch',
  components: {
  },
  /**
   * 参数属性
   * @property {String} [diagramName='dig'] go.Diagram对象名称

   * @property {Boolean} [pullCenter=true] 搜索后是否将结果居中显示
   * @property {Boolean} [ignoreCase=true] 是否忽略大小写
   * @property {Array} [nodeKeys=['key']] 搜索节点数据字段，可深度搜索，如: ['info.name', 'remark.desc']
   * @property {Array} [linkKeys=['key']] 搜索连线数据字段，可深度搜索，如: ['info.name', 'remark.desc']
   * @property {Object} [mode=node] 搜索节点或连线, 'node'/'link'/'node,link'/'link,node'
   * @property {String} [customClass=''] 容器自定义类
   * @property {Object} [customStyle={}] 容器自定义类
   * @property {Number} [popDuration={}] 提示框停留的毫秒数，设置为0时不显示提示框
   */
  props: {
     diagramName: {
      type: String,
      default: 'dig'
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
      default: 5000
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
      searchResult: {},
      popoverShow: false,
      popTimeout: null
    }
  },
  computed: {},
  methods: {
    keywordChange() {
      this.searchResult = {}
    },
    search() {
      if (!this.keyword) {
        /**
         * 搜索错误时触发
         * @event on-error
         * @param {String} error 错误信息
         */
        this.$emit('on-error', 'keyword-empty')
        return
      }
      clearTimeout(this.popTimeout)
      // 如果搜索关键字不变，index加1
      if (this.keyword === this.keywordCache) {
        this.index = (this.index + 1) % this.resultCache.length
      } else {
        this.index = 0
      }
      this.searchNode()
      if (this.resultCache.length !== 0) {
        this.searchResult = this.resultCache[this.index]
        if (this.popDuration && this.searchResult.hit) {
          this.popoverShow = true
        }
        this.popTimeout = setTimeout(() => {
          this.popoverShow = false
        }, this.popDuration)
        let node = this.searchResult.node
        node.isSelected = true
        if (this.pullCenter) {
          let rect = node.actualBounds
          diagramManager[this.diagramName].centerRect(rect)
        }
        /**
         * 搜索成功时触发
         * @event on-search
         * @param {Object} node 搜索到的节点
         * @param {Array} resultCache 搜索到的结果数组
         * @param {Number} index 搜索到的结果下标
         * @param {String} keyword 搜索关键字
         */
        this.$emit(
          'on-search',
          node,
          this.resultCache,
          this.index,
          this.keyword
        )
      } else {
        this.$emit('on-error', 'no-result')
      }
    },
    searchNode() {
      this.keywordCache = this.keyword
      diagramManager[this.diagramName].clearSelection()
      let nodes = []
      // 查找节点数组
      if (this.mode.includes('node')) {
        diagramManager[this.diagramName].nodes.each(n => {
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
                  hitText.push(`${d}`)
                }
              } else {
                if (d.includes(this.keyword)) {
                  hit = true
                  hitKeywords.push(k)
                  hitText.push(`${d}`)
                }
              }
            }
          })
          if (hit) {
            nodes.push({
              type: 'node',
              keyword: hitKeywords.join(','),
              hit: hitText.join('\n'),
              node: n
            })
          }
        })
      }
      if (this.mode.includes('link')) {
        diagramManager[this.diagramName].links.each(n => {
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
                  hitText.push(`${d}`)
                }
              } else {
                if (d.includes(this.keyword)) {
                  hit = true
                  hitKeywords.push(k)
                  hitText.push(`${d}`)
                }
              }
            }
            if (hit) {
              nodes.push({
                type: 'link',
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
