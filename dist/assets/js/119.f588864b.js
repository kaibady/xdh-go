(window.webpackJsonp=window.webpackJsonp||[]).push([[119],{527:function(e,t,a){"use strict";a.r(t);var n=a(140),o=n.q.tag,i={components:{XdhGo:n.a},data:function(){return{model:"GraphLinksModel",nodes:[{key:1,label:"spot类型属性",mytag:"spot",animation:[{trigger:"mouseEnter",objectName:"myTag",duration:300,prop:"alignment",propType:"spot",keyFrame:[[0,0],[1,0]],easingFunc:["easeInOutCubic","easeInElastic"]},{trigger:"mouseLeave",objectName:"myTag",duration:300,prop:"alignment",propType:"spot",keyFrame:[[1,0],[0,0]],easingFunc:["easeInOutCubic","easeInElastic"]}]},{key:2,label:"tFigure",animation:[{trigger:"mouseEnter",objectName:"tFigure",duration:300,prop:"scale",keyFrame:[1,1.4],easingFunc:["easeInOutCubic"]},{trigger:"mouseLeave",objectName:"tFigure",duration:300,prop:"scale",keyFrame:[1.4,1],easingFunc:["easeInOutCubic"]}]},{key:3,label:"tLabel",animation:[{trigger:"mouseEnter",objectName:"tLabel",duration:300,prop:"scale",keyFrame:[1,1.4],easingFunc:["easeInOutCubic"]},{trigger:"mouseLeave",objectName:"tLabel",duration:300,prop:"scale",keyFrame:[1.4,1],easingFunc:["easeInOutCubic"]}]}]}},methods:{config:function(e,t){return{initialContentAlignment:t.Spot.Center}},layout:function(e,t){return e(t.LayeredDigraphLayout,{setsPortSpots:!1,layerSpacing:150,direction:90,isOngoing:!0})},nodeTemplate:function(e,t){return Object(n.p)(e,t,{props:{shape:"Circle",size:80,_figurePanelOptions:{parts:[o(e,t,{props:{alignment:new t.Spot(.5,0)},name:"myTag",figure:"RoundedRectangle",fill:"#eb2f96",stroke:"#780650",color:"#000",strokeWidth:2,textKey:"mytag"})]}}})},diagramReady:function(e,t,a){}}},r=a(16),s=Object(r.a)(i,function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("xdh-go",{ref:"diagram",attrs:{nodes:this.nodes,type:this.model,"node-template":this.nodeTemplate,config:this.config,layout:this.layout,height:"250px"},on:{"on-ready":this.diagramReady}})],1)},[],!1,null,null,null);t.default=s.exports}}]);