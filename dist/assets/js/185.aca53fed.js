(window.webpackJsonp=window.webpackJsonp||[]).push([[185],{394:function(e,t,n){"use strict";n.r(t);for(var a=n(145),o=[],r=0;r<10;r++){var i=Math.floor(r/2);o.push({key:String(r+1),label:["delay\nduration","repeatCount\ndirection","stepCallback","customEasing","stateParse"][i]})}function l(e){return Math.floor(6*e)/6}var u={components:{XdhGo:a.a},data:function(){var e=this;return{diagram:null,tokenPart:null,model:"GraphLinksModel",nodes:o,links:[{from:1,to:2,label:"try mouseEnter",animation:[{trigger:"mouseEnter",objectName:"sLabel",delay:500,duration:2e3,prop:"angle",keyFrame:[0,360],easingFunc:["easeInOutCubic"]}]},{from:3,to:4,label:"try mouseEnter",animation:[{trigger:"mouseEnter",objectName:"sLabel",repeatCount:4,direction:"alternate",duration:400,prop:"angle",keyFrame:[0,30],easingFunc:["easeInOutCubic"]}]},{from:5,to:6,label:"try mouseEnter",animation:[{trigger:"mouseEnter",duration:1e3,beforeStart:function(t,n,a,o){a.add(e.tokenPart)},stepCallback:function(t,n,a,o,r,i){e.tokenPart.location=o.path.getDocumentPoint(o.path.geometry.getPointAlongPath(t,new i.Point))},animationFinish:function(t,n,a,o){a.remove(e.tokenPart)},keyFrame:[0,1],easingFunc:["easeInQuad"]}]},{from:7,to:8,label:"try mouseEnter-custom easingFunc",animation:[{trigger:"mouseEnter",objectName:"sLabel",duration:6e3,prop:"angle",keyFrame:[0,360],easingFunc:[l]}]},{from:9,to:10,label:"try mouseEnter-stateParser",animation:[{trigger:"mouseEnter",objectName:"sLabel",duration:6e3,prop:"angle",keyFrame:[0,360]},{trigger:"mouseEnter",objectName:"sLabel",duration:6e3,keyFrame:[0,360],stateParser:function(e,t,n,a,o,r){return"hsla(".concat(e,",100%,50%,1)")},stepCallback:function(e,t,n,a,o,r){o.model.set(a.data,"labelBackground",e)}}]}]}},methods:{config:function(e,t){return{initialContentAlignment:t.Spot.Center}},layout:function(e,t){return e(t.LayeredDigraphLayout,{setsPortSpots:!1,layerSpacing:200,columnSpacing:10,isOngoing:!1})},nodeTemplateMap:function(e,t){var n=new t.Map;return n.add("",Object(a.t)(e,t,{props:{shape:"Circle",size:80}})),n},linkTemplate:function(e,t){return Object(a.s)(e,t,{props:{arrows:"to",fromPortId:"tFigure",fromShortLength:10,toShortLength:10,toPortId:"tFigure",lineWidth:6,arrowStrokeWidth:6,labelStroke:"#f759ab",labelBackground:"#ff85c0"}})},diagramReady:function(e,t,n){this.diagram=e,this.tokenPart=function(e,t){return e(t.Part,{locationSpot:t.Spot.Center},e(t.Shape,"Circle",{width:12,height:12,fill:"green",strokeWidth:0},new t.Binding("fill","color")))}(t,n)}}},s=n(16),c=Object(s.a)(u,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("xdh-go",{ref:"diagram",attrs:{nodes:e.nodes,links:e.links,type:e.model,"node-template-map":e.nodeTemplateMap,"link-template":e.linkTemplate,config:e.config,layout:e.layout,height:"800px"},on:{"on-ready":e.diagramReady}})],1)},[],!1,null,null,null);t.default=c.exports}}]);