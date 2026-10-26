<script setup lang="ts">
const emit = defineEmits<{
  open: []
  sample: []
  copyHtml: []
  download: []
  copyRich: []
}>()
</script>

<template>
  <header class="topbar">
    <div class="brand">
      <div class="logo">M↓</div>
      <div class="brand-text">
        <h1>Markdown 转公众号</h1>
      </div>
    </div>
    <div class="actions">
      <button class="btn ghost" type="button" @click="emit('open')">打开文件</button>
      <button class="btn ghost" type="button" @click="emit('sample')">示例</button>
      <button class="btn ghost" type="button" @click="emit('copyHtml')">复制 HTML</button>
      <button class="btn ghost" type="button" @click="emit('download')">下载 HTML</button>
      <button class="btn primary" type="button" @click="emit('copyRich')">复制到公众号</button>
    </div>
  </header>
</template>
