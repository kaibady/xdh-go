(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{337:function(e,n,t){"use strict";t.r(n);var o=t(142),a={components:{XdhGo:o.a,XdhGoTool:o.h},data:function(){return{diagram:null,model:"GraphLinksModel",nodes:[{key:"A",category:"a"},{key:"B",category:"b"},{key:"C",category:"c"}],links:[{from:"A",to:"B"},{from:"A",to:"C"}]}},methods:{config:function(e,n){return{initialContentAlignment:n.Spot.Center,"toolManager.hoverDelay":100}},layout:function(e,n){return new n.TreeLayout},diagramReady:function(e,n,t){this.diagram=e},nodeTemplate:function(e,n,t){return e(n.Node,"Auto",{background:t},e(n.TextBlock,"Default Text",{margin:12,stroke:"#ffffff"},new n.Binding("text","key")),new n.Binding("location").makeTwoWay(n.Point.stringify))},linkTemplate:function(e,n){return e(n.Link,{routing:n.Link.Orthogonal,corner:5},e(n.Shape,{strokeWidth:3,stroke:"#555"}))},nodeTemplateMap:function(e,n,t){var o=this.nodeTemplate(e,n,"red",t),a=this.nodeTemplate(e,n,"blue",t),r=this.nodeTemplate(e,n,"green",t),i=new n.Map;return i.add("a",o),i.add("b",a),i.add("c",r),i}}},r=t(16),i=Object(r.a)(a,function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("xdh-go-tool",{ref:"tool",attrs:{diagram:e.diagram}}),e._v(" "),t("xdh-go",{attrs:{nodes:e.nodes,links:e.links,type:e.model,"node-template-map":e.nodeTemplateMap,"link-template":e.linkTemplate,config:e.config,layout:e.layout,height:"200px"},on:{"on-ready":e.diagramReady}})],1)},[],!1,null,null,null);n.default=i.exports}}]);