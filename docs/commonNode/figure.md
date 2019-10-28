# 图形类型

| 参数        | 参数说明       | 类型          | 可选值                                               | 默认值                                               |
| ----------- | -------------- | ------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| shape       | 图形类型       | String        | 'image'/'clipImage'/'icon'/(go.Shape 内置图形类型)   | 'Rectangle'                                          |
| stateShape  | 状态框形状     | String        | go.Shape 内置图形类型                                | 'Circle'                                             |
| size        | 图形的尺寸     | Number/Array  | Number 类型时，宽高一致；如果是数组类型，则为[宽,高] | [50,50]                                              |
| background  | 图形背景色     | Object/String | -                                                    | gray 状态为'#ccc',其它为'#91d5ff'                    |
| strokeColor | 状态框边框色   | Object/String | -                                                    | gray 状态为'#ccc',normal 为'#0050b3',其它为'#c41d7f' |
| strokeWidth | 状态框边框宽度 | Number        | -                                                    | 五种状态，默认为 2                                   |

## icon

shape 参数为'icon'时有效
|参数|说明|类型|可选值|默认值|
|----|----|----|----|----|
|icon|字体图标类型参数|Object/String|-|-|
|icon.font|字体图标 iconfont|String|-|'30px "iconfont"',font-family 类型默认为 iconfont|
|icon.text|字体图标内容|String|-|'\uE7BD'|
|iconColor|图标颜色|Object/String|-|gray 状态为'#ccc', 其它为'#1890ff'|

:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :type="model"
      :node-template="nodeTemplate"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="150px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl } from 'xdh-go';
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          {
            label: '默认跟随模板'
          },
          {
            label: '没有状态圈',
            stateShape: null
          },
          {
            label: 'icon参数简写',
            icon: '\uE797'
          },
          {
            label: 'font样式',
            icon: {
              text: '\uE655',
              font: 'bold 40px "iconfont"'
            }
          },
          {
            label: 'iconColor',
            icon: {
              text: '\uE655',
              font: 'bold 40px "iconfont"'
            },
            background: 'transparent',
            iconColor: {
              normal: '#40a9ff',
              highlight: '#ffc53d',
              hover: '#ffc53d',
              select: '#ffc53d'
            }
          }
        ]
      };
    },
    methods: {
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center
        };
      },
      layout($, go) {
        return $(go.GridLayout, {});
      },
      nodeTemplate($, go) {
        return nodeTmpl($, go, {
          props: {
            shape: 'icon',
            size: 80,
            icon: {
              font: '30px "element-icons"',
              text: '\uE6A4'
            },
            iconColor: {
              normal: '#f5222d',
              highlight: '#096dd9',
              hover: '#096dd9',
              select: '#096dd9'
            }
          }
        });
      },
      diagramReady(diagram, $, go) {}
    }
  };
</script>
```

:::

## image

| 参数        | 说明                         | 类型   | 可选值 | 默认值    |
| ----------- | ---------------------------- | ------ | ------ | --------- |
| image       | 图片地址                     | String | -      | undefined |
| brokenImage | 加载失败时默认显示的图片地址 | String | -      | undefined |

:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :type="model"
      :node-template="nodeTemplate"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="150px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl } from 'xdh-go';
  let imgPath = '/xdh-go/';
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          {
            label: '正常图片',
            image: imgPath + 'img/node/circleimage/1.png'
          },
          {
            label: '加载失败时',
            image: imgPath + 'img/node/circleimage/b.png',
            brokenImage: imgPath + 'img/node/circleimage/4.png'
          },
          {
            label: '图片错误',
            image: imgPath + 'img/node/circleimage/a.png'
          }
        ]
      };
    },
    methods: {
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center
        };
      },
      layout($, go) {
        return $(go.GridLayout, {});
      },
      nodeTemplate($, go) {
        return nodeTmpl($, go, {
          props: {
            shape: 'image',
            size: 80,
            stateShape: 'Rectangle'
          }
        });
      },
      diagramReady(diagram, $, go) {}
    }
  };
</script>
```

:::

## clipImage

