(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{405:function(e,n,t){"use strict";t.r(n);var i=t(140),a={components:{XdhGo:i.a},data:function(){return{model:"GraphLinksModel",nodes:[{label:"正常图片",image:"/xdh-go/img/node/circleimage/1.png"},{label:"加载失败时",image:"/xdh-go/img/node/circleimage/b.png",brokenImage:"/xdh-go/img/node/circleimage/4.png"},{label:"图片错误",image:"/xdh-go/img/node/circleimage/a.png"},{label:"图片跨域",image:"https://img.alicdn.com/tfs/TB1MaLKRXXXXXaWXFXXXXXXXXXX-480-260.png"}]}},methods:{config:function(e,n){return{initialContentAlignment:n.Spot.Center}},layout:function(e,n){return e(n.GridLayout,{})},nodeTemplate:function(e,n){return Object(i.t)(e,n,{props:{shape:"image",size:80,stateShape:"Rectangle"}})},diagramReady:function(e,n,t){}}},o=t(16),g=Object(o.a)(a,function(){var e=this.$createElement,n=this._self._c||e;return n("div",[n("xdh-go",{ref:"diagram",attrs:{nodes:this.nodes,type:this.model,"node-template":this.nodeTemplate,config:this.config,layout:this.layout,height:"150px"},on:{"on-ready":this.diagramReady}})],1)},[],!1,null,null,null);n.default=g.exports}}]);