(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{380:function(t,e,o){"use strict";o.r(e);var n=o(140),a=n.t.tag,r=n.t.node,i={components:{XdhGo:n.a},data:function(){return{model:"GraphLinksModel",nodes:[{category:"rect",tagData:{text:[{text:"多行文本1"},{text:"多行文本2",margin:10,font:'18px "Microsoft Yahei"',color:"#237804",background:"#feffe6"}]}},{category:"rect",tagData:{text:"单行文本",strokeDashArray:[8,4,8,4],background:"green",color:"#fff"}},{category:"circle",tagData:{text:""}}]}},methods:{config:function(t,e){return{initialContentAlignment:e.Spot.Center}},layout:function(t,e){return t(e.GridLayout,{})},nodeTemplateMap:function(t,e){var o=new e.Map;return o.add("rect",r(t,e,{parts:[a(t,e,{figure:"RoundedRectangle",background:"#eb2f96",stroke:"#780650",color:"#000",strokeWidth:2})]})),o.add("circle",r(t,e,{parts:[a(t,e,{figure:"Circle",background:"#69c0ff",font:'18px "iconfont"',stroke:null,color:"#fff",strokeWidth:2,margin:0})]})),o},diagramReady:function(t,e,o){}}},c=o(16),d=Object(c.a)(i,function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("xdh-go",{ref:"diagram",attrs:{nodes:this.nodes,"node-template-map":this.nodeTemplateMap,type:this.model,config:this.config,layout:this.layout,height:"150px"},on:{"on-ready":this.diagramReady}})],1)},[],!1,null,null,null);e.default=d.exports}}]);