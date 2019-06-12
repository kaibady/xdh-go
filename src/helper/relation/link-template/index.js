import solidLink from './solidLink'
export default function ($, go, options = {}) {
    let map = new go.Map();
    map.add('solid', solidLink($, go, options));
    return map;
  }