(window.webpackJsonp=window.webpackJsonp||[]).push([[120],{141:function(n,e,t){"use strict";var r=t(147),i=t(142),o=t(144),a=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(o);r(r.P+r.F*a,"String",{padStart:function(n){return i(this,n,arguments.length>1?arguments[1]:void 0,!0)}})},142:function(n,e,t){var r=t(150),i=t(143),o=t(140);n.exports=function(n,e,t,a){var l=String(o(n)),c=l.length,d=void 0===t?" ":String(t),u=r(e);if(u<=c||""==d)return l;var s=u-c,f=i.call(d,Math.ceil(s/d.length));return f.length>s&&(f=f.slice(0,s)),a?f+l:l+f}},143:function(n,e,t){"use strict";var r=t(151),i=t(140);n.exports=function(n){var e=String(i(this)),t="",o=r(n);if(o<0||o==1/0)throw RangeError("Count can't be negative");for(;o>0;(o>>>=1)&&(e+=e))1&o&&(t+=e);return t}},144:function(n,e,t){var r=t(148).navigator;n.exports=r&&r.userAgent||""},451:function(n,e,t){"use strict";t.r(e);t(165),t(146),t(158),t(149),t(141);var r,i=t(145),o=(i.u.switcher,i.u.binding,i.o.DataManager);function a(){var n={nodes:function(){for(var n=[],e=0;e<6;e++)n.push({nodeCode:String(e+1),type:(e%4+1).toString().padStart(2,"0"),level:(e%3+1).toString().padStart(2,"0"),title:"node"+(e+1)});return n}(),links:function(){for(var n=[],e="1,2|1,3|2,4|2,5|3,6|2,6".split("|"),t=0;t<6;t++){var r=e[t].split(",");n.push({linkCode:String(t+1),from:r[0],to:r[1],type:(t%2+1).toString().padStart(2,"0"),title:"line"+(t+1)})}return n}()};return new Promise(function(e,t){e(n)})}var l={components:{XdhGo:i.a},data:function(){return{diagram:null,model:"GraphLinksModel",nodes:[],links:[]}},methods:{config:function(n,e){return{initialContentAlignment:e.Spot.Center}},layout:function(n,e){return n(e.LayeredDigraphLayout,{direction:90,setsPortSpots:!1,layerSpacing:0})},nodeTemplateMap:function(n,e){var t=new e.Map;return t.add("",Object(i.t)(n,e,{props:{shape:"Circle",size:60}})),t},linkTemplate:function(n,e){return Object(i.s)(n,e,{props:{arrows:"to",fromPortId:"tFigure",toPortId:"tFigure"}})},diagramReady:function(n,e,t){r=new o(n,t),n.dataManager=r,r.setNodeConverter("nodeCv1",this.nodeConvert),r.setLinkConverter("linkCv1",this.linkConvert),a().then(function(n){n.nodes.forEach(function(n){r.addNode(n,"nodeCv1")}),n.links.forEach(function(n){r.addLink(n,"linkCv1")})})},nodeConvert:function(n){var e={key:n.nodeCode,label:{text:[{text:n.title}],margin:[5,10,5,10]}},t={hover:"#f0f5ff"};switch(n.level){case"01":t.normal="#389e0d";break;case"02":t.normal="#722ed1";break;case"03":t.normal="#c41d7f"}if(e.strokeColor=t,e.strokeWidth=8,"01"===n.type)e.shape="clipImage",e.image="/xdh-go/img/node/circleimage/8.png";else{e.shape="icon";var r={font:'24px "iconfont"'};switch(n.type){case"02":r.text="";break;case"03":r.text="";break;case"04":r.text=""}e.icon=r}return e.labelBackground={normal:"#fff566",hover:"#ffffb8"},e},linkConvert:function(n){var e={key:n.linkCode,from:n.from,to:n.to,label:n.title},t="";switch(n.type){case"01":t="#d48806";break;case"02":t="#389e0d"}return e.lineColor=t,e.lineWidth={normal:2,hover:4},e.labelColor="#3f6600",e._originData=n,e},resetDiagram:function(){r.clear(),a().then(function(n){n.nodes.forEach(function(n){r.addNode(n,"nodeCv1")}),n.links.forEach(function(n){r.addLink(n,"linkCv1")})})},removeLinkByKey:function(){r.removeLink("1")},removeLinkByData:function(){var n=diagramManager.dig2.model.linkDataArray.find(function(n){return"2"===n.key});n&&r.removeLink(n)},removeLinkByLink:function(){var n=diagramManager.dig2.model.linkDataArray.find(function(n){return"3"===n.key}),e=diagramManager.dig2.findLinkForData(n);e&&r.removeLink(e)},removeLinkByExample:function(){r.removeLink({from:"2",to:"5"},!0)}},mounted:function(){}},c=t(16),d=Object(c.a)(l,function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",[t("div",{staticStyle:{"text-align":"center","margin-top":"10px"}},[t("el-button",{attrs:{size:"mini",type:"primary"},on:{click:n.resetDiagram}},[n._v("\n      重置数据\n    ")]),n._v(" "),t("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){return n.removeLinkByKey()}}},[n._v("\n      删除line1(by key)\n    ")]),n._v(" "),t("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){return n.removeLinkByData()}}},[n._v("\n      删除line2(by data)\n    ")]),n._v(" "),t("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){return n.removeLinkByLink()}}},[n._v("\n      删除line3(by go.Link)\n    ")]),n._v(" "),t("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){return n.removeLinkByExample()}}},[n._v("\n      删除2->5(by example)\n    ")])],1),n._v(" "),t("xdh-go",{ref:"diagram",attrs:{"diagram-name":"dig2",nodes:n.nodes,links:n.links,"node-template-map":n.nodeTemplateMap,"link-template":n.linkTemplate,type:n.model,config:n.config,layout:n.layout,height:"650px"},on:{"on-ready":n.diagramReady}})],1)},[],!1,null,null,null);e.default=d.exports}}]);