(window.webpackJsonp=window.webpackJsonp||[]).push([[227],{463:function(e,t,n){"use strict";n.r(t);n(149);var a=n(145),i={components:{XdhGo:a.a,XdhGoSnapshot:a.i},data:function(){return{diagram:null,imageType:"",currImg:null,imageObjectType:"",model:"GraphLinksModel",nodes:[{key:"A",category:"a"},{key:"B",category:"b"},{key:"C",category:"c"}],links:[{from:"A",to:"B"},{from:"A",to:"C"}]}},methods:{config:function(e,t){return{initialContentAlignment:t.Spot.Center,"toolManager.hoverDelay":100}},layout:function(e,t){return new t.TreeLayout},getImage:function(e,t){this.imageType=e,console.log(e),this.imageObjectType="(".concat("imageData"!==this.imageType?t.toString():t.toString().substr(0,50)+"...",")"),"image"===e?this.currImg=t.src:"imageData"===e?this.currImg=t:"svg"===e&&(document.getElementById("imageConainer1").innerHTML="",document.getElementById("imageConainer1").appendChild(t))},diagramReady:function(e,t,n){this.diagram=e},nodeTemplate:function(e,t,n,a){var i=a.htmlInfo.tool1;return e(t.Node,"Auto",{background:n,toolTip:i},e(t.TextBlock,"Default Text",{margin:12,stroke:"#ffffff"},new t.Binding("text","key")))},linkTemplate:function(e,t){return e(t.Link,{routing:t.Link.Orthogonal,corner:5},e(t.Shape,{strokeWidth:3,stroke:"#555"}))},nodeTemplateMap:function(e,t,n){var a=this.nodeTemplate(e,t,"red",n),i=this.nodeTemplate(e,t,"blue",n),o=this.nodeTemplate(e,t,"green",n),r=new t.Map;return r.add("a",a),r.add("b",i),r.add("c",o),r}}},o=n(16),r=Object(o.a)(i,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("xdh-go-snapshot",{attrs:{diagram:e.diagram},on:{"on-snap":e.getImage},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.makeImageData,i=t.makeImage,o=t.makeSvg;return[n("el-button",{attrs:{circle:"",size:"mini",type:"primary",icon:"el-icon-camera-solid"},on:{click:a}}),e._v(" "),n("el-button",{attrs:{circle:"",size:"mini",type:"primary",icon:"el-icon-picture"},on:{click:i}}),e._v(" "),n("el-button",{attrs:{circle:"",size:"mini",type:"primary",icon:"el-icon-s-data"},on:{click:o}})]}}])}),e._v(" "),n("xdh-go",{attrs:{nodes:e.nodes,links:e.links,type:e.model,"node-template-map":e.nodeTemplateMap,"link-template":e.linkTemplate,config:e.config,layout:e.layout,height:"200px"},on:{"on-ready":e.diagramReady}}),e._v(" "),n("div",[e._v(e._s(e.imageType)+e._s(e.imageObjectType))]),e._v(" "),n("img",{directives:[{name:"show",rawName:"v-show",value:"svg"!==e.imageType,expression:"imageType !== 'svg'"}],attrs:{src:e.currImg}}),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:"svg"===e.imageType,expression:"imageType === 'svg'"}],attrs:{id:"imageConainer1"}})],1)},[],!1,null,null,null);t.default=r.exports}}]);