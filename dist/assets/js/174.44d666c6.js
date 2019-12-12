(window.webpackJsonp=window.webpackJsonp||[]).push([[174],{439:function(t,e,n){"use strict";n.r(e);var a,r=n(145),o=r.u.tag,i=(r.u.shape,r.u.binding,r.n.AnimationEvents),l={components:{XdhGo:r.a},data:function(){return{model:"GraphLinksModel",animateContinue:!1,nodes:[{key:1,label:"节点预定义slide事件",loadTag:{text:""},animation:[{trigger:"slide",objectName:"loadTag",duration:800,prop:"alignment",propType:"spot",repeatCount:2,direction:"alternate",keyFrame:[[.5,.5],[1,.5]],easingFunc:["easeInOutCubic"]}]},{key:2,label:"使用all注册默认",loadTag:{text:""}},{key:3,label:"注册特定节点",loadTag:{text:""}},{key:4,label:"注册特定节点",loadTag:{text:""}}]}},methods:{registerRotate:function(){a.on("rotate","all",[{trigger:"rotate",objectName:"loadTag",duration:800,prop:"angle",propType:"number",keyFrame:[0,360],easingFunc:["ease"]}])},unregisterRotate:function(){a.off("rotate","all")},triggerRotate:function(){var t=this.$refs.diagram.findNode(function(t){return 2===t.key},!0);a.emit("rotate",t)},triggerAllRotate:function(){a.emit("rotate","all")},triggerAllRotateReverse:function(){a.emit("rotateReverse","all")},triggerSlide:function(){a.emit("slide","all")},startRotate:function(){this.animateContinue=!0,this.runRotate()},endRotate:function(){this.animateContinue=!1},runRotate:function(){var t=this;a.emit("rotate","all",function(){t.animateContinue&&t.runRotate()})},config:function(t,e){return{initialContentAlignment:e.Spot.Center,"toolManager.hoverDelay":10}},layout:function(t,e){return t(e.GridLayout,{wrappingColumn:3})},nodeTemplate:function(t,e){return Object(r.t)(t,e,{props:{shape:"Circle",size:80,_figurePanelOptions:{parts:[o(t,e,{name:"loadTag",background:"transparent",font:'22px "iconfont"',placement:"center",stroke:"transparent",color:"#000",strokeWidth:0,dataKey:"loadTag"})]}}})},diagramReady:function(t,e,n){},onLoadData:function(t,e,n){a=new i(t,n),t.animationEvents=a,this.registerRotate(),a.on("rotateReverse",[3,4],[{trigger:"rotateReverse",objectName:"loadTag",duration:800,prop:"angle",propType:"number",keyFrame:[360,0],easingFunc:["easeInOutCubic"]}])}}},u=n(16),s=Object(u.a)(l,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticStyle:{"text-align":"center","margin-top":"10px"}},[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.triggerRotate()}}},[t._v("单节点rotate事件")]),t._v(" "),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.triggerAllRotate()}}},[t._v("所有节点rotate事件")]),t._v(" "),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.triggerAllRotateReverse()}}},[t._v("特定节点rotateReverse事件")]),t._v(" "),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.triggerSlide()}}},[t._v("特定节点slide事件")]),t._v(" "),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.startRotate()}}},[t._v("循环rotate事件")]),t._v(" "),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.endRotate()}}},[t._v("停止循环rotate")])],1),t._v(" "),n("div",{staticStyle:{"text-align":"center","margin-top":"10px"}},[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.registerRotate()}}},[t._v("注册rotate事件")]),t._v(" "),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.unregisterRotate()}}},[t._v("注销rotate事件")])],1),t._v(" "),n("xdh-go",{ref:"diagram",attrs:{nodes:t.nodes,type:t.model,"node-template":t.nodeTemplate,config:t.config,layout:t.layout,height:"300px"},on:{"on-ready":t.diagramReady,"on-load-data":t.onLoadData}})],1)},[],!1,null,null,null);e.default=s.exports}}]);