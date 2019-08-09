import '../theme/index.scss';
import Go from './go';
import Html from './html';
import Tooltip from './tooltip';
import CircleMenu from './circle-menu';
import Overview from './overview';
import Snapshot from './snapshot';
import Draft from './draft';
import Tool from './tool';
import Layout from './layout';
import View from './view';
const components = [
  Go,
  Html,
  Tooltip,
  CircleMenu,
  Overview,
  Snapshot,
  Draft,
  Tool,
  Layout,
  View
]
const install = function(Vue) {
  if(install.installed) return
  components.forEach(component => Vue.component(component.name, component))
}

if(typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export const XdhGo = Go
export const XdhGoHtml = Html
export const XdhGoTooltip = Tooltip
export const XdhGoCircleMenu = CircleMenu
export const XdhGoOverview = Overview
export const XdhGoSnapshot = Snapshot
export const XdhGoDraft = Draft
export const XdhGoTool = Tool
export const XdhGoLayout = Layout
export const XdhGoView = View
export default {
  version: '1.0.0',
  install,
  Go,
  Html,
  Tooltip,
  CircleMenu,
  Overview,
  Snapshot,
  Draft,
  Tool,
  Layout,
  View
};
