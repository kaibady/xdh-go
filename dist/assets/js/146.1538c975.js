(window.webpackJsonp=window.webpackJsonp||[]).push([[146],{152:function(e,n,i){"use strict";i(153)("link",function(e){return function(n){return e(this,"a","href",n)}})},389:function(e,n,i){"use strict";i.r(n);i(152);var t=i(145),o=t.u.node,r=t.u.link,a=t.u.shape,l=t.u.panel,s=t.u.textBlock,p=t.u.binding,d=t.u.makePort;function u(e,n){e.ports.each(function(e){""!==e.portId&&(e.fill=n?"rgba(0,0,0,.3)":null,e.stroke=n?"rgba(255,255,255, 0.6)":null)})}var g={components:{XdhGo:t.a,XdhTool:t.XdhTool},data:function(){return{model:"GraphLinksModel",nodes:[{key:"a",text:"A"},{key:"b",text:"B"},{key:"c",text:"C"}],links:[]}},methods:{config:function(e,n){return n.SnapLinkReshapingTool=function(e,n){function i(){n.LinkReshapingTool.call(this),this._gridCellSize=new n.Size(NaN,NaN),this._gridOrigin=new n.Point(NaN,NaN),this._isGridSnapEnabled=!0}return n.Diagram.inherit(i,n.LinkReshapingTool),Object.defineProperty(i.prototype,"gridCellSize",{get:function(){return this._gridCellSize},set:function(e){if(!(e instanceof n.Size))throw new Error("new value for SnapLinkReshapingTool.gridCellSize must be a Size, not: "+e);this._gridCellSize=e.copy()}}),Object.defineProperty(i.prototype,"gridOrigin",{get:function(){return this._gridOrigin},set:function(e){if(!(e instanceof n.Point))throw new Error("new value for SnapLinkReshapingTool.gridOrigin must be a Point, not: "+e);this._gridOrigin=e.copy()}}),Object.defineProperty(i.prototype,"isGridSnapEnabled",{get:function(){return this._isGridSnapEnabled},set:function(e){if("boolean"!=typeof e)throw new Error("new value for SnapLinkReshapingTool.isGridSnapEnabled must be a boolean, not: "+e);this._isGridSnapEnabled=e}}),i.prototype.computeReshape=function(e){var i=e;if(this.isGridSnapEnabled){var t=this.gridCellSize,o=this.gridOrigin;t.isReal()&&0!==t.width&&0!==t.height||(t=this.diagram.grid.gridCellSize),o.isReal()||(o=this.diagram.grid.gridOrigin),i=e.copy().snapToGrid(o.x,o.y,t.width,t.height)}return n.LinkReshapingTool.prototype.computeReshape.call(this,i)},i}(0,n),{initialContentAlignment:n.Spot.Center,"toolManager.hoverDelay":100,linkReshapingTool:e(n.SnapLinkReshapingTool),grid:e(n.Panel,"Grid",{gridCellSize:new n.Size(8,8)},e(n.Shape,"LineH",{stroke:"lightgray",strokeWidth:.5}),e(n.Shape,"LineV",{stroke:"lightgray",strokeWidth:.5})),"draggingTool.isGridSnapEnabled":!0,LinkReshaped:function(e){e.subject.routing=n.Link.Orthogonal},"animationManager.isEnabled":!1,"undoManager.isEnabled":!0}},layout:function(e,n){return e(n.ForceDirectedLayout,{})},diagramReady:function(e,n,i){},nodeTemplate:function(e,n){return o(e,n,{type:"spot",props:{fromShortLength:3,toShortLength:3},events:{mouseEnter:function(e,n){u(n,!0)},mouseLeave:function(e,n){u(n,!1)}},parts:[l(e,n,{type:"spot",parts:[a(e,n,{props:{figure:"RoundedRectangle",fill:"red"}}),s(e,n,{props:{stroke:"#fff",margin:12},binding:p(e,n,{text:"text"})})]}),d(e,n,{spot:new n.Spot(.1,.5),props:{strokeWidth:2,portId:"L",desiredSize:new n.Size(10,10)}}),d(e,n,{spot:new n.Spot(.9,.5),props:{strokeWidth:2,portId:"R",desiredSize:new n.Size(10,10)}})]})},linkTemplateMap:function(e,n){var i=new n.Map;return i.add("",r(e,n,{props:{relinkableFrom:!0,relinkableTo:!0,reshapable:!0},parts:[a(e,n,{props:{stroke:"#000",strokeWidth:2}}),a(e,n,{props:{toArrow:"Standard",stroke:"#000",fill:"#000"}})]})),i}}},h=i(16),c=Object(h.a)(g,function(){var e=this,n=e.$createElement,i=e._self._c||n;return i("div",[e.$route.query.test?i("xdh-tool"):e._e(),e._v(" "),i("xdh-go",{ref:"diagram",attrs:{nodes:e.nodes,links:e.links,type:e.model,config:e.config,layout:e.layout,height:"400px","node-template":e.nodeTemplate,"link-template-map":e.linkTemplateMap},on:{"on-ready":e.diagramReady}})],1)},[],!1,null,null,null);n.default=c.exports}}]);