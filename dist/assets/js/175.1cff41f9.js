(window.webpackJsonp=window.webpackJsonp||[]).push([[175],{388:function(e,n,t){"use strict";t.r(n);var a=t(140),o=a.q.tag,i=a.q.shape,r=a.q.binding,p={components:{XdhGo:a.a},data:function(){return{model:"GraphLinksModel",nodes:[{key:5,label:"fill:rgba",showShape:!0,animation:[{trigger:"mouseEnter",name:"animate1",objectName:"myShape",duration:800,prop:"margin",propType:"margin",keyFrame:[[0,0,0,0],[10,10,10,10]],easingFunc:["easeInOutCubic"]},{trigger:"mouseEnter",objectName:"myShape",prevName:"animate1",delay:500,duration:800,prop:"fill",keyFrame:[[133,165,255,.5],[255,133,192,1]],easingFunc:["easeInOutCubic"]}]}]}},methods:{config:function(e,n){return{initialContentAlignment:n.Spot.Center,"toolManager.hoverDelay":10}},layout:function(e,n){return e(n.GridLayout,{wrappingColumn:3})},nodeTemplate:function(e,n){return Object(a.p)(e,n,{parts:{down:[i(e,n,{props:{name:"myShape",figure:"RoundedRectangle",stroke:"#ccc",fill:"rgba(255,133,192,1)"},binding:r(e,n,{visible:{key:"",handler:function(e){return e.showShape}}})})]},props:{shape:"Circle",size:80,_figurePanelOptions:{parts:[o(e,n,{props:{alignment:new n.Spot(.3,0)},name:"myTag",figure:"RoundedRectangle",fill:"#eb2f96",stroke:"#780650",color:"#000",strokeWidth:2,textKey:"mytag"})]},_labelOuterPanelOptions:{props:{position:new n.Point(0,100)}}}})},diagramReady:function(e,n,t){}}},s=t(16),l=Object(s.a)(p,function(){var e=this.$createElement,n=this._self._c||e;return n("div",[n("xdh-go",{ref:"diagram",attrs:{nodes:this.nodes,type:this.model,"node-template":this.nodeTemplate,config:this.config,layout:this.layout,height:"500px"},on:{"on-ready":this.diagramReady}})],1)},[],!1,null,null,null);n.default=l.exports}}]);