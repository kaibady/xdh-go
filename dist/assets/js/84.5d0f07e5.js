(window.webpackJsonp=window.webpackJsonp||[]).push([[84],{450:function(t,e,n){"use strict";n.r(e);var o=n(140),r=o.u.panel,i=o.u.node,a=o.u.textBlock;function l(t,e,n,o,r,i){var l={text:n,background:r,width:100,height:o,textAlign:"center",verticalAlignment:e.Spot.Center};return i&&(l.alignment=i,l.alignmentFocus=new e.Spot(0,1)),a(t,e,{props:l})}var p={components:{XdhGo:o.a},data:function(){return{model:"GraphLinksModel",nodes:[{key:"1",name:"节点1"}]}},methods:{config:function(t,e){return{initialContentAlignment:e.Spot.Center}},layout:function(t,e){return t(e.LayeredDigraphLayout,{})},nodeTemplate:function(t,e){return i(t,e,{type:"spot",parts:[r(t,e,{type:"hor",parts:[l(t,e,"left",60,"red"),r(t,e,{type:"ver",parts:[l(t,e,"rightTop",30,"blue"),l(t,e,"rightBottom",30,"green")]})]}),l(t,e,"message",30,"yellow",new e.Spot(1,0))]})}}},s=n(16),u=Object(s.a)(p,function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("xdh-go",{ref:"diagram",attrs:{nodes:this.nodes,type:this.model,"node-template":this.nodeTemplate,config:this.config,layout:this.layout,height:"150px"}})],1)},[],!1,null,null,null);e.default=u.exports}}]);