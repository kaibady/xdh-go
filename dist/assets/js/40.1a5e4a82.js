(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{469:function(e,n,o){"use strict";o.r(n);var t=o(140),a={components:{XdhGo:t.a},data:function(){return{model:"GraphLinksModel",nodes:[{key:"a",label:"node1"},{key:"b",label:"node2"},{key:"c",label:"node3"},{key:"d",label:"node4"}],links:[{from:"a",to:"b",label:"link1",arrows:"to"},{from:"c",to:"d",label:"link2",arrows:{to:{type:"Triangle",scale:1.5}},dashes:[16,4,8,8]}]}},methods:{config:function(e,n){return{initialContentAlignment:n.Spot.Center}},layout:function(e,n){return e(n.LayeredDigraphLayout,{})},nodeTemplate:function(e,n){return Object(t.o)(e,n,{props:{shape:"Rectangle",size:40,background:"#f0f0f0",strokeColor:"red",labelBackground:"transparent",labelColor:"#000",_figureHolderOptions:{props:{portId:""}}}})},linkTemplate:function(e,n){return Object(t.n)(e,n,{props:{arrows:{to:{type:"Standard"}}}})},diagramReady:function(e,n,o){}}},l=o(16),r=Object(l.a)(a,function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("div",[o("xdh-go",{ref:"diagram",attrs:{nodes:e.nodes,links:e.links,type:e.model,"node-template":e.nodeTemplate,"link-template":e.linkTemplate,config:e.config,layout:e.layout,height:"400px"},on:{"on-ready":e.diagramReady}})],1)},[],!1,null,null,null);n.default=r.exports}}]);