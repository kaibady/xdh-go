let startMenu = [
  {name: '线索采录', icon: 'iconfont icon-edit'},
  {name: '最大化', icon: 'iconfont icon-expand'},
  {name: '保存', icon: 'iconfont icon-save'},
  {name: '历史快照', icon: 'iconfont icon-history'},
  {name: '刷新', icon: 'iconfont icon-refresh'}
];
let tacticsMenu = [
  {name: '人工串并', icon: 'iconfont icon-Tandem', selectMode: ['single'], nodeType: ['case'], disabled: true},
  {name: '智能串并', icon: 'iconfont icon-Tandem', selectMode: ['single'], nodeType: ['case'], disabled: true},
  {
    name: '多点碰撞',
    icon: 'iconfont icon-components',
    selectMode: ['single', 'multi'],
    nodeType: ['case'],
    disabled: true
  },
  {name: '物品追查', icon: 'iconfont icon-bullseye', selectMode: ['single'], nodeType: ['case'], disabled: true},
  {
    name: '视频侦查',
    icon: 'iconfont icon-map-direction',
    selectMode: ['single', 'multi'],
    nodeType: ['case'],
    disabled: true
  },
  {name: '高危分析', icon: 'iconfont icon-alarm', selectMode: ['single'], nodeType: ['case'], disabled: true},
  {name: '技术比对', icon: 'iconfont icon-collision', selectMode: ['single'], nodeType: ['case'], disabled: true},
  {name: '话单调取', icon: 'iconfont icon-call', selectMode: ['single', 'multi'], nodeType: ['tel'], disabled: true},
  {
    name: '轨迹分析',
    icon: 'iconfont icon-locus',
    selectMode: ['single'],
    nodeType: ['person', 'car', 'goods'],
    disabled: true,
    visible: false
  },
  {
    name: '关系分析',
    icon: 'iconfont icon-relation',
    selectMode: ['multi', 'single'],
    nodeType: ['person'],
    disabled: true
  },
  {
    name: '伴随分析',
    icon: 'iconfont icon-team',
    selectMode: ['single'],
    nodeType: ['person'],
    disabled: true,
    visible: false
  }
];
let editMenu = [
  {
    name: '选择',
    icon: 'iconfont icon-indicator',
    subMenu: [{name: '框选', tips: '点击框选或按住shift点击鼠标左键可框选'}, {name: '多选', tips: '点击多选或按住ctrl可多选'}, {
      name: '全选',
      tips: '全选节点'
    }, {name: '反选', tips: '反选节点'}, {name: '选中子节点', tips: '选中指定节点的子节点'}]
  },
  {name: '锁定', icon: 'iconfont icon-lock'},
  {name: '解锁', icon: 'iconfont icon-lock-off-v2'},
  {name: '标注', icon: 'iconfont icon-bullseye'},
  {name: '编辑', icon: 'iconfont icon-edit', disabled: true},
  {name: '连线', icon: 'iconfont icon-map-connect'},
  {name: '删除', icon: 'iconfont icon-delete'},
  {name: '图形尺寸', icon: 'iconfont icon-radio-off', visible: false},
  {name: '文字尺寸', icon: 'iconfont icon-file-text', visible: false},
  {name: '颜色', icon: 'iconfont icon-adjust', visible: false}
];
let viewMenu = [
  {name: '显示照片', icon: 'iconfont icon-image', visible: false},
  {
    name: '隐藏',
    icon: 'iconfont icon-magic',
    subMenu: [{name: '隐藏节点'}, {name: '隐藏子节点'}, {name: '隐藏关系label'}, {name: '隐藏关系连线'}]
  },
  {name: '显示', icon: 'iconfont icon-enlarge', subMenu: [{name: '显示子节点'}, {name: '显示关系label'}, {name: '显示关系连线'}]},
  {name: '缩放', icon: 'iconfont icon-bullseye'},
  {name: '列表显示', icon: 'iconfont icon-accurate-search', visible: false}
];

export default {
  startMenu,
  tacticsMenu,
  editMenu,
  viewMenu
};
