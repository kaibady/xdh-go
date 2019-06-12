import {linkShape, textBlock} from '../link-parts/index'
import linkCommonData from '../data/link'
export function SolidLink(data) {
    let obj = Object.assign(this, linkCommonData, {
      category: 'solid',
      operIcon: ''
    }, data)
    return obj;
  }
  
  export default function($, go, options) {
    return $(
        go.Link,
        {
          selectionAdorned: false,
          curve: go.Link.Bezier,
          zOrder: 1,
          click: options.click,
          mouseEnter: options.mouseEnter,
          mouseLeave: options.mouseLeave
        },
        linkShape($, go, options),
        textBlock($, go, options),
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify)
      );
  }