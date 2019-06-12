<template>
  <div>
    <div class="right-tool" @keyup.enter="search">
      <el-button-group class="switch-btn">
        <el-button icon="iconfont icon-map-site" size="small" class="btn" @click="onJump">脑图</el-button>
        <el-button icon="iconfont icon-bullseye" size="small" class="btn is-active">导图</el-button>
      </el-button-group>
      <el-input
        placeholder="输入检索内容"
        v-model="keyword"
        size="small"
        class="input-with-select"
        clearable
      >
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <el-tabs class="tab-menu">
      <el-tab-pane label="开始" class="tabpane-container">
        <xdh-grid :data="startMenu" direction="row" justify="flex-start" wrap="wrap">
          <div :class="{'box-wrapper': true, disabled: scope.item.disabled || disabledAll}" slot-scope="scope"
               @click="menuClick('startMenu', scope.item.name)">
            <i :class="scope.item.icon"></i>
            <div class="box">{{scope.item.name}}</div>
          </div>
        </xdh-grid>
      </el-tab-pane>
      <el-tab-pane label="战法" class="tabpane-container">
        <xdh-grid :data="tacticsMenu" direction="row" justify="flex-start" wrap="wrap">
          <div :class="{'box-wrapper': true, disabled: scope.item.disabled || disabledAll}" slot-scope="scope"
               @click="menuClick('tacticsMenu',scope.item.name)">
            <i :class="scope.item.icon"></i>
            <div class="box">{{scope.item.name}}</div>
          </div>
        </xdh-grid>
      </el-tab-pane>
      <el-tab-pane label="操作" class="tabpane-container">
        <xdh-grid :data="editMenu" direction="row" justify="flex-start" wrap="wrap">
          <div :class="{'box-wrapper': true, disabled: scope.item.disabled || disabledAll}" slot-scope="scope">
            <div v-if="!scope.item.subMenu" @click="menuClick('editMenu',scope.item.name)">
              <i :class="scope.item.icon"></i>
              <div class="box">{{scope.item.name}}</div>
            </div>
            <div v-if="scope.item.subMenu">
              <i :class="scope.item.icon"></i>
              <el-dropdown @command="(name) => handleSubmenu('editMenu', name)" trigger="click" class="submenu">
                <span :class="{'el-dropdwon-link': true, 'disabled':scope.item.disabled || disabledAll}">{{scope.item.name}}<i class="el-icon-arrow-down el-icon-right"
                                                                     style="margin-left: 5px;"></i></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :key="idx" v-for="(item, idx) in scope.item.subMenu" :command="item.name"
                                    :disabled="item.disabled">
                      {{item.name}}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </xdh-grid>
      </el-tab-pane>
      <el-tab-pane label="视图" class="tabpane-container">
        <xdh-grid :data="viewMenu" direction="row" justify="flex-start" wrap="wrap">
          <div :class="{'box-wrapper': true, disabled: scope.item.disabled || disabledAll}" slot-scope="scope">
            <div v-if="!scope.item.subMenu" @click="menuClick('viewMenu',scope.item.name)">
              <i :class="scope.item.icon"></i>
              <div class="box">{{scope.item.name}}</div>
            </div>
            <div v-if="scope.item.subMenu">
              <i :class="scope.item.icon"></i>
              <el-dropdown @command="(name) => handleSubmenu('viewMenu', name)" trigger="click" class="submenu">
                <span :class="{'el-dropdwon-link': true, 'disabled':scope.item.disabled || disabledAll}">{{scope.item.name}}<i class="el-icon-arrow-down el-icon-right"
                                                                     style="margin-left: 5px;"></i></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :key="idx" v-for="(item, idx) in scope.item.subMenu" :command="item.name"
                                    :disabled="item.disabled">
                    {{item.name}}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </xdh-grid>
      </el-tab-pane>
    </el-tabs>
    <inner-dialog title="保存快照"
                  width="450px"
                  height="200px"
                  :visible.sync="lcmcShow"
    >
      <el-form :model="lcmcModel" size="mini" inline style="margin-top:30px;">
        <el-form-item label="流程名称" prop="title" :label-width="'120px'">
          <el-input v-model="lcmcModel.lcmc"></el-input>
        </el-form-item>
        <el-button size="mini" type="primary" @click="saveLcmc">保存</el-button>
      </el-form>
    </inner-dialog>
  </div>
