(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{449:function(t,e,n){"use strict";var o=n(1),r=n(452);o({target:"String",proto:!0,forced:n(453)("link")},{link:function(t){return r(this,"a","href",t)}})},669:function(t,e,n){"use strict";n.r(e);n(449);var o=n(439),r=o.v.node,a=o.v.link,i=o.v.shape,s=o.v.textBlock,l=o.v.binding,d={components:{XdhGo:o.a},data:function(){return{model:"GraphLinksModel",nodes:[{key:"a",text:"A"},{key:"b",text:"B"},{key:"c",text:"C"}],links:[{from:"a",to:"b"},{from:"b",to:"c",category:"dash"}]}},methods:{config:function(t,e){return{initialContentAlignment:e.Spot.Center,"toolManager.hoverDelay":50}},layout:function(t,e){return t(e.LayeredDigraphLayout,{})},nodeTemplate:function(t,e){return r(t,e,{props:{fromShortLength:5,toShortLength:20},parts:[i(t,e,{props:{figure:"RoundedRectangle",fill:"red"}}),s(t,e,{props:{stroke:"#fff",margin:12},binding:l(t,e,{text:"text"})})]})},linkTemplateMap:function(t,e){var n=new e.Map;return n.add("",a(t,e)),n.add("dash",a(t,e,{parts:[i(t,e,{props:{strokeDashArray:[8,4,8,4],stroke:"red",strokeWidth:4}}),i(t,e,{props:{toArrow:"Standard",stroke:"red",fill:"red"}})]})),n}}},p=n(58),h=Object(p.a)(d,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("xdh-go",{ref:"diagram",attrs:{nodes:this.nodes,links:this.links,type:this.model,config:this.config,layout:this.layout,height:"150px","node-template":this.nodeTemplate,"link-template-map":this.linkTemplateMap}})],1)}),[],!1,null,null,null);e.default=h.exports}}]);