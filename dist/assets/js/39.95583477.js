(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{399:function(e,n,t){"use strict";t.r(n);var a=t(142),o=(t(143),t(141),t(140)),r=o.t.tag;o.t.node;function i(e,n,t){var a=[];return t.forEach(function(t){a.push(r(e,n,{name:t.name,text:t.icon,figure:"Circle",background:"#69c0ff",placement:[.5,.3],font:'16px "iconfont"',stroke:null,color:"#fff",strokeWidth:2,margin:0,props:{opacity:0},events:{click:function(e,n){alert("点击了"+n.name)}}}))}),a}function p(e){for(var n=[],t=0;t<e.length;t++){var a=e[t];n.push({trigger:"mouseEnter",keyFrame:[0,1],duration:500,prop:"opacity",keyProp:"number",easingFunc:["easeInOutQuart"],objectName:a.name},{trigger:"mouseLeave",keyFrame:[1,0],duration:500,prop:"opacity",keyProp:"number",easingFunc:["easeInOutQuart"],objectName:a.name},{trigger:"mouseEnter",keyFrame:[[0,0],a.spot],prop:"position",keyProp:"point",easingFunc:["easeInOutQuart","easeInQuint"],objectName:a.name},{trigger:"mouseLeave",keyFrame:[a.spot,[0,0]],prop:"position",keyProp:"point",easingFunc:["easeInOutQuart","easeInQuint"],objectName:a.name})}return n.push({trigger:"mouseEnter",keyFrame:[0,360],duration:500,prop:"angle",keyProp:"number",easingFunc:["easeInOutQuart"],objectName:"tFigure"}),n}var s={components:{XdhGo:o.a},data:function(){return{model:"GraphLinksModel",nodes:[{category:"node",tagData:{text:"99+",placement:"top-left",strokeDashArray:[8,4,8,4]},label:"with commonNode"},{category:"animate",label:"with animate"}]}},methods:{config:function(e,n){return{initialContentAlignment:n.Spot.Center}},layout:function(e,n){return e(n.GridLayout,{})},nodeTemplateMap:function(e,n){var t=new n.Map;return t.add("node",Object(o.s)(e,n,{props:{_figurePanelOptions:{parts:[r(e,n,{figure:"Circle",background:"red",font:'14px "Microsoft Yahei"',placement:"top-right",stroke:null,color:"#fff",strokeWidth:2,margin:0})]}}})),t.add("animate",Object(o.s)(e,n,{props:{animation:p([{name:"Tag1",spot:[-30,0]},{name:"Tag2",spot:[-30,50]},{name:"Tag3",spot:[110,0]},{name:"Tag4",spot:[110,50]}]),_figurePanelOptions:{parts:[e.apply(void 0,[n.Panel,"Position",{alignment:new n.Spot(.5,.5)}].concat(Object(a.a)(i(e,n,[{name:"Tag1",icon:""},{name:"Tag2",icon:""},{name:"Tag3",icon:""},{name:"Tag4",icon:""}]))))]}}})),t},diagramReady:function(e,n,t){}}},u=t(16),c=Object(u.a)(s,function(){var e=this.$createElement,n=this._self._c||e;return n("div",[n("xdh-go",{ref:"diagram",attrs:{nodes:this.nodes,"node-template-map":this.nodeTemplateMap,type:this.model,config:this.config,layout:this.layout,height:"300px"},on:{"on-ready":this.diagramReady}})],1)},[],!1,null,null,null);n.default=c.exports}}]);