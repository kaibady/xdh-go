# 模板封装

## 参数定义

在使用 gojs 的类定义Node，Link和Group等模板时，可以参照官方 samples 的定义方法。但使用 go.graphObject.make 方法定义时,参数的结构较为松散，重复代码多，因此本工具在封装方法时将参数分为 4 类：

props：对应以对象传入的参数

parts：对应对象内部的子对象

binding：对应 go.Binding 对象

events：对应对象的事件方法

## 比较 gojs 原生写法和封装后的写法

gojs 原生写法

```
$(go.Node, "Auto",
     {
      click: function(obj) {
        console.log(obj)
      }
     },
      $(go.Shape, { fill: "white" },
        new go.Binding("fill", "color"),
        new go.Binding("figure", "fig")),
      $(go.TextBlock,
        { margin: 5 },
        new go.Binding("text", "key"))
    );
```

封装

```
node($, go, {
    type: 'Auto',
    events: {
      click(obj) {
         console.log(obj)
      }
    },
    parts: [
        shape($, go, {
            type: 'RoundedRectangle',
            props: {
                fill: 'white'
            },
            binding: binding($, go, {fill: 'color', figure: 'fig'}),
        }),
        textBlock($, go, {
            props: {
                margin: 5
            },
            binding: binding($, go, {text: 'key'})
        })
    ]
})
```

事实上，在封装方法内部，只是添加了默认参数，并对传入的参数做了简单处理。这只是一种规范而非强制,如果有时觉得原生写法更简洁，可以使用原生方法，或者与封装的形式混用。

## 封装举例

举例 node 节点的封装，以了解其本质

```
function node($, go, options) {
  let defaultProps = {
    background: 'rgba(0, 0, 0, 0)',
    cursor: 'pointer',
    selectionAdorned: false
  };
  let _options = Object.assign(
    {
      props: {},
      parts: [],
      events: {},
      binding: []
    },
    options
  );
  _options.props = Object.assign({}, defaultProps, options.props);
  return $(
    go.Node,
    _options.type || 'Auto',
    _options.props,
    _options.events,
    ..._options.parts,
    ..._options.binding
  );
}
```

上面的函数封装时，会将传入的参数与默认参数合并。鉴于这种情况经常发生，工具提供了一个合并的方法,文档[genOption](/api.html?url=/xdh-go/doc/utils_node-parts_util_fun.js.html)

方法可以简化为

```
import { utils } from 'xdh-go'
let {genOption} = utils;
function node($, go, options) {
    let defaultProps = {
        background: 'rgba(0, 0, 0, 0)',
        cursor: 'pointer',
        selectionAdorned: false
    };
    let _options = genOption(defaultProps, options);
    return $(
        go.Node,
        _options.type || 'Auto',
        _options.props,
        _options.events,
    ..._options.parts,
    ..._options.binding
    );
}
```
