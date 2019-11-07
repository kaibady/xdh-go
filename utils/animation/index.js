// 动画每秒60帧
const UPDATE_TIME = 1000 / 60;

const pow = Math.pow;
const sqrt = Math.sqrt;
const sin = Math.sin;
const cos = Math.cos;
const PI = Math.PI;
const c1 = 1.70158;
const c2 = c1 * 1.525;
const c3 = c1 + 1;
const c4 = (2 * PI) / 3;
const c5 = (2 * PI) / 4.5;

// 动画执行函数
const rAF =
  window.requestAnimationFrame ||
  function(cb) {
    setTimeout(cb, UPDATE_TIME);
  };

/**
 * 缓动动画函数
 * @param {number} startValue 开始时的值
 * @param {number} endValue 结束时的值
 * @param {number} during 动画持续时间，单位：毫秒
 * @param {Function} easingFunc 缓动算法函数
 * @param {function} stepCb 每次改变的回调函数
 * @returns {Promise} Promise实例
 *
 * @example
 *
 *  import tween, {easeInCubic} from '@/utils/tween'
 *  tween(0, 100, 300, easeInCubic, function(val){
 *      console.log(val)
 *      // to do something
 *  })
 */
let animationPool = {};
let relateObjectState = {};
let animationQueue = {};
const propMap = {
  spot: [
    'alignment',
    'alignmentFocus',
    'fromSpot',
    'toSpot',
    'verticalAlignment',
    'imageAlignment',
    'locationSpot',
    'rotationSpot'
  ],
  number: [
    'angle',
    'fromShortLength',
    'height',
    'opacity',
    'scale',
    'segmentFraction',
    'toEndSegmentLength',
    'toShortLength',
    'width',
    'shadowBlur',
    'corner',
    'curviness',
    'smoothness'
  ],
  size: ['desiredSize', 'maxSize', 'minSize'],
  margin: ['margin', 'padding', 'avoidableMargin'],
  rect: ['sourceRect'],
  point: [
    'position',
    'segmentOffset',
    'location',
    'maxLocation',
    'minLocation',
    'shadowOffset'
  ],
  rgba: ['areaBackground', 'background', 'fill', 'stroke', 'shadowColor']
};
const propMapReverse = (function() {
  let map = {};
  for (let name in propMap) {
    propMap[name].forEach(r => {
      map[r] = name;
    });
  }
  return map;
})();
function handleKeyFrame(keyType, obj, config, propType) {
  let keyFrame;
  let param = obj[config.prop];
  if (keyType === 'relative') {
    switch (propType) {
      case 'number':
        keyFrame = [param + config.keyFrame[0], param + config.keyFrame[1]];
        break;
      case 'spot':
        keyFrame = [
          [
            param.x + config.keyFrame[0][0],
            param.y + config.keyFrame[0][1],
            param.offsetX + config.keyFrame[0][2] || 0,
            param.offsetY + config.keyFrame[0][3] || 0
          ],
          [
            param.x + config.keyFrame[1][0],
            param.y + config.keyFrame[1][1],
            param.offsetX + config.keyFrame[1][2] || 0,
            param.offsetY + config.keyFrame[1][3] || 0
          ]
        ];
        break;
      case 'point':
        keyFrame = [
          [param.x + config.keyFrame[0][0], param.y + config.keyFrame[0][1]],
          [param.x + config.keyFrame[1][0], param.y + config.keyFrame[1][1]]
        ];
        break;
      case 'size':
        keyFrame = [
          [
            param.width + config.keyFrame[0][0],
            param.height + config.keyFrame[0][1]
          ],
          [
            param.width + config.keyFrame[1][0],
            param.height + config.keyFrame[1][1]
          ]
        ];
        break;
      case 'margin':
        keyFrame = [
          [
            param.top + config.keyFrame[0][0],
            param.right + config.keyFrame[0][1],
            param.bottom + config.keyFrame[0][2],
            param.left + config.keyFrame[0][3]
          ],
          [
            param.top + config.keyFrame[1][0],
            param.right + config.keyFrame[1][1],
            param.bottom + config.keyFrame[1][2],
            param.left + config.keyFrame[1][3]
          ]
        ];
        break;
      case 'rect':
        keyFrame = [
          [
            param.x + config.keyFrame[0][0],
            param.y + config.keyFrame[0][1],
            param.width + config.keyFrame[0][2],
            param.height + config.keyFrame[0][3]
          ],
          [
            param.x + config.keyFrame[1][0],
            param.y + config.keyFrame[1][1],
            param.width + config.keyFrame[1][2],
            param.height + config.keyFrame[1][3]
          ]
        ];
        break;
    }
  } else {
    keyFrame = config.keyFrame;
  }
  return keyFrame;
}
function getPropObj(go, state, propType) {
  switch (propType) {
    case 'number':
      return state;
    case 'spot':
      return new go.Spot(...state);
    case 'point':
      return new go.Point(...state);
    case 'size':
      return new go.Size(...state);
    case 'margin':
      return new go.Margin(...state);
    case 'rect':
      return new go.Rect(...state);
    case 'rgba':
      return `rgba(${Math.floor(state[0])},${Math.floor(state[1])},${Math.floor(
        state[2]
      )},${state[3]})`;
  }
}
export default function handleAnimation(e, n, event, _options, go) {
  let node = n.part;
  if (node) {
    let animation = node.data.animation || _options.props.animation;
    if (!animation || !(animation instanceof Array)) {
      return;
    }
    let oldIsOngoing, diagram, oldskips;
    let existEvent = animation.some(r => r.trigger === event);
    // 如果与当前事件无关，则返回
    if (existEvent) {
      diagram = node.diagram;
      oldskips = diagram.skipsUndoManager;
      diagram.skipsUndoManager = true;
      animationPool = {};
      relateObjectState = {};
      animationQueue = {};
      oldIsOngoing = node.diagram.layout.isOnging;
    } else {
      return;
    }
    animation.forEach(con => {
      if (con.trigger === event) {
        let obj = node.findObject(con.objectName || 'tNode');
        obj.isAnimated = false;
        let propType = con.propType || propMapReverse[con.prop];
        let keyFrame = handleKeyFrame(con.keyType, obj, con, propType);
        node.diagram.layout.isOngoing = false;
        tween({
          keyFrame: keyFrame,
          easingFunc: con.easingFunc || ['easeInQuad'],
          duration: con.duration || 300,
          propType: propType || 'number',
          delay: con.delay || 0,
          direction: con.direction || 'normal',
          prevName: con.prevName || '',
          name: con.name || '',
          repeatCount: con.repeatCount || 1,
          relateObjectId: obj.__gohashid, // 相关节点的__gohashid
          stepCb(state) {
            let _state = getPropObj(go, state, propType);
            obj[con.prop] = _state;
          },
          finishCb() {
            obj.isAnimated = true;
            node.diagram.layout.isOngoing = oldIsOngoing;
          }
        });
      }
      diagram.skipsUndoManager = oldskips;
    });
  }
}
export function tween(options = {}) {
  let _options = Object.assign(
    {
      keyFrame: [0, 1],
      easingFunc: ['easeInQuad'],
      duration: 300,
      relateObjectId: '',
      stepCallback: () => {},
      finishCallback: () => {}
    },
    options
  );
  // console.log(_options);
  let startValue = _options.keyFrame[0];
  let endValue = _options.keyFrame[1];
  if (
    _options.relateObjectId &&
    relateObjectState[_options.relateObjectId] !== undefined &&
    relateObjectState[_options.relateObjectId].trigger !== _options.trigger
  ) {
    startValue = relateObjectState[_options.relateObjectId].state;
    clearAnimation(relateObjectState[_options.relateObjectId].animationId);
  }
  // 改变的值大小
  let changeValue;
  let repeatCount = 0;
  // 值的类型为数字和数组分开处理
  if (startValue instanceof Array) {
    changeValue = [];
    startValue.forEach((v, idx) => {
      changeValue.push(endValue[idx] - v);
    });
  } else {
    changeValue = endValue - startValue;
  }
  // 指定时间内更新的次数
  const updateCount = options.duration / UPDATE_TIME;
  // 每次更新的值距离
  const perUpdateDistance = 1 / updateCount;
  let position = 0;
  let animationId = `${new Date().getTime()}${Math.floor(
    Math.random() * 100000
  )}`;
  animationPool[animationId] = function() {
    let state;
    if (changeValue instanceof Array) {
      state = [];
      startValue.forEach((v, idx) => {
        if (typeof _options.easingFunc[idx] === 'function') {
          state.push(v + changeValue[idx] * _options.easingFunc[idx](position));
        } else {
          state.push(
            v +
              changeValue[idx] *
                animateFun[_options.easingFunc[idx] || 'easeInQuad'](position)
          );
        }
      });
    } else {
      let easingFunc = _options.easingFunc
        ? animateFun[_options.easingFunc[0]]
        : 'easeInQuad';
      state = startValue + changeValue * easingFunc(position);
    }
    if (_options.relateObjectId) {
      relateObjectState[_options.relateObjectId] = {
        trigger: _options.trigger,
        state,
        animationId,
        prevName: _options.prevName, // 上一动画名称
        name: _options.name // 动画名称
      };
    }
    _options.stepCb(state);
    position += perUpdateDistance;
    if (position < 1 && animationPool[animationId]) {
      rAF(animationPool[animationId]);
    } else {
      rAF(() => {
        _options.stepCb(endValue);
        repeatCount++;
        if (_options.repeatCount > repeatCount) {
          position = 0;
          let startTemp =
              startValue instanceof Array ? [...startValue] : startValue,
            endTemp = endValue instanceof Array ? [...endValue] : endValue;
          startValue = _options.direction === 'alternate' ? endTemp : startTemp;
          endValue = _options.direction === 'alternate' ? startTemp : endTemp;
          if (startValue instanceof Array) {
            let _change = [];
            startValue.forEach((v, idx) => {
              _change.push(endValue[idx] - startValue[idx]);
            });
            changeValue = _change;
          } else {
            changeValue = endValue - startValue;
          }
          if (animationPool[animationId]) {
            animationPool[animationId]();
          }
        } else {
          if (_options.name) {
            // 如果有动画名称，看看有没有后续动画继续执行
            if (animationQueue[_options.trigger]) {
              if (animationQueue[_options.trigger].length === 0) {
                delete animationQueue[_options.trigger];
              } else {
                let currentAnimate = animationQueue[_options.trigger].shift();
                if (
                  currentAnimate.delay &&
                  currentAnimate.trigger === _options.trigger
                ) {
                  setTimeout(() => {
                    currentAnimate.animation();
                  }, currentAnimate.delay);
                } else {
                  currentAnimate.animation();
                }
              }
            }
          } else {
            _options.finishCb();
          }
          if (_options.relateObjectId) {
            delete relateObjectState[_options.relateObjectId];
          }
          delete animationPool[animationId];
        }
      });
    }
  };
  // 动画延时执行
  if (_options.prevName) {
    pushAnimationQueue(_options, animationPool[animationId]);
  } else {
    if (_options.delay) {
      setTimeout(() => {
        if (animationPool[animationId]) {
          animationPool[animationId]();
        }
      }, _options.delay);
    } else {
      if (animationPool[animationId]) {
        animationPool[animationId]();
      }
    }
  }
  return animationId;
}
function pushAnimationQueue(_options, animation) {
  // 如果没有这个队列，建立队列
  let animateObj = {
    name: _options.name,
    prevName: _options.prevName,
    trigger: _options.trigger,
    delay: _options.delay || 0,
    animation
  };
  if (!animationQueue[_options.trigger]) {
    animationQueue[_options.trigger] = [];
    animationQueue[_options.trigger].push(animateObj);
  } else {
    // 如果已经有了，插入到相关动画位置
    let animate = animationQueue[_options.trigger].find(a => {
      return a.name === _options.prevName;
    });
    let index = animationQueue[_options.trigger].indexOf(animate);

    if (index >= 0) {
      animationQueue[_options.trigger].splice(index, 0, animateObj);
    } else {
      animationQueue[_options.trigger].push(animateObj);
    }
  }
}
export function clearAnimation(animationId) {
  delete animationPool[animationId];
}

