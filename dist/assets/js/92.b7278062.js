(window.webpackJsonp=window.webpackJsonp||[]).push([[92],{436:function(e,t,n){"use strict";n.r(t);var a=n(140),o={components:{XdhGo:a.a},data:function(){return{model:"GraphLinksModel",nodes:[{category:"t1",label:"image",image:"/img/node/circleimage/1.png"}]}},methods:{config:function(e,t){return{initialContentAlignment:t.Spot.Center}},layout:function(e,t){return e(t.GridLayout,{})},nodeTemplateMap:function(e,t){var n=new t.Map;return n.add("t1",Object(a.o)(e,t,{props:{shape:"image",size:80,stateShape:"Rectangle",labelBackground:"transparent",labelStroke:"#000",labelColor:"#000",_nodeOptions:{props:{resizable:!0}},_outerPanelOptions:{props:{type:t.Panel.Horizontal}}}})),n},diagramReady:function(e,t,n){}}},i=n(16),r=Object(i.a)(o,function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("xdh-go",{ref:"diagram",attrs:{nodes:this.nodes,type:this.model,"node-template-map":this.nodeTemplateMap,config:this.config,layout:this.layout,height:"150px"},on:{"on-ready":this.diagramReady}})],1)},[],!1,null,null,null);t.default=r.exports}}]);