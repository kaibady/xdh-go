(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{141:function(t,e,n){"use strict";var i=n(147),r=n(142),a=n(144),o=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(a);i(i.P+i.F*o,"String",{padStart:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0,!0)}})},142:function(t,e,n){var i=n(150),r=n(143),a=n(140);t.exports=function(t,e,n,o){var l=String(a(t)),u=l.length,s=void 0===n?" ":String(n),c=i(e);if(c<=u||""==s)return l;var d=c-u,m=r.call(s,Math.ceil(d/s.length));return m.length>d&&(m=m.slice(0,d)),o?m+l:l+m}},143:function(t,e,n){"use strict";var i=n(151),r=n(140);t.exports=function(t){var e=String(r(this)),n="",a=i(t);if(a<0||a==1/0)throw RangeError("Count can't be negative");for(;a>0;(a>>>=1)&&(e+=e))1&a&&(n+=e);return n}},144:function(t,e,n){var i=n(148).navigator;t.exports=i&&i.userAgent||""},152:function(t,e,n){"use strict";n(153)("link",function(t){return function(e){return t(this,"a","href",e)}})},568:function(t,e,n){"use strict";n.r(e);n(149),n(141),n(146),n(152);var i,r,a=n(145),o=n(156),l=n.n(o),u=(a.u.switcher,a.u.binding,a.u.node),s=a.u.link,c=a.u.shape,d=a.o.DataManager,m={components:{XdhGo:a.a,XdhGoOverview:a.f},data:function(){var t=this;return{showDiagram:!1,currLayout:"LayeredDigraphLayout",diagram:null,model:"GraphLinksModel",nodes:[],links:[],msg:null,nodeCount:100,initialed:!1,duplicateData:{level:"02",nodeCode:"7",title:"title6",type:"03"},startTime:null,endTime:null,loading:!1,events:{LayoutCompleted:function(e){console.timeEnd("layoutCompleted2"),t.endTime=new Date,t.logtime(),t.loading=!1}}}},methods:{logtime:function(){this.initialed&&(this.startTime&&this.endTime&&(this.msg&&this.msg.close(),this.msg=this.$message({type:"warning",duration:2e4,showClose:!0,message:"简化节点-用时".concat(this.endTime.getTime()-this.startTime.getTime(),"ms")})),this.startTime=null,this.endTime=null)},config:function(t,e){return{initialContentAlignment:e.Spot.Center,"toolManager.mouseWheelBehavior":e.ToolManager.WheelZoom,initialAutoScale:e.Diagram.UniformToFill}},layout:function(t,e){return t(e.LayeredDigraphLayout,{direction:90})},nodeTemplate:function(t,e){return u(t,e,{parts:[c(t,e,{props:{figure:"Circle",fill:"red",stroke:"#000"}})]})},linkTemplate:function(t,e){return s(t,e,{parts:[c(t,e,{props:{stroke:"#000"}})]})},diagramReady:function(t,e,n){r=t,(i=new d(t,n)).setNodeConverter("nodeCv1",this.nodeConvert,this.nodeMerger),i.setLinkConverter("linkCv1",this.linkConvert),this.initialed=!0,console.time("layoutCompleted2"),this.startTime=new Date,r.skipsUndoManager=!0,this.getTestData().then(function(t){t.nodes.forEach(function(t){i.addNode(t,"nodeCv1")}),t.links.forEach(function(t){i.addLink(t,"linkCv1")}),r.layoutDiagram()})},getTestData:function(){var t=this,e={nodes:function(){for(var e=[],n=0;n<t.nodeCount;n++)e.push({nodeCode:String(n+1),type:(n%4+1).toString().padStart(2,"0"),level:(n%3+1).toString().padStart(2,"0"),title:"title"+n});return e}(),links:function(){for(var e=[],n=0;n<t.nodeCount;n++)0!==n&&e.push({from:String(Math.floor(n/2)+1),to:String(n+1),type:(n%2+1).toString().padStart(2,"0"),title:"label"+n});return e}()};return new Promise(function(t,n){t(e)})},nodeMerger:function(t,e,n,i){var r=JSON.parse(JSON.stringify(t));return r.label.text.push({text:e._originData.title+":"+e._originData.level}),r},nodeConvert:function(t){var e={key:t.nodeCode,label:{text:[{text:t.title+":"+t.level}],margin:[5,10,5,10]}},n={hover:"#f0f5ff"};switch(t.level){case"01":n.normal="#389e0d";break;case"02":n.normal="#722ed1";break;case"03":n.normal="#c41d7f"}if(e.strokeColor=n,e.strokeWidth=8,"01"===t.type)e.shape="clipImage",e.image="/xdh-go/img/node/circleimage/8.png";else{e.shape="icon";var i={font:'24px "iconfont"'};switch(t.type){case"02":i.text="";break;case"03":i.text="";break;case"04":i.text=""}e.icon=i}return e.labelBackground={normal:"#fff566",hover:"#ffffb8"},e},linkConvert:function(t){var e={from:t.from,to:t.to,label:t.title},n="";switch(t.type){case"01":n="#d48806";break;case"02":n="#389e0d"}return e.lineColor=n,e.lineWidth={normal:2,hover:4},e.labelColor="#3f6600",e._originData=t,e},resetDiagram:function(){var t=this;i.clear(),setTimeout(function(){console.time("layoutCompleted2"),t.startTime=new Date;var e=[],n=[];t.getTestData().then(function(i){i.nodes.forEach(function(n){e.push(t.nodeConvert(n))}),r.model.nodeDataArray=e,i.links.forEach(function(e){n.push(t.linkConvert(e))}),r.model.linkDataArray=n})},100)},setLayout:function(t){this.currLayout=t;var e=l.a.GraphObject.make,n={};"LayeredDigraphLayout"===t?n.direction=90:"TreeLayout"===t&&(n.angle=90),this.startTime=new Date,r.layout=e(l.a[t],n)},clearDiagram:function(){i.clear()}},mounted:function(){}},f=n(16),g=Object(f.a)(m,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[n("div",{staticStyle:{"text-align":"center","margin-top":"10px"}},[n("el-input-number",{attrs:{min:1,max:1e3,label:"节点数量"},model:{value:t.nodeCount,callback:function(e){t.nodeCount=e},expression:"nodeCount"}}),t._v(" "),n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){t.showDiagram=!0}}},[t._v("\n      显示\n    ")]),t._v(" "),n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.resetDiagram}},[t._v("\n      重新加载\n    ")]),t._v(" "),n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.clearDiagram}},[t._v("\n      清空画布\n    ")]),t._v(" "),n("el-button",{attrs:{size:"mini",type:"ForceDirectedLayout"===t.currLayout?"primary":"default"},on:{click:function(e){return t.setLayout("ForceDirectedLayout")}}},[t._v("\n      ForceDirectedLayout\n    ")]),t._v(" "),n("el-button",{attrs:{type:"GridLayout"===t.currLayout?"primary":"default",size:"mini"},on:{click:function(e){return t.setLayout("GridLayout")}}},[t._v("\n      GridLayout\n    ")]),t._v(" "),n("el-button",{attrs:{type:"LayeredDigraphLayout"===t.currLayout?"primary":"default",size:"mini"},on:{click:function(e){return t.setLayout("LayeredDigraphLayout")}}},[t._v("\n      LayeredDigraphLayout\n    ")]),t._v(" "),n("el-button",{attrs:{type:"TreeLayout"===t.currLayout?"primary":"default",size:"mini"},on:{click:function(e){return t.setLayout("TreeLayout")}}},[t._v("\n      TreeLayout\n    ")]),t._v(" "),n("el-button",{attrs:{type:"CircularLayout"===t.currLayout?"primary":"default",size:"mini"},on:{click:function(e){return t.setLayout("CircularLayout")}}},[t._v("\n      CircularLayout\n    ")])],1),t._v(" "),t.showDiagram?n("xdh-go",{ref:"diagram",attrs:{nodes:t.nodes,links:t.links,"node-template":t.nodeTemplate,"link-template":t.linkTemplate,type:t.model,config:t.config,layout:t.layout,height:"650px",events:t.events},on:{"on-ready":t.diagramReady}}):t._e()],1)},[],!1,null,null,null);e.default=g.exports}}]);