| 参数        | 说明                                     | 类型        | 可选值                                      | 默认值    |
| ----------- | ---------------------------------------- | ----------- | ------------------------------------------- | --------- |
| image       | 图片地址                                 | String      | -                                           | undefined |
| brokenImage | 加载失败时默认显示的图片地址             | String      | -                                           | undefined |
| clipShape   | 图片的裁剪外框,shape 为'clipImage'时有效 | String/null | go.Shape 预置图形类型，如果传 null 则不裁剪 | 'Circle'  |

:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :type="model"
      :node-template="nodeTemplate"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="200px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl } from 'xdh-go';
  let imgPath = '/xdh-go/';
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          {
            label: 'TriangleRight',
            clipShape: 'TriangleRight',
            stateShape: 'TriangleRight',
            image: imgPath + 'img/node/circleimage/3.png'
          },
          {
            label: 'TriangleDown',
            stateShape: 'TriangleDown',
            clipShape: 'TriangleDown',
            image: imgPath + 'img/node/circleimage/1.png'
          },
          {
            label: [
              { text: 'Diamond' },
              { text: 'stateShape为RoundedRectangle' }
            ],
            stateShape: 'RoundedRectangle',
            clipShape: 'Diamond',
            background: 'transparent',
            image: imgPath + 'img/node/circleimage/2.png'
          },
          {
            label: '不裁剪',
            stateShape: null,
            clipShape: null,
            image: imgPath + 'img/node/circleimage/2.png'
          }
        ]
      };
    },
    methods: {
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center
        };
      },
      layout($, go) {
        return $(go.GridLayout, {});
      },
      nodeTemplate($, go) {
        return nodeTmpl($, go, {
          props: {
            shape: 'clipImage',
            size: 80
          }
        });
      },
      diagramReady(diagram, $, go) {}
    }
  };
</script>
```

:::

## shape

当设置 shape 为除'icon' 'image' 'clipImage' 外的字符串时，显示 字符串名称对应的几何形状，通过 go.Shape 对象显示。需要注意的是，该名称必须是 gojs 预定义的几何形状名称或者自定义的几何名称。gojs2.0 之后为减小框架的体积，删减了大部分的预定义几何形状，须另外引入，详情请看 gojs 文档【[Figure.js](/xdh-go/gojs/extensions/Figures.js)】。 下面例子中给出了自定义图形的定义方法。

:::demo

```html
<template>
  <div>
    <xdh-go
      :go-register="goRegister"
      :nodes="nodes"
      :type="model"
      :node-template="nodeTemplate"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="350px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl } from 'xdh-go';
  function definedShape1(go) {
    go.Shape.defineFigureGenerator('RoundedBottomRectangle', function(
      shape,
      w,
      h
    ) {
      var p1 = 5;
      if (shape !== null) {
        var param1 = shape.parameter1;
        if (!isNaN(param1) && param1 >= 0) p1 = param1;
      }
      p1 = Math.min(p1, w / 2);
      p1 = Math.min(p1, h / 2);
      var geo = new go.Geometry();
      geo.add(
        new go.PathFigure(0, 0)
          .add(new go.PathSegment(go.PathSegment.Line, w, 0))
          .add(new go.PathSegment(go.PathSegment.Line, w, h - p1))
          .add(
            new go.PathSegment(
              go.PathSegment.Arc,
              0,
              90,
              w - p1,
              h - p1,
              p1,
              p1
            )
          )
          .add(new go.PathSegment(go.PathSegment.Line, p1, h))
          .add(
            new go.PathSegment(
              go.PathSegment.Arc,
              90,
              90,
              p1,
              h - p1,
              p1,
              p1
            ).close()
          )
      );
      geo.spot1 = new go.Spot(0, 0, 0.3 * p1, 0);
      geo.spot2 = new go.Spot(1, 1, -0.3 * p1, -0.3 * p1);
      return geo;
    });
  }
  function definedShape2(go) {
    go.Shape.defineFigureGenerator('Pie', function(shape, w, h) {
      var param1 = shape ? shape.parameter1 : NaN;
      var param2 = shape ? shape.parameter2 : NaN;
      if (isNaN(param1)) param1 = 0; // default values PARAMETER 1 is for Start Angle
      if (isNaN(param2)) param2 = 315; // default values PARAMETER 2 is for Sweep Angle

      var start = param1 % 360;
      if (start < 0) start += 360;
      var sweep = param2 % 360;
      var rad = Math.min(w, h) / 2;

      return new go.Geometry().add(
        new go.PathFigure(rad, rad) // start point
          .add(
            new go.PathSegment(
              go.PathSegment.Arc,
              start,
              sweep, // angles
              rad,
              rad, // center
              rad,
              rad
            ) // radius
              .close()
          )
      );
    });
  }
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          {
            label: '默认跟随模板'
          },
          {
            label: '没有状态圈',
            stateShape: null
          },
          {
            label: 'TriangleDown',
            shape: 'TriangleDown'
          },
          {
            label: 'Circle',
            shape: 'Circle'
          },
          {
            label: 'Ellipse',
            shape: 'Ellipse',
            size: [80, 40] // 通过宽高来限定椭圆的形状
          },
          {
            label: 'TriangleRight',
            shape: 'TriangleRight'
          },
          {
            label: '自定义形状',
            shape: 'RoundedBottomRectangle',
            shapeParams: {
              figureShape: {
                parameter1: 50
              }
            }
          },
          {
            label: '自定义图形二',
            shape: 'Pie',
            shapeParams: {
              figureShape: {
                parameter1: 90,
                parameter2: 270
              }
            }
          },
          {
            label: '自定义图形三',
            shape: '',
            shapeParams: {
              figureShape: {
                geometryString: 'F M120 0 L80 80 0 50z'
              }
            }
          }
        ]
      };
    },
    methods: {
      goRegister($, go) {
        definedShape1(go);
        definedShape2(go);
      },
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center
        };
      },
      layout($, go) {
        return $(go.GridLayout, {});
      },
      nodeTemplate($, go) {
        return nodeTmpl($, go, {
          props: {
            shape: 'RoundedRectangle',
            size: 80,
            stateShape: null
          }
        });
      },
      diagramReady(diagram, $, go) {}
    }
  };
