# 动效参数

动效参数可再节点模板中定义，也可在节点数据中定义
| 参数 | 说明 | 类型 | 可选值/参数 | 默认值 |
| ----------------- | ---------------- | ------------- | ------ | --------------------------------- |
| animation | 动画参数 | [Object] | - | - |
| animation[n].trigger | 动画触发事件 | String | 'mouseEnter'/ 'mouseLeave'/'click'/'dbclick'| 'mouseEnter' |
| animation[n].objectName | 动画施加的对象名称或者节点数据的属性 | String | 1.通用节点：'tNode'(节点对象)/'tFigure'(图形对象)/'tLabel'(文字对象)/'tTag'(标签) 2.自定义对象的 name 名称。3.节点数据'data',或对象内的属性，如, 'data.strokeWidth' |''|
| animation[n].prop | 动画对象需要变更的属性 | String | -|''|
| animation[n].propType | 动画对象属性的类型， | String |'spot'/'number'/'size'/'margin'/'rect'/'point'/'rgba'|根据 prop 自动匹配属性的类型，但有些属性可以有多种类型，需指定|
| animation[n].keyFrame | 动画开始和结束的属性值 | Array | 根据 propType 变化 |[0, 1]|
| animation[n].name | 动画名称，与 prevName 配合使用 | String | - |''|
| animation[n].prevName | 上一个动画名称，如果为空字串则直接执行，如果不为空则在指定动画结束后再执行 | String | - |''|
| animation[n].duration | 动画持续时间，毫秒 | Number | -|300|
| animation[n].delay | 动画延迟的时间，毫秒 | Number | - |0|
| animation[n].repeatCount | 动画重复的次数 | Number | - |1|
| animation[n].direction | 动画重复时，偶数次是否反向播放 | String | 'normal'/'alternate' |'normal'|
| animation[n].easingFunc | 动画速度曲线 | [String/Function],String 类型是内置方法名称，Function 类型为自定义方法 | 参数(x),返回[0,1]区间的小数 |['easeInQuad']|
| animation[n].beforeStart | 动画开始前的方法 | Function | 参数(obj, node, diagram, go) | null |
| animation[n].animationFinish | 动画结束后的方法 | Function | 参数(obj, node, diagram, go) | null |
| animation[n].stateParser | 如果propType的类型不满足需要，自定义stateParser | Function | 参数(state, propType, obj, link, diagram, go)，返回state | null |
| animation[n].stepCallback | 每一帧动画执行的回调，如果设置了该方法，则不会再自动给prop赋值 | Function | 参数(state, propType, obj, link, diagram, go)| null |