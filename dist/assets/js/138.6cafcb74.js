(window.webpackJsonp=window.webpackJsonp||[]).push([[138],{232:function(e,t,a){},384:function(e,t,a){"use strict";var n=a(232);a.n(n).a},644:function(e,t,a){"use strict";a.r(t);var n,o=a(141),r=o.o.diagramManager,i=o.o.DataManager,d={components:{XdhGo:o.a,XdhGoSelect:o.h},props:{},data:function(){return{diagramIsReady:!1,model:"GraphLinksModel",lock:!1,nodes:[{key:"A",category:"a"},{key:"B",category:"b"},{key:"C",category:"c"},{key:"D",category:"a"},{key:"E",category:"b"},{key:"F",category:"c"}],links:[{from:"A",to:"B"},{from:"A",to:"C"},{from:"C",to:"D"},{from:"B",to:"E"},{from:"E",to:"F"}],timeout:null}},computed:{},methods:{diagramReady:function(e,t,a){this.diagramIsReady=!0,n=new i(e,a)},config:function(e,t){return{initialContentAlignment:t.Spot.Center,"toolManager.mouseWheelBehavior":t.ToolManager.WheelZoom}},nodeTemplate:function(e,t,a){return e(t.Node,"Auto",e(t.Shape,"Rectangle",{portId:"",stroke:a,fill:a}),e(t.TextBlock,"Default Text",{margin:12,stroke:"#ffffff"},new t.Binding("text","key")),new t.Binding("location").makeTwoWay(t.Point.stringify))},linkTemplate:function(e,t){return e(t.Link,{curve:t.Link.Bezier},e(t.Shape,{strokeWidth:3,stroke:"#555"}),e(t.Shape,{toArrow:"Standard"}))},nodeTemplateMap:function(e,t,a){var n=this.nodeTemplate(e,t,"red",a),o=this.nodeTemplate(e,t,"blue",a),r=this.nodeTemplate(e,t,"green",a),i=new t.Map;return i.add("a",n),i.add("b",o),i.add("c",r),i},posCenter:function(){var e=n.getNode("A").actualBounds;r.dig1.centerRect(e)},layout:function(e,t){return e(t.LayeredDigraphLayout,{})}},created:function(){}},l=(a(384),a(16)),c=Object(l.a)(d,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{position:"relative"}},[e.diagramIsReady?a("xdh-go-select",{ref:"select",attrs:{"diagram-name":"dig1","custom-class":"my-select"}}):e._e(),e._v(" "),a("el-button",{staticStyle:{margin:"40px 150px"},attrs:{type:"primary"},on:{click:e.posCenter}},[e._v("定节点A")]),e._v(" "),a("xdh-go",{ref:"diagram",attrs:{"diagram-name":"dig1",nodes:e.nodes,links:e.links,type:e.model,"node-template-map":e.nodeTemplateMap,"link-template":e.linkTemplate,config:e.config,layout:e.layout,height:"400px"},on:{"on-ready":e.diagramReady}})],1)},[],!1,null,"05853c65",null);t.default=c.exports}}]);