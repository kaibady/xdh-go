(window.webpackJsonp=window.webpackJsonp||[]).push([[109],{418:function(e,n,t){"use strict";t.r(n);var o=t(140),a={components:{XdhGo:o.a},data:function(){return{model:"GraphLinksModel",nodes:[{key:"a",label:"node1"},{key:"b",label:"node2"},{key:"c",label:"node3"},{key:"d",label:"node4"}],links:[{category:"l1",from:"a",to:"b",label:"link1",arrows:"to",extendText1:"扩展文字1",extendText2:"扩展文字2"},{category:"l2",from:"c",to:"d",label:"link2",arrows:{to:{type:"Triangle",scale:1.5}},dashes:[16,4,8,8],strokeWidth:4,strokeColor:"blue",extendText1:"扩展文字1",extendText2:"扩展文字2"}]}},methods:{config:function(e,n){return{initialContentAlignment:n.Spot.Center}},layout:function(e,n){return e(n.LayeredDigraphLayout,{layerSpacing:150})},nodeTemplate:function(e,n){return Object(o.o)(e,n,{props:{shape:"Rectangle",size:40,background:"#f0f0f0",strokeColor:"red",labelBackground:"transparent",labelColor:"#000",_figureHolderOptions:{props:{portId:""}}}})},linkTemplate:function(e,n){var t=new n.Map;return t.add("l1",Object(o.n)(e,n,{props:{arrows:{to:{type:"Standard"}},_linkOptions:{props:{routing:n.Link.Orthogonal}},_labelPanelOptions:{props:{segmentOffset:new n.Point(0,-10)}}}})),t.add("l2",Object(o.n)(e,n,{props:{_linkOptions:{props:{routing:n.Link.Orthogonal}},_labelPanelOptions:{props:{segmentOffset:new n.Point(0,10)},parts:[textBlock(e,n,{props:{margin:new n.Margin(5,10,5,10)},binding:binding(e,n,{text:"extendText1"})}),textBlock(e,n,{props:{margin:new n.Margin(5,10,5,10)},binding:binding(e,n,{text:"extendText2"})})]}}})),t},diagramReady:function(e,n,t){}}},r=t(16),l=Object(r.a)(a,function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("xdh-go",{ref:"diagram",attrs:{nodes:e.nodes,links:e.links,type:e.model,"node-template":e.nodeTemplate,"link-template-map":e.linkTemplateMap,config:e.config,layout:e.layout,height:"400px"},on:{"on-ready":e.diagramReady}})],1)},[],!1,null,null,null);n.default=l.exports}}]);