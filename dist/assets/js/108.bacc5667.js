(window.webpackJsonp=window.webpackJsonp||[]).push([[108],{382:function(e,t,n){"use strict";n.r(t);var a=n(140),o={components:{XdhGo:a.a},data:function(){return{model:"GraphLinksModel",nodes:[{key:1,label:"tNode",animation:[{trigger:"mouseEnter",objectName:"tNode",duration:300,prop:"scale",propType:"number",keyFrame:[1,1.4],easingFunc:["easeInOutCubic"]},{trigger:"mouseLeave",objectName:"tNode",duration:300,prop:"scale",propType:"number",keyFrame:[1.4,1],easingFunc:["easeInOutCubic"]}]},{key:2,label:"tFigure",animation:[{trigger:"mouseEnter",objectName:"tFigure",duration:300,prop:"scale",keyFrame:[1,1.4],easingFunc:["easeInOutCubic"]},{trigger:"mouseLeave",objectName:"tFigure",duration:300,prop:"scale",keyFrame:[1.4,1],easingFunc:["easeInOutCubic"]}]},{key:3,label:"tLabel",animation:[{trigger:"mouseEnter",objectName:"tLabel",duration:300,prop:"scale",keyFrame:[1,1.4],easingFunc:["easeInOutCubic"]},{trigger:"mouseLeave",objectName:"tLabel",duration:300,prop:"scale",keyFrame:[1.4,1],easingFunc:["easeInOutCubic"]}]}]}},methods:{config:function(e,t){return{initialContentAlignment:t.Spot.Center}},layout:function(e,t){return e(t.LayeredDigraphLayout,{setsPortSpots:!1,layerSpacing:150,direction:90,isOngoing:!0})},nodeTemplate:function(e,t){return Object(a.p)(e,t,{props:{shape:"Circle",size:80}})},diagramReady:function(e,t,n){}}},i=n(16),r=Object(i.a)(o,function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("xdh-go",{ref:"diagram",attrs:{nodes:this.nodes,type:this.model,"node-template":this.nodeTemplate,config:this.config,layout:this.layout,height:"250px"},on:{"on-ready":this.diagramReady}})],1)},[],!1,null,null,null);t.default=r.exports}}]);