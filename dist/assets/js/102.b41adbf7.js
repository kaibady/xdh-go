(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{458:function(e,o,t){"use strict";t.r(o);var n=t(140),r={components:{XdhGo:n.a},data:function(){return{model:"GraphLinksModel",nodes:[{key:1,label:"node1"},{key:2,label:"node2"},{key:3,label:"node3"},{key:4,label:"node4"}],links:[{from:1,to:2,arrows:"from,to",fromShortLength:-10,toShortLength:20,label:[{text:"fromShortLength:-10"},{text:"toShortLength:10"}]},{from:3,to:4,toShortLength:5,lineWidth:{normal:2,hover:4},lineColor:{normal:"#c41d7f",hover:"#722ed1"},arrowStroke:{normal:"#c41d7f",hover:"#722ed1"},arrowFill:{normal:"#c41d7f",hover:"#722ed1"},arrowStrokeWidth:{normal:1,hover:2},label:"lineWidth,lineColor"}]}},methods:{config:function(e,o){return{initialContentAlignment:o.Spot.Center}},layout:function(e,o){return e(o.LayeredDigraphLayout,{setsPortSpots:!1})},nodeTemplate:function(e,o){return Object(n.t)(e,o,{props:{shape:"Circle",size:80}})},linkTemplate:function(e,o){return Object(n.s)(e,o,{props:{arrows:"to"}})},diagramReady:function(e,o,t){}}},l=t(16),a=Object(l.a)(r,function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("div",[t("xdh-go",{ref:"diagram",attrs:{nodes:e.nodes,links:e.links,type:e.model,"node-template":e.nodeTemplate,"link-template":e.linkTemplate,config:e.config,layout:e.layout,height:"500px"},on:{"on-ready":e.diagramReady}})],1)},[],!1,null,null,null);o.default=a.exports}}]);