/**
 * easeInQuad
 * @param {number} x
 * @returns {number}
 */
export function ease(x) {
  return x;
}

/**
 * easeInQuad
 * @param {number} x
 * @returns {number}
 */
export function easeInQuad(x) {
  return x * x;
}

/**
 * easeOutQuad
 * @param {number} x
 * @returns {number}
 */
export function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}

/**
 * easeInOutQuad
 * @param x
 * @returns {number}
 */
export function easeInOutQuad(x) {
  return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
}

/**
 * easeInCubic
 * @param x
 * @returns {number}
 */
export function easeInCubic(x) {
  return x * x * x;
}

/**
 * easeOutCubic
 * @param x
 * @returns {number}
 */
export function easeOutCubic(x) {
  return 1 - pow(1 - x, 3);
}

/**
 * easeInOutCubic
 * @param x
 * @returns {number}
 */
export function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
}

/**
 * easeInQuart
 * @param x
 * @returns {number}
 */
export function easeInQuart(x) {
  return x * x * x * x;
}

/**
 * easeInQuart
 * @param x
 * @returns {number}
 */
export function easeOutQuart(x) {
  return 1 - pow(1 - x, 4);
}

/**
 * easeInOutQuart
 * @param x
 * @returns {number}
 */
export function easeInOutQuart(x) {
  return x < 0.5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2;
}

