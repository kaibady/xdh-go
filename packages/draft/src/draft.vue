<template>
  <div :style="style" v-show="draftVisible" class="xdh-go-draft" v-draggable>
    <slot>
      <el-card class="xdh-go-draft__container">
        <div slot="header" class="xdh-go-draft__header">
          <span>草稿箱</span>
          <el-button
            type="text"
            style="float:right;padding:0;"
            circle
            icon="iconfont icon-multiply"
            size="mini"
            @click="close"
          ></el-button>
        </div>
        <div class="xdh-go-draft__content">
          <div v-for="(item, idx) in draftList" :key="idx" class="xdh-go-draft__item">
            <img :src="item.thumb" class="img" />
            <span class="txt">
              <div class="name">{{item.name}}</div>
              <div class="time">{{item.time}}</div>
            </span>
            <div class="btns">
              <i @click="remove(item)" class="iconfont icon-multiply remove"></i>
              <i @click="load(item)" class="iconfont icon-download load"></i>
            </div>
          </div>
        </div>
        <div class="xdh-go-draft__footer" @keyup.enter="save()">
          <el-input v-model="itemName" class="name-input" size="mini" placeholder="输入草稿名称"></el-input>
          <el-button size="mini" type="primary" @click="save()" circle icon="iconfont icon-save"></el-button>
          <el-button size="mini" type="primary" @click="clear()" circle icon="iconfont icon-delete"></el-button>
        </div>
      </el-card>
    </slot>
  </div>
</template>
<script>
import go from 'gojs'
import draggable from '../../../utils/directives/draggable'
export default {
  name: 'XdhGoDraft',
  components: {},
  directives: {
    draggable
  },
  props: {
    // 是否使用本地缓存
    local: {
      type: Boolean
    },
    diagram: {
      type: Object,
      default() {
        return null
      }
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      draftList: [],
      imageDefaultOption: {
        size: new go.Size(30, 30),
        type: 'image/png'
      },
      itemName: '',
      draftVisible: false
    }
  },
  watch: {
    draftVisible(val) {
      this.$emit('update:visible', val)
    },
    visible(val) {
      this.draftVisible = val
    }
  },
  computed: {
    style() {
      return {
        width: '350px'
      }
    }
  },
  methods: {
    close() {
      this.draftVisible = false
    },
    save() {
      let bounds = this.diagram.documentBounds
      let scaleW = 30 / bounds.width
      let scaleH = 30 / bounds.height
      let scale = Math.min(scaleW, scaleH)
      let options = Object.assign({}, this.imageDefaultOption, {
        scale: scale
      })
      let data = this.diagram.makeImageData(options)
      let date = new Date()
      let item = {
        thumb: data,
        name: this.itemName,
        time: `${date.toLocaleString()} ${date.toLocaleTimeString()}`,
        json: this.diagram.model.toJson()
      }
      this.draftList.push(item)
      this.$emit('save')
    },
    remove(item) {
      let idx = this.draftList.indexOf(item)
      this.draftList.splice(idx, 1)
    },
    load(item) {
      this.diagram.clear()
      this.diagram.model = go.Model.fromJson(item.json)
    },
    clear() {
      this.draftList = []
      this.$emit('clear')
    },
    destroy() {
      if(this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
    }
  },
  mounted() {
    document.body.appendChild(this.$el)
  },
  created() {
    this.draftVisible = this.visible
  },
  beforeDestroy() {
    this.destroy()
  }
}
</script>
<style type="text/scss" lang="scss" scoped>
</style>
