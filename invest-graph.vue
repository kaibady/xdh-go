<template>
  <div class="index-page invest-graph" v-loading="loading" id="investGraph">
    <!--提示信息-->
    <el-alert :title="`${alertTips}`" v-show="['rect', 'multi'].includes(selectMode) || addLinkMode" :closable="false"
              type="warning" class="select-tips"></el-alert>
    <!--布局菜单 -->
    <layout-menu @item-click="layoutChange"></layout-menu>
    <!--顶部导航-->
    <tab-menu @item-click="tabItemClick" ref="tabMenu" @search="searchNode"></tab-menu>
    <!--侧边栏-->
    <invest-more
      :loading="moreLoading"
      :curr-index.sync="moreIndex"
      :collapsed.sync="slideCollapsed"
      v-bind="moreProps"
    ></invest-more>
    <!--导图-->
    <xdh-go
      style="background-color: #232b45;"
      v-if="nodes.length !== 0"
      :nodes="nodes"
      :links="links"
      :type="model"
      :node-template-map="nodeTemplateMap"
      :link-template-map="linkTemplateMap"
      :config="config"
      :events="diagramEvents"
      @on-ready="diagramReady"
      ref="go"
      height="calc(100% - 130px)"
    ></xdh-go>
    <!--<div class="overview" id="graphOverview"></div>-->
    <!--菜单-->
    <go-menu ref="menu" :before-show-menu="cr_beforeShowMenu" :show-context-menu="cr_showContextMenu">
      <circle-menu
        ref="circleMenu"
        :menu-list="nodeMenu.menuItems"
        @on-item-click="cr_circleMenuClick"
        :trigger="'mouseover'"
        :inner-radius="25"
        :angle-range="nodeMenu.angleRange"
        :item-width="70"
        :active-color="nodeMenu.activeColor"
        :normal-color="nodeMenu.normalColor"
        :item-style="{color: '#fff'}"
        text-rotate
        :item-gap="15"
      >
        <template slot="list-item" slot-scope="{item}">
          <div
            class="text"
            :style="{color: '#fff', position: 'relative', left: (item.offset && item.offset[0] || 0) + 'px', top: (item.offset && item.offset[1] || 0) + 'px'}"
          >
            <i v-if="item.icon" :class="(item.icon || '')" style="font-size: 20px;"></i>
            <div style="margin-top:-12px;font-size: 12px;">{{item.text}}</div>
          </div>
        </template>
      </circle-menu>
    </go-menu>
    <high-risk :isShowDialog.sync="highRiskVisible" :case-id="caseId"></high-risk>
    <high-risk-list :visible.sync="highRiskListVisible" :loading="highRiskListLoading"
                    :params="moreProps.highParams" :ajbh="caseId"
                    :data="highRiskList"></high-risk-list>
    <confirm-dialog
      class="confirm-dialog"
      :visible.sync="confirmDialogVisible"
      :data="confirmData"
      :type="confirmType"
      :loading="confirmLoading"
      @on-save="handleSaveConfirm"
    ></confirm-dialog>
    <inner-dialog
      :visible.sync="sameDialogVisible"
      @on-close="handleCloseSameDialog"
      title="同类案件智能推送"
      width="1000px"
      height="500px"
    >
      <same-cases :case-id="sameCaseId"></same-cases>
    </inner-dialog>
    <relation-people :closed="relationClose"
                     :idCard="relationId"
                     @on-close="relationClose=true"
                     @on-success="handleSubmitRelation"></relation-people>
    <!-- 人员关系详情 -->
    <relation-people-detail :id-card="relationDetailIdPeople"
                            :id="relationDetailId"
                            @on-close="relationDetailClose=true"
                            :closed="relationDetailClose"></relation-people-detail>

    <inner-dialog :visible.sync="determineDialogVisible"
                  title="历史快照"
                  width="90%"
                  height="90%">
      <my-determine></my-determine>
    </inner-dialog>

    <call-impact-dialog :visible.sync="dialogVisible"
                        :data="impactData"
                        @on-impact="handleImpact"></call-impact-dialog>
    <add-link-dialog ref="addLinkDialog"></add-link-dialog>
  </div>
</template>

