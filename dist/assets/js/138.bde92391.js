(window.webpackJsonp=window.webpackJsonp||[]).push([[138],{472:function(e,a,n){"use strict";n.r(a);var t=n(140),i=t.q.tag,o=t.q.shape,r=t.q.binding,p={components:{XdhGo:t.a},data:function(){return{model:"GraphLinksModel",nodes:[{key:1,label:"动画衔接1",showShape:!0},{key:2,label:"动画衔接2",showShape:!0},{key:3,label:"动画衔接3",showShape:!0,animation:[{trigger:"mouseEnter",name:"animate1",objectName:"myShape",duration:800,prop:"margin",propType:"margin",keyFrame:[[0,0,0,0],[10,10,10,10]],easingFunc:["easeInOutCubic"]},{trigger:"mouseEnter",objectName:"myShape",name:"animate2",prevName:"animate1",delay:500,duration:800,prop:"fill",keyFrame:[[133,165,255,.5],[255,133,192,1]],easingFunc:["easeInOutCubic"]},{trigger:"mouseEnter",objectName:"tLabel",prevName:"animate2",delay:500,duration:800,prop:"scale",keyFrame:[1,1.4],easingFunc:["easeInOutCubic"]}]}]}},methods:{config:function(e,a){return{initialContentAlignment:a.Spot.Center,"toolManager.hoverDelay":10}},layout:function(e,a){return e(a.GridLayout,{wrappingColumn:3})},nodeTemplate:function(e,a){return Object(t.p)(e,a,{parts:{down:[o(e,a,{props:{name:"myShape",figure:"RoundedRectangle",stroke:"#ccc",fill:"rgba(133, 165, 255, 0.5)"},binding:r(e,a,{visible:{key:"",handler:function(e){return e.showShape}}})})]},props:{shape:"Circle",size:80,animation:[{trigger:"mouseEnter",name:"animate1",objectName:"myShape",duration:800,prop:"margin",propType:"margin",keyFrame:[[0,0,0,0],[10,10,10,10]],easingFunc:["easeInOutCubic"]},{trigger:"mouseEnter",objectName:"myShape",prevName:"animate1",delay:500,duration:800,prop:"fill",keyFrame:[[133,165,255,.5],[255,133,192,1]],easingFunc:["easeInOutCubic"]}],_figurePanelOptions:{parts:[i(e,a,{props:{alignment:new a.Spot(.3,0)},name:"myTag",figure:"RoundedRectangle",fill:"#eb2f96",stroke:"#780650",color:"#000",strokeWidth:2,textKey:"mytag"})]},_labelOuterPanelOptions:{props:{position:new a.Point(0,100)}}}})},diagramReady:function(e,a,n){}}},s=n(16),m=Object(s.a)(p,function(){var e=this.$createElement,a=this._self._c||e;return a("div",[a("xdh-go",{ref:"diagram",attrs:{nodes:this.nodes,type:this.model,"node-template":this.nodeTemplate,config:this.config,layout:this.layout,height:"500px"},on:{"on-ready":this.diagramReady}})],1)},[],!1,null,null,null);a.default=m.exports}}]);