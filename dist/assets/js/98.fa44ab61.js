(window.webpackJsonp=window.webpackJsonp||[]).push([[98],{141:function(e,n,t){"use strict";var o=t(147),r=t(142),i=t(144),a=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(i);o(o.P+o.F*a,"String",{padStart:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0,!0)}})},142:function(e,n,t){var o=t(150),r=t(143),i=t(140);e.exports=function(e,n,t,a){var d=String(i(e)),l=d.length,c=void 0===t?" ":String(t),s=o(n);if(s<=l||""==c)return d;var u=s-l,f=r.call(c,Math.ceil(u/c.length));return f.length>u&&(f=f.slice(0,u)),a?f+d:d+f}},143:function(e,n,t){"use strict";var o=t(151),r=t(140);e.exports=function(e){var n=String(r(this)),t="",i=o(e);if(i<0||i==1/0)throw RangeError("Count can't be negative");for(;i>0;(i>>>=1)&&(n+=n))1&i&&(t+=n);return t}},144:function(e,n,t){var o=t(148).navigator;e.exports=o&&o.userAgent||""},591:function(e,n,t){"use strict";t.r(n);t(165),t(146),t(158),t(149),t(141);var o,r=t(145),i=(r.u.switcher,r.u.binding,r.o.DataManager);r.o.diagramManager;function a(){var e={nodes:function(){for(var e=[],n=0;n<6;n++)e.push({nodeCode:String(n+1),type:(n%4+1).toString().padStart(2,"0"),level:(n%3+1).toString().padStart(2,"0"),title:"title"+(n+1)});return e}(),links:function(){for(var e=[],n="1,2|1,3|2,4|2,5|3,6|2,6".split("|"),t=0;t<6;t++){var o=n[t].split(",");e.push({from:o[0],to:o[1],type:(t%2+1).toString().padStart(2,"0"),title:"label"+t})}return e}()};return new Promise(function(n,t){n(e)})}var d={components:{XdhGo:r.a},data:function(){return{diagram:null,model:"GraphLinksModel",nodes:[],links:[]}},methods:{config:function(e,n){return{initialContentAlignment:n.Spot.Center}},layout:function(e,n){return e(n.LayeredDigraphLayout,{direction:90,setsPortSpots:!1,layerSpacing:0})},nodeTemplateMap:function(e,n){var t=new n.Map;return t.add("",Object(r.t)(e,n,{props:{shape:"Circle",size:60}})),t},linkTemplate:function(e,n){return Object(r.s)(e,n,{props:{arrows:"to",fromPortId:"tFigure",toPortId:"tFigure"}})},diagramReady:function(e,n,t){o=new i(e,t),e.dataManager=o,o.setNodeConverter("nodeCv1",this.nodeConvert),o.setLinkConverter("linkCv1",this.linkConvert),a().then(function(e){e.nodes.forEach(function(e){o.addNode(e,"nodeCv1")}),e.links.forEach(function(e){o.addLink(e,"linkCv1")})})},nodeConvert:function(e){var n={key:e.nodeCode,label:{text:[{text:e.title+":"+e.level}],margin:[5,10,5,10]}},t={hover:"#f0f5ff"};switch(e.level){case"01":t.normal="#389e0d";break;case"02":t.normal="#722ed1";break;case"03":t.normal="#c41d7f"}if(n.strokeColor=t,n.strokeWidth=8,"01"===e.type)n.shape="clipImage",n.image="/xdh-go/img/node/circleimage/8.png";else{n.shape="icon";var o={font:'24px "iconfont"'};switch(e.type){case"02":o.text="";break;case"03":o.text="";break;case"04":o.text=""}n.icon=o}return n.labelBackground={normal:"#fff566",hover:"#ffffb8"},n},linkConvert:function(e){var n={from:e.from,to:e.to,label:e.title},t="";switch(e.type){case"01":t="#d48806";break;case"02":t="#389e0d"}return n.lineColor=t,n.lineWidth={normal:2,hover:4},n.labelColor="#3f6600",n._originData=e,n},resetDiagram:function(){o.clear(),a().then(function(e){e.nodes.forEach(function(e){o.addNode(e,"nodeCv1")}),e.links.forEach(function(e){o.addLink(e,"linkCv1")})})},removeNodeByKey:function(){o.removeNode("1")},removeNodeByData:function(){var e=this.diagram.model.nodeDataArray.find(function(e){return"2"===e.key});e&&o.removeNode(e)},removeNodeByNode:function(){var e=this.diagram.findNodeForKey("3");e&&o.removeNode(e)},removeNodeByExample:function(){o.removeNode({key:"4"})}},mounted:function(){}},l=t(16),c=Object(l.a)(d,function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("div",{staticStyle:{"text-align":"center","margin-top":"10px"}},[t("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.resetDiagram}},[e._v("\n      重置数据\n    ")]),e._v(" "),t("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(n){return e.removeNodeByKey()}}},[e._v("\n      删除node1(by key)\n    ")]),e._v(" "),t("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(n){return e.removeNodeByData()}}},[e._v("\n      删除node2(by data)\n    ")]),e._v(" "),t("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(n){return e.removeNodeByNode()}}},[e._v("\n      删除node3(by go.Node)\n    ")]),e._v(" "),t("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(n){return e.removeNodeByExample()}}},[e._v("\n      删除node4(by example)\n    ")])],1),e._v(" "),t("xdh-go",{ref:"diagram",attrs:{"diagram-name":"dig1",nodes:e.nodes,links:e.links,"node-template-map":e.nodeTemplateMap,"link-template":e.linkTemplate,type:e.model,config:e.config,layout:e.layout,height:"650px"},on:{"on-ready":e.diagramReady}})],1)},[],!1,null,null,null);n.default=c.exports}}]);