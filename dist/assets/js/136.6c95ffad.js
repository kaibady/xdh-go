(window.webpackJsonp=window.webpackJsonp||[]).push([[136],{385:function(e,t,a){"use strict";a.r(t);var n=a(143),i=a(141),o=a(140),s=o.p.node,r=o.p.textBlock,l=o.p.shape,c=o.p.binding,d={components:{XdhGo:o.a},data:function(){return{model:"GraphLinksModel",nodes:[{text:"node1",stroke:"red",fill:"#f0f0f0",loc:""},{text:"node2",stroke:"blue",fill:"#fe00fe",loc:""},{text:"node3",stroke:"#ff9900",fill:"#fefe00",font:'bold 18pt "Microsoft Yahei"',loc:""}]}},methods:{config:function(e,t){return{initialContentAlignment:t.Spot.Center}},layout:function(e,t){return e(t.GridLayout,{isOngoing:!1})},diagramReady:function(e,t,a){var n=this;e.model.set(e.model.modelData,"globalMargin",[20,20,20,20]);this.scaleAnimate=function(){var t=e.skipsUndoManager;e.skipsUndoManager=!0,e.nodes.each(function(e){var t=e.findObject("Bd");if(t){if(t){var a=t.part;a.data.scaleDirect||(a.data.scaleDirect="small"),"small"===a.data.scaleDirect&&a.scale<.8&&(a.scale=.8,a.data.scaleDirect="big"),"big"===a.data.scaleDirect&&a.scale>1&&(a.scale=1,a.data.scaleDirect="small"),"small"===a.data.scaleDirect&&(a.scale=a.scale-.003),"big"===a.data.scaleDirect&&(a.scale=a.scale+.003)}}}),e.skipsUndoManager=t,window.requestAnimationFrame(n.scaleAnimate)}},scaleAnimate:function(){},zoomOut:function(e){var t=this,a=e.diagram;this.scaleAnimate=function(){if(e.data.animation){var n=a.skipsUndoManager;a.skipsUndoManager=!0;var i=e.findObject("Bd");if(i){if(i){var o=i.part;o.scale>1.2&&(o.scale=1.2),o.scale=o.scale+.01}}a.skipsUndoManager=n,window.requestAnimationFrame(t.scaleAnimate)}},window.requestAnimationFrame(this.scaleAnimate)},zoomIn:function(e){e.data.animation=!1,e.scale=1},nodeTemplate:function(e,t){var a=this;return s(e,t,{type:"spot",events:{mouseEnter:function(e,t){t.data.animation=!0,a.zoomOut(t.part)},mouseLeave:function(e,t){a.zoomIn(t.part)}},binding:c(e,t,{location:{type:["makeTwoWay",t.Point.stringify],key:"loc",handler:t.Point.parse},margin:{type:"ofModel",key:"",handler:function(e){return Object(n.a)(t.Margin,Object(i.a)(e.nodeMargin||[]))}}}),parts:[l(e,t,{type:"RoundedRectangle",props:{name:"Bd",strokeWidth:3,alignment:t.Spot.Center},binding:c(e,t,{fill:"fill",stroke:{type:"ofObject",key:"",handler:function(e){return e.isSelected?"red":"#000"}}})}),r(e,t,{props:{font:"bold 14pt serif"},binding:c(e,t,{text:"text",stroke:"stroke",font:"font"})})]})}}},f=a(16),m=Object(f.a)(d,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("xdh-go",{ref:"diagram",attrs:{nodes:e.nodes,type:e.model,config:e.config,"node-template":e.nodeTemplate,layout:e.layout,height:"300px"},on:{"on-ready":e.diagramReady}}),e._v(" "),e._l(e.nodes,function(t,n){return a("div",{key:n},[e._v("\n    "+e._s(t.text)+":"+e._s(t.loc)+"\n  ")])})],2)},[],!1,null,null,null);t.default=m.exports}}]);