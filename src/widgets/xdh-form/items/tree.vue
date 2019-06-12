<template>
  <div :class="classes">
    <el-popover
      popper-class="xdh-form-tree__popper"
      placement="bottom-start"
      :width="parseInt(popperWidth)"
      trigger="manual"
      v-model="visible">
      <div class="xdh-form-tree__wrapper">
        <el-row :gutter="0"
                class="xdh-form-tree__content" :style="{height:`${parseInt(popperHeight)}px`}">
          <el-col :span="showSelected ? 16: 24" class="xdh-form-tree__left">
            <div class="xdh-form-tree__filter">
              <el-input v-model="query"
                        size="small"
                        placeholder="请输入过滤关键字"
                        prefix-icon="el-icon-search"
                        clearable></el-input>
            </div>
            <div class="xdh-form-tree__list">
              <el-tree class="xdh-tree"
                       ref="elTree"
                       :data="treeOptions"
                       @check="handleCheck"
                       @current-change="handleChange"
                       :filter-node-method="filterNode"
                       v-bind="treeProps"></el-tree>
            </div>
          </el-col>
          <el-col :span="8" class="xdh-form-tree__right" v-if="showSelected">
            <el-tag class="xdh-form-tree__selected"
                    size="small"
                    v-for="(item,index) in checkNodes"
                    :key="index"
                    @close="handleCheckedTagClose(item, index)"
                    closable>
              <span>{{item[labelKey]}}</span>
            </el-tag>
            <div v-if="checkNodes.length===0" class="xdh-form-tree__empty">未选择任何节点</div>

          </el-col>
        </el-row>
        <el-row :gutter="0" class="xdh-form-tree__footer">
          <el-button size="small" type="default" @click="closePopper">取消</el-button>
          <el-button size="small" type="primary" @click="submit">确定</el-button>
        </el-row>
      </div>
      <input-tag slot="reference"
                 @click.native.stop="showPopper"
                 @tag-click="showPopper"
                 @close-tag="handleCloseTag"
                 :value="textValues"
                 :closable="closable"
                 :collapse-tags="collapseTags"
                 :allow-create="false"
                 :active="visible"
                 icon="el-icon-arrow-down"
                 :disabled="disabled"
                 :readonly="readonly"
                 :placeholder="placeholder"></input-tag>
    </el-popover>

  </div>
</template>

