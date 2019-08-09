/**
 * 修复 node_modules 源码的bug
 */
const fs = require('fs')
const chalk = require('chalk')
const GOJS_FILE = 'node_modules/gojs/release/go.js'

function fixGojs() {
  try {
    let content = fs.readFileSync(GOJS_FILE, 'utf-8')
    if (content.includes('/*flag*/')) {
      console.log(`fix ${GOJS_FILE} ${chalk.yellow(`fixed`)}`)
      return
    }
    // 破解gojs
    const flag = '7eba17a4ca3b1a8346'
    const index = content.indexOf(flag)
    if (index > 0) {
      const start = index - 8, end = index + 32 + flag.length
      const section = content.substring(start, end)
      content = content.replace(section, `function(){return true;};/*flag*/`)
      fs.writeFileSync(GOJS_FILE, content, 'utf-8')
      
      console.log(`fix ${GOJS_FILE} ${chalk.green(`success`)}`)
    } else {
      console.log(`fix ${GOJS_FILE} ${chalk.red(`fail`)}`)
    }
  } catch (e) {
    console.log(`fix ${GOJS_FILE} ${chalk.red(`fail`)}`)
  }
}

fixGojs()
