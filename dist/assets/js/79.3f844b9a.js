(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{440:function(e,t,n){"use strict";n.r(t);for(var o=n(140),r=[],a=0;a<10;a++){var i=Math.floor(a/2);r.push({key:String(a+1),label:["sLinkNode","sLine","sLineHolder","sLabel",[{text:"sFromArrow"},{text:"sToArrow"}]][i]})}var s={components:{XdhGo:o.a},data:function(){return{model:"GraphLinksModel",nodes:r,links:[{from:3,to:4,label:"try click",animation:[{trigger:"click",objectName:"sLinkNode",duration:500,prop:"angle",keyFrame:[0,-10],easingFunc:["easeInOutCubic"]}]},{from:1,to:2,label:"try mouseEnter",animation:[{trigger:"mouseEnter",objectName:"sLine",duration:1e3,prop:"stroke",propType:"rgba",keyFrame:[[56,158,13,1],[196,29,127,1]],easingFunc:["easeInQuad"]}]},{from:5,to:6,label:"try mouseEnter",animation:[{trigger:"mouseEnter",name:"animate2",objectName:"sLineHolder",duration:800,prop:"stroke",keyFrame:[[0,0,0,0],[211,173,247,.8]],easingFunc:["easeInOutCubic"]}]},{from:7,to:8,label:"try mouseEnter",animation:[{trigger:"mouseEnter",name:"animate2",objectName:"sLabel",duration:800,prop:"angle",keyFrame:[0,360],easingFunc:["easeInOutCubic"]}]},{from:9,to:10,label:"try mouseEnter",arrows:"from,to",animation:[{trigger:"mouseEnter",objectName:"sFromArrow",duration:800,prop:"angle",keyFrame:[0,360],beforeStart:function(e,t,n,o){e.segmentOrientation=o.Link.None},easingFunc:["easeInOutCubic"]},{trigger:"mouseEnter",objectName:"sToArrow",duration:800,prop:"angle",keyFrame:[0,360],beforeStart:function(e,t,n,o){e.segmentOrientation=o.Link.None},easingFunc:["easeInOutCubic"]}]}]}},methods:{config:function(e,t){return{initialContentAlignment:t.Spot.Center}},layout:function(e,t){return e(t.LayeredDigraphLayout,{setsPortSpots:!1,layerSpacing:200,columnSpacing:10,isOngoing:!1})},nodeTemplate:function(e,t){return Object(o.t)(e,t,{props:{shape:"Circle",size:80}})},linkTemplate:function(e,t){return Object(o.s)(e,t,{props:{arrows:"to",fromPortId:"tFigure",fromShortLength:10,toShortLength:10,toPortId:"tFigure",lineWidth:6,arrowStrokeWidth:6,labelStroke:"#f759ab",labelBackground:"#ff85c0",labelColor:"#fff"}})},diagramReady:function(e,t,n){}}},l=n(16),u=Object(l.a)(s,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("xdh-go",{ref:"diagram",attrs:{nodes:e.nodes,links:e.links,type:e.model,"node-template":e.nodeTemplate,"link-template":e.linkTemplate,config:e.config,layout:e.layout,height:"900px"},on:{"on-ready":e.diagramReady}})],1)},[],!1,null,null,null);t.default=u.exports}}]);