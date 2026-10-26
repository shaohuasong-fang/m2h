import { buildDocument } from './markdown'

export function articleTitle(articleHtml: string): string {
  const root = document.createElement('div')
  root.innerHTML = articleHtml
  const heading = root.querySelector('h1, h2')
  const text = heading?.textContent?.trim() ?? ''
  return text || '公众号文章'
}

export function downloadHtml(articleHtml: string): void {
  const title = articleTitle(articleHtml)
  const doc = buildDocument(articleHtml, title)
  const blob = new Blob([doc], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  const date = new Date()
  const stamp =
    date.getFullYear() +
    '-' +
    String(date.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(date.getDate()).padStart(2, '0')

  link.href = url
  link.download = title.replace(/[\\/:*?"<>|]/g, '-') + '-' + stamp + '.html'
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}
