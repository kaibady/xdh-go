(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{141:function(t,e,n){"use strict";var a=n(147),i=n(142),o=n(144),r=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(o);a(a.P+a.F*r,"String",{padStart:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0,!0)}})},142:function(t,e,n){var a=n(150),i=n(143),o=n(140);t.exports=function(t,e,n,r){var l=String(o(t)),s=l.length,d=void 0===n?" ":String(n),u=a(e);if(u<=s||""==d)return l;var c=u-s,m=i.call(d,Math.ceil(c/d.length));return m.length>c&&(m=m.slice(0,c)),r?m+l:l+m}},143:function(t,e,n){"use strict";var a=n(151),i=n(140);t.exports=function(t){var e=String(i(this)),n="",o=a(t);if(o<0||o==1/0)throw RangeError("Count can't be negative");for(;o>0;(o>>>=1)&&(e+=e))1&o&&(n+=e);return n}},144:function(t,e,n){var a=n(148).navigator;t.exports=a&&a.userAgent||""},428:function(t,e,n){"use strict";n.r(e);n(149),n(141),n(146);var a=n(145),i=(a.u.switcher,a.u.binding,a.o.DataManager,a.o.diagramManager),o={components:{XdhGo:a.a,XdhGoOverview:a.f},data:function(){var t=this;return{diagram:null,model:"TreeModel",nodes:[],links:[],msg:null,nodeCount:100,duplicateData:{level:"02",nodeCode:"7",title:"title6",type:"03"},initialed:!1,startTime:null,endTime:null,loading:!1,statistic:{linkActuralCount:0,nodeCount:0,nodeActuralCount:0},events:{LayoutCompleted:function(e){console.timeEnd("layoutCompleted1"),t.endTime=new Date,t.logtime(),t.loading=!1}}}},methods:{logtime:function(){this.initialed&&(this.startTime&&this.endTime&&(this.msg&&this.msg.close(),this.msg=this.$message({type:"success",duration:2e4,showClose:!0,message:"通用节点-用时".concat(this.endTime.getTime()-this.startTime.getTime(),"ms")})),this.startTime=null,this.endTime=null)},config:function(t,e){return{initialContentAlignment:e.Spot.Center,"toolManager.mouseWheelBehavior":e.ToolManager.WheelZoom,"animationManager.isEnabled":!1,minScale:.5,padding:new e.Margin(30,30,30,30)}},layout:function(t,e){return a.r.VirtualizedTreeLayout(t,e,{angle:90,nodeSpacing:4})},nodeTemplateMap:function(t,e){var n=new e.Map;return n.add("",Object(a.t)(t,e,{props:{shape:"Circle",size:60,_nodeOptions:{props:{isLayoutPositioned:!1}}}})),n},linkTemplate:function(t,e){return Object(a.s)(t,e,{props:{arrows:"to",fromPortId:"tFigure",toPortId:"tFigure",_linkOptions:{props:{isLayoutPositioned:!1}}}})},loadDataFunc:function(t,e,n){var i=this,o=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];if(o){var r=e(n.TreeModel);t.layout.model=r}else{var l=e(n.TreeModel);t.model=l}a.r.handlerVirtualTree(n,t,t.layout.model,o,this.updateCounts),this.initialed=!0,this.startTime=new Date;var s=[];this.getTestData().then(function(e){e.nodes.forEach(function(t){var e=i.nodeConvert(t);console.log(e),e.bounds=new n.Rect(0,0,100,120),s.push(e)}),t.layout.model.nodeDataArray=s})},diagramReady:function(t,e,n){},updateCounts:function(t,e){this.statistic.nodeCount=e.nodeDataArray.length,this.statistic.nodeActuralCount=t.nodes.count,this.statistic.linkActuralCount=t.links.count},getTestData:function(){var t=this,e={nodes:function(){for(var e=[],n=0;n<t.nodeCount;n++)e.push({nodeCode:String(n+1),type:(n%4+1).toString().padStart(2,"0"),level:(n%3+1).toString().padStart(2,"0"),title:"title"+n,parent:n>0?String(Math.floor((n+1)/2)):void 0});return e}()};return new Promise(function(t,n){t(e)})},nodeMerger:function(t,e,n,a){var i=JSON.parse(JSON.stringify(t));return i.label.text.push({text:e._originData.title+":"+e._originData.level}),i},nodeConvert:function(t){var e={key:t.nodeCode,parent:t.parent,label:{text:[{text:t.title+":"+t.level}],margin:[5,10,5,10]}},n={hover:"#0050b3"};switch(t.level){case"01":n.normal="#389e0d";break;case"02":n.normal="#722ed1";break;case"03":n.normal="#c41d7f"}if(e.strokeColor=n,e.strokeWidth=8,"01"===t.type)e.shape="clipImage",e.image="/xdh-go/img/node/circleimage/8.png";else{e.shape="icon";var a={font:'24px "iconfont"'};switch(t.type){case"02":a.text="";break;case"03":a.text="";break;case"04":a.text=""}e.icon=a}return e.labelBackground={normal:"#fff566",hover:"#ffffb8"},e},resetDiagram:function(){var t=this;this.loading=!0,setTimeout(function(){console.time("layoutCompleted1"),t.startTime=new Date;var e=t.$refs.diagram1.go,n=e.GraphObject.make;t.loadDataFunc(i.dig1,n,e,!1)},100)},clearDiagram:function(){(void 0).clear()},addNode:function(){var t=5e3+Math.floor(5e3*Math.random()),e={nodeCode:String(t),type:(t%4+1).toString().padStart(2,"0"),level:(t%3+1).toString().padStart(2,"0"),title:"title"+t,parent:"1"},n=this.$refs.diagram1.go,a=n.GraphObject.make,o=this.nodeConvert(e);o.bounds=new n.Rect(0,0,100,120),i.dig1.layout.model.addNodeData(o);var r=a(n.TreeModel);i.dig1.model=r}},mounted:function(){},created:function(){}},r=n(16),l=Object(r.a)(o,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[n("div",{staticStyle:{"text-align":"center","margin-top":"10px"}},[n("el-input-number",{attrs:{min:1,max:5e3,label:"节点数量"},model:{value:t.nodeCount,callback:function(e){t.nodeCount=e},expression:"nodeCount"}}),t._v(" "),n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.resetDiagram}},[t._v("\n      重新加载\n    ")]),t._v(" "),n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.clearDiagram}},[t._v("\n      清空画布\n    ")]),t._v(" "),n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.addNode}},[t._v("\n      添加节点\n    ")]),t._v(" "),n("div",[n("div",[t._v("model节点数: "+t._s(t.statistic.nodeCount))]),t._v(" "),n("div",[t._v("显示节点数: "+t._s(t.statistic.nodeActuralCount))]),t._v(" "),n("div",[t._v("显示连线数: "+t._s(t.statistic.linkActuralCount))])])],1),t._v(" "),n("xdh-go",{ref:"diagram1",attrs:{nodes:t.nodes,links:t.links,"node-template-map":t.nodeTemplateMap,"link-template":t.linkTemplate,"load-data-func":t.loadDataFunc,type:t.model,config:t.config,layout:t.layout,height:"650px",events:t.events},on:{"on-ready":t.diagramReady}},[n("xdh-go-overview",{attrs:{diagram:t.diagram}})],1)],1)},[],!1,null,null,null);e.default=l.exports}}]);