const {compileTemplate} = require('@vue/component-compiler-utils');
const compiler = require('vue-template-compiler');

function stripScript(content) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : '';
}


// 编写例子时不一定有 template。所以采取的方案是剔除其他的内容
function stripTemplate(content) {
  content = content.trim();
  if (!content) {
    return content;
  }
  return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim();
}

function pad(source) {
  return source
    .split(/\r?\n/)
    .map(line => `  ${line}`)
    .join('\n');
}

function tranformImport(content) {
  const r1 = /import[\s]+[\w-_,{}\s]+[\s]+from[\s]+'[\w-_/@.$]+'/g
  const r2 = /'[\w-_/@.$]+'/g
  const r3 = /import[\s]+'[\w-_/@.$]+'/
  let matches = content.match(r1) || []
  matches.forEach(line => {
    const module = line.match(r2)[0]
    let result = line.replace('import', 'const')
      .replace('from', '=')
      .replace(module, `require(${module}).default || require(${module})`)
    content = content.replace(line, result)
  })
  
  matches = content.match(r3) || []
  matches.forEach(line => {
    const module = line.match(r2)[0]
    let result = line.replace('import', '').replace(module, `require(${module})`)
    content = content.replace(line, result)
  })
  return content
}

function genInlineComponentText(template, script, resourcePath) {
  if (!template) return ''
  // https://github.com/vuejs/vue-loader/blob/master/lib/loaders/templateLoader.js#L29
  const finalOptions = {
    source: `${template}`,
    filename: 'inline-component', // TODO：这里有待调整
    transformAssetUrls: true,
    compiler
  };
  const compiled = compileTemplate(finalOptions);
  // tips
  if (compiled.tips && compiled.tips.length) {
    compiled.tips.forEach(tip => {
      console.warn(tip);
    });
  }
  // errors
  if (compiled.errors && compiled.errors.length) {
    console.error(
      `\n  Error compiling template:\n${pad(compiled.source)}\n` +
      compiled.errors.map(e => `  - ${e}`).join('\n') +
      '\n' +
      resourcePath
    );

  }
  let demoComponentContent = `
    ${compiled.code}
  `;
  // todo: 这里采用了硬编码有待改进
  script = script.trim();
  if (script) {
    script = script.replace(/export\s+default/, 'const democomponentExport =');
  } else {
    script = 'const democomponentExport = {}';
  }
  demoComponentContent = `(function demo() {
    ${demoComponentContent}
    ${script}
    return {
      ...democomponentExport,
      render,
      staticRenderFns
    }
  })()`;
  return tranformImport(demoComponentContent);
}

module.exports = {
  stripScript,
  stripTemplate,
  genInlineComponentText
};
