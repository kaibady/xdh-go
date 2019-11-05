(window.webpackJsonp=window.webpackJsonp||[]).push([[241],{587:function(s,n,a){"use strict";a.r(n);var e=a(16),t=Object(e.a)({},function(){var s=this,n=s.$createElement,a=s._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"模板封装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#模板封装","aria-hidden":"true"}},[s._v("#")]),s._v(" 模板封装")]),s._v(" "),a("h2",{attrs:{id:"参数定义"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参数定义","aria-hidden":"true"}},[s._v("#")]),s._v(" 参数定义")]),s._v(" "),a("p",[s._v("在使用 gojs 的类定义Node，Link和Group等模板时，可以参照官方 samples 的定义方法。但使用 go.graphObject.make 方法定义时,参数的结构较为松散，重复代码多，因此本工具在封装方法时将参数分为 4 类：")]),s._v(" "),a("p",[s._v("props：对应以对象传入的参数")]),s._v(" "),a("p",[s._v("parts：对应对象内部的子对象")]),s._v(" "),a("p",[s._v("binding：对应 go.Binding 对象")]),s._v(" "),a("p",[s._v("events：对应对象的事件方法")]),s._v(" "),a("h2",{attrs:{id:"比较-gojs-原生写法和封装后的写法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#比较-gojs-原生写法和封装后的写法","aria-hidden":"true"}},[s._v("#")]),s._v(" 比较 gojs 原生写法和封装后的写法")]),s._v(" "),a("p",[s._v("gojs 原生写法")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('$(go.Node, "Auto",\n     {\n      selectionAdorned: false,\n      click: function(obj) {\n        console.log(obj)\n      }\n     },\n      $(go.Shape, { fill: "white" },\n        new go.Binding("fill", "color"),\n        new go.Binding("figure", "fig")),\n      $(go.TextBlock,\n        { margin: 5 },\n        new go.Binding("text", "key")\n       ),\n      new go.Binding(\'resizable\', \'resizable\')\n    );\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br")])]),a("p",[s._v("封装")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("node($, go, {\n    type: 'Auto',\n    props: {\n      selectionAdorned: false\n    },\n    events: {\n      click(obj) {\n         console.log(obj)\n      }\n    },\n    parts: [\n        shape($, go, {\n            type: 'RoundedRectangle',\n            props: {\n                fill: 'white'\n            },\n            binding: binding($, go, {fill: 'color', figure: 'fig'}),\n        }),\n        textBlock($, go, {\n            props: {\n                margin: 5\n            },\n            binding: binding($, go, {text: 'key'})\n        })\n    ],\n    binding: [new go.Binding('resizable', 'resizable')]\n})\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br")])]),a("p",[s._v("事实上，在封装方法内部，只是添加了默认参数，并对传入的参数做了简单处理。这只是一种规范而非强制,如果有时觉得原生写法更简洁，可以使用原生方法，或者与封装的形式混用。")]),s._v(" "),a("h2",{attrs:{id:"封装举例"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#封装举例","aria-hidden":"true"}},[s._v("#")]),s._v(" 封装举例")]),s._v(" "),a("p",[s._v("举例 node 节点的封装，以了解其本质")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("function node($, go, options) {\n  let defaultProps = {\n    background: 'rgba(0, 0, 0, 0)',\n    cursor: 'pointer',\n    selectionAdorned: false\n  };\n  let _options = Object.assign(\n    {\n      props: {},\n      parts: [],\n      events: {},\n      binding: []\n    },\n    options\n  );\n  _options.props = Object.assign({}, defaultProps, options.props);\n  return $(\n    go.Node,\n    _options.type || 'Auto',\n    _options.props,\n    _options.events,\n    ..._options.parts,\n    ..._options.binding\n  );\n}\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br")])]),a("p",[s._v("上面的函数封装时，会将传入的参数与默认参数合并。鉴于这种情况经常发生，工具提供了一个合并的方法,文档"),a("router-link",{attrs:{to:"/api.html?url=/xdh-go/doc/utils_node-parts_util_fun.js.html"}},[s._v("extendOption")])],1),s._v(" "),a("p",[s._v("方法可以简化为")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("import { utils } from 'xdh-go'\nlet {extendOption} = utils;\nfunction node($, go, options) {\n    let defaultProps = {\n        background: 'rgba(0, 0, 0, 0)',\n        cursor: 'pointer',\n        selectionAdorned: false\n    };\n    let _options = extendOption(defaultProps, options);\n    return $(\n        go.Node,\n        _options.type || 'Auto',\n        _options.props,\n        _options.events,\n    ..._options.parts,\n    ..._options.binding\n    );\n}\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br")])])])},[],!1,null,null,null);n.default=t.exports}}]);