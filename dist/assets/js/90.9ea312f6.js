(window.webpackJsonp=window.webpackJsonp||[]).push([[90],{367:function(e,n,t){"use strict";t.r(n);var o=t(140),a={components:{XdhGo:o.a},data:function(){return{model:"GraphLinksModel",nodes:[{key:"a",label:"node1"},{key:"b",label:"node2"},{key:"c",label:"node3",linkPort:"tNode"},{key:"d",label:"node4",linkPort:"tNode"}],links:[{from:"a",to:"b",type:"route"},{from:"c",to:"d",dashes:!0,label:"虚线"}]}},methods:{config:function(e,n){return{initialContentAlignment:n.Spot.Center}},layout:function(e,n){return e(n.LayeredDigraphLayout,{setsPortSpots:!1})},nodeTemplate:function(e,n){return Object(o.p)(e,n,{props:{shape:"Circle",size:80}})},linkTemplate:function(e,n){return Object(o.o)(e,n,{props:{arrows:"to"}})},diagramReady:function(e,n,t){}}},l=t(16),r=Object(l.a)(a,function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("xdh-go",{ref:"diagram",attrs:{nodes:e.nodes,links:e.links,type:e.model,"node-template":e.nodeTemplate,"link-template":e.linkTemplate,config:e.config,layout:e.layout,height:"400px"},on:{"on-ready":e.diagramReady}})],1)},[],!1,null,null,null);n.default=r.exports}}]);