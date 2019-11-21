import picture from './picture'
import panel from './panel/panel'
function getImage($, go, options, defaultImage, layout) {
  let isClipping
  if (options.shape === null) {
    isClipping = false
  } else {
    isClipping = true
  }
  let padding
  if (typeof options.padding === 'number') {
    padding = options.padding
  } else if (options.padding instanceof Array) {
    padding = new go.Margin(...options.padding)
  } else {
    padding = defaultImage.padding
  }
  let panelProp = {
    name: options.name || defaultImage.name,
    isClipping: isClipping,
    scale: options.scale || defaultImage.scale,
    padding: padding
  }
  if (options.position !== undefined) {
    if (layout === 'Spot') {
      panelProp.alignment = new go.Spot(...options.position)
    } else if (layout === 'Position') {
      panelProp.position = new go.Point(...options.position)
    }
  }
  return picture($, go, {
    props: {
      width: options.width || defaultImage.width,
      height: options.height || defaultImage.height,
      source: options.src || defaultImage.src
    },
    binding: [new go.Binding('source', 'source')],
    clip: {
      props: {
        figure: options.shape || defaultImage.shape,
        width: options.width || defaultImage.width,
        height: options.height || defaultImage.height
      }
    },
    panel: {
      type: go.PanelLayout[options.layout || 'Spot'],
      props: panelProp
    }
  })
}
export default function($, go, options = {}) {
  let defaultImage = {
    name: '',
    src: '',
    scale: 1,
    width: 60,
    height: 60,
    padding: 2,
    shape: 'Circle'
  }
  let _options = Object.assign(
    {
      layout: 'Spot',
      props: {},
      binding: [],
      images: []
    },
    options
  )
  let images = []
  _options.images.forEach(item => {
    images.push(getImage($, go, item, defaultImage, _options.layout))
  })
  return panel($, go, {
    type: _options.layout,
    width: 100,
    height: 100,
    parts: [
      $(go.Shape, 'Circle', {
        width: 2,
        height: 2,
        name: 'imageSetLoc',
        fill: 'red',
        stroke: null,
        alignment: go.Spot.Center
      }),
      ...images
    ]
  })
}
