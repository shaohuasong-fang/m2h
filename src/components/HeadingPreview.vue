<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { HeadingPreset } from '../lib/themes'

const props = defineProps<{ preset: HeadingPreset }>()
const el = ref<HTMLElement | null>(null)

/** 用真实的 H2 样式渲染小样，让下拉里的每个选项都是所见即所得 */
function render(): void {
  const node = el.value
  if (!node) return
  node.textContent = '标题 Aa'
  props.preset.apply(node, 2, 1)
  node.style.margin = '0'
  node.style.display = 'block'
  node.style.fontSize = '12.5px'
  node.style.lineHeight = '1.25'
  node.style.paddingBottom = '4px'
  node.style.whiteSpace = 'nowrap'
  node.style.overflow = 'hidden'
  node.style.textOverflow = 'ellipsis'
}

onMounted(render)
watch(() => props.preset, render)
</script>

<template>
  <span ref="el" class="heading-preview" />
</template>
