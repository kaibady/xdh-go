(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{141:function(e,t,n){"use strict";var o=n(147),r=n(142),i=n(144),a=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(i);o(o.P+o.F*a,"String",{padStart:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0,!0)}})},142:function(e,t,n){var o=n(150),r=n(143),i=n(140);e.exports=function(e,t,n,a){var d=String(i(e)),l=d.length,c=void 0===n?" ":String(n),s=o(t);if(s<=l||""==c)return d;var u=s-l,f=r.call(c,Math.ceil(u/c.length));return f.length>u&&(f=f.slice(0,u)),a?f+d:d+f}},143:function(e,t,n){"use strict";var o=n(151),r=n(140);e.exports=function(e){var t=String(r(this)),n="",i=o(e);if(i<0||i==1/0)throw RangeError("Count can't be negative");for(;i>0;(i>>>=1)&&(t+=t))1&i&&(n+=t);return n}},144:function(e,t,n){var o=n(148).navigator;e.exports=o&&o.userAgent||""},538:function(e,t,n){"use strict";n.r(t);n(165),n(146),n(158),n(149),n(141);var o,r=n(145),i=(r.u.switcher,r.u.binding,r.o.DataManager);function a(){var e={nodes:function(){for(var e=[],t=0;t<6;t++)e.push({nodeCode:String(t+1),type:(t%4+1).toString().padStart(2,"0"),level:(t%3+1).toString().padStart(2,"0"),title:"title"+(t+1)});return e}(),links:function(){for(var e=[],t="1,2|1,3|2,4|2,5|3,6|2,6".split("|"),n=0;n<6;n++){var o=t[n].split(",");e.push({from:o[0],to:o[1],type:(n%2+1).toString().padStart(2,"0"),title:"label"+n})}return e}()};return new Promise(function(t,n){t(e)})}var d={components:{XdhGo:r.a},data:function(){return{diagram:null,model:"GraphLinksModel",nodes:[],links:[]}},methods:{config:function(e,t){return{initialContentAlignment:t.Spot.Center}},layout:function(e,t){return e(t.LayeredDigraphLayout,{direction:90,setsPortSpots:!1,layerSpacing:0})},nodeTemplateMap:function(e,t){var n=new t.Map;return n.add("",Object(r.t)(e,t,{props:{shape:"Circle",size:60}})),n},linkTemplate:function(e,t){return Object(r.s)(e,t,{props:{arrows:"to",fromPortId:"tFigure",toPortId:"tFigure"}})},diagramReady:function(e,t,n){this.diagram=e,o=new i(e,n),e.dataManager=o,o.setNodeConverter("nodeCv1",this.nodeConvert),o.setLinkConverter("linkCv1",this.linkConvert),a().then(function(e){e.nodes.forEach(function(e){o.addNode(e,"nodeCv1")}),e.links.forEach(function(e){o.addLink(e,"linkCv1")})})},nodeConvert:function(e){var t={key:e.nodeCode,label:{text:[{text:e.title+":"+e.level}],margin:[5,10,5,10]}},n={hover:"#f0f5ff"};switch(e.level){case"01":n.normal="#389e0d";break;case"02":n.normal="#722ed1";break;case"03":n.normal="#c41d7f"}if(t.strokeColor=n,t.strokeWidth=8,"01"===e.type)t.shape="clipImage",t.image="/xdh-go/img/node/circleimage/8.png";else{t.shape="icon";var o={font:'24px "iconfont"'};switch(e.type){case"02":o.text="";break;case"03":o.text="";break;case"04":o.text=""}t.icon=o}return t.labelBackground={normal:"#fff566",hover:"#ffffb8"},t},linkConvert:function(e){var t={from:e.from,to:e.to,label:e.title},n="";switch(e.type){case"01":n="#d48806";break;case"02":n="#389e0d"}return t.lineColor=n,t.lineWidth={normal:2,hover:4},t.labelColor="#3f6600",t._originData=e,t},resetDiagram:function(){o.clear(),a().then(function(e){e.nodes.forEach(function(e){o.addNode(e,"nodeCv1")}),e.links.forEach(function(e){o.addLink(e,"linkCv1")})})},removeNodeByKey:function(){o.removeNode("1")},removeNodeByData:function(){var e=this.diagram.model.nodeDataArray.find(function(e){return"2"===e.key});e&&o.removeNode(e)},removeNodeByNode:function(){var e=this.diagram.findNodeForKey("3");e&&o.removeNode(e)},removeNodeByExample:function(){o.removeNode({key:"4"})}},mounted:function(){}},l=n(16),c=Object(l.a)(d,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticStyle:{"text-align":"center","margin-top":"10px"}},[n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.resetDiagram}},[e._v("\n      重置数据\n    ")]),e._v(" "),n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.removeNodeByKey()}}},[e._v("\n      删除node1(by key)\n    ")]),e._v(" "),n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.removeNodeByData()}}},[e._v("\n      删除node2(by data)\n    ")]),e._v(" "),n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.removeNodeByNode()}}},[e._v("\n      删除node3(by go.Node)\n    ")]),e._v(" "),n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.removeNodeByExample()}}},[e._v("\n      删除node4(by example)\n    ")])],1),e._v(" "),n("xdh-go",{ref:"diagram",attrs:{nodes:e.nodes,links:e.links,"node-template-map":e.nodeTemplateMap,"link-template":e.linkTemplate,type:e.model,config:e.config,layout:e.layout,height:"650px"},on:{"on-ready":e.diagramReady}})],1)},[],!1,null,null,null);t.default=c.exports}}]);