<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  modelValue: string
  charCount: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  file: [file: File]
}>()

const textarea = ref<HTMLTextAreaElement | null>(null)
const dragging = ref(false)

function onInput(event: Event): void {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key !== 'Tab') return
  event.preventDefault()
  const el = textarea.value
  if (!el) return
  el.setRangeText('  ', el.selectionStart, el.selectionEnd, 'end')
  emit('update:modelValue', el.value)
}

function onDragEnter(event: DragEvent): void {
  event.preventDefault()
  dragging.value = true
}

function onDragOver(event: DragEvent): void {
  event.preventDefault()
}

function onDragLeave(event: DragEvent): void {
  event.preventDefault()
  const next = event.relatedTarget as Node | null
  if (next && (event.currentTarget as HTMLElement).contains(next)) return
  dragging.value = false
}

function onDrop(event: DragEvent): void {
  event.preventDefault()
  dragging.value = false
  const file = event.dataTransfer?.files?.[0]
  if (file) emit('file', file)
}
</script>

<template>
  <section
    class="panel editor-panel"
    :class="{ dragging }"
    @dragenter="onDragEnter"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <div class="panel-head">
      <span class="panel-title">Markdown</span>
      <span class="panel-meta">{{ props.charCount }} 字符</span>
    </div>
    <textarea
      id="editor"
      ref="textarea"
      spellcheck="false"
      :value="props.modelValue"
      placeholder="在此粘贴 Markdown，或把 .md 文件拖进来…"
      @input="onInput"
      @keydown="onKeydown"
    />
    <div class="drop-hint">松开即可导入 Markdown 文件</div>
  </section>
</template>
