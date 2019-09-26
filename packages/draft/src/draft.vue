<template>
  <div :style="style" v-show="draftVisible" class="xdh-go-draft" v-draggable="dragable">
    <slot
      :close="close"
      :draftList="draftList"
      :remove="remove"
      :load="load"
      :save="save"
      :clear="clear"
    >
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
/**
 * XdhGoDraft组件
 * @module xdh-go-draft
 * @description 草稿箱组件
 */
import go from 'gojs'
import draggable from '../../../utils/directives/draggable'
import { save, get, remove } from '../../../utils/storage'
export default {
  name: 'XdhGoDraft',
  components: {},
  directives: {
    draggable
  },

  /**
   * 参数属性
   * @property {Boolean} [dragable=true] 是否可拖拽
   * @property {String} [localKey=''] 当存在多个草稿箱时用来区分在localStorage中的key
   * @property {Object} [local=true] 是否使用本地存储，如果选择否，只放在内存中，草稿箱销毁即没有，但可以通过事件提供的数据存储调用接口存储到后端
   * @property {Object} [diagram=null] go.Diagram对象
   * @property {Object} [visible.sync=false] 草稿箱是否显示
   * @property {Object} [list=[]] 初始化的草稿列表，如果local=true,会优先选择本地存储，
   *                            如果本地存储为空，则使用传入的数据
   *                            数据格式：
   *                           [{ 
   *                              json: '{ "class": "GraphLinksModel",↵  "nodeDataArray": [ ↵{"key":"A", "category":"a", "location":{"class":"go.Point", "x":0, "y":30.250027885742202}},↵{"key":"B", "category":"b", "location":{"class":"go.Point", "x":83.13034326171876, "y":0}},↵{"key":"C", "category":"c", "location":{"class":"go.Point", "x":83.13034326171876, "y":60.500055771484405}}↵ ],↵  "linkDataArray": [ ↵{"from":"A", "to":"B"},↵{"from":"A", "to":"C"}↵ ]}',
                                  name: 'ddd",
                                  thumb: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAACGklEQVRIS+2WS0gbURSG/5NxFYyb+gi2K1ukushSl4ILYbILZCZSiLSku9AHVgO6MAYRV4XuBR/bOyW7iiAUFFzUgKJIQBeC2YhkJ0KUDnNlAjNJRjOZJBNEyOwuc+b/7vnPPecO4Zkecp/LAwCObXQXAFpqg11wvmS1zwdMTAC5HJDJmNLNWS2KYpfX6/1ARH0ej+e/IXtz88a/vf3zi74eHwficeD0FEgmXQKHw+EpIurnnGeI6N6Qvbwce3twEN8wwLEYcH0NTE+7BJZlOcE5P1IUZaeyPnWcag78sysuAaPW97Isz3DODxVF+dsMmNuArwjofyngOZtEsuYA4UAp40AAUFUgmzW+rZbxsj6hGGOskR4sTq4K8Po6kM8DiURR76qzM/89GNy0iA9rmubTNO1HOp0udWgdO6gET04CwSAgCEAqBZyfF8HfRPGPRXOIiFQA84yxvTp4ZujjjB+rPGm1JEm/iOiIMWZ1w9E+GgZXback9Nvpsy09ha+tAZPttbiGRcQM8EWNATLguI/1jJ2CHRXFEmRrdRk49D6Ebm83Vg9XDYVSxo2AI5HIFOe8V1XVXUEQ7gyNs1dngyf+k9/6WhqWMPJ6BLM7s+WI5sDRaLS3UCh8BOAvvxZvO257tga3Pukk8Z2I0FAI+7l9bB6bh785cFWXWl3jNth04NmsnkNPzS5ZQb4F/9U1scWANtiZTy5EPQDT9PwfewHouAAAAABJRU5ErkJggg==',
                                  time: '2019/9/26 下午4:41:28 下午4:41:28'
                                }]
   */
  props: {
    dragable: {
      type: Boolean,
      default: true
    },
    localKey: {
      type: String,
      default: ''
    },
    // 是否使用本地缓存
    local: {
      type: Boolean,
      default: true
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
    },
    list: {
      type: Array,
      default() {
        return []
      }
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
      this.$emit('save', item)
      if (this.local) {
        save('XDH-GO-DRAFT' + this.localKey, this.draftList, localStorage)
      }
      this.$emit('save')
    },
    remove(item) {
      let idx = this.draftList.indexOf(item)
      this.$emit('remove', this.draftList[idx])
      this.draftList.splice(idx, 1)
      if (this.local) {
        save('XDH-GO-DRAFT' + this.localKey, this.draftList, localStorage)
      }
    },
    load(item) {
      this.diagram.clear()
      this.diagram.model = go.Model.fromJson(item.json)
    },
    clear() {
      this.draftList = []
      this.$emit('clear')
      if (this.local) {
        remove('XDH-GO-DRAFT' + this.localKey, localStorage)
      }
    },
    destroy() {
      if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
    }
  },
  mounted() {
    document.body.appendChild(this.$el)
  },
  created() {
    this.draftVisible = this.visible
    if (this.local) {
      let draftList = get('XDH-GO-DRAFT' + this.localKey, localStorage)
      this.draftList = draftList || this.list
    } else {
      this.draftList = this.list
    }
  },
  beforeDestroy() {
    this.destroy()
  }
}
</script>
<style type="text/scss" lang="scss" scoped>
</style>
