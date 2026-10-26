import { marked } from 'marked'
import { MONO, escapeHtml, highlightCode, langLabel } from './highlight'
import { findBackground, findHeading } from './themes'
import type { BackgroundId, HeadingStyleId } from './themes'

const ACCENT = '#3d6bff'
const TEXT = '#3f4650'
const TITLE = '#161b26'
const FONT = "-apple-system,BlinkMacSystemFont,'PingFang SC','Hiragino Sans GB','Microsoft YaHei','Segoe UI',sans-serif"

const BASE_STYLE = `font-family:${FONT};font-size:15px;line-height:1.85;color:${TEXT};letter-spacing:0.4px;text-align:left;word-break:break-word;`

const TAG_STYLE: Record<string, string> = {
  h1: `margin:6px 0 22px;padding:0 0 14px;font-size:22px;font-weight:700;line-height:1.45;color:${TITLE};text-align:center;border-bottom:1px solid #eceff5;letter-spacing:0.5px;`,
  h2: `margin:32px 0 16px;padding:0 0 0 11px;font-size:19px;font-weight:700;line-height:1.5;color:${TITLE};border-left:4px solid ${ACCENT};letter-spacing:0.4px;`,
  h3: 'margin:26px 0 12px;padding:0 0 0 9px;font-size:17px;font-weight:700;line-height:1.5;color:#1d2534;border-left:3px solid #a9bcff;',
  h4: `margin:22px 0 10px;font-size:16px;font-weight:700;line-height:1.5;color:${ACCENT};`,
  h5: 'margin:20px 0 8px;font-size:15px;font-weight:700;line-height:1.5;color:#2b3444;',
  h6: 'margin:20px 0 8px;font-size:14px;font-weight:700;line-height:1.5;color:#6b7280;',
  p: `margin:16px 0;font-size:15px;line-height:1.85;color:${TEXT};letter-spacing:0.4px;text-align:justify;`,
  ul: 'margin:14px 0;padding-left:24px;',
  ol: 'margin:14px 0;padding-left:24px;',
  li: `margin:8px 0;font-size:15px;line-height:1.8;color:${TEXT};letter-spacing:0.3px;`,
  blockquote: `margin:18px 0;padding:13px 16px;background:#f5f8ff;border-left:3px solid ${ACCENT};border-radius:0 8px 8px 0;color:#5a6577;font-size:14px;line-height:1.8;`,
  strong: 'font-weight:700;color:#111827;',
  b: 'font-weight:700;color:#111827;',
  em: 'font-style:italic;',
  i: 'font-style:italic;',
  del: 'color:#9aa3b2;text-decoration:line-through;',
  s: 'color:#9aa3b2;text-decoration:line-through;',
  a: `color:${ACCENT};text-decoration:none;border-bottom:1px solid rgba(61,107,255,0.35);word-break:break-all;`,
  img: 'display:block;max-width:100%;height:auto;margin:18px auto;border-radius:6px;',
  hr: 'margin:30px 0;border:0;border-top:1px dashed #d8dee9;height:0;background:none;',
  table: 'width:100%;margin:18px 0;border-collapse:collapse;border-spacing:0;font-size:14px;line-height:1.65;table-layout:auto;',
  th: 'padding:9px 12px;border:1px solid #e2e8f3;background:#f2f6ff;color:#1b2434;font-size:14px;font-weight:600;text-align:left;',
  td: `padding:9px 12px;border:1px solid #e2e8f3;color:${TEXT};font-size:14px;text-align:left;`,
  code: `padding:2px 6px;margin:0 2px;border-radius:4px;background:#f2f4fa;color:#d6336c;font-family:${MONO};font-size:13px;word-break:break-all;`,
  mark: 'padding:0 2px;background:#fff3bf;color:inherit;',
  sup: 'font-size:12px;vertical-align:super;',
  sub: 'font-size:12px;vertical-align:sub;',
  kbd: `padding:2px 5px;border:1px solid #d8dee9;border-bottom-width:2px;border-radius:4px;background:#f7f9fc;font-family:${MONO};font-size:12px;color:#3f4650;`
}

