(window.webpackJsonp=window.webpackJsonp||[]).push([[145],{454:function(e,n,a){"use strict";a.r(n);var t=a(140),o={components:{XdhGo:t.a},data:function(){return{model:"GraphLinksModel",nodes:[{key:1,label:"mouseEnter",animation:[{trigger:"mouseEnter",objectName:"tFigure",duration:1e3,name:"redtogreen",prop:"background",propType:"rgba",repeatCount:4,direction:"alternate",keyFrame:[[0,255,0,1],[0,0,255,1]],easingFunc:["easeInQuad","easeInQuad","easeInQuad","easeInQuad"]}]},{key:2,label:"mouseLeave",animation:[{trigger:"mouseLeave",objectName:"tFigure",duration:500,prop:"scale",repeatCount:4,keyFrame:[1,.8],easingFunc:["easeInQuad"]}]},{key:3,label:"click",animation:[{trigger:"mouseEnter",objectName:"tFigure",duration:500,prop:"scale",repeatCount:4,keyFrame:[1,1.2],easingFunc:["easeInQuad"]}]},{key:4,label:"dbclick",animation:[{trigger:"mouseEnter",objectName:"tFigure",duration:500,prop:"scale",repeatCount:4,keyFrame:[1,1.2],easingFunc:["easeInQuad"]}]}]}},methods:{config:function(e,n){return{initialContentAlignment:n.Spot.Center}},layout:function(e,n){return e(n.GridLayout,{})},nodeTemplate:function(e,n){return Object(t.p)(e,n,{props:{shape:"Circle",size:80}})},linkTemplate:function(e,n){return Object(t.o)(e,n,{props:{arrows:"to",labelBackground:"#ffe58f"}})},diagramReady:function(e,n,a){}}},r=a(16),i=Object(r.a)(o,function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("div",[a("xdh-go",{ref:"diagram",attrs:{nodes:e.nodes,links:e.links,type:e.model,"node-template":e.nodeTemplate,"link-template":e.linkTemplate,config:e.config,layout:e.layout,height:"200px"},on:{"on-ready":e.diagramReady}})],1)},[],!1,null,null,null);n.default=i.exports}}]);