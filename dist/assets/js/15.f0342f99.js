(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{440:function(e,t,o){"use strict";var a=o(1),i=o(441).start;a({target:"String",proto:!0,forced:o(443)},{padStart:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}})},441:function(e,t,o){var a=o(16),i=o(442),l=o(32),n=Math.ceil,r=function(e){return function(t,o,r){var s,d,c=String(l(t)),u=c.length,m=void 0===r?" ":String(r),v=a(o);return v<=u||""==m?c:(s=v-u,(d=i.call(m,n(s/m.length))).length>s&&(d=d.slice(0,s)),e?c+d:d+c)}};e.exports={start:r(!1),end:r(!0)}},442:function(e,t,o){"use strict";var a=o(59),i=o(32);e.exports=function(e){var t=String(i(this)),o="",l=a(e);if(l<0||l==1/0)throw RangeError("Wrong number of repetitions");for(;l>0;(l>>>=1)&&(t+=t))1&l&&(o+=t);return o}},443:function(e,t,o){var a=o(93);e.exports=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(a)},508:function(e,t,o){},568:function(e,t,o){"use strict";o(508)},649:function(e,t,o){"use strict";o.r(t);o(445),o(60),o(440),o(10),o(444),o(144);var a,i,l,n=o(439),r=n.n.AnimationEvents,s=n.o.DataManager,d=n.o.diagramManager,c=n.v.setGray,u=n.v.removeGray,m=n.v.imageSet,v=n.v.binding,g=[{src:"/xdh-go/img/circle1.png",width:40,height:40,shape:"Circle",scale:2,name:"img1"}],f={"01":"一","02":"二","03":"三"};var p=function(e,t){var o=t.part;u({diagram:o.diagram}),c({diagram:o.diagram,nodes:[o]})},h=function(e,t){var o=t.part,a=[],i=[];u({diagram:o.diagram}),a.push(o),o.findLinksConnected().each((function(e){i.push(e)})),o.findNodesConnected().each((function(e){a.push(e)})),c({diagram:o.diagram,nodes:a,links:i})},b={components:{XdhGo:n.a,XdhGoOverview:n.f,XdhGoSnapshot:n.i,XdhGoSearch:n.g,XdhGoLayout:n.e,XdhGoCircleMenu:n.b,XdhGoHtml:n.d},data:function(){return{legendOptions:[{label:"等级一",color:"#389e0d"},{label:"等级二",color:"#722ed1"},{label:"等级三",color:"#c41d7f"}],nodeCount:0,linkCount:0,formData:{level:"",title:"",type:""},menuOptions:{menuList:[],trigger:"mouseover",innerRadius:25,angleRange:[-90,270],itemWidth:70,activeColor:"rgba(0, 153, 204, .95)",normalColor:"rgba(0, 114, 172, .95)",itemStyle:{color:"#fff"},textRotate:!0,itemGap:15},lock:!1,animateContinue:!1,currImg:"",model:"GraphLinksModel",nodes:[],links:[],imgDialogShow:!1,nodeDialogShow:!1,levelDialogShow:!1,diagramEvents:{BackgroundSingleClicked:function(e){u({diagram:e.diagram}),!1}}}},methods:{config:function(e,t){return{initialContentAlignment:t.Spot.Center,"toolManager.hoverDelay":10,"toolManager.mouseWheelBehavior":t.ToolManager.WheelZoom,initialAutoScale:t.Diagram.UniformToFill,grid:e(t.Panel,"Grid",e(t.Shape,"LineH",{stroke:"#adc6ff",strokeWidth:.5}),e(t.Shape,"LineH",{stroke:"#adc6ff",strokeWidth:.5,interval:10}),e(t.Shape,"LineV",{stroke:"#adc6ff",strokeWidth:.5}),e(t.Shape,"LineV",{stroke:"#adc6ff",strokeWidth:.5,interval:10}))}},layout:function(e,t){return e(t.LayeredDigraphLayout,{direction:90,setsPortSpots:!1,layerSpacing:0})},nodeTemplateMap:function(e,t,o){var a=o.htmlInfo.circleMenu,i=new t.Map;return i.add("",Object(n.u)(e,t,{props:{shape:"Circle",size:60,_nodeOptions:{props:{contextMenu:a}},_figurePanelOptions:{parts:[m(e,t,{layout:"Spot",images:g,isClipping:!0,clip:{width:85,height:85},binding:v(e,t,{visible:{type:"ofObject",key:"",handler:function(e){return e.isSelected}}})})]}},events:{click:p,doubleClick:h}})),i},linkTemplate:function(e,t){return Object(n.t)(e,t,{props:{arrows:"to",fromPortId:"tFigure",toPortId:"tFigure"}})},beforeShowMenu:function(e,t,o,a){this.menuOptions.menuList=[{tag:"add",label:"添加子节点",icon:"el-icon-share"},{tag:"level",label:"设置等级",icon:"el-icon-s-operation"}];var i=this.menuOptions.menuList.length;this.menuOptions.angleRange=i<5?{1:[45,135],2:[30,150],3:[0,180],4:[-30,210]}[i]:[-90,270]},showMenu:function(e,t,o,a){console.log(e,t,o,a),a.style.display="block";var i=t.div.getBoundingClientRect(),n=t.transformDocToView(e.actualBounds.center);a.style.left=n.x+i.left+"px",a.style.top=n.y+i.top+"px",l=e},menuClick:function(e,t){console.log(t),this.animateContinue=!1,"add"===t.tag?this.nodeDialogShow=!0:"level"===t.tag&&(this.levelDialogShow=!0),this.formData={title:"",level:"",type:""}},diagramReady:function(e,t,o){console.log(o.version),i=new r(e,o),a=new s(e,o),e.dataManager=a,a.setNodeConverter("nodeCv1",this.nodeConvert),a.setLinkConverter("linkCv1",this.linkConvert),a.setNodeUpdater("level",this.levelUpdater),this.loadTestData()},nodeConvert:function(e){var t,o={key:e.nodeCode,searchKey:e.title+":等级"+f[e.level],label:{text:[{text:e.title+":等级"+f[e.level]}],margin:[5,10,5,10]}},a={hover:"#faad14",select:"transparent"};switch(e.level){case"01":a.normal="#389e0d";break;case"02":a.normal="#722ed1";break;case"03":a.normal="#c41d7f"}if(o.strokeColor=a,o.strokeWidth=6,"01"===e.type)t="人员",o.shape="clipImage",o.image="/xdh-go/img/node/circleimage/8.png";else{o.shape="icon";var i={font:'24px "iconfont"'};switch(e.type){case"02":t="手机号码",i.text="";break;case"03":t="车辆",i.text="";break;case"04":t="证件号码",i.text=""}o.icon=i}return o.tooltip={text:t},o.iconColor={normal:"#10239e"},o.labelBackground={normal:"#fff566",hover:"#ffffb8"},o},levelUpdater:function(e,t,o,a){var i={hover:"#faad14",select:"transparent"},l=e._originData;switch(console.log(l),l.level){case"01":i.normal="#389e0d";break;case"02":i.normal="#722ed1";break;case"03":i.normal="#c41d7f"}var n=JSON.parse(JSON.stringify(e.label));n.text=[{text:l.title+":等级"+f[l.level]}],o.set(e,"label",n),o.set(e,"searchKey",l.title+":等级"+f[e.level]),o.set(e,"strokeColor",i)},linkConvert:function(e){var t={from:e.from,to:e.to,label:e.title},o="";switch(e.type){case"01":o={normal:"#d48806"};break;case"02":o={normal:"#389e0d"}}return t.lineColor=o,t.lineWidth={normal:2,hover:4},t.labelColor="#3f6600",t._originData=e,t},loadTestData:function(){var e,t,o=this;(e=[{title:"张三",type:"01",level:"01"},{title:"13467876567",type:"02",level:"02"},{title:"粤A12345",type:"03",level:"03"},{title:"440111180520212345",type:"04",level:"01"},{title:"李四",type:"01",level:"02"},{title:"13656778656",type:"02",level:"03"},{title:"粤A33435",type:"03",level:"01"},{title:"44011118052021234X",type:"04",level:"02"},{title:"王五",type:"01",level:"03"},{title:"13577656789",type:"02",level:"01"}],t={nodes:function(){for(var t=[],o=0;o<e.length;o++)t.push({nodeCode:String(o+1),type:e[o].type,level:e[o].level,title:e[o].title});return t}(),links:function(){for(var e=[],t="1,2|1,3|2,4|2,5|3,6|3,7|4,8|4,9|4,10|6,10".split("|"),o=0;o<10;o++){var a=t[o].split(",");e.push({from:a[0],to:a[1],type:(o%2+1).toString().padStart(2,"0"),title:"关系"+o})}return e}()},new Promise((function(e,o){e(t)}))).then((function(e){e.nodes.forEach((function(e){a.addNode(e,"nodeCv1")})),o.nodeCount=e.nodes.length,e.links.forEach((function(e){a.addLink(e,"linkCv1")})),o.linkCount=e.links.length}))},getImage:function(e,t){console.log(t),this.currImg=t,this.imgDialogShow=!0},circularRotate:function(e,t){var o=this;i.emit(e,t,(function(){o.animateContinue&&o.circularRotate(e,t)}))},onSearch:function(e){var t=this;console.log(e),!0,d.dig1.model.set(e.data,"animation",[{trigger:"rotate",objectName:"img1",duration:2e3,prop:"angle",keyFrame:[0,360],easingFunc:["ease"]}]),setTimeout((function(){t.circularRotate("rotate",e)}),1e3)},levelConfirm:function(){var e=this;this.$refs.levelForm.validate((function(t){t&&(a.updateNode(l,"level",e.formData.level,!0),e.$refs.levelForm.resetFields(),e.levelDialogShow=!1,d.dig1.clearSelection())}))},nodeConfirm:function(){var e=this;console.log(l),this.$refs.nodeForm.validate((function(t){if(t){var o=String(e.nodeCount+1),i={nodeCode:o,title:e.formData.title,level:e.formData.level,type:e.formData.type},n={from:l.data.key,to:o,type:"01",title:"关系"+e.linkCount};d.dig1.layout.isOngoing=!0,a.addNode(i,"nodeCv1"),a.addLink(n,"linkCv1"),console.log(i),e.nodeCount++,e.$refs.nodeForm.resetFields(),e.nodeDialogShow=!1,console.log(d.dig1.nodes.count),setTimeout((function(){}),500)}}))}}},k=(o(568),o(58)),y=Object(k.a)(b,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"dig1-con"},[o("div",{staticClass:"tools-con"},[o("xdh-go-search",{ref:"search",attrs:{"diagram-name":"dig1","pull-center":"","node-keys":["searchKey"],"custom-class":"my-search"},on:{"on-search":e.onSearch}}),e._v(" "),o("div",{staticClass:"divider"}),e._v(" "),o("xdh-go-snapshot",{staticClass:"my-snapshot",attrs:{"diagram-name":"dig1"},on:{"on-snap":e.getImage},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.makeImageData;return[o("el-tooltip",{attrs:{content:"快照",placement:"top"}},[o("el-button",{attrs:{circle:"",size:"mini",type:"primary",icon:"el-icon-camera-solid"},on:{click:t}})],1)]}}])})],1),e._v(" "),o("xdh-go-layout",{ref:"layout",attrs:{"diagram-name":"dig1",lock:e.lock,"custom-class":"my-layout"},on:{"update:lock":function(t){e.lock=t}}}),e._v(" "),o("xdh-go",{ref:"diagram",attrs:{"diagram-name":"dig1",nodes:e.nodes,links:e.links,"node-template-map":e.nodeTemplateMap,"link-template":e.linkTemplate,type:e.model,config:e.config,layout:e.layout,height:"800px",events:e.diagramEvents},on:{"on-ready":e.diagramReady}},[o("xdh-go-overview",{attrs:{"div-style":{width:"120px",height:"120px",margin:"20px 80px","z-index":"100"}}}),e._v(" "),o("xdh-go-html",{attrs:{"append-to-body":!1,"menu-name":"circleMenu","before-show-menu":e.beforeShowMenu,"show-context-menu":e.showMenu}},[o("xdh-go-circle-menu",e._b({on:{"on-item-click":e.menuClick},scopedSlots:e._u([{key:"list-item",fn:function(t){var a=t.item;return[o("div",{staticClass:"text"},[a.icon?o("i",{class:a.icon||"",staticStyle:{"font-size":"20px"}}):e._e(),e._v(" "),o("div",{staticStyle:{"margin-top":"-12px","font-size":"12px"}},[e._v(e._s(a.label))])])]}}])},"xdh-go-circle-menu",e.menuOptions,!1))],1)],1),e._v(" "),o("div",{staticClass:"legend-con"},e._l(e.legendOptions,(function(t,a){return o("div",{staticClass:"item"},[o("span",{staticClass:"dot",style:"background-color:"+t.color}),e._v(" "),o("span",{staticClass:"txt"},[e._v(e._s(t.label))])])})),0),e._v(" "),o("el-dialog",{attrs:{title:"截图",visible:e.imgDialogShow,width:"50%"},on:{"update:visible":function(t){e.imgDialogShow=t}}},[o("img",{staticStyle:{width:"100%",height:"auto"},attrs:{src:e.currImg}})]),e._v(" "),o("el-dialog",{attrs:{title:"设置等级",visible:e.levelDialogShow,width:"50%"},on:{"update:visible":function(t){e.levelDialogShow=t}}},[o("el-form",{ref:"levelForm",attrs:{model:e.formData,"label-width":"100px"}},[o("el-form-item",{attrs:{label:"等级设置",prop:"level",required:""}},[o("el-radio-group",{model:{value:e.formData.level,callback:function(t){e.$set(e.formData,"level",t)},expression:"formData.level"}},[o("el-radio",{attrs:{label:"01"}},[e._v("等级一")]),e._v(" "),o("el-radio",{attrs:{label:"02"}},[e._v("等级二")]),e._v(" "),o("el-radio",{attrs:{label:"03"}},[e._v("等级三")])],1)],1)],1),e._v(" "),o("div",{attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{size:"mini",round:""},on:{click:e.levelConfirm}},[e._v("确定")])],1)],1),e._v(" "),o("el-dialog",{attrs:{title:"添加子节点",visible:e.nodeDialogShow,width:"50%"},on:{"update:visible":function(t){e.nodeDialogShow=t}}},[o("el-form",{ref:"nodeForm",attrs:{model:e.formData,"label-width":"100px"}},[o("el-form-item",{attrs:{label:"节点类型",prop:"type",required:""}},[o("el-radio-group",{model:{value:e.formData.type,callback:function(t){e.$set(e.formData,"type",t)},expression:"formData.type"}},[o("el-radio",{attrs:{label:"01"}},[e._v("人员")]),e._v(" "),o("el-radio",{attrs:{label:"02"}},[e._v("手机")]),e._v(" "),o("el-radio",{attrs:{label:"03"}},[e._v("车牌号")]),e._v(" "),o("el-radio",{attrs:{label:"04"}},[e._v("证件")])],1)],1),e._v(" "),o("el-form-item",{attrs:{label:"名称",prop:"title",required:""}},[o("el-input",{model:{value:e.formData.title,callback:function(t){e.$set(e.formData,"title",t)},expression:"formData.title"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"等级设置",prop:"level",required:""}},[o("el-radio-group",{model:{value:e.formData.level,callback:function(t){e.$set(e.formData,"level",t)},expression:"formData.level"}},[o("el-radio",{attrs:{label:"01"}},[e._v("等级一")]),e._v(" "),o("el-radio",{attrs:{label:"02"}},[e._v("等级二")]),e._v(" "),o("el-radio",{attrs:{label:"03"}},[e._v("等级三")])],1)],1)],1),e._v(" "),o("div",{attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{size:"mini",round:""},on:{click:e.nodeConfirm}},[e._v("确定")])],1)],1)],1)}),[],!1,null,null,null);t.default=y.exports}}]);