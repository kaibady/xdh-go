(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{438:function(e,a,n){"use strict";n.r(a);var t=n(140);var i={components:{XdhGo:t.a},data:function(){return{model:"GraphLinksModel",nodes:[{label:"node1",clipShape:"TriangleRight",stateShape:"TriangleRight",image:"/img/node/circleimage/3.png"},{label:"node2",stateShape:"TriangleDown",clipShape:"TriangleDown",image:"/img/node/circleimage/1.png"},{label:"node3",stateShape:"RoundedRectangle",clipShape:"Diamond",image:"/img/node/circleimage/2.png"},{label:"自定义裁剪图形",stateShape:"RoundedRectangle",image:"/img/node/circleimage/2.png",clipShape:"",shapeParams:{clipShape:{geometryString:"F M120 0 L80 80 0 50z"}}}]}},methods:{goRegister:function(e){!function(e){e.Shape.defineFigureGenerator("Pie",function(a,n,t){var i=a?a.parameter1:NaN,o=a?a.parameter2:NaN;isNaN(i)&&(i=0),isNaN(o)&&(o=315);var r=i%360;r<0&&(r+=360);var l=o%360,g=Math.min(n,t)/2;return(new e.Geometry).add(new e.PathFigure(g,g).add(new e.PathSegment(e.PathSegment.Arc,r,l,g,g,g,g).close()))})}(e)},config:function(e,a){return{initialContentAlignment:a.Spot.Center}},layout:function(e,a){return e(a.GridLayout,{})},nodeTemplate:function(e,a){return Object(t.o)(e,a,{props:{shape:"clipImage",size:80,background:"transparent",labelBackground:"transparent",labelStroke:"#000",labelColor:"#000"}})},diagramReady:function(e,a,n){}}},o=n(16),r=Object(o.a)(i,function(){var e=this.$createElement,a=this._self._c||e;return a("div",[a("xdh-go",{ref:"diagram",attrs:{nodes:this.nodes,type:this.model,"go-register":this.goRegister,"node-template":this.nodeTemplate,config:this.config,layout:this.layout,height:"150px"},on:{"on-ready":this.diagramReady}})],1)},[],!1,null,null,null);a.default=r.exports}}]);