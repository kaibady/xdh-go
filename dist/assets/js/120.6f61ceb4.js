(window.webpackJsonp=window.webpackJsonp||[]).push([[120],{431:function(e,a,t){"use strict";t.r(a);var n=t(140),o=n.u.mark,i=(n.u.node,n.u.textBlock,{components:{XdhGo:n.a},data:function(){return{model:"GraphLinksModel",nodes:[{category:"node",showMark:!0,shape:"clipImage",image:"/xdh-go/img/node/circleimage/1.png",clipShape:"Circle",stateShape:"Circle",label:"mark with CommonNode",fill:{0:"rgba(255,0,0,0)",.65:"rgba(255,0,0,0)",.9:"rgba(255,0,0,0.5)",1:"rgba(255,0,0,0.8)"}}]}},methods:{config:function(e,a){return{initialContentAlignment:a.Spot.Center}},layout:function(e,a){return e(a.GridLayout,{})},nodeTemplateMap:function(e,a){var t=new a.Map;return t.add("node",Object(n.t)(e,a,{props:{_figurePanelOptions:{parts:[o(e,a,{size:80,visibleKey:"showMark",colorKey:"fill"})]}},events:{click:function(e,a){var t=a.part;t.diagram.model.set(t.data,"showMark",!t.data.showMark)}}})),t},diagramReady:function(e,a,t){}}}),r=t(16),l=Object(r.a)(i,function(){var e=this.$createElement,a=this._self._c||e;return a("div",[a("xdh-go",{ref:"diagram",attrs:{nodes:this.nodes,"node-template-map":this.nodeTemplateMap,type:this.model,config:this.config,layout:this.layout,height:"300px"},on:{"on-ready":this.diagramReady}})],1)},[],!1,null,null,null);a.default=l.exports}}]);