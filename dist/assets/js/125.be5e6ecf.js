(window.webpackJsonp=window.webpackJsonp||[]).push([[125],{400:function(e,a,t){"use strict";t.r(a);var n=t(143),i=t(141),o=t(140),s=o.p.node,l=o.p.textBlock,c=o.p.shape,r=o.p.binding,d={components:{XdhGo:o.a},data:function(){return{model:"GraphLinksModel",nodes:[{text:"node1",stroke:"red",fill:"#f0f0f0",loc:""},{text:"node2",stroke:"blue",fill:"#fe00fe",loc:""},{text:"node3",stroke:"#ff9900",fill:"#fefe00",font:'bold 18pt "Microsoft Yahei"',loc:""}]}},methods:{config:function(e,a){return{initialContentAlignment:a.Spot.Center}},layout:function(e,a){return e(a.GridLayout,{isOngoing:!1})},diagramReady:function(e,a,t){var n=this;e.model.set(e.model.modelData,"globalMargin",[20,20,20,20]);this.scaleAnimate=function(){var a=e.skipsUndoManager;e.skipsUndoManager=!0,e.nodes.each(function(e){var a=e.findObject("Bd");if(a){if(a){var t=a.part;t.data.scaleDirect||(t.data.scaleDirect="small"),"small"===t.data.scaleDirect&&t.scale<.8&&(t.scale=.8,t.data.scaleDirect="big"),"big"===t.data.scaleDirect&&t.scale>1&&(t.scale=1,t.data.scaleDirect="small"),"small"===t.data.scaleDirect&&(t.scale=t.scale-.003),"big"===t.data.scaleDirect&&(t.scale=t.scale+.003)}}}),e.skipsUndoManager=a,window.requestAnimationFrame(n.scaleAnimate)}},scaleAnimate:function(){},zoomOut:function(e){var a=this,t=e.diagram;this.scaleAnimate=function(){if(e.data.animation){var n=t.skipsUndoManager;t.skipsUndoManager=!0;var i=e.findObject("Bd");if(i){if(i){var o=i.part;o.data.scaleDirect||(o.data.scaleDirect="small"),"small"===o.data.scaleDirect&&o.scale<.8&&(o.scale=.8,o.data.scaleDirect="big"),"big"===o.data.scaleDirect&&o.scale>1&&(o.scale=1,o.data.scaleDirect="small"),"small"===o.data.scaleDirect&&(o.scale=o.scale-.003),"big"===o.data.scaleDirect&&(o.scale=o.scale+.003)}}t.skipsUndoManager=n,window.requestAnimationFrame(a.scaleAnimate)}},window.requestAnimationFrame(this.scaleAnimate)},zoomIn:function(e){e.data.animation=!1,e.scale=1},nodeTemplate:function(e,a){var t=this;return s(e,a,{type:"spot",events:{mouseEnter:function(e,a){a.data.animation=!0,t.zoomOut(a.part)},mouseLeave:function(e,a){t.zoomInt(a.part)}},binding:r(e,a,{location:{type:["makeTwoWay",a.Point.stringify],key:"loc",handler:a.Point.parse},margin:{type:"ofModel",key:"",handler:function(e){return Object(n.a)(a.Margin,Object(i.a)(e.nodeMargin||[]))}}}),parts:[c(e,a,{type:"RoundedRectangle",props:{name:"Bd",strokeWidth:3,alignment:a.Spot.Center},binding:r(e,a,{fill:"fill",stroke:{type:"ofObject",key:"",handler:function(e){return e.isSelected?"red":"#000"}}})}),l(e,a,{props:{font:"bold 14pt serif"},binding:r(e,a,{text:"text",stroke:"stroke",font:"font"})})]})}}},f=t(16),m=Object(f.a)(d,function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("xdh-go",{ref:"diagram",attrs:{nodes:e.nodes,type:e.model,config:e.config,"node-template":e.nodeTemplate,layout:e.layout,height:"300px"},on:{"on-ready":e.diagramReady}}),e._v(" "),e._l(e.nodes,function(a,n){return t("div",{key:n},[e._v("\n    "+e._s(a.text)+":"+e._s(a.loc)+"\n  ")])})],2)},[],!1,null,null,null);a.default=m.exports}}]);