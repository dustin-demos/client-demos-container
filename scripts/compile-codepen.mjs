import { existsSync, readdirSync, writeFileSync, copyFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import pug from 'pug'
import * as sass from 'sass'

const DEMOS_DIR = join(import.meta.dirname, '../demos/codepen')

const demos = readdirSync(DEMOS_DIR).filter(d => existsSync(join(DEMOS_DIR, d, 'src')))

for (const demo of demos) {
  const src = join(DEMOS_DIR, demo, 'src')
  const dist = join(DEMOS_DIR, demo, 'dist')
  mkdirSync(dist, { recursive: true })

  const pugFile = join(src, 'index.pug')
  const htmlFile = join(src, 'index.html')
  const scssFile = join(src, 'style.scss')
  const cssFile = join(src, 'style.css')
  const jsFile = join(src, 'script.js')

  console.log(`compiling ${demo}...`)

  if (existsSync(pugFile)) {
    const html = pug.renderFile(pugFile)
    writeFileSync(join(dist, 'index.html'), html)
  } else if (existsSync(htmlFile)) {
    copyFileSync(htmlFile, join(dist, 'index.html'))
  }

  if (existsSync(scssFile)) {
    const result = sass.compile(scssFile, { sourceMap: false, silenceDeprecations: ['slash-div', 'global-builtin', 'function-units', 'import'] })
    writeFileSync(join(dist, 'style.css'), result.css)
  } else if (existsSync(cssFile)) {
    copyFileSync(cssFile, join(dist, 'style.css'))
  }

  if (existsSync(jsFile)) {
    copyFileSync(jsFile, join(dist, 'script.js'))
  }

  console.log(`  done`)
}

console.log('all codepen demos compiled')
