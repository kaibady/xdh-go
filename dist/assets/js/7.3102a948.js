(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{143:function(e,t,o){"use strict";var a=o(147),l=o(144),i=o(146),n=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(i);a(a.P+a.F*n,"String",{padStart:function(e){return l(this,e,arguments.length>1?arguments[1]:void 0,!0)}})},144:function(e,t,o){var a=o(150),l=o(145),i=o(141);e.exports=function(e,t,o,n){var r=String(i(e)),s=r.length,d=void 0===o?" ":String(o),c=a(t);if(c<=s||""==d)return r;var u=c-s,v=l.call(d,Math.ceil(u/d.length));return v.length>u&&(v=v.slice(0,u)),n?v+r:r+v}},145:function(e,t,o){"use strict";var a=o(151),l=o(141);e.exports=function(e){var t=String(l(this)),o="",i=a(e);if(i<0||i==1/0)throw RangeError("Count can't be negative");for(;i>0;(i>>>=1)&&(t+=t))1&i&&(o+=t);return o}},146:function(e,t,o){var a=o(148).navigator;e.exports=a&&a.userAgent||""},221:function(e,t,o){},370:function(e,t,o){"use strict";var a=o(221);o.n(a).a},416:function(e,t,o){"use strict";o.r(t);o(142),o(152),o(143),o(154);var a,l,i,n=o(140),r=n.n.AnimationEvents,s=n.o.DataManager,d=n.o.diagramManager,c=n.u.setGray,u=n.u.removeGray,v=n.u.imageSet,m=n.u.binding,g=!1,f=[{src:"/xdh-go/img/circle1.png",width:40,height:40,shape:"Circle",scale:2,name:"img1"}],p={"01":"一","02":"二","03":"三"};var h=function(e,t){var o=t.part;u({diagram:o.diagram}),c({diagram:o.diagram,nodes:[o]})},b=function(e,t){var o=t.part,a=[],l=[];u({diagram:o.diagram}),a.push(o),o.findLinksConnected().each(function(e){l.push(e)}),o.findNodesConnected().each(function(e){a.push(e)}),c({diagram:o.diagram,nodes:a,links:l})},k={components:{XdhGo:n.a,XdhGoOverview:n.f,XdhGoSnapshot:n.i,XdhGoSearch:n.g,XdhGoLayout:n.e,XdhGoCircleMenu:n.b,XdhGoHtml:n.d},data:function(){return{legendOptions:[{label:"等级一",color:"#389e0d"},{label:"等级二",color:"#722ed1"},{label:"等级三",color:"#c41d7f"}],nodeCount:0,linkCount:0,formData:{level:"",title:"",type:""},menuOptions:{menuList:[],trigger:"mouseover",innerRadius:25,angleRange:[-90,270],itemWidth:70,activeColor:"rgba(0, 153, 204, .95)",normalColor:"rgba(0, 114, 172, .95)",itemStyle:{color:"#fff"},textRotate:!0,itemGap:15},lock:!1,currImg:"",model:"GraphLinksModel",nodes:[],links:[],imgDialogShow:!1,nodeDialogShow:!1,levelDialogShow:!1,diagramEvents:{BackgroundSingleClicked:function(e){u({diagram:e.diagram}),g=!1}}}},methods:{config:function(e,t){return{initialContentAlignment:t.Spot.Center,"toolManager.hoverDelay":10,"toolManager.mouseWheelBehavior":t.ToolManager.WheelZoom,grid:e(t.Panel,"Grid",e(t.Shape,"LineH",{stroke:"#adc6ff",strokeWidth:.5}),e(t.Shape,"LineH",{stroke:"#adc6ff",strokeWidth:.5,interval:10}),e(t.Shape,"LineV",{stroke:"#adc6ff",strokeWidth:.5}),e(t.Shape,"LineV",{stroke:"#adc6ff",strokeWidth:.5,interval:10}))}},layout:function(e,t){return e(t.LayeredDigraphLayout,{direction:90,setsPortSpots:!1,layerSpacing:0})},nodeTemplateMap:function(e,t,o){var a=o.htmlInfo.circleMenu,l=new t.Map;return l.add("",Object(n.t)(e,t,{props:{shape:"Circle",size:60,_nodeOptions:{props:{contextMenu:a}},_figurePanelOptions:{parts:[v(e,t,{layout:"Spot",images:f,isClipping:!0,clip:{width:85,height:85},binding:m(e,t,{visible:{type:"ofObject",key:"",handler:function(e){return e.isSelected}}})})]}},events:{click:h,doubleClick:b}})),l},linkTemplate:function(e,t){return Object(n.s)(e,t,{props:{arrows:"to",fromPortId:"tFigure",toPortId:"tFigure"}})},beforeShowMenu:function(e,t,o,a){this.menuOptions.menuList=[{tag:"add",label:"添加子节点",icon:"el-icon-share"},{tag:"level",label:"设置等级",icon:"el-icon-s-operation"}];var l=this.menuOptions.menuList.length;this.menuOptions.angleRange=l<5?{1:[45,135],2:[30,150],3:[0,180],4:[-30,210]}[l]:[-90,270]},showMenu:function(e,t,o,a){console.log(e,t,o,a),a.style.display="block";var l=t.div.getBoundingClientRect(),n=t.transformDocToView(e.actualBounds.center);a.style.left=n.x+l.left+"px",a.style.top=n.y+l.top+"px",i=e},menuClick:function(e,t){console.log(t),"add"===t.tag?this.nodeDialogShow=!0:"level"===t.tag&&(this.levelDialogShow=!0),this.formData={title:"",level:"",type:""}},diagramReady:function(e,t,o){console.log(o.version),l=new r(e,o),a=new s(e,o),e.dataManager=a,a.setNodeConverter("nodeCv1",this.nodeConvert),a.setLinkConverter("linkCv1",this.linkConvert),a.setNodeUpdater("level",this.levelUpdater),this.loadTestData()},nodeConvert:function(e){var t,o={key:e.nodeCode,searchKey:e.title+":等级"+p[e.level],label:{text:[{text:e.title+":等级"+p[e.level]}],margin:[5,10,5,10]}},a={hover:"#faad14",select:"transparent"};switch(e.level){case"01":a.normal="#389e0d";break;case"02":a.normal="#722ed1";break;case"03":a.normal="#c41d7f"}if(o.strokeColor=a,o.strokeWidth=6,"01"===e.type)t="人员",o.shape="clipImage",o.image="/xdh-go/img/node/circleimage/8.png";else{o.shape="icon";var l={font:'24px "iconfont"'};switch(e.type){case"02":t="手机号码",l.text="";break;case"03":t="车辆",l.text="";break;case"04":t="证件号码",l.text=""}o.icon=l}return o.tooltip={text:t},o.iconColor={normal:"#10239e"},o.labelBackground={normal:"#fff566",hover:"#ffffb8"},o},levelUpdater:function(e,t,o,a){var l={hover:"#faad14",select:"transparent"},i=e._originData;switch(console.log(i),i.level){case"01":l.normal="#389e0d";break;case"02":l.normal="#722ed1";break;case"03":l.normal="#c41d7f"}var n=JSON.parse(JSON.stringify(e.label));n.text=[{text:i.title+":等级"+p[i.level]}],o.set(e,"label",n),o.set(e,"searchKey",i.title+":等级"+p[e.level]),o.set(e,"strokeColor",l)},linkConvert:function(e){var t={from:e.from,to:e.to,label:e.title},o="";switch(e.type){case"01":o={normal:"#d48806"};break;case"02":o={normal:"#389e0d"}}return t.lineColor=o,t.lineWidth={normal:2,hover:4},t.labelColor="#3f6600",t._originData=e,t},loadTestData:function(){var e,t,o=this;(e=[{title:"张三",type:"01",level:"01"},{title:"13467876567",type:"02",level:"02"},{title:"粤A12345",type:"03",level:"03"},{title:"440111180520212345",type:"04",level:"01"},{title:"李四",type:"01",level:"02"},{title:"13656778656",type:"02",level:"03"},{title:"粤A33435",type:"03",level:"01"},{title:"44011118052021234X",type:"04",level:"02"},{title:"王五",type:"01",level:"03"},{title:"13577656789",type:"02",level:"01"}],t={nodes:function(){for(var t=[],o=0;o<e.length;o++)t.push({nodeCode:String(o+1),type:e[o].type,level:e[o].level,title:e[o].title});return t}(),links:function(){for(var e=[],t="1,2|1,3|2,4|2,5|3,6|3,7|4,8|4,9|4,10|6,10".split("|"),o=0;o<10;o++){var a=t[o].split(",");e.push({from:a[0],to:a[1],type:(o%2+1).toString().padStart(2,"0"),title:"关系"+o})}return e}()},new Promise(function(e,o){e(t)})).then(function(e){e.nodes.forEach(function(e){a.addNode(e,"nodeCv1")}),o.nodeCount=e.nodes.length,e.links.forEach(function(e){a.addLink(e,"linkCv1")}),o.linkCount=e.links.length})},getImage:function(e,t){console.log(t),this.currImg=t,this.imgDialogShow=!0},circularRotate:function(e,t){var o=this;l.emit(e,t,function(){g&&o.circularRotate(e,t)})},onSearch:function(e){var t=this;console.log(e),g=!0,d.dig1.model.set(e.data,"animation",[{trigger:"rotate",objectName:"img1",duration:2e3,prop:"angle",keyFrame:[0,360],easingFunc:["ease"]}]),setTimeout(function(){t.circularRotate("rotate",e)},1e3)},levelConfirm:function(){var e=this;this.$refs.levelForm.validate(function(t){t&&(a.updateNode(i,"level",e.formData.level,!0),e.$refs.levelForm.resetFields(),e.levelDialogShow=!1,d.dig1.clearSelection())})},nodeConfirm:function(){var e=this;console.log(i),this.$refs.nodeForm.validate(function(t){if(t){var o=String(e.nodeCount+1),l={nodeCode:o,title:e.formData.title,level:e.formData.level,type:e.formData.type},n={from:i.data.key,to:o,type:"01",title:"关系"+e.linkCount};a.addNode(l,"nodeCv1"),a.addLink(n,"linkCv1"),console.log(l),e.nodeCount++,e.$refs.nodeForm.resetFields(),e.nodeDialogShow=!1,console.log(d.dig1.nodes.count),setTimeout(function(){var t=a.getNode(o,!0);d.dig1.select(t),e.onSearch(t)},500)}})}}},y=(o(370),o(16)),C=Object(y.a)(k,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"dig1-con"},[o("div",{staticClass:"tools-con"},[o("xdh-go-search",{ref:"search",attrs:{"diagram-name":"dig1","pull-center":"","node-keys":["searchKey"],"custom-class":"my-search"},on:{"on-search":e.onSearch}}),e._v(" "),o("div",{staticClass:"divider"}),e._v(" "),o("xdh-go-snapshot",{staticClass:"my-snapshot",attrs:{"diagram-name":"dig1"},on:{"on-snap":e.getImage},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.makeImageData;return[o("el-tooltip",{attrs:{content:"快照",placement:"top"}},[o("el-button",{attrs:{circle:"",size:"mini",type:"primary",icon:"el-icon-camera-solid"},on:{click:t}})],1)]}}])})],1),e._v(" "),o("xdh-go-layout",{ref:"layout",attrs:{"diagram-name":"dig1",lock:e.lock,"custom-class":"my-layout"},on:{"update:lock":function(t){e.lock=t}}}),e._v(" "),o("xdh-go",{ref:"diagram",attrs:{"diagram-name":"dig1",nodes:e.nodes,links:e.links,"node-template-map":e.nodeTemplateMap,"link-template":e.linkTemplate,type:e.model,config:e.config,layout:e.layout,height:"800px",events:e.diagramEvents},on:{"on-ready":e.diagramReady}},[o("xdh-go-overview",{attrs:{"div-style":{width:"120px",height:"120px",margin:"20px 80px","z-index":"100"}}}),e._v(" "),o("xdh-go-html",{attrs:{"append-to-body":!1,"menu-name":"circleMenu","before-show-menu":e.beforeShowMenu,"show-context-menu":e.showMenu}},[o("xdh-go-circle-menu",e._b({on:{"on-item-click":e.menuClick},scopedSlots:e._u([{key:"list-item",fn:function(t){var a=t.item;return[o("div",{staticClass:"text"},[a.icon?o("i",{class:a.icon||"",staticStyle:{"font-size":"20px"}}):e._e(),e._v(" "),o("div",{staticStyle:{"margin-top":"-12px","font-size":"12px"}},[e._v(e._s(a.label))])])]}}])},"xdh-go-circle-menu",e.menuOptions,!1))],1)],1),e._v(" "),o("div",{staticClass:"legend-con"},e._l(e.legendOptions,function(t,a){return o("div",{staticClass:"item"},[o("span",{staticClass:"dot",style:"background-color:"+t.color}),e._v(" "),o("span",{staticClass:"txt"},[e._v(e._s(t.label))])])}),0),e._v(" "),o("el-dialog",{attrs:{title:"截图",visible:e.imgDialogShow,width:"50%"},on:{"update:visible":function(t){e.imgDialogShow=t}}},[o("img",{staticStyle:{width:"100%",height:"auto"},attrs:{src:e.currImg}})]),e._v(" "),o("el-dialog",{attrs:{title:"设置等级",visible:e.levelDialogShow,width:"50%"},on:{"update:visible":function(t){e.levelDialogShow=t}}},[o("el-form",{ref:"levelForm",attrs:{model:e.formData,"label-width":"100px"}},[o("el-form-item",{attrs:{label:"等级设置",prop:"level",required:""}},[o("el-radio-group",{model:{value:e.formData.level,callback:function(t){e.$set(e.formData,"level",t)},expression:"formData.level"}},[o("el-radio",{attrs:{label:"01"}},[e._v("等级一")]),e._v(" "),o("el-radio",{attrs:{label:"02"}},[e._v("等级二")]),e._v(" "),o("el-radio",{attrs:{label:"03"}},[e._v("等级三")])],1)],1)],1),e._v(" "),o("div",{attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{size:"mini",round:""},on:{click:e.levelConfirm}},[e._v("确定")])],1)],1),e._v(" "),o("el-dialog",{attrs:{title:"添加子节点",visible:e.nodeDialogShow,width:"50%"},on:{"update:visible":function(t){e.nodeDialogShow=t}}},[o("el-form",{ref:"nodeForm",attrs:{model:e.formData,"label-width":"100px"}},[o("el-form-item",{attrs:{label:"节点类型",prop:"type",required:""}},[o("el-radio-group",{model:{value:e.formData.type,callback:function(t){e.$set(e.formData,"type",t)},expression:"formData.type"}},[o("el-radio",{attrs:{label:"01"}},[e._v("人员")]),e._v(" "),o("el-radio",{attrs:{label:"02"}},[e._v("手机")]),e._v(" "),o("el-radio",{attrs:{label:"03"}},[e._v("车牌号")]),e._v(" "),o("el-radio",{attrs:{label:"04"}},[e._v("证件")])],1)],1),e._v(" "),o("el-form-item",{attrs:{label:"名称",prop:"title",required:""}},[o("el-input",{model:{value:e.formData.title,callback:function(t){e.$set(e.formData,"title",t)},expression:"formData.title"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"等级设置",prop:"level",required:""}},[o("el-radio-group",{model:{value:e.formData.level,callback:function(t){e.$set(e.formData,"level",t)},expression:"formData.level"}},[o("el-radio",{attrs:{label:"01"}},[e._v("等级一")]),e._v(" "),o("el-radio",{attrs:{label:"02"}},[e._v("等级二")]),e._v(" "),o("el-radio",{attrs:{label:"03"}},[e._v("等级三")])],1)],1)],1),e._v(" "),o("div",{attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{size:"mini",round:""},on:{click:e.nodeConfirm}},[e._v("确定")])],1)],1)],1)},[],!1,null,null,null);t.default=C.exports}}]);