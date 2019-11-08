function add() {
  return M(
    p.default.Node,
    'Vertical',
    { isLayoutPositioned: !0, cursor: 'pointer' },
    M(
      p.default.Panel,
      'Spot',
      M(
        p.default.Shape,
        {
          width: 115,
          height: 115,
          strokeWidth: 10,
          fill: 'transparent',
          stroke: 'rgba(18,82,169,1)',
          strokeCap: 'round',
          strokeJoin: 'round',
          opacity: 0.4
        },
        new p.default.Binding('visible', 'flags', function(e) {
          return !!s.default.size(e);
        }),
        new p.default.Binding('geometry', '', function(e, t) {
          var n = t.width / 2,
            i = new p.default.Point(n, 0).rotate(33);
          return new p.default.Geometry()
            .add(
              new p.default.PathFigure(n + i.x, n + i.y).add(
                new p.default.PathSegment(
                  p.default.PathSegment.Arc,
                  33,
                  -245,
                  n,
                  n,
                  n,
                  n
                )
              )
            )
            .add(new p.default.PathFigure(0, 0))
            .add(new p.default.PathFigure(2 * n, 2 * n));
        }),
        new p.default.Binding('stroke', '', function(e, t) {
          var n = new p.default.Brush(p.default.Brush.Solid),
            i = (e.flags = Array.isArray(e.flags)
              ? e.flags
              : s.default.map(String(e.flags || '').split(''), function(e) {
                  return { text: e };
                }));
          return (
            i.length > 9 && (i = s.default.rest(i, 9)),
            s.default.each(i, function(e, t) {
              n.addColorStop(t / i.length, e.fill || 'rgba(18,82,169,1)'),
                t === i.length - 1 &&
                  n.addColorStop(1, e.fill || 'rgba(18,82,169,1)');
            }),
            n
          );
        })
      ),
      M(
        p.default.Panel,
        p.default.Panel.Position,
        {
          name: 'flags',
          defaultAlignment: p.default.Spot.Center,
          width: 140,
          height: 140,
          itemTemplate: M(
            p.default.Panel,
            p.default.Panel.Auto,
            {
              width: 25,
              height: 25,
              position: new p.default.Point(0, 0),
              mouseEnter: function(e, t) {
                if (t.data) {
                  var n = t.findObject('FLAG_CIRCLE');
                  n &&
                    (n.fill =
                      t.data.hover || t.data.fill || 'rgba(18,82,169,1)');
                  var i = t.findObject('FLAG_TEXTBLOCK');
                  i && (i.text = parseInt(t.data.value) || 0 || t.data.text);
                }
              },
              mouseLeave: function(e, t) {
                if (t.data) {
                  var n = t.findObject('FLAG_CIRCLE');
                  n &&
                    (n.fill =
                      t.data.fill || t.data.hover || 'rgba(18,82,169,.5)');
                  var i = t.findObject('FLAG_TEXTBLOCK');
                  i && (i.text = t.data.text || parseInt(t.data.value) || 0);
                }
              },
              click: t.flagClick,
              doubleClick: t.flagClick2
            },
            new p.default.Binding('position', 'itemIndex', function(e, t) {
              var n = t.part;
              if (!n || e !== e) return new p.default.Point(0, 0);
              var i = n.findObject('flags'),
                o = i.itemArray || [],
                a = s.default.size(o || []),
                r = e + 1,
                l = a;
              l % 2 == 0 && (l += 1);
              var u = r - l / 2;
              a % 2 != 0 && (u = Math.floor(u));
              var d = (i.width - t.width) / 2,
                f = { x: d, y: d },
                c = 360 / Math.max(a, 12),
                h = ((2 * Math.PI) / 360) * (c * u);
              return new p.default.Point(
                f.x + Math.sin(h) * d,
                f.y - Math.cos(h) * d
              );
            }).ofObject(),
            M(
              p.default.Shape,
              'Circle',
              {
                name: 'FLAG_CIRCLE',
                strokeWidth: 1,
                fill: 'rgba(18,82,169,.5)',
                stroke: '#1252a9'
              },
              new p.default.Binding('fill', 'fill'),
              new p.default.Binding('stroke', 'stroke')
            ),
            M(
              p.default.TextBlock,
              {
                name: 'FLAG_TEXTBLOCK',
                margin: new p.default.Margin(0, 0, 0, 0),
                alignment: p.default.Spot.Center,
                textAlign: 'center',
                stroke: e.tagStyle.color,
                maxLines: 1,
                overflow: p.default.TextBlock.OverflowEllipsis,
                wrap: p.default.TextBlock.WrapDesiredSize,
                font: 'normal 10px 微软雅黑'
              },
              new p.default.Binding('text', 'text'),
              new p.default.Binding('stroke', 'color')
            )
          )
        },
        new p.default.Binding('itemArray', 'flags', function(e) {
          e = H(e);
          var t = e;
          if (e.length > 9) {
            var n = s.default.rest(e, 8),
              i = s.default.first(n);
            t = [].concat(a(s.default.first(e, 8)), [
              {
                text: '...',
                color: i.color,
                fill: i.fill,
                items: n,
                value: s.default.reduce(
                  n,
                  function(e, t) {
                    return Number(t.value || 0) + e;
                  },
                  0
                )
              }
            ]);
          }
          return t;
        })
      ),
      M(
        p.default.Panel,
        'Spot',
        M(
          p.default.Shape,
          e.isCircle ? 'Circle' : 'RoundedRectangle',
          {
            strokeWidth: 0,
            stroke: 'transparent',
            width: 88,
            height: 88,
            fill: 'transparent'
          },
          new p.default.Binding('fill', 'outside', function(e) {
            return e || 'transparent';
          })
        ),
        M(
          p.default.Shape,
          e.isCircle ? 'Circle' : 'RoundedRectangle',
          {
            strokeWidth: 2,
            stroke: 'transparent',
            width: 85,
            height: 85,
            fill: 'transparent'
          },
          new p.default.Binding('stroke', 'isSelected', function(t) {
            return t ? e.selectColor : null;
          }).ofObject(),
          new p.default.Binding('stroke', 'isHighlighted', function(t, n) {
            var i = n.part;
            return t ? e.highlight : i.isSelected ? e.selectColor : null;
          }).ofObject()
        ),
        M(
          p.default.Shape,
          e.isCircle ? 'Circle' : 'RoundedRectangle',
          {
            strokeWidth: 3,
            stroke: 'transparent',
            width: 78,
            height: 78,
            fill: 'transparent'
          },
          new p.default.Binding('stroke', 'mark')
        ),
        M(
          p.default.Shape,
          e.isCircle ? 'Circle' : 'RoundedRectangle',
          {
            strokeWidth: 1,
            stroke: 'red',
            width: 73,
            height: 73,
            fill: 'transparent'
          },
          new p.default.Binding('fill', 'fill'),
          new p.default.Binding('stroke', 'stroke')
        ),
        M(
          p.default.Panel,
          'Spot',
          { isClipping: !0 },
          M(p.default.Shape, e.isCircle ? 'Circle' : 'RoundedRectangle', {
            width: 72,
            height: 72,
            isPanelMain: !0
          }),
          M(
            p.default.Picture,
            {
              width: 72,
              height: 72,
              isPanelMain: !0,
              errorFunction: function(e) {
                var t = e.part.data || {},
                  n = s.default.trim(t.error);
                n && e.source !== n
                  ? n && 'string' == typeof n && (e.source = n)
                  : (e.source = K({
                      text: t.name,
                      fsize: 25
                    }));
              },
              toolTip: M(
                p.default.Adornment,
                'Auto',
                new p.default.Binding('visible', 'flags', function(e) {
                  return !!s.default.size(e);
                }),
                M(p.default.Shape, {
                  fill: e.tipStyle.fill,
                  stroke: e.tipStyle.stroke
                }),
                M(
                  p.default.TextBlock,
                  {
                    stroke: e.tipStyle.color,
                    margin: e.tipStyle.margin,
                    width: e.tipStyle.width,
                    alignment: p.default.Spot.Bottom,
                    wrap: p.default.TextBlock.WrapFit,
                    isMultiline: !0,
                    font: e.tagStyle.font
                  },
                  new p.default.Binding('text', 'flags', function(e) {
                    return s.default
                      .reduce(
                        H(e),
                        function(e, t) {
                          return e.push(t.text + ': ' + (t.value || 0)), e;
                        },
                        []
                      )
                      .join(', ');
                  })
                )
              )
            },
            new p.default.Binding('source', '', function(e) {
              var t = e.image,
                n = e.error,
                i = e.imgwords;
              return s.default.trim(t || n) || K({ text: i || '?' });
            })
          )
        )
      ),
      M(
        p.default.Panel,
        'Spot',
        {
          alignment: new p.default.Spot(0.5, 0.94, 0, 0)
        },
        new p.default.Binding('visible', 'tags', function(e) {
          return !!V(e).value;
        }),
        M(
          p.default.Shape,
          'RoundedRectangle',
          {
            stroke: e.tagStyle.stroke,
            fill: e.tagStyle.fill,
            strokeWidth: e.tagStyle.strokeWidth || 1,
            height: 20
          },
          new p.default.Binding('stroke', 'tags', function(t) {
            return V(t).stroke || e.tagStyle.stroke;
          }),
          new p.default.Binding('fill', 'tags', function(t) {
            return V(t).fill || e.tagStyle.fill;
          })
        ),
        M(
          p.default.TextBlock,
          {
            alignment: new p.default.Spot(0.5, 0.55, 0, 0),
            textAlign: 'center',
            stroke: e.tagStyle.color,
            maxLines: 1,
            overflow: p.default.TextBlock.OverflowEllipsis,
            wrap: p.default.TextBlock.WrapFit,
            width: 90,
            toolTip: M(
              p.default.Adornment,
              'Auto',
              new p.default.Binding('visible', 'tags', function(t) {
                return !!e.tagStyle.show && !!V(t).value;
              }),
              M(p.default.Shape, {
                fill: e.tipStyle.fill,
                stroke: e.tipStyle.stroke
              }),
              M(
                p.default.TextBlock,
                {
                  stroke: e.tipStyle.color,
                  margin: e.tipStyle.margin,
                  width: e.tipStyle.width,
                  alignment: p.default.Spot.Bottom,
                  wrap: p.default.TextBlock.WrapFit,
                  isMultiline: !0,
                  font: e.tagStyle.font
                },
                new p.default.Binding('text', 'tags', function(t) {
                  return (e.tagStyle.label || '') + (V(t).value || '');
                })
              )
            )
          },
          new p.default.Binding('text', 'tags', function(e) {
            return V(e).value;
          }),
          new p.default.Binding('stroke', 'tagColor', function(t) {
            return V(t).stroke || e.tagStyle.color;
          })
        )
      )
    ),
    M(
      p.default.Panel,
      'Auto',
      {
        defaultAlignment: p.default.Spot.TopCenter,
        width: e.width,
        height: 40,
        margin: new p.default.Margin(-2, 0, 0, 0)
      },
      M(p.default.Shape, 'Rectangle', {
        stroke: null,
        fill: null
      }),
      M(
        p.default.TextBlock,
        {
          margin: new p.default.Margin(3, 0, 0, 0),
          width: e.width,
          wrap: p.default.TextBlock.WrapFit,
          isMultiline: !0,
          font: e.font,
          toolTip: M(
            p.default.Adornment,
            'Auto',
            new p.default.Binding('visible', 'tips', function(e) {
              return !!e;
            }),
            M(p.default.Shape, {
              fill: e.tipStyle.fill,
              stroke: e.tipStyle.stroke
            }),
            M(
              p.default.TextBlock,
              {
                stroke: e.tipStyle.color,
                margin: e.tipStyle.margin,
                width: e.tipStyle.width,
                alignment: p.default.Spot.Bottom,
                wrap: p.default.TextBlock.WrapFit,
                isMultiline: !0,
                font: e.tipStyle.font
              },
              new p.default.Binding('text', 'tips')
            )
          )
        },
        new p.default.Binding('text', 'name', function(t) {
          return e.maxlength > 0 && t.length > e.maxlength
            ? t.substr(0, e.maxlength) + '...'
            : t;
        }),
        new p.default.Binding('stroke', 'color')
      )
    )
  );
}