</template>
<script>
  import tabMenus from '@/helper/graph/menus/tab-menu/options'
  import XdhGrid from '@/widgets/xdh-grid'
  import InnerDialog from '@/components/inner-dialog'
  import {clone} from '@/utils/convert'
  export default {
    components: {
      XdhGrid,
      InnerDialog
    },
    props: {},
    data() {
      return {
        startMenu: tabMenus.startMenu.filter(r => {
          return r.visible !== false;
        }),
        tacticsMenu: tabMenus.tacticsMenu.filter(r => {
          return r.visible !== false;
        }),
        editMenu: tabMenus.editMenu.filter(r => {
          return r.visible !== false;
        }),
        viewMenu: tabMenus.viewMenu.filter(r => {
          return r.visible !== false;
        }),
        keyword: '',
        lcmcModel: {
          lcmc: ''
        },
        lcmcShow: false,
        lcmcPromise: null,
        disabledAll: false
      }
    },
    computed: {},
    methods: {
      toggleDisabledAll(disabled = true) {
        this.disabledAll = disabled;
      },
      handleSubmenu(type, name) {
        this.$emit('item-click', type, name)
      },
      menuClick(type, name) {
        this.$emit('item-click', type, name)
      },
      getLcmc() {
        // 获取流程名称
        this.lcmcShow = true;
        this.lcmcModel = {lcmc: ''}
        return new Promise((resolve, reject) => {
          this.lcmcPromise = {
            resolve: resolve,
            reject: reject
          }
        })
      },
      saveLcmc() {
        this.lcmcShow = false;
        this.lcmcPromise.resolve(clone(this.lcmcModel))
      },
      search() {
        if (!this.keyword) {
          this.$message({
            type: 'warning',
            message: '请输入关键字'
          })
          return
        }
        this.$emit('search', this.keyword)
      },
      // 跳转到脑图
      onJump() {
        const id = this.$route.params.id
        this.$router.push({
          path: `/invest/invest/${id}/suspect-invest`
        })
      }
    },
    created() {
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  .tab-menu {
    background: #3d4c63;
    color: #fff;
    //   border: 1px solid #151929;
    & /deep/ .el-tabs__header {
      background-color: #3d4c63;
      padding: 0 20px;
      .el-tabs__active-bar {
        background-color: #75a3fa;
      }
      .el-tabs__nav-wrap:after {
        background-color: #151929;
      }
      .el-tabs__item {
        color: #fff;
        font-size: 16px;
        &.is-active {
          color: #75a3fa;
        }
      }
    }
  }

  .box-wrapper {
    cursor: pointer;
    background-color: #1c2237;
    padding: 0;
    margin: 0 4px 10px;
    min-width: 65px;
    border-radius: 5px;
    border: 1px solid #151929;
    font-size: 14px;
    &.disabled {
      cursor: not-allowed;
      color: #888;
    }
    .submenu {
      color: #fff;
      display: block;
      margin-top: -8px;
      .disabled{
        cursor: not-allowed;
        color: #888;
        pointer-events: none;
      }
    }
  }

  .tabpane-container {
    padding-left: 20px;

    .iconfont {
      padding-top: 8px;
      display: inline-block;
      font-size: 24px;
    }
    .box {
      margin-top: -8px;
    }

  }

  .right-tool {
    position: absolute;
    z-index: 2;
    margin-top: 3px;
    right: 20px;
  }

  .switch-btn {
    float: left;
    .btn {
      background-color: #1c2237;
      border: 1px solid #0e111b;
      color: #fff;
      &.is-active {
        background-color: #0f5ad7;
        border: 1px solid #0f5ad7;
      }
    }
  }

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

  .el-dropdown-menu {
    zoom: 0.8;
    padding: 5px 0;
    border: 1px solid #3d4c63;
    background-color: #1c2237;
    .el-dropdown-menu__item {
      line-height: 25px;
      color: #fff;
      &.is-disabled {
        color: #666;
      }
      &:not(.is-disabled):hover {
        background-color: #2d69f7;
      }
    }
    & /deep/ .popper__arrow {
      border-bottom-color: #3d4c63;
      &:after {
        border-bottom-color: #1c2237;
      }
    }
  }


</style>