function buildCodeCard(code: string, lang: string): HTMLElement {
  const source = code.replace(/\n+$/, '')
  const result = highlightCode(source, lang)
  const label = langLabel(lang || result.language)

  const card = document.createElement('section')
  card.setAttribute('data-md2wx-raw', '1')
  card.setAttribute(
    'style',
    'margin:18px 0;border-radius:12px;overflow:hidden;background:#1b1e28;' +
      'box-shadow:0 6px 18px rgba(17,24,39,0.16);font-size:0;line-height:0;'
  )

  const header = document.createElement('section')
  header.setAttribute(
    'style',
    'padding:10px 14px;background:#232734;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;line-height:11px;'
  )

  // 公众号会丢弃空的内联 span（原来的背景色圆点会被清理），改用文字圆点保证粘贴后仍可见
  ;['#ff5f57', '#febc2e', '#28c840'].forEach((color) => {
    const dot = document.createElement('span')
    dot.textContent = '●'
    dot.setAttribute(
      'style',
      `margin-right:4px;color:${color};font-size:20px;line-height:11px;font-family:Arial,Helvetica,sans-serif;vertical-align:middle;`
    )
    header.appendChild(dot)
  })

  const labelEl = document.createElement('span')
  labelEl.setAttribute(
    'style',
    `display:inline-block;margin-left:6px;vertical-align:middle;color:#8d93a8;font-family:${MONO};font-size:12px;line-height:1;letter-spacing:0.4px;`
  )
  labelEl.textContent = label
  header.appendChild(labelEl)

  const body = document.createElement('section')
  body.setAttribute('style', 'padding:15px 17px 17px;background:#1b1e28;')

  // 与 doocs/md 一致：换行写成 <br/>、空白写成 &nbsp;，再用 pre + code 的
  // overflow-x 与 -webkit-box 实现公众号内的横向滚动（不依赖 white-space 保留换行）
  const scroller = document.createElement('pre')
  scroller.setAttribute(
    'style',
    'margin:0;padding:0;background:transparent;display:block;max-width:100%;box-sizing:border-box;' +
      'overflow:auto;overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch;' +
      `white-space:normal;word-break:normal;font-size:13px;line-height:1.7;font-family:${MONO};`
  )

  const codeEl = document.createElement('code')
  codeEl.setAttribute(
    'style',
    'display:-webkit-box;box-sizing:border-box;min-width:100%;' +
      'margin:0;padding:0;border:none;background:none;color:#d6dae4;' +
      `overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch;white-space:nowrap;` +
      `font-family:${MONO};font-size:13px;line-height:1.7;word-break:normal;tab-size:2;`
  )
  codeEl.innerHTML = toWechatCodeHtml(result.html)
  scroller.appendChild(codeEl)

  body.appendChild(scroller)
  card.appendChild(header)
  card.appendChild(body)
  return card
}

/**
 * 把高亮 HTML 转成公众号安全的结构：真实 <br/> 换行、&nbsp; 保留缩进与空格。
 * 这样即使微信清洗 white-space，也不会发生二次换行或空格塌陷。
 */
