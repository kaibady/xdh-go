export default function($, go, options) {
  let bindings = [];
  Object.entries(options).forEach(bind => {
    let bindProp = [];
    bindProp.push(bind[0], bind[1].key);
    if (bind[1].handler) {
      bindProp.push(bind[1].handler);
    }
    let ret = new go.Binding(...bindProp);
    if (bind[1].type) {
      bindings.push(ret[bind[1].type]());
    } else {
      bindings.push(ret);
    }
  });
  return bindings;
}
