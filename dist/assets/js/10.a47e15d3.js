(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{159:function(t,e,n){"use strict";var r=n(145),i=n(160),o=n(162),a=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(o);r(r.P+r.F*a,"String",{padStart:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0,!0)}})},160:function(t,e,n){var r=n(154),i=n(161),o=n(144);t.exports=function(t,e,n,a){var l=String(o(t)),d=l.length,c=void 0===n?" ":String(n),s=r(e);if(s<=d||""==c)return l;var u=s-d,p=i.call(c,Math.ceil(u/c.length));return p.length>u&&(p=p.slice(0,u)),a?p+l:l+p}},161:function(t,e,n){"use strict";var r=n(163),i=n(144);t.exports=function(t){var e=String(i(this)),n="",o=r(t);if(o<0||o==1/0)throw RangeError("Count can't be negative");for(;o>0;(o>>>=1)&&(e+=e))1&o&&(n+=e);return n}},162:function(t,e,n){var r=n(146).navigator;t.exports=r&&r.userAgent||""},365:function(t,e,n){"use strict";n.r(e);n(141),n(166),n(165),n(159);var r,i=n(140),o=(i.t.switcher,i.t.binding,i.o.DataManager);function a(){var t={nodes:function(){for(var t=[],e=0;e<10;e++)t.push({nodeCode:String(e+1),type:(e%4+1).toString().padStart(2,"0"),level:(e%3+1).toString().padStart(2,"0"),title:"title"+e});return t}(),links:function(){for(var t=[],e="1,2|1,3|2,4|2,5|3,6|3,7|4,8|4,9|4,10|6,10".split("|"),n=0;n<10;n++){var r=e[n].split(",");t.push({from:r[0],to:r[1],type:(n%2+1).toString().padStart(2,"0"),title:"label"+n})}return t}()};return new Promise(function(e,n){e(t)})}var l={components:{XdhGo:i.a},data:function(){return{model:"GraphLinksModel",nodes:[],links:[],duplicateData:{level:"02",nodeCode:"7",title:"title6",type:"03"}}},methods:{config:function(t,e){return{initialContentAlignment:e.Spot.Center}},layout:function(t,e){return t(e.LayeredDigraphLayout,{direction:90,setsPortSpots:!1,layerSpacing:0})},nodeTemplateMap:function(t,e){var n=new e.Map;return n.add("",Object(i.s)(t,e,{props:{shape:"Circle",size:60}})),n},linkTemplate:function(t,e){return Object(i.r)(t,e,{props:{arrows:"to",fromPortId:"tFigure",toPortId:"tFigure"}})},diagramReady:function(t,e,n){r=new o(t,n),t.dataManager=r,r.setNodeConverter("nodeCv1",this.nodeConvert,this.nodeMerger),r.setLinkConverter("linkCv1",this.linkConvert),a().then(function(t){t.nodes.forEach(function(t){r.addNode(t,"nodeCv1")}),t.links.forEach(function(t){r.addLink(t,"linkCv1")})})},nodeMerger:function(t,e,n,r){var i=JSON.parse(JSON.stringify(t));return i.label.text.push({text:e._originData.title+":"+e._originData.level}),i},nodeConvert:function(t){var e={key:t.nodeCode,label:{text:[{text:t.title+":"+t.level}],margin:[5,10,5,10]}},n={hover:"#f0f5ff"};switch(t.level){case"01":n.normal="#389e0d";break;case"02":n.normal="#722ed1";break;case"03":n.normal="#c41d7f"}if(e.strokeColor=n,e.strokeWidth=8,"01"===t.type)e.shape="clipImage",e.image="/xdh-go/img/node/circleimage/8.png";else{e.shape="icon";var r={font:'24px "iconfont"'};switch(t.type){case"02":r.text="";break;case"03":r.text="";break;case"04":r.text=""}e.icon=r}return e.labelBackground={normal:"#fff566",hover:"#ffffb8"},e},linkConvert:function(t){var e={from:t.from,to:t.to,label:t.title},n="";switch(t.type){case"01":n="#d48806";break;case"02":n="#389e0d"}return e.lineColor=n,e.lineWidth={normal:2,hover:4},e.labelColor="#3f6600",e._originData=t,e},resetDiagram:function(){r.clear(),a().then(function(t){t.nodes.forEach(function(t){r.addNode(t,"nodeCv1")}),t.links.forEach(function(t){r.addLink(t,"linkCv1")})})},addDupNode:function(t){r.addNode(this.duplicateData,"nodeCv1",t)}},mounted:function(){}},d=n(16),c=Object(d.a)(l,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticStyle:{"text-align":"center","margin-top":"10px"}},[n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.resetDiagram}},[t._v("\n      重置数据\n    ")]),t._v(" "),n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){return t.addDupNode({distinct:!1})}}},[t._v("\n      添加重复节点title6(不去重)\n    ")]),t._v(" "),n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){return t.addDupNode({duplicate:"replace"})}}},[t._v("\n      添加重复节点title6(replace)\n    ")]),t._v(" "),n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){return t.addDupNode({duplicate:"remain"})}}},[t._v("\n      添加重复节点title6(remain)\n    ")]),t._v(" "),n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){return t.addDupNode({duplicate:"merge"})}}},[t._v("\n      添加重复节点title6(merge))\n    ")])],1),t._v(" "),n("xdh-go",{ref:"diagram",attrs:{nodes:t.nodes,links:t.links,"node-template-map":t.nodeTemplateMap,"link-template":t.linkTemplate,type:t.model,config:t.config,layout:t.layout,height:"650px"},on:{"on-ready":t.diagramReady}})],1)},[],!1,null,null,null);e.default=c.exports}}]);