export default function($, go, options) {
  let bindings = [];
  Object.entries(options).forEach(bind => {
    let bindProp = [];
    bindProp.push(bind[0], bind[1].key);
    if (bind[1].handler) {
      bindProp.push(bind[1].handler);
    }
    let ret = new go.Binding(...bindProp);
    if (bind[1].type && typeof bind[1].type === 'string') {
      bindings.push(ret[bind[1].type]());
    } else if (bind[1].type && bind[1].type instanceof Array) {
      let typeParams = [];
      if (bind[1].type[1]) {
        if (!(bind[1].type[1] instanceof Array)) {
          typeParams.push(bind[1].type[1]);
        } else if (bind[1].type[1] instanceof Array) {
          typeParams.push(...bind[1].type[1]);
        }
      }
      bindings.push(ret[bind[1].type[0]](...typeParams));
    } else {
      bindings.push(ret);
    }
  });
  return bindings;
}
