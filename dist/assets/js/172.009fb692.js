(window.webpackJsonp=window.webpackJsonp||[]).push([[172],{605:function(t,e,n){"use strict";n.r(e);for(var a,o,i=n(145),r=i.o.DataManager,l=i.n.AnimationEvents,u=[],s=0;s<2;s++){var c=Math.floor(s/2);u.push({key:String(s+1),label:["sLabel"][c]})}var m={components:{XdhGo:i.a},data:function(){return{diagram:null,animateContinue:!1,model:"GraphLinksModel",nodes:u,links:[{from:"1",to:"2",label:"custom",animation:[{trigger:"rotate",objectName:"sLabel",duration:800,prop:"angle",keyFrame:[0,360],easingFunc:["easeInOutCubic"]}]}]}},methods:{config:function(t,e){return{initialContentAlignment:e.Spot.Center}},layout:function(t,e){return t(e.LayeredDigraphLayout,{setsPortSpots:!1,layerSpacing:200,columnSpacing:10,isOngoing:!1})},nodeTemplate:function(t,e){return Object(i.t)(t,e,{props:{shape:"Circle",size:80}})},linkTemplate:function(t,e){return Object(i.s)(t,e,{props:{arrows:"to",fromPortId:"tFigure",fromShortLength:10,toShortLength:10,toPortId:"tFigure",lineWidth:6,arrowStrokeWidth:6,labelStroke:"#f759ab",labelBackground:"#ff85c0",labelColor:"#fff"}})},diagramReady:function(t,e,n){this.diagram=t,a=new r(t,n),t.dataManager=a;var i=a.getLink({from:"1",to:"2"},!0,!0);o.on("slide",i,[{trigger:"slide",objectName:"sLabel",duration:800,repeatCount:2,direction:"alternate",prop:"segmentOffset",propType:"point",keyFrame:[[0,0],[0,40]],easingFunc:["easeInOutCubic"]}])},onLoadData:function(t,e,n){o=new l(t,n),t.animationEvents=o},triggerRotate:function(){var t=a.getLink({from:"1",to:"2"},!0,!0);o.emit("rotate",t)},triggerSlide:function(){var t=a.getLink({from:"1",to:"2"},!0,!0);o.emit("slide",t)},startRotate:function(){this.animateContinue=!0,this.runRotate()},endRotate:function(){this.animateContinue=!1},runRotate:function(){var t=this;o.emit("rotate","all",function(){t.animateContinue&&t.runRotate()},!0)}}},d=n(16),p=Object(d.a)(m,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticStyle:{"text-align":"center","margin-top":"10px"}},[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.triggerRotate()}}},[t._v("连线rotate事件")]),t._v(" "),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.triggerSlide()}}},[t._v("连线slide事件")]),t._v(" "),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.startRotate()}}},[t._v("循环rotate事件")]),t._v(" "),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.endRotate()}}},[t._v("停止循环rotate")])],1),t._v(" "),n("xdh-go",{ref:"diagram",attrs:{nodes:t.nodes,links:t.links,type:t.model,"node-template":t.nodeTemplate,"link-template":t.linkTemplate,config:t.config,layout:t.layout,height:"400px"},on:{"on-ready":t.diagramReady,"on-load-data":t.onLoadData}})],1)},[],!1,null,null,null);e.default=p.exports}}]);