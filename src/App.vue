<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import sampleMarkdown from './assets/sample.md?raw'
import AppToolbar from './components/AppToolbar.vue'
import EditorPanel from './components/EditorPanel.vue'
import PreviewPanel from './components/PreviewPanel.vue'
import StyleBar from './components/StyleBar.vue'
import { copyRich, copyText } from './lib/clipboard'
import { downloadHtml } from './lib/export'
import { renderErrorHtml, renderMarkdown } from './lib/markdown'
import type { BackgroundId, HeadingStyleId } from './lib/themes'

const STORAGE_KEY = 'md2wx:content'
const HEADING_KEY = 'md2wx:heading'
const BACKGROUND_KEY = 'md2wx:background'

function readStored(key: string): string {
  try {
    return localStorage.getItem(key) ?? ''
  } catch {
    return ''
  }
}

function saveStored(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* 本地存储不可用时忽略 */
  }
}

const markdown = ref(readStored(STORAGE_KEY).trim() || sampleMarkdown.trim())
const headingStyle = ref<HeadingStyleId>((readStored(HEADING_KEY) as HeadingStyleId) || 'neon')
const background = ref<BackgroundId>((readStored(BACKGROUND_KEY) as BackgroundId) || 'grid')
const articleHtml = ref('')
const renderError = ref('')
const charCount = computed(() => markdown.value.length)
const displayHtml = computed(() => (renderError.value ? renderErrorHtml(renderError.value) : articleHtml.value))
// 选中纹理时，由渲染出的外层 section 负责背景与内边距，预览卡片取消自身留白
const articleShellStyle = computed(() =>
  background.value === 'none' ? '' : 'padding:0;background:transparent;overflow:hidden;'
)

const preview = ref<InstanceType<typeof PreviewPanel> | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const toastMessage = ref('')
const toastError = ref(false)
const toastVisible = ref(false)

let renderTimer: number | undefined
let toastTimer: number | undefined

function render(): void {
  try {
    articleHtml.value = renderMarkdown(markdown.value, {
      heading: headingStyle.value,
      background: background.value
    })
    renderError.value = ''
  } catch (error) {
    renderError.value = error instanceof Error ? error.message : String(error)
  }
  saveStored(STORAGE_KEY, markdown.value)
}

function scheduleRender(): void {
  window.clearTimeout(renderTimer)
  renderTimer = window.setTimeout(render, 120)
}

watch(markdown, scheduleRender)
watch([headingStyle, background], ([heading, bg]) => {
  saveStored(HEADING_KEY, heading)
  saveStored(BACKGROUND_KEY, bg)
  render()
})
render()

function showToast(message: string, isError = false): void {
  toastMessage.value = message
  toastError.value = isError
  toastVisible.value = true
  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => {
    toastVisible.value = false
  }, 2200)
}

function previewElement(): HTMLElement | null {
  return preview.value?.article ?? null
}

async function handleCopyRich(): Promise<void> {
  const el = previewElement()
  if (!el) return
  const ok = await copyRich(el.innerHTML, el.innerText)
  showToast(ok ? '已复制，去公众号编辑器粘贴即可' : '复制失败，请手动全选预览内容复制', !ok)
}

async function handleCopyHtml(): Promise<void> {
  const el = previewElement()
  if (!el) return
  const ok = await copyText(el.innerHTML)
  showToast(ok ? 'HTML 源码已复制' : '复制失败', !ok)
}

function handleDownload(): void {
  const el = previewElement()
  if (!el) return
  downloadHtml(el.innerHTML)
  showToast('已下载完整 HTML 文件')
}

function handleSample(): void {
  markdown.value = sampleMarkdown.trim()
}

function openFilePicker(): void {
  fileInput.value?.click()
}

async function loadFile(file: File): Promise<void> {
  try {
    markdown.value = await file.text()
    showToast(`已导入 ${file.name}`)
  } catch {
    showToast('文件读取失败', true)
  }
}

function onFileChange(event: Event): void {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) void loadFile(file)
  input.value = ''
}

function onGlobalKeydown(event: KeyboardEvent): void {
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
    event.preventDefault()
    void handleCopyRich()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onGlobalKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onGlobalKeydown)
  window.clearTimeout(renderTimer)
  window.clearTimeout(toastTimer)
})
</script>

<template>
  <AppToolbar
    @open="openFilePicker"
    @sample="handleSample"
    @copy-html="handleCopyHtml"
    @download="handleDownload"
    @copy-rich="handleCopyRich"
  />

  <StyleBar
    :heading-style="headingStyle"
    :background="background"
    @update:heading-style="headingStyle = $event"
    @update:background="background = $event"
  />

  <main class="workspace">
    <EditorPanel v-model="markdown" :char-count="charCount" @file="loadFile" />
    <PreviewPanel ref="preview" :html="displayHtml" :article-style="articleShellStyle" />
  </main>

  <input
    ref="fileInput"
    type="file"
    accept=".md,.markdown,.txt"
    hidden
    @change="onFileChange"
  />

  <div id="toast" class="toast" :class="{ show: toastVisible, error: toastError }" role="status" aria-live="polite">
    {{ toastMessage }}
  </div>
</template>
