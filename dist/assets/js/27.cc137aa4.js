(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{141:function(t,e,n){"use strict";var a=n(147),i=n(142),r=n(144),o=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(r);a(a.P+a.F*o,"String",{padStart:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0,!0)}})},142:function(t,e,n){var a=n(150),i=n(143),r=n(140);t.exports=function(t,e,n,o){var l=String(r(t)),u=l.length,s=void 0===n?" ":String(n),c=a(e);if(c<=u||""==s)return l;var d=c-u,m=i.call(s,Math.ceil(d/s.length));return m.length>d&&(m=m.slice(0,d)),o?m+l:l+m}},143:function(t,e,n){"use strict";var a=n(151),i=n(140);t.exports=function(t){var e=String(i(this)),n="",r=a(t);if(r<0||r==1/0)throw RangeError("Count can't be negative");for(;r>0;(r>>>=1)&&(e+=e))1&r&&(n+=e);return n}},144:function(t,e,n){var a=n(148).navigator;t.exports=a&&a.userAgent||""},152:function(t,e,n){"use strict";n(153)("link",function(t){return function(e){return t(this,"a","href",e)}})},445:function(t,e,n){"use strict";n.r(e);n(149),n(141),n(146);var a,i,r=n(157),o=(n(152),n(145)),l=(o.u.switcher,o.u.binding,o.u.node),u=o.u.link,s=o.u.shape,c=o.o.DataManager,d={components:{XdhGo:o.a,XdhGoOverview:o.f},data:function(){var t,e=this;return t={showDiagram:!0,currLayout:"LayeredDigraphLayout",diagram:null,model:null},Object(r.a)(t,"model","GraphLinksModel"),Object(r.a)(t,"nodes",[]),Object(r.a)(t,"links",[]),Object(r.a)(t,"msg",null),Object(r.a)(t,"nodeCount",100),Object(r.a)(t,"initialed",!1),Object(r.a)(t,"duplicateData",{level:"02",nodeCode:"7",title:"title6",type:"03"}),Object(r.a)(t,"startTime",null),Object(r.a)(t,"endTime",null),Object(r.a)(t,"loading",!1),Object(r.a)(t,"events",{LayoutCompleted:function(t){console.timeEnd("layoutCompleted2"),e.endTime=new Date,e.logtime(),e.loading=!1}}),t},methods:{logtime:function(){this.initialed&&(this.startTime&&this.endTime&&(this.msg&&this.msg.close(),this.msg=this.$message({type:"warning",duration:2e4,showClose:!0,message:"简化节点-用时".concat(this.endTime.getTime()-this.startTime.getTime(),"ms")})),this.startTime=null,this.endTime=null)},config:function(t,e){return{initialContentAlignment:e.Spot.Center,"toolManager.mouseWheelBehavior":e.ToolManager.WheelZoom,initialAutoScale:e.Diagram.UniformToFill}},layout:function(t,e){return t(e.LayeredDigraphLayout,{direction:90})},nodeTemplate:function(t,e){return l(t,e,{parts:[s(t,e,{props:{figure:"Circle",fill:"red",stroke:"#000"}})]})},linkTemplate:function(t,e){return u(t,e,{parts:[s(t,e,{props:{stroke:"#000"}})]})},diagramReady:function(t,e,n){var r=this;this.$data.$diagram=t,i=t,(a=new c(t,n)).setNodeConverter("nodeCv1",this.nodeConvert,this.nodeMerger),a.setLinkConverter("linkCv1",this.linkConvert),this.initialed=!0,console.time("layoutCompleted2"),this.startTime=new Date,i.skipsUndoManager=!0;var o=[],l=[];this.getTestData().then(function(t){t.nodes.forEach(function(t){o.push(r.nodeConvert(t))}),i.model.nodeDataArray=o,t.links.forEach(function(t){l.push(r.linkConvert(t))}),i.model.linkDataArray=l})},getTestData:function(){var t=this,e={nodes:function(){for(var e=[],n=0;n<t.nodeCount;n++)e.push({nodeCode:String(n+1),type:(n%4+1).toString().padStart(2,"0"),level:(n%3+1).toString().padStart(2,"0"),title:"title"+n});return e}(),links:function(){for(var e=[],n=0;n<t.nodeCount;n++)0!==n&&e.push({from:String(Math.floor(n/2)+1),to:String(n+1),type:(n%2+1).toString().padStart(2,"0"),title:"label"+n});return e}()};return new Promise(function(t,n){t(e)})},nodeMerger:function(t,e,n,a){var i=JSON.parse(JSON.stringify(t));return i.label.text.push({text:e._originData.title+":"+e._originData.level}),i},nodeConvert:function(t){var e={key:t.nodeCode,label:{text:[{text:t.title+":"+t.level}],margin:[5,10,5,10]}},n={hover:"#f0f5ff"};switch(t.level){case"01":n.normal="#389e0d";break;case"02":n.normal="#722ed1";break;case"03":n.normal="#c41d7f"}if(e.strokeColor=n,e.strokeWidth=8,"01"===t.type)e.shape="clipImage",e.image="/xdh-go/img/node/circleimage/8.png";else{e.shape="icon";var a={font:'24px "iconfont"'};switch(t.type){case"02":a.text="";break;case"03":a.text="";break;case"04":a.text=""}e.icon=a}return e.labelBackground={normal:"#fff566",hover:"#ffffb8"},e},linkConvert:function(t){var e={from:t.from,to:t.to,label:t.title},n="";switch(t.type){case"01":n="#d48806";break;case"02":n="#389e0d"}return e.lineColor=n,e.lineWidth={normal:2,hover:4},e.labelColor="#3f6600",e._originData=t,e},resetDiagram:function(){var t=this;a.clear(),setTimeout(function(){console.time("layoutCompleted2"),t.startTime=new Date;var e=[],n=[];t.getTestData().then(function(a){a.nodes.forEach(function(n){e.push(t.nodeConvert(n))}),i.model.nodeDataArray=e,a.links.forEach(function(e){n.push(t.linkConvert(e))}),i.model.linkDataArray=n})},100)},setLayout:function(t){this.currLayout=t;var e=this.$refs.diagram.go,n=e.GraphObject.make,a={};"LayeredDigraphLayout"===t?a.direction=90:"TreeLayout"===t&&(a.angle=90),this.startTime=new Date,i.layout=n(e[t],a)},clearDiagram:function(){a.clear()}},mounted:function(){}},m=n(16),f=Object(m.a)(d,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[n("div",{staticStyle:{"text-align":"center","margin-top":"10px"}},[n("el-input-number",{attrs:{min:1,max:1e3,label:"节点数量"},model:{value:t.nodeCount,callback:function(e){t.nodeCount=e},expression:"nodeCount"}}),t._v(" "),n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(e){t.showDiagram=!0}}},[t._v("\n      显示\n    ")]),t._v(" "),n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.resetDiagram}},[t._v("\n      重新加载\n    ")]),t._v(" "),n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.clearDiagram}},[t._v("\n      清空画布\n    ")]),t._v(" "),n("el-button",{attrs:{size:"mini",type:"ForceDirectedLayout"===t.currLayout?"primary":"default"},on:{click:function(e){return t.setLayout("ForceDirectedLayout")}}},[t._v("\n      ForceDirectedLayout\n    ")]),t._v(" "),n("el-button",{attrs:{type:"GridLayout"===t.currLayout?"primary":"default",size:"mini"},on:{click:function(e){return t.setLayout("GridLayout")}}},[t._v("\n      GridLayout\n    ")]),t._v(" "),n("el-button",{attrs:{type:"LayeredDigraphLayout"===t.currLayout?"primary":"default",size:"mini"},on:{click:function(e){return t.setLayout("LayeredDigraphLayout")}}},[t._v("\n      LayeredDigraphLayout\n    ")]),t._v(" "),n("el-button",{attrs:{type:"TreeLayout"===t.currLayout?"primary":"default",size:"mini"},on:{click:function(e){return t.setLayout("TreeLayout")}}},[t._v("\n      TreeLayout\n    ")]),t._v(" "),n("el-button",{attrs:{type:"CircularLayout"===t.currLayout?"primary":"default",size:"mini"},on:{click:function(e){return t.setLayout("CircularLayout")}}},[t._v("\n      CircularLayout\n    ")])],1),t._v(" "),t.showDiagram?n("xdh-go",{ref:"diagram",attrs:{nodes:t.nodes,links:t.links,"node-template":t.nodeTemplate,"link-template":t.linkTemplate,type:t.model,config:t.config,layout:t.layout,height:"650px",events:t.events},on:{"on-ready":t.diagramReady}}):t._e()],1)},[],!1,null,null,null);e.default=f.exports}}]);