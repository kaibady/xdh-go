(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{216:function(e,t,l){},316:function(e,t,l){"use strict";var c=l(216);l.n(c).a},506:function(e,t,l){"use strict";l.r(t);var c=l(3),n={data:function(){return{collapsed:!0,fullscreen:!1}},watch:{fullscreen:function(e){e?this.setFullscreen():this.cancelFullscreen()}},methods:{handleCollapsed:function(){this.collapsed=!this.collapsed},setFullscreen:function(){var e=this.$refs.preview,t=e.requestFullScreen||e.webkitRequestFullScreen||e.mozRequestFullScreen||e.msRequestFullscreen;void 0!==t&&t&&t.call(e)},cancelFullscreen:function(){document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitCancelFullScreen?document.webkitCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen()},isFullScreen:function(){return document.isFullScreen||document.mozIsFullScreen||document.webkitIsFullScreen},handleFullscreenChange:function(){this.fullscreen=this.isFullScreen()}},mounted:function(){Object(c.on)(this.$refs.preview,"webkitfullscreenchange",this.handleFullscreenChange)},beforeDestroy:function(){Object(c.off)(this.$refs.preview,"webkitfullscreenchange",this.handleFullscreenChange)}},s=(l(316),l(16)),i=Object(s.a)(n,function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"demo"},[l("div",{ref:"preview",staticClass:"demo__preview",class:{"full-screen":e.fullscreen}},[e._t("default"),e._v(" "),l("div",{staticClass:"demo__actions"},[e.fullscreen?l("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"取消全屏",placement:"top"}},[l("i",{staticClass:" el-icon-switch-button",attrs:{title:"取消全屏"},on:{click:function(t){e.fullscreen=!1}}})]):l("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"全屏",placement:"top"}},[l("i",{staticClass:"el-icon-full-screen",on:{click:function(t){e.fullscreen=!0}}})])],1)],2),e._v(" "),l("transition",{attrs:{name:"el-zoom-in-top"}},[e.collapsed?e._e():l("div",{staticClass:"demo__body"},[e.$slots.desc?l("div",{staticClass:"demo__desc"},[e._t("desc")],2):e._e(),e._v(" "),l("div",{staticClass:"demo__code"},[e._t("code")],2)])]),e._v(" "),l("div",{staticClass:"demo__handler",on:{click:e.handleCollapsed}},[e.collapsed?l("span",[l("i",{staticClass:"el-icon-caret-bottom"}),e._v(" 显示代码")]):l("span",[l("i",{staticClass:"el-icon-caret-top"}),e._v(" 隐藏代码")])])],1)},[],!1,null,"18c479c6",null);t.default=i.exports}}]);