(window.webpackJsonp=window.webpackJsonp||[]).push([[86],{455:function(e,n,t){"use strict";t.r(n);var o={components:{XdhGo:t(140).a},data:function(){var e=this;return{model:"GraphLinksModel",nodes:[{key:"A",category:"a"},{key:"B",category:"b"}],links:[{from:"A",to:"B"}],diagramEvents:{BackgroundSingleClicked:function(n){e.$message({type:"info",message:"点击了背景"})},ChangedSelection:function(n){var t=[];n.subject.each(function(e){t.push(e.key)}),e.$message({type:"info",message:"选择了节点"+t.join(",")})}}}},methods:{config:function(e,n){return{initialContentAlignment:n.Spot.Center}},nodeTemplate:function(e,n,t){return e(n.Node,"Horizontal",{background:t},e(n.TextBlock,"Default Text",{margin:12,stroke:"#ffffff"},new n.Binding("text","key")))},linkTemplate:function(e,n){return e(n.Link,{routing:n.Link.Orthogonal,corner:5},e(n.Shape,{strokeWidth:3,stroke:"#555"}))},nodeTemplateMap:function(e,n){var t=this.nodeTemplate(e,n,"red"),o=this.nodeTemplate(e,n,"blue"),a=this.nodeTemplate(e,n,"green"),i=new n.Map;return i.add("a",t),i.add("b",o),i.add("c",a),i},layout:function(e,n){return new n.TreeLayout}}},a=t(16),i=Object(a.a)(o,function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("xdh-go",{attrs:{nodes:e.nodes,links:e.links,events:e.diagramEvents,type:e.model,"node-template-map":e.nodeTemplateMap,"link-template":e.linkTemplate,config:e.config,layout:e.layout,height:"200px"}})],1)},[],!1,null,null,null);n.default=i.exports}}]);