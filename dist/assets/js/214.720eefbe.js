(window.webpackJsonp=window.webpackJsonp||[]).push([[214],{499:function(e,t,n){"use strict";n.r(t);var o=n(145),a={components:{XdhGo:o.a,XdhGoOverview:o.f},data:function(){return{model:"GraphLinksModel",nodes:[{key:"A",category:"a"},{key:"B",category:"b"},{key:"C",category:"c"}],links:[{from:"A",to:"B"},{from:"A",to:"C"}]}},methods:{config:function(e,t){return{initialContentAlignment:t.Spot.Center,"toolManager.hoverDelay":100}},layout:function(e,t){return new t.TreeLayout},nodeTemplate:function(e,t,n){return e(t.Node,"Auto",{background:n},e(t.TextBlock,"Default Text",{margin:12,stroke:"#ffffff"},new t.Binding("text","key")))},linkTemplate:function(e,t){return e(t.Link,{routing:t.Link.Orthogonal,corner:5},e(t.Shape,{strokeWidth:3,stroke:"#555"}))},nodeTemplateMap:function(e,t,n){var o=this.nodeTemplate(e,t,"red",n),a=this.nodeTemplate(e,t,"blue",n),i=this.nodeTemplate(e,t,"green",n),r=new t.Map;return r.add("a",o),r.add("b",a),r.add("c",i),r}}},i=n(16),r=Object(i.a)(a,function(){var e=this.$createElement,t=this._self._c||e;return t("xdh-go",{attrs:{"diagram-name":"dig1",nodes:this.nodes,links:this.links,type:this.model,"node-template-map":this.nodeTemplateMap,"link-template":this.linkTemplate,config:this.config,layout:this.layout,height:"200px"}},[t("xdh-go-overview",{attrs:{"div-style":{width:"120px",height:"120px"}}})],1)},[],!1,null,null,null);t.default=r.exports}}]);