(window.webpackJsonp=window.webpackJsonp||[]).push([[139],{469:function(e,t,n){"use strict";n.r(t);var a=n(140),i=a.q.tag,o={components:{XdhGo:a.a},data:function(){return{model:"GraphLinksModel",nodes:[{key:1,label:"alignment:spot类型属性",mytag:"spot",animation:[{trigger:"mouseEnter",objectName:"myTag",duration:300,prop:"alignment",propType:"spot",keyFrame:[[.3,0],[.7,0]],easingFunc:["easeInOutCubic","easeInElastic"]},{trigger:"mouseLeave",objectName:"myTag",duration:300,prop:"alignment",propType:"spot",keyFrame:[[.7,0],[.3,0]],easingFunc:["easeInOutCubic","easeInElastic"]}]},{key:2,label:"number",animation:[{trigger:"mouseEnter",objectName:"tFigure",duration:300,prop:"scale",keyFrame:[1,1.2],easingFunc:["easeInOutCubic"]},{trigger:"mouseLeave",objectName:"tFigure",duration:300,prop:"scale",keyFrame:[1.2,1],easingFunc:["easeInOutCubic"]}]},{key:3,label:"position:point",layout:"Position",animation:[{trigger:"mouseEnter",objectName:"tLabel",duration:300,prop:"position",keyFrame:[[0,100],[0,-10]],easingFunc:["easeInOutCubic","easeInBounce"]},{trigger:"mouseLeave",objectName:"tLabel",duration:300,prop:"position",keyFrame:[[0,-10],[0,100]],easingFunc:["easeInOutCubic","easeInBounce"]}]},{key:4,label:"padding:margin",animation:[{trigger:"mouseEnter",objectName:"tFigure",duration:300,prop:"padding",keyFrame:[[0,0,10,0],[0,0,30,0]],easingFunc:["easeInOutCubic"]},{trigger:"mouseLeave",objectName:"tFigure",duration:300,prop:"padding",keyFrame:[[0,0,30,0],[0,0,10,0]],easingFunc:["easeInOutCubic"]}]}]}},methods:{config:function(e,t){return{initialContentAlignment:t.Spot.Center}},layout:function(e,t){return e(t.LayeredDigraphLayout,{setsPortSpots:!1,layerSpacing:150,direction:90,isOngoing:!0})},nodeTemplate:function(e,t){return Object(a.p)(e,t,{props:{shape:"Circle",size:80,_figurePanelOptions:{parts:[i(e,t,{props:{alignment:new t.Spot(.3,0)},name:"myTag",figure:"RoundedRectangle",fill:"#eb2f96",stroke:"#780650",color:"#000",strokeWidth:2,textKey:"mytag"})]}}})},diagramReady:function(e,t,n){}}},r=n(16),s=Object(r.a)(o,function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("xdh-go",{ref:"diagram",attrs:{nodes:this.nodes,type:this.model,"node-template":this.nodeTemplate,config:this.config,layout:this.layout,height:"250px"},on:{"on-ready":this.diagramReady}})],1)},[],!1,null,null,null);t.default=s.exports}}]);