</script>
```

:::

## 状态框图形的处理

:::demo

```html
<template>
  <div>
    <xdh-go
      :nodes="nodes"
      :type="model"
      :node-template="nodeTemplate"
      :config="config"
      :layout="layout"
      ref="diagram"
      height="150px"
      @on-ready="diagramReady"
    ></xdh-go>
  </div>
</template>
<script>
  import { XdhGo, nodeTmpl } from 'xdh-go';
  export default {
    components: {
      XdhGo
    },
    data() {
      return {
        model: 'GraphLinksModel',
        nodes: [
          {
            label: 'background',
            background: {
              normal: '#fadb14',
              select: '#69c0ff',
              hover: '#69c0ff',
              highlight: '#69c0ff'
            }
          },
          {
            label: 'strokeColor',
            strokeColor: {
              normal: '#fadb14',
              select: '#69c0ff',
              hover: '#69c0ff',
              highlight: '#69c0ff'
            }
          },
          {
            label: 'strokeWidth',
            strokeWidth: {
              normal: 2,
              select: 5,
              hover: 5,
              highlight: 5
            }
          },
          {
            label: '没有状态框',
            stateShape: null
          },
          {
            label: 'Rectangle状态框',
            stateShape: 'Rectangle'
          }
        ]
      };
    },
    methods: {
      config($, go) {
        return {
          initialContentAlignment: go.Spot.Center
        };
      },
      layout($, go) {
        return $(go.GridLayout, {});
      },
      nodeTemplate($, go) {
        return nodeTmpl($, go, {
          props: {
            shape: 'icon',
            size: 80,
            icon: {
              font: '30px "element-icons"',
              text: '\uE6A4'
            },
            iconColor: {
              normal: '#f5222d',
              highlight: '#096dd9',
              hover: '#096dd9',
              select: '#096dd9'
            }
          }
        });
      },
      diagramReady(diagram, $, go) {}
    }
  };
</script>
```

:::
