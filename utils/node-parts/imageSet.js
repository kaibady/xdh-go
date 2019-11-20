import picture from './picture'
import panel from './panel/panel'
function getImage($, go, options, defaultImage) {
  let isClipping
  if (options.shape === null) {
    isClipping = false
  } else {
    isClipping = true
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
      props: {
        name: options.name || defaultImage.name,
        isClipping: isClipping,
        scale: options.scale || defaultImage.scale
      }
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
  console.log(_options)
  let images = []
  _options.images.forEach(item => {
    images.push(getImage($, go, item, defaultImage))
  })
  console.log(images)
  //   return $(go.Picture, {
  //     source: '/xdh-go/img/circle1.png',
  //     width: 60,
  //     height: 60
  //   })
  return panel($, go, {
    type: _options.layout,
    parts: [...images]
  })
}
