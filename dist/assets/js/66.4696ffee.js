(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{526:function(e,n,a){"use strict";a.r(n);var t=a(140),i={components:{XdhGo:t.a},data:function(){return{model:"GraphLinksModel",nodes:[{label:"TriangleRight",clipShape:"TriangleRight",stateShape:"TriangleRight",image:"/xdh-go/img/node/circleimage/3.png"},{label:"TriangleDown",stateShape:"TriangleDown",clipShape:"TriangleDown",image:"/xdh-go/img/node/circleimage/1.png"},{label:[{text:"Diamond"},{text:"stateShape为RoundedRectangle"}],stateShape:"RoundedRectangle",clipShape:"Diamond",background:"transparent",image:"/xdh-go/img/node/circleimage/2.png"},{label:"不裁剪",stateShape:null,clipShape:null,image:"/xdh-go/img/node/circleimage/2.png"}]}},methods:{config:function(e,n){return{initialContentAlignment:n.Spot.Center}},layout:function(e,n){return e(n.GridLayout,{})},nodeTemplate:function(e,n){return Object(t.p)(e,n,{props:{shape:"clipImage",size:80}})},diagramReady:function(e,n,a){}}},o=a(16),l=Object(o.a)(i,function(){var e=this.$createElement,n=this._self._c||e;return n("div",[n("xdh-go",{ref:"diagram",attrs:{nodes:this.nodes,type:this.model,"node-template":this.nodeTemplate,config:this.config,layout:this.layout,height:"200px"},on:{"on-ready":this.diagramReady}})],1)},[],!1,null,null,null);n.default=l.exports}}]);