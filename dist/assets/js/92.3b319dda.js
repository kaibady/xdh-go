(window.webpackJsonp=window.webpackJsonp||[]).push([[92],{362:function(e,t,o){"use strict";o.r(t);var r=o(140),n={components:{XdhGo:r.a},data:function(){return{model:"GraphLinksModel",nodes:[{key:1,label:"node1"},{key:2,label:"node2"},{key:3,label:"node3"},{key:4,label:"node4"},{key:5,label:"node5"},{key:6,label:"node6"}],links:[{from:1,to:2,arrows:"from,to",label:{text:[{text:"arrows简写"},{text:"'from,to'"}],margin:5}},{from:1,to:3,arrows:{to:{type:"Circle",scale:1.5}},label:{text:[{text:"arrows对象形式定义:to"},{text:"{type: 'Circle'"},{text:"scale: 1.5}"}],margin:5}},{from:4,to:5,label:"arrowFill",arrowFill:{normal:"#b37feb",hover:"#eb2f96"},toShortLength:8,arrows:{to:{type:"Circle"}}},{from:4,to:6,label:[{text:"arrowStroke"},{text:"arrowStrokeWidth"}],arrowStroke:{normal:"#9e1068",hover:"#eb2f96"},arrowStrokeWidth:{normal:2,hover:4},toShortLength:8,arrowFill:"transparent",arrows:{to:{type:"Circle"}}}]}},methods:{config:function(e,t){return{initialContentAlignment:t.Spot.Center}},layout:function(e,t){return e(t.LayeredDigraphLayout,{setsPortSpots:!1,layerSpacing:150})},nodeTemplate:function(e,t){return Object(r.p)(e,t,{props:{shape:"Circle",size:80,toShortLength:30}})},linkTemplate:function(e,t){return Object(r.o)(e,t,{props:{arrows:{to:{type:"Standard"}},labelBackground:"#ffe58f"}})},diagramReady:function(e,t,o){}}},a=o(16),l=Object(a.a)(n,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("xdh-go",{ref:"diagram",attrs:{nodes:e.nodes,links:e.links,type:e.model,"node-template":e.nodeTemplate,"link-template":e.linkTemplate,config:e.config,layout:e.layout,height:"700px"},on:{"on-ready":e.diagramReady}})],1)},[],!1,null,null,null);t.default=l.exports}}]);