<script>
  /**
   * 下拉树输入框
   * @module widgets/xdh-form/items/tree
   */
  import InputTag from './input-tag'
  import {buildTree} from '@/utils/convert'
  import {on, off} from 'element-ui/lib/utils/dom'

  export default {
    components: {
      InputTag
    },
    /**
     * 属性参数
     * @member props
     * @property {array} [value] 回填数据，支持双向绑定
     * @property {string|number} [popperWidth=300] 弹出层宽度
     * @property {string|number} [popperHeight=300] 弹出层高度
     * @property {Object[]} [options] 选项数据数组，对象需包含 {id, parentId, label} 描述数据
     * @property {*} [parentId=null] 根节点对象的parentId值，用来把options数组转换成树结构
     * @property {boolean} [multiple] 是否多选
     * @property {object} [elTreeProps] 树组件个性参数
     * @property {boolean} [showSelected] 是否显示已选列表
     * @property {string} [placeholder] 占位文本
     * @property {boolean} [disabled] 禁用
     * @property {boolean} [readonly] 只读
     * @property {boolean} [closable] 是否允许删除
     * @property {boolean} [collapseTags] 是否折叠标签
     * @property {string} [idKey=id] id字段名称, 转换树结构需要用到
     * @property {string} [parentIdKey=parentId] parentId字段名称, 转换树结构需要用到
     * @property {string} [labelKey=label] label字段名称
     */
    props: {
      // 值
      value: {
        type: Array,
        default() {
          return []
        }
      },
      // 弹出层宽度
      popperWidth: {
        type: [String, Number],
        default: 300
      },
      // 弹出层高度
      popperHeight: {
        type: [String, Number],
        default: 300
      },
      // 选项数据数组
      options: {
        type: Array,
        default() {
          return []
        }
      },
      // 数据父节点数据id值
      parentId: {
        type: [String, Number],
        default: null
      },
      // 是否多选
      multiple: Boolean,

      // 树组件个性参数
      elTreeProps: Object,

      // 是否显示已选列表
      showSelected: Boolean,

      placeholder: {
        type: String,
        default: '请选择'
      },
      // 禁用
      disabled: Boolean,
      // 只读
      readonly: Boolean,
      closable: {
        type: Boolean,
        default: true
      },
      collapseTags: Boolean,
      idKey: {
        type: String,
        default: 'id'
      },
      parentIdKey: {
        type: String,
        default: 'parentId'
      },
      labelKey: {
        type: String,
        default: 'label'
      }
    },
    data() {
      return {
        visible: false,
        query: '',
        currentValue: [...this.value]
      }
    },
    computed: {
      classes() {
        return {
          'xdh-form-tree': true,
          'xdh-form-tree--disabled': this.disabled,
          'xdh-form-tree--readonly': this.readonly
        }
      },
      treeOptions() {
        return buildTree(this.options, this.parentId, this.idKey, this.parentIdKey)
      },
      treeProps() {
        return {
          nodeKey: this.idKey,
          defaultCheckedKeys: [...this.value],
          showCheckbox: this.multiple,
          highlightCurrent: !this.multiple,
          defaultExpandedKeys: [...this.value],
          ...this.elTreeProps
        }
      },
      textValues() {
        return this.options.filter(item => {
          return this.value.includes(item[this.idKey])
        }).map(item => item[this.labelKey])
      },
      checkNodes() {
        return this.options.filter(item => {
          return this.currentValue.includes(item[this.idKey])
        })
      }
    },
    watch: {
      value(val) {
        this.currentValue = [...val]
      },
      query(val) {
        this.$refs.elTree.filter(val)
      }
    },
    methods: {
      setChecked() {
        if (this.multiple) {
          this.$refs.elTree.setCheckedKeys(this.currentValue)
        } else {
          this.$refs.elTree.setCurrentKey(this.currentValue[0])
        }
      },
      showPopper() {
        if (this.disabled) return
        if (this.readonly) return
        if (this.visible) {
          this.visible = false
        } else {
          this.currentValue = [...this.value]
          this.setChecked()
          this.visible = true
        }
      },
      closePopper() {
        this.visible = false
      },
      handleCheck(node, checked) {
        // 只对多选有效
        if (this.multiple) {
          this.currentValue = this.removeCheckedParent(checked.checkedKeys, checked.checkedNodes)
        }
      },
      handleChange(node) {
        // 只对单选有效
        if (this.multiple) return
        this.currentValue = [node[this.idKey]]
      },
      handleCheckedTagClose(item, index) {
        this.currentValue.splice(index, 1)
        this.setChecked()

      },
      removeCheckedParent(keys = [], nodes = []) {
        return nodes.filter(n => {
          return !keys.includes(n[this.parentIdKey])
        }).map(n => n[this.idKey])
      },
      filterNode(value, data) {
        if (!value) return true
        return data[this.labelKey].includes(value)
      },
      submit() {
        const value = [...this.currentValue]
        this.$emit('input', value)
        this.$emit('change', value)
        this.visible = false
      },
      handleCloseTag(index) {
        const value = [...this.value]
        value.splice(index, 1)
        this.$emit('input', value)
        this.$emit('change', value)
        this.visible = false
      }
    },
    mounted() {
      this.body = document.body
      this.proxyClosePopper = this.closePopper.bind(this)
      on(this.body, 'click', this.proxyClosePopper)
    },
    beforeDestroy() {
      if (this.body) {
        off(this.body, 'click', this.proxyClosePopper)
        this.body = null
      }
    }
  }
</script>