/**
 * easeInQuint
 * @param x
 * @returns {number}
 */
export function easeInQuint(x) {
  return x * x * x * x * x;
}

/**
 * easeOutQuint
 * @param x
 * @returns {number}
 */
export function easeOutQuint(x) {
  return 1 - pow(1 - x, 5);
}

/**
 * easeInOutQuint
 * @param x
 * @returns {number}
 */
export function easeInOutQuint(x) {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
}

/**
 * easeInSine
 * @param x
 * @returns {number}
 */
export function easeInSine(x) {
  return 1 - cos((x * PI) / 2);
}

/**
 * easeOutSine
 * @param x
 * @returns {number}
 */
export function easeOutSine(x) {
  return sin((x * PI) / 2);
}

/**
 * easeInOutSine
 * @param x
 * @returns {number}
 */
export function easeInOutSine(x) {
  return -(cos(PI * x) - 1) / 2;
}

/**
 * easeInExpo
 * @param x
 * @returns {number}
 */
export function easeInExpo(x) {
  return x === 0 ? 0 : pow(2, 10 * x - 10);
}

/**
 * easeOutExpo
 * @param x
 * @returns {number}
 */
export function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - pow(2, -10 * x);
}

export function easeInOutExpo(x) {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? pow(2, 20 * x - 10) / 2
    : (2 - pow(2, -20 * x + 10)) / 2;
}

