(window.webpackJsonp=window.webpackJsonp||[]).push([[113],{439:function(e,n,a){"use strict";a.r(n);var t=a(140),i=t.u.tag,o=t.u.shape,r=t.u.binding,u={components:{XdhGo:t.a},data:function(){return{model:"GraphLinksModel",nodes:[{key:1,label:"动画衔接1",showShape:!0},{key:2,label:"动画衔接2",showShape:!0},{key:3,label:"动画衔接3",showShape:!0,animation:[{trigger:"mouseEnter",name:"animate1",objectName:"myShape",duration:800,prop:"width",propType:"number",keyFrame:[150,120],easingFunc:["easeInOutCubic"]},{trigger:"mouseEnter",objectName:"myShape",name:"animate2",prevName:"animate1",delay:500,duration:800,prop:"fill",keyFrame:[[255,236,61,.5],[186,230,55,1]],easingFunc:["easeInOutCubic"]},{trigger:"mouseEnter",objectName:"tLabel",prevName:"animate3",delay:500,duration:800,prop:"scale",keyFrame:[1,1.4],easingFunc:["easeInOutCubic"]}]}]}},methods:{config:function(e,n){return{initialContentAlignment:n.Spot.Center,"toolManager.hoverDelay":10}},layout:function(e,n){return e(n.GridLayout,{wrappingColumn:3})},nodeTemplate:function(e,n){return Object(t.t)(e,n,{parts:{down:[o(e,n,{props:{name:"myShape",figure:"RoundedRectangle",stroke:"#ccc",width:150,height:150,fill:"rgba(133, 165, 255, 0.5)"},binding:r(e,n,{visible:{key:"",handler:function(e){return e.showShape}}})})]},props:{shape:"Circle",size:80,animation:[{trigger:"mouseEnter",name:"animate1",objectName:"myShape",duration:800,prop:"width",propType:"number",keyFrame:[150,120],easingFunc:["easeInOutCubic"]},{trigger:"mouseEnter",objectName:"myShape",prevName:"animate1",delay:500,duration:800,prop:"fill",keyFrame:[[133,165,255,.5],[255,133,192,1]],easingFunc:["easeInOutCubic"]}],_figurePanelOptions:{parts:[i(e,n,{props:{alignment:new n.Spot(.3,0)},name:"myTag",figure:"RoundedRectangle",fill:"#eb2f96",stroke:"#780650",color:"#000",strokeWidth:2,textKey:"mytag"})]},_labelOuterPanelOptions:{props:{position:new n.Point(0,100)}}}})},diagramReady:function(e,n,a){}}},p=a(16),s=Object(p.a)(u,function(){var e=this.$createElement,n=this._self._c||e;return n("div",[n("xdh-go",{ref:"diagram",attrs:{nodes:this.nodes,type:this.model,"node-template":this.nodeTemplate,config:this.config,layout:this.layout,height:"300px"},on:{"on-ready":this.diagramReady}})],1)},[],!1,null,null,null);n.default=s.exports}}]);