<script>
  /**
   * 页面组件
   */
  import XdhGo from '@/widgets/xdh-go'
  import goMenu from '@/widgets/xdh-go/go-menu'
  import circleMenu from '@/widgets/xdh-go/menus/circle-menu'
  import TabMenu from '@/components/graph/tab-menu'
  import LayoutMenu from '@/components/graph/layout-menu'
  import InvestMore from '../../components/suspect-invest/invest-more'
  import InnerDialog from '@/components/inner-dialog'
  import highRisk from '../../components/invest/high-risk-search'
  import HighRiskList from '../../components/invest/high-risk-list'
  import ConfirmDialog from '../../components/impact-model/confirm-dialog'
  import SameCases from '../../components/case-overview/same-cases'
  import RelationPeople from '../../components/invest/relation-people'
  import RelationPeopleDetail from '../../components/invest/relation-people-detail'
  import MyDetermine from '@/components/my-determine'
  import AddLinkDialog from '@/components/graph/add-link-dialog';
  import CallImpactDialog from '../../components/impact-model/call-impact-dialog'

  /**
   * 相关方法
   */
  // 布局配置文件
  import getLayout from '@/helper/graph/layout'
  // go 工具
  // 框选功能用到
  import RealtimeDragSelecting from '@/helper/graph/tools/RealtimeDragSelectingTool'
  // 模板节点和其他
  import nodeTmpl from '@/helper/graph/nodeT'
  import linkTmpl from '@/helper/graph/linkT'
  // 数据转换相关方法
  import {
    transformData,
    typeToCategory
  } from '@/helper/graph/transform'
  // 顶部菜单方法
  import tabItemFuns from '@/helper/graph/menus/tab-menu/handler'
  /**
   * 将方法按类型拆分成7个mixin文件
   */
  // 顶部菜单
  import tabMenuMixin from '@/helper/graph/mixins/tb_tabMenuMixin'
  // 圆形菜单点击回调方法
  import circleMenuMixin from '@/helper/graph/mixins/cr_circleMenuMixin'
  // 节点事件回调方法
  import nodeMouseEventMixin from '@/helper/graph/mixins/ev_nodeMouseEvent'
  // 链接事件回调方法
  import linkMouseEventMixin from '@/helper/graph/mixins/ev_linkMouseEvent'
  // diagram事件
  import diagramEventMixin from '@/helper/graph/mixins/dgev_diagramEventMixin'
  // diagram操作: 搜索，突显，高亮，置灰，获取当前已选
  import diagramOperMixin from '@/helper/graph/mixins/dg_diagramOperMixin'
  // 处理节点的方法
  import handleNodeAndLink from '@/helper/graph/mixins/nl_handleNodeAndLink'
  // 对话框回调方法
  import dialogHandler from '@/helper/graph/mixins/dlg_dialogHandler'
  // bus 回调事件
  import busHandler from '@/helper/graph/mixins/bus_handler'


  let tabClicks = {...tabItemFuns}
  export default {
    mixins: [
      tabMenuMixin,
      circleMenuMixin,
      nodeMouseEventMixin,
      linkMouseEventMixin,
      handleNodeAndLink,
      diagramEventMixin,
      diagramOperMixin,
      busHandler,
      dialogHandler
    ],
    components: {
      AddLinkDialog,
      XdhGo,
      goMenu,
      circleMenu,
      TabMenu,
      // 侧边栏
      InvestMore,
      // 可以人数
      // FloatTips,
      // 布局菜单
      LayoutMenu,
      // Overview,
      highRisk,
      HighRiskList,
      ConfirmDialog,
      InnerDialog,
      SameCases,
      RelationPeople,
      RelationPeopleDetail,
      MyDetermine,
      CallImpactDialog
    },
    data() {
      return {
        selectionCache: null,
        doCacheSelect: true,
        selectMode: 'normal',
        addLinkMode: false,
        nodeCache: {},
        linkCache: {},
        graphChanged: false,
        myOverview: null,
        currLayout: '',
        firstLoad: true,
        configCache: {},
        viewportCache: null,
        dataCache: {},
        oldGoData: '',
        diagramEvents: {
          ViewportBoundsChanged: null,
          BackgroundSingleClicked: null,
          ChangedSelection: null,
          LinkDrawn: null
        },
        ifFullscreen: false,
        loading: false,
        caseId: this.$route.params.id,
        nodeMenu: {
          menuItems: [],
          angleRange: [-90, 270],
          activeColor: 'rgba(0,153,204,.95)',
          normalColor: 'rgba(0,114,172,.95)'
        },
        slideCollapsed: true,
        model: 'GraphLinksModel',
        nodes: [],
        links: [],
        moreIndex: 0,
        moreLoading: false,
        moreProps: {
          type: 'cb',
          cardData: [],
          cardInfo: {},
          impactId: '',
          impactCases: [],
          impactData: {},
          highId: '',
          highParams: {},
          highData: [],
          videoParams: {},
          videoData: [],
          relationId: '',
          relationParams: {},
          relationData: [],
          entityType: 'identity',
          entityData: {}
        },
        highRiskVisible: false,
        highRiskListVisible: false,
        highRiskList: {},
        highRiskListLoading: false,
        confirmDialogVisible: false,
        confirmData: {},
        confirmType: 'person',
        currConfirmData: {},
        confirmLoading: false,
        sameCaseId: '', // 智能串并Id
        sameDialogVisible: false, // 智能串并
        // 关系分析
        relationClose: true,
        relationId: null,
        // 关系分析详情
        relationDetailClose: true,
        relationDetailId: '',
        relationDetailIdPeople: '',
        // 研判快照详情
        determineDialogVisible: false,
        dialogVisible: false,
        impactData: []
      }
    },
    computed: {
      caseInfo() {
        return this.$store.state.currentCases[this.caseId] || null
      },
      showFirstResult() {
        return this.$store.state.showFirstResult
      },
      alertTips() {
        if (this.selectMode === 'rect') {
          return '开始框选，按住ctrl可框选多处，点击esc退出';
        } else if (this.addLinkMode) {
          return '开始连线，点击esc退出';
        } else if (this.selectMode === 'multi') {
          return '开始多选，点击esc退出'
        } else {
          return '切换到普通模式';
        }
      }
    },
    watch: {
      caseInfo: {
        handler(val, oldVal) {
          let _val = val && val.ajmc
          let _oldVal = oldVal && oldVal.ajmc
          if (_val !== _oldVal) {
            this.loadGraph()

            // 首次加载将主案件的信息放在右侧显示
            this.moreProps.type = 'entity'
            this.moreProps.entityType = 'case'
            this.moreProps.entityData = val
          }
        }
      }
    },
    methods: {
      keyupHandler(e) {
        e.preventDefault();
        switch (e.key) {
          case 'Escape':
            this.resetMode();
            break;
        }
      },
      resetMode() {
        this.setSelectMode('normal')
        this.setLinkMode(false)
        this.$refs.tabMenu.toggleDisabledAll(false)
      },
      layoutChange(type, options) {
        this.currLayout = type;
        if (this.$refs.go.diagram.selection.count !== 0 && !this.firstLoad) {
          let go = this.$refs.go.go;
          let set = new go.Set(go.Node);
          let posXmin, posYmin;
          this.$refs.go.diagram.selection.each(N => {
            set.add(N)
            if (!posXmin || N.position.x < posXmin) {
              posXmin = N.position.x;
            }
            if (!posYmin || N.position.y < posYmin) {
              posYmin = N.position.y
            }
          })
          let position = new go.Point(posXmin, posYmin)
          this.layoutNodes(go.GraphObject.make, go, type, set, position)
        } else {
          let go = this.$refs.go.go;
          let set = this.getAllNodesAndLinks();
          this.layoutNodes(go.GraphObject.make, go, type, set)
        }
      },
      getAllNodesAndLinks() {
        let go = this.$refs.go.go;
        let set = new go.Set(go.Node);
        this.$refs.go.diagram.nodes.each(N => {
          set.add(N)
        })
        this.$refs.go.diagram.links.each(L => {
          set.add(L)
        })
        return set;
      },
      tabItemClick(tab, name) {
        tabClicks[tab](name, this)
      },
      config($, go) {
        let configOld = {
          initialScale: 0.001
        };
        if (Object.keys(this.configCache).length > 0 && !this.firstLoad) {
          configOld = this.configCache;
        }
        let config = Object.assign({
          allowZoom: true, // 允许缩放
          initialViewportSpot: go.Spot.Center,
          initialContentAlignment: go.Spot.Center,
          padding: new go.Margin(500, 500, 500, 500),
          hasVerticalScrollbar: false,
          'animationManager.isEnabled': false,
          'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom,
          dragSelectingTool: $(RealtimeDragSelecting(go), {isPartialInclusion: true, delay: 200},
            {
              box: $(go.Part,
                {layerName: 'Tool', selectable: false},
                $(go.Shape,
                  {
                    name: 'SHAPE',
                    fill: 'rgba(255,0,0,0.1)',
                    stroke: 'red',
                    strokeWidth: 2
                  }))
            }
          ),
          allowDelete: false,
          allowCopy: false
        }, configOld);
        return config
      },
      layout($, go) {
        return (go.Layout)
      },
      linkTemplateMap($, go) {
        return linkTmpl($, go, {
          click: (e, node) => {
            let panel = node.part;
            panel.isHighlighted = true;
            this.ev_linkMouseClick(e, panel)
          },
          mouseEnter: (e, node) => {
            let link = node.part;
            this.ev_linkMouseEnter(e, link)
          },
          mouseLeave: (e, node) => {
            let link = node.part;
            this.ev_linkMouseLeave(e, link)
          }
        })
      },
      nodeTemplateMap($, go) {
        return nodeTmpl($, go, {
          contextMenu: this.$refs.menu.bindMenu(),
          mouseEnter: (e, node) => {
            this.ev_nodeMouseEnter(e, node)
          },
          mouseLeave: (e, node) => {
            this.ev_nodeMouseLeave(e, node)
          },
          click: (e, node) => {
            let type = typeToCategory[node.data.type]
            this.ev_nodeMouseClick(e, node, type)
          },
          doubleClick: (e, node) => {
            this.ev_nodeMouseDbClick(e, node)
          },
          mouseHold: (e, node) => {
            this.ev_nodeMouseHold(e, node)
          },
          mouseDragEnter: (e, node) => {
            this.ev_nodeMouseDragEnter(e, node)
          }
        })
      },
      loadGraph() {
        this.$store.commit('setShowFirstResult', false)
        this.loading = true
        if (this.$refs.go) {
          this.nodeCache = {};
          this.getModel().nodeDataArray.forEach(r => {
            this.nodeCache[r.key] = {loc: r.loc, tagging: r.tagging};
          })
          console.log(Object.keys(this.nodeCache).length);
          this.linkCache = {};
          this.getModel().linkDataArray.forEach(r => {
            this.linkCache[r.key] = {loc: r.loc};
          })
        }
        return new Promise(resolve => {
          this.getGraph(this.caseId).then(data => {
            let newGoData = JSON.stringify(data);
            if (newGoData === this.oldGoData && !this.graphChanged) {
              this.loading = false;
              resolve()
              return;
            }
            this.oldGoData = newGoData;
            this.nodes = []
            this.links = []
            setTimeout(() => {
              let graphData = transformData(data, this.caseInfo.asjbh)
              this.nodes = graphData.nodes;
              this.links = graphData.links;
              setTimeout(() => {
                this.loading = false;
                resolve()
              }, 350)
            }, 50)
          })
        })
      },
      diagramReady(diagram, $, go) {
        // 将主案突出显示
        this.bindDiagramEvent(diagram, $, go)
        this.getNodesPhoto()
        if (this.firstLoad) {
          // 首次进入导图时，diagram.layout设置成力导向，节点解锁时用到
          setTimeout(() => {
            this.loading = false
            // layoutChange则设置成分层布局（应客户要求）
            this.layoutChange('LayeredDigraphLayout')
            this.setFrontNode('ajcb')
          }, 100)
        } else {
          let frontNode = ''
          let set = new go.Set(go.Node);
          let hasNewOper = false;
          diagram.nodes.each(N => {
            console.log(Object.keys(this.nodeCache).length)
            // if (this.nodeCache[N.data.key] !== undefined && this.currLayout === 'ForceDirectedLayout') {
            if (this.nodeCache[N.data.key] !== undefined) {
              // && this.currLayout === 'ForceDirectedLayout'
              N.isLayoutPositioned = false
              diagram.model.setDataProperty(N.data, 'loc', this.nodeCache[N.data.key].loc)
              diagram.model.setDataProperty(N.data, 'tagging', this.nodeCache[N.data.key].tagging)
            } else {
              set.add(N)
              // 没有缓存的节点，说明是新节点，将其高亮
              if (N.data.category === 'oper' && this.nodeCache[N.data.key] === undefined) {
                console.log(N.data.text, N.data.key)
                frontNode = N.data.key
                hasNewOper = true;
                diagram.model.setDataProperty(N.data, 'loc', this.nodeCache['ajcb'].loc)
              }
            }
          })
          diagram.links.each(L => {
            if (this.linkCache[L.data.key] !== undefined) {
              // if (this.linkCache[L.data.key] !== undefined && this.currLayout === 'ForceDirectedLayout') {
              // && this.currLayout === 'ForceDirectedLayout'
              L.isLayoutPositioned = false
              diagram.model.setDataProperty(L.data, 'loc', this.linkCache[L.data.key])
            } else {
              set.add(L)
            }
          })
          if (frontNode) {
            this.setFrontNode(frontNode)
          }
          if (hasNewOper) {
            // 将新增的结果集布局，给个位置
            let mainCase = this.$refs.go.findNode(r => r && r.key && r.key === 'ajcb', true)
            set.add(mainCase)
            let position = new go.Point(mainCase.location.x, mainCase.location.y)
            this.layoutNodes($, go, this.currLayout, set, position)
          } else {
            this.layoutNodes($, go, this.currLayout, set)
          }
        }
        this.graphChanged = false;
        setTimeout(() => {
          // 第一次进来，默认显示全部节点，后面进来的显示缓存的窗口范围
          if (this.firstLoad) {
            this.firstLoad = false;
            diagram.zoomToFit()
            setTimeout(() => {
              this.configCache.initialScale = diagram.scale;
              this.configCache.initialPosition = diagram.position;
            }, 300)
          } else {
            let x = this.viewportCache.x;
            let y = this.viewportCache.y;
            let w = this.viewportCache.width;
            let h = this.viewportCache.height;
            let rect = new go.Rect(x, y, w, h);
            diagram.zoomToRect(rect)
          }
          this.$refs.go.loadLayout(($, go) => {
            return getLayout['ForceDirectedLayout']($, go, this)
          })
        }, 300)
      },
      /**
       * 开始碰撞
       * @param params
       */
      handleImpact(e, params) {
        const model = {
          asjbh: this.caseId,
          gjlx: params.gjlx.join(','),
          kjpy: params.kjpy,
          dcgjModelList: params.dcgjModelList,
          smgjModelList: params.smgjModelList
        }

        this.callPzaj(model).then(res => {
          if (res) {
            this.dialogVisible = false
            // 跳转到碰撞结果页
            this.$router.push({path: `/impact-result/${res}`, query: {caseId: this.caseId}})
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        })
      }
    },
    mounted() {
      window.addEventListener('keyup', this.keyupHandler)
    },
    beforeDestroy() {
      window.removeEventListener('keyup', this.keyupHandler)
    },
    deactivated() {
      if (this.$refs.go) {
        this.viewportCache = JSON.parse(JSON.stringify(this.$refs.go.diagram.viewportBounds))
      }
    },
    activated() {
      if (!this.showFirstResult && this.caseInfo) {
        this.loadGraph()
      }
    }
  }
</script>

<style scoped lang="scss">
  .select-tips {
    position: absolute;
    top: 10px;
    z-index: 999;
    width: 400px;
    left: 50%;
    margin-left: -200px;
  }

  .overview {
    background-color: #232b45;
    position: absolute;
    bottom: 40px;
    left: 65px;
    width: 150px;
    z-index: 999;
    height: 150px;
    box-shadow: rgba(121, 187, 255, 0.6) 0px 0px 3px;
  }

  .index-page {
    text-align: center;
    width: 100%;
    height: 100%;

    /deep/ .xdh-layout__main {
      overflow: visible;
    }
  }

  .invest-graph {
    background-color: rgb(35, 43, 69);
  }

  .slide-panel {
    & /deep/ .el-tabs__content {
      height: calc(100% - 50px);
    }
  }

  .base-info {
    .info {
      text-align: left;
    }
  }

  .statistic {
    .info {
      padding: 10px;
    }
    .title {
      text-align: left;
      color: blue;
    }
  }

  .track {
    .info {
      text-align: left;
    }
  }
</style>
