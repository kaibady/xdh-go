(window.webpackJsonp=window.webpackJsonp||[]).push([[164],{575:function(e,n,t){"use strict";t.r(n);for(var o=t(145),r=[],a=0;a<6;a++){var i=Math.floor(a/2);r.push({key:String(a+1),label:["angle:number","strokeDashArray:array","position:point"][i]})}var l={components:{XdhGo:o.a},data:function(){return{diagram:null,model:"GraphLinksModel",nodes:r,links:[{from:1,to:2,label:"try mouseEnter",animation:[{trigger:"mouseEnter",name:"animate2",objectName:"sLabel",duration:800,prop:"angle",keyFrame:[0,360],easingFunc:["easeInOutCubic"]}]},{from:3,to:4,label:"try mouseEnter",animation:[{trigger:"mouseEnter",objectName:"sLine",name:"lineAni1",duration:2e3,prop:"strokeDashArray",propType:"array",keyFrame:[[0,1e3],[1e3,1e3]],easingFunc:["easeInOutCubic"]}]},{from:5,to:6,label:"try mouseEnter",tokenShow:!0,animation:[{trigger:"mouseEnter",objectName:"sToken",duration:800,prop:"position",propType:"point",keyFrame:[[0,0],[100,0]],easingFunc:["easeInOutCubic"]}]}]}},methods:{config:function(e,n){return{initialContentAlignment:n.Spot.Center}},layout:function(e,n){return e(n.LayeredDigraphLayout,{setsPortSpots:!1,layerSpacing:200,columnSpacing:10,isOngoing:!1})},nodeTemplateMap:function(e,n){var t=new n.Map;return t.add("",Object(o.t)(e,n,{props:{shape:"Circle",size:80}})),t},linkTemplate:function(e,n){return Object(o.s)(e,n,{props:{arrows:"to",fromPortId:"tFigure",fromShortLength:10,toShortLength:10,toPortId:"tFigure",lineWidth:6,arrowStrokeWidth:6,labelStroke:"#f759ab",labelBackground:"#ff85c0",labelColor:"#fff",_innerPanelOptions:{props:{type:n.Panel.Position},parts:[e(n.Shape,"Circle",{name:"sToken",width:12,height:12,fill:"green",strokeWidth:0},new n.Binding("fill","color"),new n.Binding("visible","",function(e){return!!e.tokenShow}))]}}})},diagramReady:function(e,n,t){this.diagram=e,e.add(n(t.Part,{locationSpot:t.Spot.Center,layerName:"Foreground"},n(t.Shape,"Circle",{width:12,height:12,fill:"green",strokeWidth:0},new t.Binding("fill","color"))))}}},s=t(16),p=Object(s.a)(l,function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("xdh-go",{ref:"diagram",attrs:{nodes:e.nodes,links:e.links,type:e.model,"node-template-map":e.nodeTemplateMap,"link-template":e.linkTemplate,config:e.config,layout:e.layout,height:"600px"},on:{"on-ready":e.diagramReady}})],1)},[],!1,null,null,null);n.default=p.exports}}]);