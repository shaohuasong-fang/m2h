export function copyBySelection(html: string): boolean {
  const holder = document.createElement('div')
  holder.setAttribute('style', 'position:fixed;left:-99999px;top:0;width:600px;')
  holder.innerHTML = html
  document.body.appendChild(holder)

  const range = document.createRange()
  range.selectNodeContents(holder)
  const selection = window.getSelection()
  selection?.removeAllRanges()
  selection?.addRange(range)

  let ok = false
  try {
    ok = document.execCommand('copy')
  } catch {
    ok = false
  }

  selection?.removeAllRanges()
  holder.remove()
  return ok
}

export function copyPlainText(text: string): boolean {
  const area = document.createElement('textarea')
  area.value = text
  area.setAttribute('style', 'position:fixed;left:-99999px;top:0;')
  document.body.appendChild(area)
  area.select()

  let ok = false
  try {
    ok = document.execCommand('copy')
  } catch {
    ok = false
  }

  area.remove()
  return ok
}

export async function copyRich(html: string, plain: string): Promise<boolean> {
  if (navigator.clipboard && typeof ClipboardItem !== 'undefined') {
    try {
      const item = new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([plain], { type: 'text/plain' })
      })
      await navigator.clipboard.write([item])
      return true
    } catch {
      return copyBySelection(html)
    }
  }
  return copyBySelection(html)
}

export async function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return copyPlainText(text)
    }
  }
  return copyPlainText(text)
}
