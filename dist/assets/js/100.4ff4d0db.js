(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{366:function(e,t,n){"use strict";n.r(t);var o={components:{XdhGo:n(140).a},data:function(){return{model:"GraphLinksModel",nodes:[{key:"A",category:"a"},{key:"B",category:"b"},{key:"C",category:"c"}],links:[{from:"A",to:"B"},{from:"A",to:"C"}]}},methods:{config:function(e,t){return{initialContentAlignment:t.Spot.Center}},nodeTemplate:function(e,t,n){return e(t.Node,"Horizontal",{background:n},e(t.TextBlock,"Default Text",{margin:12,stroke:"#ffffff"},new t.Binding("text","key")))},linkTemplate:function(e,t){return e(t.Link,{routing:t.Link.Orthogonal,corner:5},e(t.Shape,{strokeWidth:3,stroke:"#555"}))},nodeTemplateMap:function(e,t){var n=this.nodeTemplate(e,t,"red"),o=this.nodeTemplate(e,t,"blue"),a=this.nodeTemplate(e,t,"green"),i=new t.Map;return i.add("a",n),i.add("b",o),i.add("c",a),i},layout:function(e,t){return new t.TreeLayout}}},a=n(16),i=Object(a.a)(o,function(){var e=this.$createElement;return(this._self._c||e)("xdh-go",{attrs:{nodes:this.nodes,links:this.links,type:this.model,"node-template-map":this.nodeTemplateMap,"link-template":this.linkTemplate,config:this.config,layout:this.layout,height:"200px"}})},[],!1,null,null,null);t.default=i.exports}}]);