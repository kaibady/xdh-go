import {
  verPanel,
  spotPanel,
  node,
  picture,
  textBlock,
  binding
} from '../node-parts';
console.log(spotPanel, picture, textBlock);
export default function($, go, options) {
  return node($, go, {
    // binding: binding($, go, {
    //   key: { key: 'id' }
    // }),
    parts: [
      verPanel($, go, {
        parts: [
          spotPanel($, go, {
            porps: {
              portId: '',
              fromPortSpot: true,
              toPortSport: true
            },
            parts: [
              picture($, go, {
                binding: binding($, go, {
                  source: { key: 'image' },
                  errorFunction: {
                    type: 'ofObject',
                    key: '',
                    handler(n) {
                      return (pic, e) => {
                        let defaultBrokenImage = `data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect x="0" y="0" width="100px" height="100px" fill="gray"></rect></svg>`;
                        if (n.data.brokenImage) {
                          let img = new Image();
                          img.src = n.data.brokenImage;
                          img.onload = () => {
                            pic.source = n.data.brokenImage;
                          };
                          img.onerror = () => {
                            pic.source = defaultBrokenImage;
                          };
                        } else {
                          pic.source = defaultBrokenImage;
                        }
                      };
                    }
                  }
                })
              })
            ]
          }),
          textBlock($, go, {
            props: { stroke: '#666' },
            binding: binding($, go, {
              text: {
                key: 'label'
              }
            })
          })
        ]
      })
    ]
  });
}
