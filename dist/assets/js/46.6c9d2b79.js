(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{491:function(e,t,n){"use strict";n.r(t);var a=n(140),i=a.q.tag,r=a.q.shape,o=a.q.binding,u={components:{XdhGo:a.a},data:function(){return{model:"GraphLinksModel",nodes:[{key:1,label:"delay:500ms",animation:[{trigger:"mouseEnter",objectName:"tFigure",delay:500,duration:300,prop:"scale",propType:"number",keyFrame:[1,1.4],easingFunc:["easeInOutCubic"]},{trigger:"mouseLeave",objectName:"tFigure",delay:500,duration:300,prop:"scale",propType:"number",keyFrame:[1.4,1],easingFunc:["easeInOutCubic"]}]},{key:2,label:"repeatCount:4",animation:[{trigger:"mouseEnter",objectName:"tFigure",duration:300,repeatCount:4,direction:"alternate",prop:"scale",keyFrame:[1,1.4],easingFunc:["easeInOutCubic"]}]},{key:3,label:[{text:"repeatCount:4"},{text:"direction: 'alternate'"}],animation:[{trigger:"mouseEnter",objectName:"tFigure",duration:300,repeatCount:4,direction:"alternate",prop:"scale",keyFrame:[1,1.4],easingFunc:["easeInOutCubic"]}]},{key:4,label:"padding:margin",animation:[{trigger:"mouseEnter",objectName:"tFigure",duration:200,prop:"padding",keyFrame:[[0,0,0,0],[0,0,20,0]],easingFunc:["easeInOutCubic"]},{trigger:"mouseLeave",objectName:"tFigure",duration:200,prop:"padding",keyFrame:[[0,0,20,0],[0,0,0,0]],easingFunc:["easeInOutCubic"]}]},{key:5,label:"fill:rgba",showShape:!0,animation:[{trigger:"mouseEnter",objectName:"myShape",duration:800,prop:"fill",keyFrame:[[255,133,192,1],[133,165,255,.5]],easingFunc:["easeInOutCubic"]},{trigger:"mouseLeave",objectName:"myShape",duration:800,prop:"fill",keyFrame:[[133,165,255,.5],[255,133,192,1]],easingFunc:["easeInOutCubic"]}]}]}},methods:{config:function(e,t){return{initialContentAlignment:t.Spot.Center}},layout:function(e,t){return e(t.LayeredDigraphLayout,{setsPortSpots:!1,layerSpacing:150,direction:90,isOngoing:!0})},nodeTemplate:function(e,t){return Object(a.p)(e,t,{parts:{down:[r(e,t,{props:{name:"myShape",figure:"RoundedRectangle",stroke:"#ccc",fill:"rgba(255,133,192,1)"},binding:o(e,t,{visible:{key:"",handler:function(e){return e.showShape}}})})]},props:{shape:"Circle",size:80,_figurePanelOptions:{parts:[i(e,t,{props:{alignment:new t.Spot(.3,0)},name:"myTag",figure:"RoundedRectangle",fill:"#eb2f96",stroke:"#780650",color:"#000",strokeWidth:2,textKey:"mytag"})]},_labelOuterPanelOptions:{props:{position:new t.Point(0,100)}}}})},diagramReady:function(e,t,n){}}},s=n(16),p=Object(s.a)(u,function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("xdh-go",{ref:"diagram",attrs:{nodes:this.nodes,type:this.model,"node-template":this.nodeTemplate,config:this.config,layout:this.layout,height:"250px"},on:{"on-ready":this.diagramReady}})],1)},[],!1,null,null,null);t.default=p.exports}}]);