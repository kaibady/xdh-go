(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{410:function(e,a,n){"use strict";n.r(a);var t=n(140),o={components:{XdhGo:t.a},data:function(){return{model:"GraphLinksModel",nodes:[{key:1,label:"click"},{key:2,label:"click"},{key:3,label:"mouseEnter/mouseLeave"},{key:4,label:"mouseEnter/mouseLeave"},{key:5,label:"dbclick"},{key:6,label:"dbclick"}],links:[{from:1,to:2,label:"try click",animation:[{trigger:"click",objectName:"sLabel",duration:500,prop:"scale",keyFrame:[1,2],easingFunc:["easeInOutCubic"]}]},{from:3,to:4,label:"try mouseEnter",animation:[{trigger:"mouseEnter",objectName:"sLabel",duration:300,prop:"scale",keyFrame:[1,2],easingFunc:["easeInQuad"]},{trigger:"mouseLeave",objectName:"sLabel",duration:300,prop:"scale",keyFrame:[2,1],easingFunc:["easeOutQuart"]}]},{from:5,to:6,label:"try doubleClick",animation:[{trigger:"dbclick",objectName:"sLabel",duration:500,prop:"scale",keyFrame:[1,2],easingFunc:["easeInQuad"]}]}]}},methods:{config:function(e,a){return{initialContentAlignment:a.Spot.Center}},layout:function(e,a){return e(a.LayeredDigraphLayout,{setsPortSpots:!1,layerSpacing:20,columnSpacing:10,isOngoing:!1})},nodeTemplate:function(e,a){return Object(t.s)(e,a,{props:{shape:"Circle",size:80}})},linkTemplate:function(e,a){return Object(t.r)(e,a,{props:{arrows:"to",fromPortId:"tFigure",toPortId:"tFigure",labelStroke:"#f759ab",labelBackground:"#ff85c0",labelColor:"#fff"}})},diagramReady:function(e,a,n){}}},r=n(16),l=Object(r.a)(o,function(){var e=this,a=e.$createElement,n=e._self._c||a;return n("div",[n("xdh-go",{ref:"diagram",attrs:{nodes:e.nodes,links:e.links,type:e.model,"node-template":e.nodeTemplate,"link-template":e.linkTemplate,config:e.config,layout:e.layout,height:"500px"},on:{"on-ready":e.diagramReady}})],1)},[],!1,null,null,null);a.default=l.exports}}]);