function toWechatCodeHtml(html: string): string {
  const holder = document.createElement('div')
  holder.innerHTML = html

  const inner = document.createElement('span')
  inner.setAttribute('style', 'display:block;white-space:nowrap;')

  const walk = (node: Node, parent: HTMLElement): void => {
    if (node.nodeType === Node.TEXT_NODE) {
      const parts = (node.textContent ?? '').replace(/\t/g, '  ').split('\n')
      parts.forEach((part, index) => {
        if (index > 0) parent.appendChild(document.createElement('br'))
        if (part) parent.appendChild(document.createTextNode(part.replace(/ /g, '\u00A0')))
      })
      return
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return
    const clone = (node as Element).cloneNode(false) as HTMLElement
    parent.appendChild(clone)
    node.childNodes.forEach((child) => walk(child, clone))
  }

  holder.childNodes.forEach((node) => walk(node, inner))
  return inner.outerHTML
}

function applyInlineStyles(root: HTMLElement, taskItems: Set<HTMLLIElement>): void {
  Array.from(root.querySelectorAll<HTMLElement>('*')).forEach((el) => {
    if (el.closest('[data-md2wx-raw]')) return
    const css = TAG_STYLE[el.tagName.toLowerCase()]
    if (css) el.setAttribute('style', css)
  })

  Array.from(root.querySelectorAll<HTMLElement>('blockquote p')).forEach((p) => {
    const extra = p === p.parentNode?.firstElementChild ? '' : 'margin-top:8px;'
    p.setAttribute(
      'style',
      `margin:0;${extra}font-size:14px;line-height:1.8;color:#5a6577;letter-spacing:0.3px;`
    )
  })

  Array.from(root.querySelectorAll<HTMLElement>('li p')).forEach((p) => {
    p.setAttribute('style', 'margin:0;font-size:inherit;line-height:inherit;color:inherit;')
  })

  Array.from(root.querySelectorAll<HTMLElement>('li > ul, li > ol')).forEach((list) => {
    list.setAttribute('style', 'margin:6px 0 0;padding-left:22px;')
  })

  Array.from(root.querySelectorAll<HTMLElement>('p')).forEach((p) => {
    if (p.children.length === 1 && p.firstElementChild?.tagName === 'IMG') {
      p.setAttribute('style', 'margin:18px 0;text-align:center;')
    }
  })

  taskItems.forEach((li) => {
    li.style.listStyle = 'none'
    li.style.marginLeft = '-4px'
  })
}

function sanitize(root: HTMLElement): void {
  Array.from(
    root.querySelectorAll(
      'script, style, iframe, object, embed, form, input:not([type="checkbox"]), button, link, meta, base'
    )
  ).forEach((node) => node.remove())

  Array.from(root.querySelectorAll<HTMLElement>('*')).forEach((el) => {
    Array.from(el.attributes).forEach((attr) => {
      const name = attr.name.toLowerCase()
      if (name.indexOf('on') === 0) el.removeAttribute(attr.name)
      if ((name === 'href' || name === 'src') && /^\s*javascript:/i.test(attr.value)) {
        el.removeAttribute(attr.name)
      }
    })
  })
}

function cleanup(root: HTMLElement): void {
  Array.from(root.querySelectorAll<HTMLElement>('*')).forEach((el) => {
    el.removeAttribute('class')
    el.removeAttribute('id')
    Array.from(el.attributes).forEach((attr) => {
      if (attr.name.toLowerCase().indexOf('data-md2wx') === 0) el.removeAttribute(attr.name)
    })
  })

  Array.from(root.querySelectorAll<HTMLElement>('p')).forEach((p) => {
    if (!p.textContent?.trim() && !p.querySelector('img, br')) p.remove()
  })
}

export interface RenderOptions {
  heading?: HeadingStyleId
  background?: BackgroundId
}

function applyHeadingStyles(root: HTMLElement, heading: HeadingStyleId): void {
  const preset = findHeading(heading)
  let sectionIndex = 0
  Array.from(root.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6')).forEach((el) => {
    const level = Number(el.tagName.charAt(1))
    if (level === 2) sectionIndex += 1
    preset.apply(el, level, sectionIndex)
  })
}

export function renderMarkdown(markdown: string, options: RenderOptions = {}): string {
  const rawHtml = marked.parse(markdown, { gfm: true, breaks: true }) as string
  const root = document.createElement('div')
  root.innerHTML = rawHtml
  sanitize(root)

  const taskItems = new Set<HTMLLIElement>()
  Array.from(root.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')).forEach((input) => {
    const mark = document.createElement('span')
    const checked = input.hasAttribute('checked')
    mark.textContent = checked ? '✓' : '☐'
    mark.setAttribute(
      'style',
      checked
        ? `color:${ACCENT};font-weight:700;margin-right:6px;`
        : 'color:#9aa3b2;margin-right:6px;'
    )
    const li = input.closest('li')
    if (li) taskItems.add(li)
    input.replaceWith(mark)
  })

  Array.from(root.querySelectorAll('pre')).forEach((pre) => {
    const codeEl = pre.querySelector('code')
    const source = codeEl ? codeEl.textContent ?? '' : pre.textContent ?? ''
    let lang = ''
    if (codeEl) {
      for (let i = 0; i < codeEl.classList.length; i += 1) {
        if (codeEl.classList[i].indexOf('language-') === 0) {
          lang = codeEl.classList[i].slice(9)
          break
        }
      }
    }
    pre.replaceWith(buildCodeCard(source, lang))
  })

  applyInlineStyles(root, taskItems)
  applyHeadingStyles(root, options.heading ?? 'classic')
  cleanup(root)

  const background = findBackground(options.background ?? 'none')
  const shellStyle = background.padded
    ? background.pageStyle + 'border:1px solid #e8eefb;border-radius:12px;padding:26px 20px 30px;'
    : ''

  return `<section style="${BASE_STYLE}${shellStyle}">${root.innerHTML}</section>`
}

export function buildDocument(articleHtml: string, title: string): string {
  return (
    '<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n<meta charset="UTF-8">\n' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    `<title>${escapeHtml(title)}</title>\n</head>\n` +
    '<body style="margin:0;padding:0;background:#f5f6f8;">\n' +
    '<section style="max-width:677px;margin:0 auto;padding:24px 20px 48px;background:#ffffff;box-sizing:border-box;">\n' +
    articleHtml +
    '\n</section>\n</body>\n</html>\n'
  )
}

export function renderErrorHtml(message: string): string {
  return `<section style="${BASE_STYLE}color:#d33b4a;">渲染失败：${escapeHtml(message)}</section>`
}
