# 补充说明

## 属性值类型

keyFrame 所传的数组需根据 propType 的类型传值,举例：

> number: 如[0, 1]

> spot: 如 [[0.5, 0.5], [0.6, 0.6]]

> point: 如 [[100, 200], [150, 250]]

> size: 如 [[50, 50], [60, 60]]

> margin: 如 [[10, 10, 10, 10], [20, 20, 20, 20]]

> rect: 如 [[20, 20, 20, 20], [40, 40, 40, 40]]

> array: 如 [[8, 4, 8, 4], [6, 3, 6, 3]]

> rgba: 如 [[255,255,255,0.8], [158, 158, 158, 0.8]]

## 常用参数与类型

```
{
    "alignment":"spot",
    "alignmentFocus":"spot",
    "fromSpot":"spot",
    "toSpot":"spot",
    "verticalAlignment":"spot",
    "imageAlignment":"spot",
    "locationSpot":"spot",
    "rotationSpot":"spot",
    "angle":"number",
    "fromShortLength":"number",
    "height":"number",
    "opacity":"number",
    "scale":"number",
    "segmentFraction":"number",
    "toEndSegmentLength":"number",
    "toShortLength":"number",
    "width":"number",
    "shadowBlur":"number",
    "corner":"number",
    "curviness":"number",
    "smoothness":"number",
    "desiredSize":"size",
    "maxSize":"size",
    "minSize":"size",
    "margin":"margin",
    "padding":"margin",
    "avoidableMargin":"margin",
    "sourceRect":"rect",
    "position":"point",
    "segmentOffset":"point",
    "location":"point",
    "maxLocation":"point",
    "minLocation":"point",
    "shadowOffset":"point",
    "areaBackground":"rgba",
    "background":"rgba",
    "fill":"rgba",
    "stroke":"rgba",
    "shadowColor":"rgba"
    }
```

## 动效函数

动画函数包括：
ease,
easeInQuad,
easeOutQuad,
easeInOutQuad,
easeInCubic,
easeOutCubic,
easeInOutCubic,
easeInQuart,
easeOutQuart,
easeInOutQuart,
easeInQuint,
easeOutQuint,
easeInOutQuint,
easeInSine,
easeOutSine,
easeInOutSine,
easeInExpo,
easeOutExpo,
easeInOutExpo,
easeInCirc,
easeOutCirc,
easeInOutCirc,
easeInElastic,
easeOutElastic,
easeInOutElastic,
easeInBack,
easeOutBack,
easeInOutBack,
easeInBounce,
easeOutBounce,
easeInOutBounce
