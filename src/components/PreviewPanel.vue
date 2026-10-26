<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ html: string; articleStyle: string }>()

const article = ref<HTMLElement | null>(null)

defineExpose({ article })
</script>

<template>
  <section class="panel preview-panel">
    <div class="panel-head">
      <span class="panel-title">公众号预览</span>
    </div>
    <div class="preview-scroll">
      <div ref="article" class="article" :style="articleStyle" v-html="html" />
    </div>
  </section>
</template>
