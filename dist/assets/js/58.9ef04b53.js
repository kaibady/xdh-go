(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{511:function(e,a,t){"use strict";t.r(a);var n=t(140),i=n.q.tag,o={components:{XdhGo:n.a},data:function(){return{model:"GraphLinksModel",nodes:[{key:1,label:"tNode",animation:[{trigger:"mouseEnter",objectName:"tNode",duration:300,prop:"scale",keyFrame:[1,1.4],easingFunc:["easeInOutCubic"]},{trigger:"mouseLeave",objectName:"tNode",duration:300,prop:"scale",keyFrame:[1.4,1],easingFunc:["easeInOutCubic"]}]},{key:2,label:"tFigure",animation:[{trigger:"mouseEnter",objectName:"tFigure",duration:300,prop:"scale",keyFrame:[1,1.4],easingFunc:["easeInOutCubic"]},{trigger:"mouseLeave",objectName:"tFigure",duration:300,prop:"scale",keyFrame:[1.4,1],easingFunc:["easeInOutCubic"]}]},{key:3,label:"tLabel",animation:[{trigger:"mouseEnter",objectName:"tLabel",duration:300,prop:"scale",keyFrame:[1,1.4],easingFunc:["easeInOutCubic"]},{trigger:"mouseLeave",objectName:"tLabel",duration:300,prop:"scale",keyFrame:[1.4,1],easingFunc:["easeInOutCubic"]}]},{key:4,label:"tTag",tag:{text:"标签"},animation:[{trigger:"mouseEnter",objectName:"tTag",duration:300,prop:"scale",keyFrame:[1,1.4],easingFunc:["easeInOutCubic"]},{trigger:"mouseLeave",objectName:"tTag",duration:300,prop:"scale",keyFrame:[1.4,1],easingFunc:["easeInOutCubic"]}]},{key:5,label:"自定义对象",mytag:"自定义对象",animation:[{trigger:"mouseEnter",objectName:"myTag",duration:300,prop:"scale",keyFrame:[1,1.4],easingFunc:["easeInOutCubic"]},{trigger:"mouseLeave",objectName:"myTag",duration:300,prop:"scale",keyFrame:[1.4,1],easingFunc:["easeInOutCubic"]}]}]}},methods:{config:function(e,a){return{initialContentAlignment:a.Spot.Center}},layout:function(e,a){return e(a.LayeredDigraphLayout,{setsPortSpots:!1,layerSpacing:150,direction:90,isOngoing:!0})},nodeTemplate:function(e,a){return Object(n.p)(e,a,{props:{shape:"Circle",size:80,_figurePanelOptions:{parts:[i(e,a,{props:{alignment:new a.Spot(.5,0)},name:"myTag",figure:"RoundedRectangle",fill:"#eb2f96",stroke:"#780650",color:"#000",strokeWidth:2,textKey:"mytag"})]}}})},diagramReady:function(e,a,t){}}},r=t(16),u=Object(r.a)(o,function(){var e=this.$createElement,a=this._self._c||e;return a("div",[a("xdh-go",{ref:"diagram",attrs:{nodes:this.nodes,type:this.model,"node-template":this.nodeTemplate,config:this.config,layout:this.layout,height:"250px"},on:{"on-ready":this.diagramReady}})],1)},[],!1,null,null,null);a.default=u.exports}}]);