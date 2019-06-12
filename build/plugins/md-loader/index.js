const {
  stripTemplate,
  genInlineComponentText
} = require('./util')
const md = require('./config')
const compiler = require('vue-template-compiler')

module.exports = function (source) {
  const content = md.render(source)
  
  const startTag = '<!--element-demo:'
  const startTagLen = startTag.length
  const endTag = ':element-demo-->'
  const endTagLen = endTag.length
  
  let componenetsString = ''
  let id = 0 // demo 的 id
  let output = [] // 输出的内容
  let start = 0 // 字符串开始位置
  let styles = []
  let commentStart = content.indexOf(startTag)
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen)
  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart))
    
    const commentContent = content.slice(commentStart + startTagLen, commentEnd)
    const html = stripTemplate(commentContent)
    const vueFile = commentContent.replace(html, `<template><div>${html}</div></template>`)
    const vue = compiler.parseComponent(vueFile)
    if (vue.styles) {
      vue.styles.forEach(style => {
        styles.push(`
          .demo${id} /deep/ {
           ${style.content}
          }
        `)
      })
    }
    let demoComponentContent = genInlineComponentText(vue.template.content, vue.script ? vue.script.content : '', this.resourcePath)
    const demoComponentName = `element-demo${id}`
    output.push(`<div class="demo${id}" slot="source"><${demoComponentName} /></div>`)
    componenetsString += `${JSON.stringify(demoComponentName)}: ${demoComponentContent},`
    
    // 重新计算下一次的位置
    id++
    start = commentEnd + endTagLen
    commentStart = content.indexOf(startTag, start)
    commentEnd = content.indexOf(endTag, commentStart + startTagLen)
  }
  
  // 仅允许在 demo 不存在时，才可以在 Markdown 中写 script 标签
  // todo: 优化这段逻辑
  let pageScript = ''
  if (componenetsString) {
    pageScript = `<script>
      export default {
        name: 'component-doc',
        components: {
          ${componenetsString}
        }
      }
    </script>`
  } else if (content.indexOf('<script>') === 0) { // 硬编码，有待改善
    start = content.indexOf('</script>') + '</script>'.length
    pageScript = content.slice(0, start)
  }
  
  output.push(content.slice(start))
  return `
    <template>
      <section class="content element-doc">
        ${output.join('')}
      </section>
    </template>
    ${pageScript}
    <style lang="scss" scoped>
       ${styles.join('\n')}
     
</style>
  `
}
