(window.webpackJsonp=window.webpackJsonp||[]).push([[75],{610:function(t,e,o){"use strict";o.r(e);var n=o(439),r=n.v.node,a=n.v.tooltip,i=n.v.shape,s={components:{XdhGo:n.a},data:function(){return{model:"GraphLinksModel",nodes:[]}},methods:{config:function(t,e){return{initialContentAlignment:e.Spot.Center,"toolManager.hoverDelay":50}},layout:function(t,e){return t(e.LayeredDigraphLayout,{})},diagramReady:function(t,e,o){t.add(r(e,o,{type:"hor",props:{toolTip:a(e,o,{props:{text:"提示",stroke:"#fff"},shape:{props:{figure:"Circle",stroke:"red",fill:"rgba(255,0, 0, 0.8)"}}})},parts:[i(e,o)]}))}}},d=o(58),l=Object(d.a)(s,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("xdh-go",{ref:"diagram",attrs:{nodes:this.nodes,type:this.model,config:this.config,layout:this.layout,height:"150px"},on:{"on-ready":this.diagramReady}})],1)}),[],!1,null,null,null);e.default=l.exports}}]);