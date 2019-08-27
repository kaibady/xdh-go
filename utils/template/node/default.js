export const defaultImage = `data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect x="0" y="0" width="100px" height="100px" fill="gray"></rect></svg>`;
export let defaultProps = ($, go) => {
  return {
    hidden: false, // 隐藏
    image: undefined,
    brokenImage: undefined,
    label: {
      text: '',
      show: true,
      font: '14px "iconfont"'
    },
    labelStroke: {
      normal: '#000',
      highlight: '#fff',
      hover: '#fff',
      select: '#fff'
    },
    labelBackground: {
      normal: '#ccc',
      highlight: '#66b1ff',
      hover: '#66b1ff',
      select: '#66b1ff'
    },
    shape: 'Rectangle',
    background: {
      normal: 'yellow',
      highlight: '#66b1ff',
      hover: '#66b1ff',
      select: '#66b1ff'
    },
    strokeColor: {
      normal: '#ccc',
      highlight: '#66b1ff',
      hover: '#66b1ff',
      select: '#66b1ff'
    },
    strokeWidth: {
      normal: 1,
      highlight: 2,
      hover: 2,
      select: 2
    },
    scale: 1,
    size: 25,
    icon: {
      iconfont: '30px "iconfont"',
      text: '\uE7BD'
    },
    loc: '0 0',
    tooltip: {
      stroke: 'rgba(0,0,0,0.6)',
      background: '',
      text: ''
    }
  };
};
