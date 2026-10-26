<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { BACKGROUND_PRESETS, HEADING_PRESETS } from '../lib/themes'
import type { BackgroundId, HeadingStyleId } from '../lib/themes'
import HeadingPreview from './HeadingPreview.vue'

const props = defineProps<{
  headingStyle: HeadingStyleId
  background: BackgroundId
}>()

const emit = defineEmits<{
  'update:heading-style': [value: HeadingStyleId]
  'update:background': [value: BackgroundId]
}>()

type Panel = 'heading' | 'background'

const root = ref<HTMLElement | null>(null)
const open = ref<Panel | null>(null)

const currentHeading = computed(
  () => HEADING_PRESETS.find((item) => item.id === props.headingStyle) ?? HEADING_PRESETS[0]
)
const currentBackground = computed(
  () => BACKGROUND_PRESETS.find((item) => item.id === props.background) ?? BACKGROUND_PRESETS[0]
)

function toggle(panel: Panel): void {
  open.value = open.value === panel ? null : panel
}

function close(): void {
  open.value = null
}

function selectHeading(id: HeadingStyleId): void {
  emit('update:heading-style', id)
  close()
}

function selectBackground(id: BackgroundId): void {
  emit('update:background', id)
  close()
}

function onPointerDown(event: PointerEvent): void {
  if (!open.value) return
  const target = event.target
  if (root.value && target instanceof Node && root.value.contains(target)) return
  close()
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') close()
}

onMounted(() => {
  document.addEventListener('pointerdown', onPointerDown)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onPointerDown)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div ref="root" class="stylebar">
    <div class="style-trigger-group">
      <button
        class="style-trigger"
        :class="{ open: open === 'heading' }"
        type="button"
        :aria-expanded="open === 'heading'"
        @click="toggle('heading')"
      >
        <span class="style-label">标题</span>
        <span class="style-value">{{ currentHeading.name }}</span>
        <span class="style-caret">▾</span>
      </button>
    </div>

    <div class="style-trigger-group">
      <button
        class="style-trigger"
        :class="{ open: open === 'background' }"
        type="button"
        :aria-expanded="open === 'background'"
        @click="toggle('background')"
      >
        <span class="style-label">纹理</span>
        <span class="trigger-swatch" :style="currentBackground.swatch" />
        <span class="style-value">{{ currentBackground.name }}</span>
        <span class="style-caret">▾</span>
      </button>
    </div>

    <Transition name="pop">
      <div v-if="open === 'heading'" class="style-panel" role="dialog" aria-label="选择标题样式">
        <div class="style-panel-head">
          <span class="style-panel-title">标题样式</span>
          <span class="style-panel-sub">{{ HEADING_PRESETS.length }} 种 · H1–H6 联动</span>
        </div>
        <div class="heading-grid">
          <button
            v-for="preset in HEADING_PRESETS"
            :key="preset.id"
            class="heading-tile"
            :class="{ active: preset.id === props.headingStyle }"
            type="button"
            :aria-pressed="preset.id === props.headingStyle"
            @click="selectHeading(preset.id)"
          >
            <HeadingPreview :preset="preset" />
            <span class="tile-name">{{ preset.name }}</span>
          </button>
        </div>
      </div>
    </Transition>

    <Transition name="pop">
      <div v-if="open === 'background'" class="style-panel" role="dialog" aria-label="选择背景纹理">
        <div class="style-panel-head">
          <span class="style-panel-title">背景纹理</span>
          <span class="style-panel-sub">{{ BACKGROUND_PRESETS.length }} 种 · 点击切换</span>
        </div>
        <div class="background-grid">
          <button
            v-for="preset in BACKGROUND_PRESETS"
            :key="preset.id"
            class="background-tile"
            :class="{ active: preset.id === props.background }"
            type="button"
            :aria-pressed="preset.id === props.background"
            @click="selectBackground(preset.id)"
          >
            <span class="background-swatch" :style="preset.swatch" />
            <span class="tile-name">{{ preset.name }}</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
