let nodeIcon = {
  case: '\uE64f',
  oper: '\uE782',
  mainCase: '\uE64D',
  person: '\uE7bd',
  car: '\uE7A8',
  tel: '\uE7b7',
  tag: '\uE6c8', // 标识号
  goods: '\uE66b', // 金银手饰
  other: '\uE7A1',
  loading: '\uE721',
  // 可疑人员
  kyry: '\uE7C0',
  // 战法集合图标
  // 串并分析
  cbfx: '\uE6AC',
  // 多点碰撞
  ddpz: '\uE745',
  // 损失物品/物品追查
  sswp: '\uE6BF',
  wpzc: '\uE6BF',
  // 路线寻人
  lxxr: '\uE653',
  // 高危分析
  gwfx: '\uE647',
  // 技术比对
  jsbd: '\uE648',
  // 话单调取
  hddq: '\uE6F9',
  // 轨迹分析
  gjfx: '\uE667',
  // 关系分析
  gxfx: '\uE6AD',
  // 伴随分析
  bsfx: '\uE68A',
  // 位置
  position: '\uE61D'
};
export default nodeIcon;
// 原需求是根据不同战法显示不同图标，后来改为统一显示oper图标，留着备用吧
export let typeToIcon = {
  '06': nodeIcon['ddpz'],
  '07': nodeIcon['jsbd'],
  '08': nodeIcon['lxxr'],
  '09': nodeIcon['gwfx'],
  '10': nodeIcon['jsbd'],
  '11': nodeIcon['wpzc'],
  '12': nodeIcon['cbfx'],
  '13': nodeIcon['cbfx'],
  '14': nodeIcon['cbfx']
}
