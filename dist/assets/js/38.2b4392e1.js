(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{224:function(e,t,o){},373:function(e,t,o){"use strict";var a=o(224);o.n(a).a},410:function(e,t,o){"use strict";o.r(t);var a=o(140),n=a.o.diagramManager,r={components:{XdhGo:a.a,XdhGoLayout:a.e},props:{},data:function(){return{diagram:null,lock:!1,model:"GraphLinksModel",nodes:[{key:"A",category:"a"},{key:"B",category:"b"},{key:"C",category:"c"},{key:"D",category:"a"},{key:"E",category:"b"},{key:"F",category:"c"}],links:[{from:"A",to:"B"},{from:"A",to:"C"},{from:"C",to:"D"},{from:"B",to:"E"},{from:"E",to:"F"}],timeout:null}},computed:{},methods:{addNode:function(){var e=this;this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(function(){var t=["A","B","C"][Math.floor(1e3*Math.random())%3]+Math.floor(1e3*Math.random()),o={key:t,category:["a","b","c"][Math.floor(1e3*Math.random())%3]},a=n.dig1.nodes.count,r=Math.floor(Math.random()*(a-2)),i={from:n.dig1.model.nodeDataArray[r].key,to:t};e.$refs.diagram.addNode(o),e.$refs.diagram.addLink(i),e.lock&&e.$refs.layout.layoutAfterAdd([o],[i])},300)},diagramReady:function(e,t,o){},config:function(e,t){return{initialContentAlignment:t.Spot.Center,"toolManager.mouseWheelBehavior":t.ToolManager.WheelZoom}},nodeTemplate:function(e,t,o){return e(t.Node,"Auto",e(t.Shape,"Rectangle",{portId:"",stroke:o,fill:o}),e(t.TextBlock,"Default Text",{margin:12,stroke:"#ffffff"},new t.Binding("text","key")),new t.Binding("location").makeTwoWay(t.Point.stringify))},linkTemplate:function(e,t){return e(t.Link,{curve:t.Link.Bezier},e(t.Shape,{strokeWidth:3,stroke:"#555"}),e(t.Shape,{toArrow:"Standard"}))},nodeTemplateMap:function(e,t,o){var a=this.nodeTemplate(e,t,"red",o),n=this.nodeTemplate(e,t,"blue",o),r=this.nodeTemplate(e,t,"green",o),i=new t.Map;return i.add("a",a),i.add("b",n),i.add("c",r),i},layout:function(e,t){return e(t.LayeredDigraphLayout,{})}},created:function(){}},i=(o(373),o(16)),d=Object(i.a)(r,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticStyle:{position:"relative"}},[o("xdh-go-layout",{ref:"layout",attrs:{"diagram-name":"dig1",lock:e.lock,"custom-class":"my-layout"},on:{"update:lock":function(t){e.lock=t}}}),e._v(" "),o("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.addNode()}}},[e._v("添加节点")]),e._v(" "),o("xdh-go",{ref:"diagram",attrs:{"diagram-name":"dig1",nodes:e.nodes,links:e.links,type:e.model,"node-template-map":e.nodeTemplateMap,"link-template":e.linkTemplate,config:e.config,layout:e.layout,height:"600px"},on:{"on-ready":e.diagramReady}})],1)},[],!1,null,"3a355d3c",null);t.default=d.exports}}]);