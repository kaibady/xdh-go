(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{343:function(e,t,n){"use strict";n.r(t);var o={components:{XdhGo:n(142).a},data:function(){return{showGraph:!1,model:"GraphLinksModel",nodes:[{key:"A",category:"a"},{key:"B",category:"b"}],links:[{from:"A",to:"B"}]}},methods:{show:function(){this.showGraph=!0},onReady:function(){this.$message({type:"info",message:"图形已渲染完成"})},onLoadData:function(){this.$message({type:"info",message:"添加了节点"})},addNode:function(){this.nodes.push({key:["A","B","C"][Math.floor(3*Math.random())]+Math.floor(1e3*Math.random()),category:["a","b","c"][Math.floor(3*Math.random())]})},config:function(e,t){return{initialContentAlignment:t.Spot.Center}},nodeTemplate:function(e,t,n){return e(t.Node,"Horizontal",{background:n},e(t.TextBlock,"Default Text",{margin:12,stroke:"#ffffff"},new t.Binding("text","key")))},linkTemplate:function(e,t){return e(t.Link,{routing:t.Link.Orthogonal,corner:5},e(t.Shape,{strokeWidth:3,stroke:"#555"}))},nodeTemplateMap:function(e,t){var n=this.nodeTemplate(e,t,"red"),o=this.nodeTemplate(e,t,"blue"),a=this.nodeTemplate(e,t,"green"),r=new t.Map;return r.add("a",n),r.add("b",o),r.add("c",a),r},layout:function(e,t){return new t.TreeLayout}}},a=n(16),r=Object(a.a)(o,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-button",{attrs:{type:"primary"},on:{click:e.show}},[e._v("显示图形")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.addNode}},[e._v("添加节点")]),e._v(" "),e.showGraph?n("xdh-go",{attrs:{nodes:e.nodes,links:e.links,type:e.model,"node-template-map":e.nodeTemplateMap,"link-template":e.linkTemplate,config:e.config,layout:e.layout,height:"300px"},on:{"on-ready":e.onReady,"on-load-data":e.onLoadData}}):e._e()],1)},[],!1,null,null,null);t.default=r.exports}}]);