<template>
  <div class="xdh-go" :style="styles">
    <slot></slot>
  </div>
</template>
<script>
/**
 * XdhGo组件
 * @module xdh-go
 * @description 基于gojs封装，相关diagram和节点操作方法请参考gojs文档
 */
import go from 'gojs'
import diagramManager from '../../../utils/dataManager/diagramManager'
// import {clone} from '@/utils/convert'
// import {addResizeListener, removeResizeListener} from 'element-ui/lib/utils/resize-event'

const $ = go.GraphObject.make

// 支持的模板类型
const TEMPLATE_TYPE = [
  'nodeTemplate',
  'linkTemplate',
  'nodeTemplateMap',
  'linkTemplateMap',
  'groupTemplate',
  'groupTemplateMap'
]
/**
 * Slots 插槽
 * @member slots
 * @property {String} [default] 默认插槽，覆盖物组件
 */
export default {
  name: 'XdhGo',
  provide() {
    return {
      diagramName: this.diagramName
    }
  },
  /**
   * 参数属性
   * @property {function} [goRegister] 提供一个函数，用于在组件创建时将一些自定义类或者Shape注册到go中
   * @property {string} [width=100%] 图表宽度
   * @property {string} [height=100%] 图表高度
   * @property {function} [loadDataFunc=null] 数据生成方法，如果不为空，则不执行内部默认loadData方法，在diagram生成之后，数据的nodeDataArray赋值前执行,回调参数 (diagram,$,go,nodes,links)  nodes和links为外部传入的参数
   * @property {function} [nodeTemplate] 节点模板回调函数，回调参数 $:创建图表工厂函数，go:GoJs命名空间对象。 需要返回go.GraphObject实例
   * @property {function} [linkTemplate] 连线模板回调函数，回调参数 $:创建图表工厂函数，go:GoJs命名空间对象 需要返回go.GraphObject实例
   * @property {function} [nodeTemplateMap] 节点模板Map，回调参数 $:创建图表工厂函数，go:GoJs命名空间对象 需要返回go.Map实例, nodeTemplate，nodeTemplateMap两个只能设置一个
   * @property {function} [linkTemplateMap] 连线模板Map, 回调参数 $:创建图表工厂函数，go:GoJs命名空间对象需要返回go.Map实例，linkTemplate，linkTemplateMap两个只能设置一个
   * @property {function} [groupTemplate] 分组模板回调函数，回调参数 $:创建图表工厂函数，go:GoJs命名空间对象 需要返回go.GraphObject实例
   * @property {function} [groupTemplateMap] 分组模板Map回调函数，回调参数 $:创建图表工厂函数，go:GoJs命名空间对象 需要返回go.GraphObject实例
   * @property {string} [type=Model] 数据模型类型，可选值：Model / GraphLinksModel / TreeModel
   * @property {Object[]} [nodes] 初始化节点数据数组
   * @property {Object[]} [links] 初始化连线数据数组
   * @property {Object|Function} [config] go.Diagram 配置对象
   * @property {Function} [layout] 初始化布局回调函数，回调参数 $:创建图表工厂函数，go:GoJs命名空间对象。需要返回go各种布局实例
   * @property {Object} [events] 绑定图表事件，事件名称：事件句柄函数 键值对形式
   * @property {Object|Function} [modelConfig] 数据模型配置对象， 用在 $(go.Model, modelConfig)
   * @property {Boolean} [palette=false] 是否 Palette Diagram
   */
  props: {
    diagramName: {
      type: String,
      default() {
        return (
          'diagram' + new Date().getTime() + Math.floor(Math.random() * 1000)
        )
      }
    },
    goRegister: {
      type: Function
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    // 节点模板回调函数
    nodeTemplate: {
      type: Function
    },
    // 连线模板回调函数
    linkTemplate: {
      type: Function
    },
    // 节点模板Map
    nodeTemplateMap: {
      type: Function
    },
    // 连线模板Map
    linkTemplateMap: {
      type: Function
    },
    // 分组模板
    groupTemplate: {
      type: Function
    },
    // 分组模板map
    groupTemplateMap: {
      type: Function
    },
    // 数据模型类型
    type: {
      type: String,
      default: 'Model',
      validator(val) {
        return ['Model', 'GraphLinksModel', 'TreeModel'].includes(val)
      }
    },
    // 节点数据数组
    nodes: {
      type: Array
    },
    // 连线数据数组
    links: {
      type: Array
    },
    // go.Diagram 配置对象
    config: {
      type: [Object, Function]
    },
    // 布局回调函数
    layout: {
      type: Function
    },
    // Diagram事件侦听
    events: {
      type: Object,
      default() {
        return Object.create(null)
      }
    },
    // 数据模型配置
    modelConfig: {
      type: [Object, Function]
    },
    // 是否面板图表
    palette: {
      type: Boolean,
      default: false
    },
    loadDataFunc: {
      type: [Function, Object],
      default: null
    }
  },
  data() {
    return {
      htmlInfo: {},
      timeout: null
    }
  },
  computed: {
    styles() {
      return {
        width: this.width,
        height: this.height
      }
    }
  },
  watch: {
    nodes(val) {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        this.loadData(val, this.links)
      }, 50)
    },
    links(val) {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        this.loadData(this.nodes, val)
      }, 50)
    }
  },
  methods: {
    /**
     * 载入节点和连线数据，初始化会调用，当需要更新数据时可调用该方法来加载数据
     * @function loadData
     * @param {Object[]} [nodes] 节点数据
     * @param {Object[]} [links] 连线数据
     */
    loadData(nodes = [], links = []) {
      if (!diagramManager[this.diagramName]) return
      const model = diagramManager[this.diagramName].model
      model.nodeDataArray = nodes

      // GraphLinksModel 需要设置 linkDataArray
      if (this.type === 'GraphLinksModel') {
        model.linkDataArray = links
      }
      diagramManager[this.diagramName].updateAllRelationshipsFromData()
      /**
       *  nodes或links改变后触发
       *  @event on-load-data
       *  @param {object} diagram Diagram实例
       *  @param {object} $ go.GraphObject.make
       *  @param {object} go GoJS命名空间
       */
      this.$emit('on-load-data', diagramManager[this.diagramName], $, go)
    },
    /**
     * 初始化载入图表模板
     * @function loadTemplate
     */
    loadTemplate() {
      TEMPLATE_TYPE.forEach(type => {
        this.setTemplate(type, this[type])
      })
    },
    /**
     * 设置模板，可以调用该方法更新图表模板
     * @function setTemplate
     * @param {string} type 模板类型，支持：nodeTemplate / linkTemplate / nodeTemplateMap / linkTemplateMap / groupTemplate / groupTemplateMap
     * @param templateFunc 模板构建回调函数，回调参数 $:创建图表工厂函数，go:GoJs命名空间对象
     */
    setTemplate(type, templateFunc) {
      if (TEMPLATE_TYPE.includes(type)) {
        if (typeof templateFunc === 'function') {
          diagramManager[this.diagramName][type] = templateFunc($, go, this)
        }
      } else {
        throw new Error(`setTemplate不支持模板类型${type}`)
      }
    },
    /**
     * 设置图表布局
     * @function loadLayout
     * @param {function} func 布局回调函数，回调参数 $:创建图表工厂函数，go:GoJs命名空间对象。需要返回go各种布局实例
     */
    loadLayout(func) {
      if (func) {
        diagramManager[this.diagramName].layout = func($, go, this)
      }
    },
    /**
     * 绑定图表事件，内部调用 addDiagramListener, 函数作用域修改为vue实例
     * @function bindEvents
     * @param {object} events 事件名称：处理函数 键值对
     */
    bindEvents(events = {}) {
      if (!diagramManager[this.diagramName]) return

      for (let name in events) {
        if (events.hasOwnProperty(name)) {
          const listener = (this.listeners[name] = events[name].bind(this))
          diagramManager[this.diagramName].addDiagramListener(name, listener)
        }
      }
    },
    /**
     * 解除事件绑定，内部调用 removeDiagramListener
     * @function unbindEvents
     * @param {object} events 事件名称：处理函数 键值对
     */
    unbindEvents(events = {}) {
      if (!diagramManager[this.diagramName]) return

      for (let name in events) {
        if (events.hasOwnProperty(name)) {
          const listener = this.listeners[name] || events[name]
          diagramManager[this.diagramName].removeDiagramListener(name, listener)
          delete this.listeners[name]
        }
      }
    },
    /**
     * 查找单个节点图形或节点数据
     * @function findNode
     * @param {function|string|number} find 查询函数或数据的key， 当filter事函数时，用法与数组的find方法一样
     * @param {boolean} isGraphObject 是否查询的是图形对象
     * @returns {GraphObject|Object}
     *
     * @example
     * chart.findNode(item => item.key === 'A')  // 查询key为A的数据
     * chart.findNode('A')  // 查询key为A的数据
     * chart.findNode('A', true) 查询key为A的节点图形对象
     */
    findNode(find, isGraphObject) {
      if (!diagramManager[this.diagramName]) return null

      const model = diagramManager[this.diagramName].model
      const nodeDataArray = model.nodeDataArray || []
      const isFunction = typeof find === 'function'
      let data = isFunction
        ? nodeDataArray.find(find)
        : model.findNodeDataForKey(find)
      return isGraphObject
        ? diagramManager[this.diagramName].findNodeForData(data)
        : data
    },
    /**
     * 查找多个节点图形或节点数据
     * @function findNodes
     * @param {function} filter 过滤函数
     * @param isGraphObject 是否查询的是图形对象
     * @returns {GraphObject[]|Object[]}
     *
     * @example
     * chart.findNodes(item => item.type === 1)  // 查询type=1的数据
     * chart.findNodes(item => item.type === 1, true) 查询type=1的节点图形对象
     */
    findNodes(filter, isGraphObject) {
      if (!diagramManager[this.diagramName]) return []

      const isFunction = typeof filter === 'function'
      if (!isFunction) throw new Error('findNodes的filter参数必须要是函数')

      const model = diagramManager[this.diagramName].model
      const nodeDataArray = model.nodeDataArray || []
      let dataArray = nodeDataArray.filter(filter)
      if (isGraphObject) {
        return dataArray.map(data =>
          diagramManager[this.diagramName].findNodeForData(data)
        )
      } else {
        return dataArray
      }
    },
    /**
     * 查找单个连线图形或连线数据
     * @function findLink
     * @param {function|string|number} find 查询函数或数据的key， 当filter事函数时，用法与数组的find方法一样
     * @param {boolean} isGraphObject 是否查询的是图形对象
     * @returns {GraphObject|Object}
     *
     * @example
     * chart.findLink(item => item.key === 'A')  // 查询key为A的数据
     * chart.findLink('A')  // 查询key为A的数据
     * chart.findLink('A', true) 查询key为A的连线图形对象
     */
    findLink(find, isGraphObject) {
      if (!diagramManager[this.diagramName]) return null

      const model = diagramManager[this.diagramName].model
      const linkDataArray = model.linkDataArray || []
      const isFunction = typeof find === 'function'
      let data = isFunction
        ? linkDataArray.find(find)
        : model.findLinkDataForKey(find)
      return isGraphObject
        ? diagramManager[this.diagramName].findLinkForData(data)
        : data
    },
    /**
     * 查找多个连线图形或连线数据
     * @function findLinks
     * @param {function} filter 过滤函数
     * @param isGraphObject 是否查询的是图形对象
     * @returns {GraphObject[]|Object[]}
     *
     * @example
     * chart.findLinks(item => item.type === 1)  // 查询type=1的数据
     */
    findLinks(filter, isGraphObject) {
      if (!diagramManager[this.diagramName]) return []

      const isFunction = typeof filter === 'function'
      if (!isFunction) throw new Error('findLinks的filter参数必须要是函数')

      const model = diagramManager[this.diagramName].model
      const linkDataArray = model.linkDataArray || []
      let dataArray = linkDataArray.filter(filter)
      if (isGraphObject) {
        return dataArray.map(data =>
          diagramManager[this.diagramName].findLinkForData(data)
        )
      } else {
        return dataArray
      }
    },
    /**
     * 根据节点的key查找该节点的所有子节点连线
     * @function findChildLinks
     * @param {String|Number} key 节点标识key
     * @returns {Object[]} 子节点连线数组
     */
    findChildLinks(key) {
      if (!key || !diagramManager[this.diagramName]) return []

      const model = diagramManager[this.diagramName].model
      const linkDataArray = model.linkDataArray || []
      let links = []
      const traversal = function(fromKey) {
        const matches = linkDataArray.filter(item => item.from === fromKey)
        matches.forEach(link => {
          links.push(link)
          traversal(link.to)
        })
      }
      traversal(key)
      return links
    },
    /**
     * 根据节点的key查找该节点的所有子节点
     * @function findChildNodes
     * @param {String|Number} key 节点标识key
     * @param {String} [parentName=parent] TreeModel模型数据父节点标识字段名称，默认：parent。 GraphLinksModel模型忽略该参数
     * @returns {Object[]} 子节点数组
     */
    findChildNodes(key, parentName = 'parent') {
      const nodes = []
      if (this.type === 'GraphLinksModel') {
        const links = this.findChildLinks(key)
        links.forEach(link => {
          nodes.push(this.findNode(link.to))
        })
      } else if (this.type === 'TreeModel') {
        const model = diagramManager[this.diagramName].model
        const nodeDataArray = model.nodeDataArray || []
        const traversal = function(parent) {
          const matches = nodeDataArray.filter(
            item => item[parentName] === parent
          )
          matches.forEach(node => {
            nodes.push(node)
            traversal(node.key)
          })
        }
        traversal(key)
      }
      return nodes
    },
    /**
     * 更新节点或连线数据, 更新的数据实时响应模板渲染图表
     * @function update
     * @param {Object} data 源节点或连线数据
     * @param {Object|String} props 需要更新的数据字段键值对或字段名称
     * @param {*} [value] 字段名称对应的值，当 props 是 String类型时，必须要传
     *
     * @example
     * let data = chart.findNode('A')
     * chart.update(data, {a:1, b:2}) // data数据更新 a 和 b 字段
     * chart.update(data, 'a', 1) // data数据更新a字段
     */
    update(data, props, value) {
      if (!diagramManager[this.diagramName]) return
      const paramType = typeof props
      if (!['string', 'object'].includes(paramType)) {
        throw new Error('update的参数 props 必须事string 或 object类型')
      }
      const model = diagramManager[this.diagramName].model
      diagramManager[this.diagramName].startTransaction('update')
      if (paramType === 'string') {
        model.set(data, props, value)
      } else {
        for (let name in props) {
          if (props.hasOwnProperty(name)) {
            model.set(data, name, props[name])
          }
        }
      }
      diagramManager[this.diagramName].commitTransaction('update')
    },
    /**
     * 添加节点
     * @function addNode
     * @param {Object|Array} data 节点数据或节点数据数组
     */
    addNode(data) {
      if (!diagramManager[this.diagramName]) return
      const model = diagramManager[this.diagramName].model
      diagramManager[this.diagramName].startTransaction('addNode')
      Array.isArray(data)
        ? model.addNodeDataCollection(data)
        : model.addNodeData(data)
      diagramManager[this.diagramName].commitTransaction('addNode')
    },
    /**
     * 添加连线
     * @function addLink
     * @param {Object|Array} data 连线数据或连线数据数组
     */
    addLink(data) {
      if (!diagramManager[this.diagramName]) return
      const model = diagramManager[this.diagramName].model
      diagramManager[this.diagramName].startTransaction('addLink')
      Array.isArray(data)
        ? model.addLinkDataCollection(data)
        : model.addLinkData(data)
      diagramManager[this.diagramName].commitTransaction('addLink')
    },
    /**
     * 删除节点
     * @function removeNode
     * @param {String|Object|Array} data 要删除的节点数据、数组或节点key
     */
    removeNode(data) {
      if (!diagramManager[this.diagramName]) return

      if (typeof data === 'string') {
        data = this.findNode(data)
      }
      if (data) {
        const model = diagramManager[this.diagramName].model
        diagramManager[this.diagramName].startTransaction('removeNode')
        Array.isArray(data)
          ? model.removeNodeDataCollection(data)
          : model.removeNodeData(data)
        diagramManager[this.diagramName].commitTransaction('removeNode')
      }
    },
    /**
     * 删除连线
     * @function removeLink
     * @param {String|Object|Array} data 要删除的连线数据、数组或连线key
     */
    removeLink(data) {
      if (
        !diagramManager[this.diagramName] ||
        this.type !== 'GraphLinksModel'
      ) {
        return
      }

      if (typeof data === 'string') {
        data = this.findLink(data)
      }
      if (data) {
        const model = diagramManager[this.diagramName].model
        diagramManager[this.diagramName].startTransaction('removeLink')
        Array.isArray(data)
          ? model.removeLinkDataCollection(data)
          : model.removeLinkData(data)
        diagramManager[this.diagramName].commitTransaction('removeLink')
      }
    },
    /**
     * 根据节点的key删除所有子节点和连线
     * @function removeChild
     * @param {String|Number} key 节点标识key
     * @param {String} [parentName=parent] TreeModel模型数据父节点标识字段名称，默认：parent。 GraphLinksModel模型忽略该参数
     */
    removeChild(key, parentName = 'parent') {
      const nodes = this.findChildNodes(key, parentName)
      const links = this.findChildLinks(key, parentName)
      diagramManager[this.diagramName].startTransaction('removeChild')
      this.removeNode(nodes)
      this.removeLink(links)
      diagramManager[this.diagramName].commitTransaction('removeChild')
    },
    /**
     * 清楚画布所有图形
     * @function clear
     */
    clear() {
      if (!diagramManager[this.diagramName]) return
      const model = diagramManager[this.diagramName].model
      diagramManager[this.diagramName].startTransaction('clear')
      model.clear()
      diagramManager[this.diagramName].commitTransaction('clear')
    },
    /**
     * 图表转换成json格式字符串
     * @function toJson
     * @returns {String}
     */
    toJson() {
      if (!diagramManager[this.diagramName]) return JSON.stringify({})
      return diagramManager[this.diagramName].model.toJson()
    },
    /**
     * 根据json构建图表模型
     * @function fromJson
     * @param {Object|String} json
     */
    fromJson(json) {
      if (!diagramManager[this.diagramName]) return
      diagramManager[this.diagramName].model = go.Model.fromJson(
        typeof json === 'string' ? json : JSON.stringify(json)
      )
    },
    /**
     * 更新图形
     */
    resize() {
      if (!diagramManager[this.diagramName]) return
      diagramManager[this.diagramName].requestUpdate()
    },
    getHtmlInfo() {
      this.$children.forEach(el => {
        if (el.name === 'XdhGoHtml') {
          /**
           * 由XdhGoHtml 返回的go.HtmlInfo对象，key与XdhGoHtml的menuName值对应
           * @member htmlInfo
           * @type {Object}
           */
          this.htmlInfo[el.menuName] = el.bindMenu()
          if (el.appendToBody) {
            this.$el.parentNode.appendChild(el.$el)
          }
        }
      })
    }
  },
  mounted() {
    // this.proxyResize = this.resize.bind(this)
    // 实例化GoJS
    diagramManager.register(
      this.diagramName,
      $(
        this.palette ? go.Palette : go.Diagram,
        this.$el,
        typeof this.config === 'function'
          ? this.config($, go)
          : this.config || {}
      )
    )
    this.getHtmlInfo()
    // 设置模板
    this.loadTemplate()

    // 设置数据模型
    diagramManager[this.diagramName].model = $(
      go[this.type],
      typeof this.modelConfig === 'function'
        ? this.modelConfig($, go)
        : this.modelConfig || {}
    )
    // 初始化布局
    this.loadLayout(this.layout)

    // 载入模型数据
    if (this.loadDataFunc && typeof this.loadDataFunc === 'function') {
      this.loadDataFunc(
        diagramManager[this.diagramName],
        $,
        go,
        this.nodes,
        this.links
      )
    } else {
      this.loadData(this.nodes, this.links)
    }

    // 绑定图表事件
    this.bindEvents(this.events)

    /**
     *  go.Diagram实例化完成时触发
     *  @event on-ready
     *  @param {object} diagram Diagram实例
     *  @param {object} $ go.GraphObject.make
     *  @param {object} go GoJS命名空间
     */
    this.$emit('on-ready', diagramManager[this.diagramName], $, go)

    // addResizeListener(this.$el, this.proxyResize)
  },
  beforeDestroy() {
    // removeResizeListener(this.$el, this.proxyResize)
    this.unbindEvents(this.events)
    diagramManager[this.diagramName].div = null
    delete diagramManager[this.diagramName]
  },
  created() {
    /**
     * go框架对象
     * @member go
     * @type {Object}
     */
    if (this.goRegister && typeof this.goRegister === 'function') {
      this.goRegister($, go)
    }
    /**
     * 图表实例
     * @member diagram
     * @type {go.Diagram}
     */
    /**
     * 图表事件句柄缓存
     * @member listeners
     * @type {Object}
     */
    this.listeners = {}
  }
}
</script>
