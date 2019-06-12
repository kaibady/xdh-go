<template>
  <el-cascader
    :options="treeOptions"
    v-bind="$attrs"
    v-on="$listeners"
    v-model="fieldValue">
  </el-cascader>
</template>

<script>
  /**
   * 级联组件
   * @module widgets/xdh-form/items/cascader
   */
  import {buildTree} from '@/utils/convert'

  export default {
    /**
     * 属性参数, 继承 <a href="/xdh-web-doc/#/element/cascader">el-cascader</a>
     * @member props
     * @property {object[]} options 选项对象数组，对象需包含 {id, parentId, label, value} 描述数据
     * @property {*} [parentId=null] 根节点对象的parentId值，用来把options数组转换成树结构
     * @property {array} [value] 回填选中的值
     * @property {string} [idKey=id] id字段名称, 转换树结构需要用到
     * @property {string} [parentIdKey=parentId] parentId字段名称, 转换树结构需要用到
     */
    props: {
      options: {
        type: Array,
        default() {
          return []
        }
      },
      // 列表数据转化成树结构要用到的父级id值
      parentId: {
        type: [Number, String],
        default: null
      },
      value: {
        type: Array,
        default() {
          return []
        }
      },
      idKey: {
        type: String,
        default: 'id'
      },
      parentIdKey: {
        type: String,
        default: 'parentId'
      }
    },
    data() {
      return {}
    },
    computed: {
      treeOptions() {
        return buildTree(this.options, this.parentId, this.idKey, this.parentIdKey)
      },
      fieldValue: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit('input', val)
        }
      }
    }
  }
</script>

