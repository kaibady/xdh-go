(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{387:function(e,t,n){"use strict";n.r(t);var o=n(140),i=o.p.node,a=o.p.textBlock,s=o.p.shape,r=o.p.binding,d={components:{XdhGo:o.a},data:function(){return{model:"GraphLinksModel",nodes:[{text:"node1",stroke:"red",fill:"#f0f0f0"},{text:"node2",stroke:"blue",fill:"#fe00fe",loc:""},{text:"node3",stroke:"#ff9900",fill:"#fefe00",font:'bold 18pt "Microsoft Yahei"'}]}},methods:{config:function(e,t){return{initialContentAlignment:t.Spot.Center}},layout:function(e,t){return e(t.GridLayout,{isOngoing:!1,spacing:new t.Size(40,40)})},diagramReady:function(e,t,n){},zoomOut:function(e){var t=this,n=e.diagram;this.scaleAnimate=function(){if(e.data.animation){var o=n.skipsUndoManager;n.skipsUndoManager=!0;var i=e.findObject("Bd");if(i){if(i){var a=i.part;a.scale>1.1&&(a.scale=1.1),a.scale=a.scale+.01}}n.skipsUndoManager=o,window.requestAnimationFrame(t.scaleAnimate)}},window.requestAnimationFrame(this.scaleAnimate)},zoomIn:function(e){e.data.animation=!1,e.scale=1},nodeTemplate:function(e,t){var n=this;return i(e,t,{type:"spot",events:{mouseEnter:function(e,t){n.zoomOut(t.part)},mouseLeave:function(e,t){n.zoomIn(t.part)}},parts:[s(e,t,{type:"RoundedRectangle",props:{name:"Bd",strokeWidth:3,alignment:t.Spot.Center},binding:r(e,t,{fill:"fill",stroke:{type:"ofObject",key:"",handler:function(e){return e.isSelected?"red":"#000"}}})}),a(e,t,{props:{font:"bold 14pt serif"},binding:r(e,t,{text:"text",stroke:"stroke",font:"font"})})]})}}},l=n(16),f=Object(l.a)(d,function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("xdh-go",{ref:"diagram",attrs:{nodes:this.nodes,type:this.model,config:this.config,"node-template":this.nodeTemplate,layout:this.layout,height:"300px"},on:{"on-ready":this.diagramReady}})],1)},[],!1,null,null,null);t.default=f.exports}}]);