/**
 * easeInOutExpo
 * @param x
 * @returns {number}
 */
export function easeInCirc(x) {
  return 1 - sqrt(1 - pow(x, 2));
}

/**
 * easeOutCirc
 * @param x
 * @returns {number}
 */
export function easeOutCirc(x) {
  return sqrt(1 - pow(x - 1, 2));
}

export function easeInOutCirc(x) {
  return x < 0.5
    ? (1 - sqrt(1 - pow(2 * x, 2))) / 2
    : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
}

/**
 * easeInOutCirc
 * @param x
 * @returns {number}
 */
export function easeInElastic(x) {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
}

/**
 * easeOutElastic
 * @param x
 * @returns {number}
 */
export function easeOutElastic(x) {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
}

export function easeInOutElastic(x) {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2
    : (pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5)) / 2 + 1;
}

/**
 * easeInOutElastic
 * @param x
 * @returns {number}
 */
export function easeInBack(x) {
  return c3 * x * x * x - c1 * x * x;
}

/**
 * easeOutBack
 * @param x
 * @returns {number}
 */
export function easeOutBack(x) {
  return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
}

/**
 * easeOutBack
 * @param x
 * @returns {number}
 */
export function easeInOutBack(x) {
  return x < 0.5
    ? (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
    : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}

/**
 * easeInBounce
 * @param x
 * @returns {number}
 */
export function easeInBounce(x) {
  return 1 - easeOutBounce(1 - x);
}

/**
 * easeOutBounce
 * @param x
 * @returns {number}
 */
export function easeOutBounce(x) {
  let n1 = 7.5625;
  let d1 = 2.75;
  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}

/**
 * easeInOutBounce
 * @param x
 * @returns {number}
 */
export function easeInOutBounce(x) {
  return x < 0.5
    ? (1 - easeOutBounce(1 - 2 * x)) / 2
    : (1 + easeOutBounce(2 * x - 1)) / 2;
}

export const animateFun = {
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
};
