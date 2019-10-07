# 几何图形(shape)

当设置 shape 为除'icon' 'image' 'clipImage' 外的字符串时，显示 字符串名称对应的几何形状，通过 go.Shape 对象显示。需要注意的是，该名称必须是 gojs 预定义的几何形状名称或者自定义的几何名称。gojs2.0 之后为减小框架的体积，删减了大部分的预定义几何形状，须另外引入，详情请看 gojs 文档

## 基本用法

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
            stateShape: null,
            background: {
              normal: 'blue',
              highlight: '#0000aa',
              hover: '#cc0000',
              select: '#ffee00'
            },
            labelStroke: '#000',
            labelColor: '#000'
          }
        });
      },
      diagramReady(diagram, $, go) {}
    }
  };
</script>
```

:::

## 其它通用特性

参考图片类型的通用特性部分
