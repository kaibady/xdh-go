(window.webpackJsonp=window.webpackJsonp||[]).push([[98],{485:function(e,t,n){"use strict";n.r(t);var o=n(140),a={components:{XdhGo:o.a},data:function(){return{model:"GraphLinksModel",nodes:[{label:{font:'18px "Microsoft Yahei"',margin:5,text:[{text:"灰度模式文本1"},{text:"灰度模式文本2"}]},labelColor:{hover:"blue"},containerShape:null,isGray:!0},{shape:"clipImage",image:"/xdh-go/img/node/circleimage/1.png",stateShape:"Circle",label:[{text:"文本1"},{text:"文本2"}],labelColor:{hover:"blue"},containerShape:null},{label:{text:[{text:"node2"},{text:"node2"}]},layout:"Horizontal",size:40,shape:"Rectangle",background:{normal:"#f06600"}},{label:"node3",layout:"Spot",labelColor:{hover:"red"},labelStroke:{hover:"transparent"},tag:{placement:"top-right",text:"级别1"}}]}},methods:{config:function(e,t){return{initialContentAlignment:t.Spot.Center}},layout:function(e,t){return e(t.GridLayout,{})},nodeTemplate:function(e,t){return Object(o.t)(e,t,{props:{shape:"Circle",background:{normal:"#f0f0f0",hover:"#0000aa"},size:80,labelBackground:"transparent"}})},diagramReady:function(e,t,n){}}},l=n(16),r=Object(l.a)(a,function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("xdh-go",{ref:"diagram",attrs:{nodes:this.nodes,type:this.model,"node-template":this.nodeTemplate,config:this.config,layout:this.layout,height:"200px"},on:{"on-ready":this.diagramReady}})],1)},[],!1,null,null,null);t.default=r.exports}}]);