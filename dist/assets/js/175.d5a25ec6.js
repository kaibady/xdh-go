(window.webpackJsonp=window.webpackJsonp||[]).push([[175],{435:function(t,e,n){"use strict";n.r(e);var o=n(145),i=o.u.node,l=o.u.textBlock,f=o.u.shape,r=o.u.binding,s={components:{XdhGo:o.a},data:function(){return{model:"GraphLinksModel",nodes:[{text:"node1",stroke:"red",fill:"#f0f0f0"},{text:"node2",stroke:"blue",fill:"#fe00fe"},{text:"node3",stroke:"#ff9900",fill:"#fefe00",font:'bold 18pt "Microsoft Yahei"'}]}},methods:{config:function(t,e){return{initialContentAlignment:e.Spot.Center}},layout:function(t,e){return t(e.GridLayout,{})},nodeTemplate:function(t,e){return i(t,e,{type:"spot",parts:[f(t,e,{type:"RoundedRectangle",binding:r(t,e,{fill:"fill"})}),l(t,e,{props:{font:"bold 14pt serif"},binding:r(t,e,{text:"text",stroke:"stroke",font:"font"})})]})}}},d=n(16),u=Object(d.a)(s,function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("xdh-go",{ref:"diagram",attrs:{nodes:this.nodes,type:this.model,config:this.config,"node-template":this.nodeTemplate,layout:this.layout,height:"150px"}})],1)},[],!1,null,null,null);e.default=u.exports}}]);