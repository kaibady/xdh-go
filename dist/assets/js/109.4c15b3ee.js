(window.webpackJsonp=window.webpackJsonp||[]).push([[109],{450:function(t,e,a){"use strict";a.r(e);for(var i,n=a(140),o=n.u.imageSet,r=(n.u.node,n.u.textBlock,n.n.AnimationEvents),c=[{src:"/xdh-go/img/circle1.png",width:60,height:60,shape:"Circle",scale:2,name:"img1"},{src:"/xdh-go/img/circle1.png",width:80,height:80,shape:"Circle",scale:2,name:"img2"},{src:"/xdh-go/img/circle1.png",width:100,height:100,shape:"Circle",scale:2,name:"img3"}],s=[],l=0;l<2;l++){for(var u={key:1,shape:"Circle",layout:"Spot",size:100,label:[{text:"imageSet"},{text:"通用节点"},{text:"旋转效果"}]},h=[],d=1;d<=3;d++){var g=d%2==0?[360,0]:[0,360];h.push({trigger:"rotate"+d,objectName:"img"+d,duration:2e3*d,prop:"angle",keyFrame:g,easingFunc:["ease"]})}u.animation=h,s.push(u)}var m={components:{XdhGo:n.a},data:function(){return{model:"GraphLinksModel",animateContinue:!0,nodes:s}},methods:{config:function(t,e){return{initialContentAlignment:e.Spot.Center}},layout:function(t,e){return t(e.GridLayout,{})},nodeTemplate:function(t,e){return Object(n.t)(t,e,{props:{_figurePanelOptions:{parts:[o(t,e,{layout:"Spot",images:c})]}}})},diagramReady:function(t,e,a){},onLoadData:function(t,e,a){i=new r(t,a),t.animationEvents=i,this.circularRotate("rotate1"),this.circularRotate("rotate2"),this.circularRotate("rotate3")},circularRotate:function(t){var e=this;i.emit(t,"all",function(){e.animateContinue&&e.circularRotate(t)})}}},p=a(16),f=Object(p.a)(m,function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("xdh-go",{ref:"diagram",attrs:{nodes:this.nodes,"node-template":this.nodeTemplate,type:this.model,config:this.config,layout:this.layout,height:"400px"},on:{"on-ready":this.diagramReady,"on-load-data":this.onLoadData}})],1)},[],!1,null,null,null);e.default=f.exports}}]);