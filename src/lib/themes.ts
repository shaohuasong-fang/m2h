import { MONO } from './highlight'

export type HeadingStyleId =
  | 'classic'
  | 'neon'
  | 'gradient'
  | 'hud'
  | 'badge'
  | 'terminal'
  | 'bracket'
  | 'pixel'
  | 'split'
  | 'ribbon'
  | 'underline'
  | 'card'
  | 'mono'
  | 'hairline'
  | 'cyan'
  | 'violet'
  | 'emerald'
  | 'amber'
  | 'rose'
  | 'cobalt'
  | 'duotone'
  | 'dash'
  | 'dotted'
  | 'scan'
  | 'tape'
  | 'label'
  | 'swiss'
  | 'data'
  | 'nebula'
  | 'arctic'
  | 'quantum'
  | 'matrixGreen'
  | 'frost'
  | 'solar'
  | 'magma'
  | 'ocean'
  | 'sakura'
  | 'mint'
  | 'steel'
  | 'graphite'
  | 'spectrum'
  | 'prism'
  | 'orbit'
  | 'signal'
  | 'radar'
  | 'wireframe'
  | 'corner'
  | 'ruler'
  | 'zen'
  | 'noir'

export type BackgroundId =
  | 'none'
  | 'grid'
  | 'dots'
  | 'blueprint'
  | 'diagonal'
  | 'scanline'
  | 'cross'
  | 'stars'
  | 'circuit'
  | 'matrix'
  | 'mesh'
  | 'carbon'
  | 'radial'
  | 'tri'
  | 'horizon'
  | 'aurora'
  | 'grain'
  | 'pulse'
  | 'topo'
  | 'glow'
  | 'hex'
  | 'wave'
  | 'checker'
  | 'vstripe'
  | 'neonGrid'
  | 'dotgrid'
  | 'nodes'
  | 'ripple'
  | 'beam'
  | 'weave'
  | 'scale'
  | 'crosshair'
  | 'pixel'
  | 'constellation'
  | 'cells'
  | 'swirl'
  | 'skyline'
  | 'frost'
  | 'lava'
  | 'deepsea'

export interface HeadingPreset {
  id: HeadingStyleId
  name: string
  apply: (el: HTMLElement, level: number, index: number) => void
}

export interface BackgroundPreset {
  id: BackgroundId
  name: string
  pageStyle: string
  swatch: string
  padded: boolean
}

function setStyle(el: HTMLElement, css: string): void {
  el.setAttribute('style', css)
}

function addAffix(el: HTMLElement, text: string, css: string, position: 'before' | 'after'): void {
  const span = document.createElement('span')
  span.textContent = text
  span.setAttribute('style', css)
  if (position === 'before') {
    el.insertBefore(span, el.firstChild)
  } else {
    el.appendChild(span)
  }
}

const BADGE_CSS =
  'display:inline-block;min-width:24px;padding:3px 7px;margin-right:9px;border-radius:6px;' +
  'background:linear-gradient(135deg,#3d6bff,#22d3ee);color:#ffffff;font-family:' + MONO +
  ';font-size:12px;font-weight:700;text-align:center;vertical-align:middle;letter-spacing:0.5px;'

const SIZES = ['22px', '19px', '17px', '15.5px', '14.5px', '13.5px']
const MARGINS = ['8px 0 26px', '32px 0 16px', '26px 0 12px', '22px 0 10px', '20px 0 8px', '18px 0 8px']
const PADDINGS = ['0 0 12px', '0 0 6px', '0 0 5px', '0 0 4px', '0 0 4px', '0']

/** 统一 H1–H6 的字号、间距与下划线规则，保证每个样式的层级递进一致 */
function levelStyle(level: number, color: string, border: string, extra = ''): string {
  const i = level - 1
  return (
    `margin:${MARGINS[i]};padding:${PADDINGS[i]};${level === 1 ? 'text-align:center;' : ''}` +
    `font-size:${SIZES[i]};font-weight:700;line-height:1.5;color:${color};` +
    `${border ? `border-bottom:${border};` : ''}${extra}`
  )
}

function paint(
  el: HTMLElement,
  level: number,
  colors: string[],
  rules: string[],
  extras: string[] = []
): void {
  setStyle(el, levelStyle(level, colors[level - 1], rules[level - 1], extras[level - 1] ?? ''))
}

function rulePreset(
  colors: string[],
  rules: string[],
  extras: string[] = [],
  mono = false
): HeadingPreset['apply'] {
  const merged = mono
    ? Array.from({ length: 6 }, (_, i) => `font-family:${MONO};${extras[i] ?? ''}`)
    : extras
  return (el, level) => paint(el, level, colors, rules, merged)
}

const BASE_HEADING_PRESETS: HeadingPreset[] = [
  {
    id: 'classic',
    name: '经典',
    apply: (el, level) =>
      paint(
        el,
        level,
        ['#161b26', '#1d2534', '#1d2534', '#1d2534', '#334155', '#6b7280'],
        ['1px solid #e2e8f3', '3px solid #3d6bff', '2px solid #a9bcff', '1px solid #dbe3f2', '1px dotted #dbe3f2', '']
      )
  },
  {
    id: 'neon',
    name: '霓虹',
    apply: (el, level) =>
      paint(
        el,
        level,
        ['#0b1220', '#0b4bd6', '#1d2534', '#0284c7', '#1d2534', '#64748b'],
        ['2px solid #22d3ee', '2px solid #22d3ee', '1px dashed #93c5fd', '1px solid #bae6fd', '1px dotted #bae6fd', ''],
        ['', 'background:linear-gradient(90deg,rgba(34,211,238,0.12),rgba(61,107,255,0));', '', '', '', '']
      )
  },
  {
    id: 'gradient',
    name: '渐变光带',
    apply: (el, level) =>
      paint(
        el,
        level,
        ['#0b1220', '#0b4bd6', '#1d2534', '#2563eb', '#0f172a', '#64748b'],
        ['2px solid #3d6bff', '1px solid #93c5fd', '2px solid #22d3ee', '1px solid #dbeafe', '1px dotted #dbeafe', ''],
        [
          'background:linear-gradient(90deg,rgba(61,107,255,0),rgba(61,107,255,0.10),rgba(61,107,255,0));',
          'background:linear-gradient(90deg,rgba(34,211,238,0.12),rgba(61,107,255,0.02));',
          '',
          '',
          '',
          ''
        ]
      )
  },
  {
    id: 'hud',
    name: 'HUD',
    apply: (el, level) =>
      paint(
        el,
        level,
        ['#0b1220', '#0b1220', '#1d2534', '#3d6bff', '#475569', '#94a3b8'],
        ['', '1px solid #22d3ee', '1px dashed #c7d2fe', '1px solid #dbe6ff', '1px dotted #dbe6ff', ''],
        [
          'border-top:1px solid #3d6bff;border-bottom:1px solid #3d6bff;padding:9px 0;',
          'background:linear-gradient(90deg,rgba(61,107,255,0.10),rgba(61,107,255,0));',
          '',
          '',
          '',
          'letter-spacing:1.2px;'
        ]
      )
  },
  {
    id: 'badge',
    name: '编号',
    apply: (el, level, index) => {
      paint(
        el,
        level,
        ['#0b1220', '#161b26', '#1d2534', '#161b26', '#334155', '#64748b'],
        ['3px solid #3d6bff', '1px solid #dbe6ff', '2px solid #a9bcff', '1px solid #dbe6ff', '1px dotted #dbe6ff', '']
      )
      if (level === 2) {
        addAffix(el, String(index).padStart(2, '0'), BADGE_CSS, 'before')
      }
    }
  },
  {
    id: 'terminal',
    name: '终端',
    apply: (el, level) =>
      paint(
        el,
        level,
        ['#e5e7eb', '#0f172a', '#0f172a', '#0f172a', '#334155', '#64748b'],
        ['', '1px solid #e2e8f0', '2px solid #cbd5e1', '1px solid #e2e8f0', '1px dotted #cbd5e1', ''],
        [
          `font-family:${MONO};background:#0f172a;border-radius:8px;padding:11px 14px;`,
          `font-family:${MONO};background:#f1f5f9;border-radius:6px;padding:7px 11px;`,
          `font-family:${MONO};`,
          `font-family:${MONO};`,
          `font-family:${MONO};`,
          `font-family:${MONO};`
        ]
      )
  },
  {
    id: 'bracket',
    name: '代码括号',
    apply: (el, level) => {
      paint(
        el,
        level,
        ['#161b26', '#0b1220', '#1d2534', '#0b1220', '#334155', '#94a3b8'],
        ['2px solid #3d6bff', '1px solid #22b8d4', '1px dashed #93c5fd', '1px solid #dbeafe', '1px dotted #dbeafe', '']
      )
      if (level === 1) {
        addAffix(el, '[', `color:#3d6bff;font-family:${MONO};font-size:19px;font-weight:700;margin-right:8px;`, 'before')
        addAffix(el, ']', `color:#3d6bff;font-family:${MONO};font-size:19px;font-weight:700;margin-left:8px;`, 'after')
      }
    }
  },
  {
    id: 'pixel',
    name: '像素块',
    apply: (el, level) => {
      paint(
        el,
        level,
        ['#0b1220', '#161b26', '#1d2534', '#161b26', '#475569', '#94a3b8'],
        ['3px solid #0f172a', '2px dotted #94a3b8', '2px solid #22b8d4', '1px solid #cbd5e1', '1px dotted #cbd5e1', ''],
        ['', '', '', '', '', 'letter-spacing:1px;']
      )
      if (level === 1) {
        addAffix(el, '■', 'color:#3d6bff;margin-right:10px;', 'before')
        addAffix(el, '■', 'color:#3d6bff;margin-left:10px;', 'after')
      }
    }
  },
  {
    id: 'split',
    name: '双线',
    apply: (el, level) =>
      paint(
        el,
        level,
        ['#0b1220', '#161b26', '#1d2534', '#0b1220', '#334155', '#64748b'],
        ['', '', '1px dashed #cbd5e1', '1px solid #e2e8f0', '1px dotted #e2e8f0', ''],
        [
          'border-top:2px solid #0f172a;border-bottom:2px solid #0f172a;padding:9px 0;',
          'border-top:1px solid #cbd5e1;border-bottom:1px solid #cbd5e1;padding:7px 0;',
          `font-family:${MONO};`,
          `font-family:${MONO};`,
          `font-family:${MONO};`,
          `font-family:${MONO};`
        ]
      )
  },
  {
    id: 'ribbon',
    name: '缎带',
    apply: (el, level) =>
      paint(
        el,
        level,
        ['#0b1220', '#161b26', '#1d2534', '#161b26', '#334155', '#64748b'],
        ['1px solid #dbe6ff', '1px solid #dbe6ff', '1px solid #e5eaf5', '1px solid #eef2f7', '1px dotted #e5eaf5', ''],
        [
          'background:linear-gradient(90deg,rgba(61,107,255,0),rgba(61,107,255,0.10),rgba(61,107,255,0));',
          'background:#f6f9ff;',
          'background:#fbfcff;',
          '',
          '',
          ''
        ]
      )
  },
  {
    id: 'underline',
    name: '下划线',
    apply: (el, level) =>
      paint(
        el,
        level,
        ['#0b1220', '#0b1220', '#1d2534', '#0b1220', '#334155', '#64748b'],
        ['3px double #3d6bff', '2px solid #3d6bff', '1px solid #c7d2fe', '1px solid #c7d2fe', '1px dotted #dbeafe', '']
      )
  },
  {
    id: 'card',
    name: '卡片',
    apply: (el, level) =>
      paint(
        el,
        level,
        ['#0b1220', '#161b26', '#1d2534', '#0b1220', '#1d2534', '#64748b'],
        ['', '', '', '', '', ''],
        [
          'background:linear-gradient(135deg,#eef4ff,#f9fbff);border:1px solid #dbe6ff;border-radius:12px;padding:14px 16px;',
          'background:#f5f8ff;border:1px solid #dbe6ff;border-radius:8px;padding:8px 12px;',
          'background:#f5f8ff;border:1px solid #e5ecfb;border-radius:7px;padding:6px 10px;',
          'background:#f8fafc;border:1px solid #eef2f7;border-radius:6px;padding:5px 9px;',
          'background:#f8fafc;border:1px solid #f1f5f9;border-radius:5px;padding:4px 8px;',
          'background:#fafcff;border:1px solid #f1f5f9;border-radius:5px;padding:3px 8px;'
        ]
      )
  }
]

const TECH_HEADING_PRESETS: HeadingPreset[] = [
  {
    id: 'mono',
    name: '等宽极简',
    apply: rulePreset(
      ['#0f172a', '#0f172a', '#1e293b', '#334155', '#475569', '#64748b'],
      ['1px solid #cbd5e1', '2px solid #64748b', '1px solid #cbd5e1', '1px dotted #cbd5e1', '1px dotted #e2e8f0', ''],
      [],
      true
    )
  },
  {
    id: 'hairline',
    name: '发丝线',
    apply: rulePreset(
      ['#111827', '#111827', '#1f2937', '#374151', '#4b5563', '#6b7280'],
      ['1px solid #e5e7eb', '2px solid #111827', '1px solid #e5e7eb', '1px solid #f3f4f6', '1px dotted #e5e7eb', ''],
      ['letter-spacing:2px;']
    )
  },
  {
    id: 'cyan',
    name: '青蓝',
    apply: rulePreset(
      ['#083344', '#0e7490', '#164e63', '#0e7490', '#334155', '#64748b'],
      ['3px solid #06b6d4', '2px solid #06b6d4', '1px solid #67e8f9', '1px solid #a5f3fc', '1px dotted #a5f3fc', ''],
      ['', 'background:#ecfeff;']
    )
  },
  {
    id: 'violet',
    name: '紫光',
    apply: rulePreset(
      ['#2e1065', '#5b21b6', '#3b0764', '#6d28d9', '#334155', '#64748b'],
      ['3px solid #7c3aed', '2px solid #7c3aed', '1px solid #c4b5fd', '1px solid #ddd6fe', '1px dotted #ddd6fe', ''],
      ['', 'background:#f5f3ff;']
    )
  },
  {
    id: 'emerald',
    name: '翡翠',
    apply: rulePreset(
      ['#064e3b', '#047857', '#065f46', '#059669', '#334155', '#64748b'],
      ['3px solid #10b981', '2px solid #10b981', '1px solid #6ee7b7', '1px solid #a7f3d0', '1px dotted #a7f3d0', ''],
      ['', 'background:#ecfdf5;']
    )
  },
  {
    id: 'amber',
    name: '琥珀',
    apply: rulePreset(
      ['#451a03', '#b45309', '#78350f', '#d97706', '#334155', '#64748b'],
      ['3px solid #f59e0b', '2px solid #f59e0b', '1px solid #fcd34d', '1px solid #fde68a', '1px dotted #fde68a', ''],
      ['', 'background:#fffbeb;']
    )
  },
  {
    id: 'rose',
    name: '玫瑰',
    apply: rulePreset(
      ['#4c0519', '#be123c', '#881337', '#e11d48', '#334155', '#64748b'],
      ['3px solid #e11d48', '2px solid #e11d48', '1px solid #fda4af', '1px solid #fecdd3', '1px dotted #fecdd3', ''],
      ['', 'background:#fff1f2;']
    )
  },
  {
    id: 'cobalt',
    name: '钴蓝',
    apply: rulePreset(
      ['#0b1220', '#1e3a8a', '#1e293b', '#1d4ed8', '#334155', '#64748b'],
      ['3px double #1d4ed8', '2px solid #1d4ed8', '1px solid #93c5fd', '1px solid #bfdbfe', '1px dotted #bfdbfe', ''],
      ['', 'background:#eff6ff;']
    )
  },
  {
    id: 'duotone',
    name: '双色',
    apply: rulePreset(
      ['#0b1220', '#5b21b6', '#0e7490', '#1d4ed8', '#6d28d9', '#64748b'],
      ['2px solid #3d6bff', '2px solid #7c3aed', '1px solid #22d3ee', '1px solid #c7d2fe', '1px dotted #ddd6fe', ''],
      ['', 'background:linear-gradient(90deg,rgba(61,107,255,0.10),rgba(124,58,237,0.10));']
    )
  },
  {
    id: 'dash',
    name: '虚线',
    apply: rulePreset(
      ['#0b1220', '#1d2534', '#1d2534', '#334155', '#475569', '#64748b'],
      ['2px dashed #3d6bff', '2px dashed #3d6bff', '1px dashed #93c5fd', '1px dashed #cbd5e1', '1px dashed #dbeafe', '']
    )
  },
  {
    id: 'dotted',
    name: '点线',
    apply: rulePreset(
      ['#0b1220', '#1d2534', '#1d2534', '#334155', '#475569', '#64748b'],
      ['2px dotted #3d6bff', '2px dotted #3d6bff', '1px dotted #93c5fd', '1px dotted #cbd5e1', '1px dotted #dbeafe', '']
    )
  },
  {
    id: 'scan',
    name: '扫描',
    apply: rulePreset(
      ['#0b1220', '#0b4bd6', '#1d2534', '#0b1220', '#334155', '#64748b'],
      ['', '2px solid #22d3ee', '1px solid #93c5fd', '1px solid #dbeafe', '1px dotted #dbeafe', ''],
      [
        'border-top:1px solid #3d6bff;border-bottom:3px solid #22d3ee;padding:9px 0;',
        'background:linear-gradient(90deg,rgba(34,211,238,0.12),transparent);'
      ]
    )
  },
  {
    id: 'tape',
    name: '胶带',
    apply: rulePreset(
      ['#0b1220', '#0b4bd6', '#1d2534', '#0b1220', '#334155', '#64748b'],
      ['1px solid #dbe6ff', '1px solid #dbe6ff', '1px solid #e5eaf5', '1px solid #eef2f7', '1px dotted #e5eaf5', ''],
      [
        'background:linear-gradient(90deg,rgba(61,107,255,0),rgba(61,107,255,0.12),rgba(61,107,255,0));',
        'background:#eef4ff;',
        'background:#f8faff;'
      ]
    )
  },
  {
    id: 'label',
    name: '标签',
    apply: rulePreset(
      ['#0f172a', '#0f172a', '#1e293b', '#334155', '#475569', '#94a3b8'],
      ['1px solid #cbd5e1', '2px solid #0f172a', '1px solid #e2e8f0', '1px solid #f1f5f9', '1px dotted #e2e8f0', ''],
      ['letter-spacing:3px;', 'letter-spacing:1.5px;', '', '', '', 'letter-spacing:2px;'],
      true
    )
  },
  {
    id: 'swiss',
    name: '瑞士',
    apply: rulePreset(
      ['#000000', '#111111', '#1f2937', '#111111', '#374151', '#6b7280'],
      ['3px solid #111111', '2px solid #111111', '1px solid #111111', '1px solid #9ca3af', '1px dotted #d1d5db', ''],
      ['text-align:left;letter-spacing:1px;']
    )
  },
  {
    id: 'data',
    name: '数据',
    apply: rulePreset(
      ['#052e2b', '#047857', '#0f172a', '#0e7490', '#334155', '#64748b'],
      ['2px solid #22c55e', '2px solid #22c55e', '1px solid #86efac', '1px solid #bbf7d0', '1px dotted #bbf7d0', ''],
      ['', 'background:#f0fdf4;'],
      true
    )
  },
  {
    id: 'nebula',
    name: '星云',
    apply: rulePreset(
      ['#2e1065', '#6d28d9', '#3b0764', '#7c3aed', '#4c1d95', '#64748b'],
      ['2px solid #8b5cf6', '2px solid #8b5cf6', '1px solid #c4b5fd', '1px solid #ddd6fe', '1px dotted #ede9fe', ''],
      [
        'background:linear-gradient(90deg,rgba(124,58,237,0.10),rgba(34,211,238,0.10));',
        'background:linear-gradient(90deg,rgba(124,58,237,0.12),rgba(61,107,255,0.04));'
      ]
    )
  },
  {
    id: 'arctic',
    name: '极地',
    apply: rulePreset(
      ['#0c4a6e', '#0369a1', '#0f172a', '#0284c7', '#334155', '#64748b'],
      ['3px double #38bdf8', '2px solid #38bdf8', '1px solid #7dd3fc', '1px solid #bae6fd', '1px dotted #bae6fd', ''],
      ['', 'background:#f0f9ff;']
    )
  },
  {
    id: 'quantum',
    name: '量子',
    apply: (el, level) => {
      paint(
        el,
        level,
        ['#0b1220', '#0b4bd6', '#1d2534', '#0b1220', '#334155', '#64748b'],
        ['2px solid #3d6bff', '2px solid #22d3ee', '1px dashed #93c5fd', '1px solid #dbeafe', '1px dotted #dbeafe', ''],
        ['', 'background:linear-gradient(90deg,rgba(61,107,255,0.08),rgba(34,211,238,0.08));']
      )
      if (level === 1) {
        addAffix(el, '·', 'color:#22d3ee;margin-right:9px;', 'before')
        addAffix(el, '·', 'color:#22d3ee;margin-left:9px;', 'after')
      }
    }
  },
  {
    id: 'matrixGreen',
    name: '矩阵绿',
    apply: rulePreset(
      ['#052e16', '#15803d', '#14532d', '#16a34a', '#334155', '#64748b'],
      ['2px solid #22c55e', '2px solid #22c55e', '1px solid #86efac', '1px solid #bbf7d0', '1px dotted #bbf7d0', ''],
      ['', 'background:#f0fdf4;'],
      true
    )
  },
  {
    id: 'frost',
    name: '霜蓝',
    apply: rulePreset(
      ['#0c4a6e', '#0369a1', '#0f172a', '#0284c7', '#334155', '#64748b'],
      ['2px solid #bae6fd', '2px solid #7dd3fc', '1px solid #cffafe', '1px solid #e0f2fe', '1px dotted #e0f2fe', ''],
      [
        'background:linear-gradient(90deg,rgba(186,230,253,0.35),rgba(255,255,255,0));',
        'background:#f0f9ff;'
      ]
    )
  },
  {
    id: 'solar',
    name: '曜金',
    apply: rulePreset(
      ['#451a03', '#b45309', '#78350f', '#d97706', '#334155', '#64748b'],
      ['2px solid #f59e0b', '2px solid #fbbf24', '1px solid #fcd34d', '1px solid #fde68a', '1px dotted #fde68a', ''],
      [
        'background:linear-gradient(90deg,rgba(251,191,36,0.18),rgba(255,255,255,0));',
        'background:#fffbeb;'
      ]
    )
  },
  {
    id: 'magma',
    name: '岩浆',
    apply: rulePreset(
      ['#450a0a', '#b91c1c', '#7f1d1d', '#dc2626', '#334155', '#64748b'],
      ['2px solid #ef4444', '2px solid #f97316', '1px solid #fdba74', '1px solid #fed7aa', '1px dotted #fed7aa', ''],
      [
        'background:linear-gradient(90deg,rgba(239,68,68,0.14),rgba(249,115,22,0.06));',
        'background:#fff7ed;'
      ]
    )
  },
  {
    id: 'ocean',
    name: '深海',
    apply: rulePreset(
      ['#082f49', '#0369a1', '#0c4a6e', '#0284c7', '#334155', '#64748b'],
      ['3px solid #0ea5e9', '2px solid #0ea5e9', '1px solid #7dd3fc', '1px solid #bae6fd', '1px dotted #bae6fd', ''],
      ['', 'background:#f0f9ff;']
    )
  },
  {
    id: 'sakura',
    name: '樱粉',
    apply: rulePreset(
      ['#4c0519', '#be185d', '#831843', '#db2777', '#334155', '#64748b'],
      ['2px solid #f472b6', '2px solid #f9a8d4', '1px solid #fbcfe8', '1px solid #fce7f3', '1px dotted #fce7f3', ''],
      ['', 'background:#fdf2f8;']
    )
  },
  {
    id: 'mint',
    name: '薄荷',
    apply: rulePreset(
      ['#134e4a', '#0f766e', '#115e59', '#0d9488', '#334155', '#64748b'],
      ['2px solid #2dd4bf', '2px solid #5eead4', '1px solid #99f6e4', '1px solid #ccfbf1', '1px dotted #ccfbf1', ''],
      ['', 'background:#f0fdfa;']
    )
  },
  {
    id: 'steel',
    name: '钢铁',
    apply: rulePreset(
      ['#0f172a', '#334155', '#1e293b', '#475569', '#64748b', '#94a3b8'],
      ['3px double #64748b', '2px solid #64748b', '1px solid #cbd5e1', '1px solid #e2e8f0', '1px dotted #e2e8f0', ''],
      ['letter-spacing:0.6px;']
    )
  },
  {
    id: 'graphite',
    name: '石墨',
    apply: rulePreset(
      ['#111827', '#1f2937', '#1f2937', '#374151', '#4b5563', '#6b7280'],
      ['1px solid #d1d5db', '2px solid #374151', '1px solid #d1d5db', '1px solid #e5e7eb', '1px dotted #e5e7eb', ''],
      [],
      true
    )
  },
  {
    id: 'spectrum',
    name: '光谱',
    apply: rulePreset(
      ['#0b1220', '#7c3aed', '#0e7490', '#db2777', '#b45309', '#334155'],
      ['2px solid #3d6bff', '2px solid #8b5cf6', '2px solid #22d3ee', '1px solid #f472b6', '1px dotted #fbbf24', ''],
      [
        'background:linear-gradient(90deg,rgba(61,107,255,0.12),rgba(34,211,238,0.12),rgba(124,58,237,0.12));'
      ]
    )
  },
  {
    id: 'prism',
    name: '棱镜',
    apply: rulePreset(
      ['#0b1220', '#4c1d95', '#0e7490', '#be123c', '#334155', '#64748b'],
      ['2px solid #a78bfa', '2px solid #67e8f9', '1px solid #fda4af', '1px solid #ddd6fe', '1px dotted #e0f2fe', ''],
      [
        'background:linear-gradient(90deg,rgba(167,139,250,0.16),rgba(103,232,249,0.10),rgba(253,164,175,0.12));'
      ]
    )
  },
  {
    id: 'orbit',
    name: '轨道',
    apply: (el, level) => {
      paint(
        el,
        level,
        ['#0b1220', '#0b4bd6', '#1d2534', '#0b1220', '#334155', '#64748b'],
        ['2px solid #3d6bff', '2px solid #22d3ee', '1px dashed #93c5fd', '1px solid #dbeafe', '1px dotted #dbeafe', ''],
        ['', 'background:linear-gradient(90deg,rgba(61,107,255,0.08),transparent);']
      )
      if (level === 1) {
        addAffix(el, '◉', 'color:#22d3ee;margin-right:10px;font-size:15px;vertical-align:middle;', 'before')
        addAffix(el, '◉', 'color:#22d3ee;margin-left:10px;font-size:15px;vertical-align:middle;', 'after')
      }
    }
  },
  {
    id: 'signal',
    name: '信号',
    apply: (el, level) => {
      paint(
        el,
        level,
        ['#0b1220', '#0e7490', '#1d2534', '#0b1220', '#334155', '#64748b'],
        ['2px solid #22d3ee', '2px solid #22d3ee', '1px solid #a5f3fc', '1px solid #cffafe', '1px dotted #cffafe', ''],
        ['background:linear-gradient(90deg,rgba(34,211,238,0.14),rgba(255,255,255,0));']
      )
      if (level === 1) {
        addAffix(el, '▍', 'color:#3d6bff;margin-right:8px;', 'before')
        addAffix(el, '▍', 'color:#22d3ee;margin-left:8px;', 'after')
      }
    }
  },
  {
    id: 'radar',
    name: '雷达',
    apply: (el, level) => {
      paint(
        el,
        level,
        ['#052e2b', '#047857', '#0f172a', '#0e7490', '#334155', '#64748b'],
        ['2px solid #34d399', '2px solid #34d399', '1px dashed #6ee7b7', '1px solid #bbf7d0', '1px dotted #bbf7d0', '']
      )
      if (level === 1) {
        addAffix(el, '◈', 'color:#10b981;margin-right:10px;font-size:15px;', 'before')
        addAffix(el, '◈', 'color:#10b981;margin-left:10px;font-size:15px;', 'after')
      }
    }
  },
  {
    id: 'wireframe',
    name: '线框',
    apply: rulePreset(
      ['#0f172a', '#0f172a', '#1e293b', '#334155', '#475569', '#64748b'],
      ['1px solid #94a3b8', '2px solid #94a3b8', '1px solid #cbd5e1', '1px solid #e2e8f0', '1px dotted #e2e8f0', ''],
      [
        'border-left:1px solid #94a3b8;border-right:1px solid #94a3b8;padding-left:14px;padding-right:14px;',
        'padding-left:10px;',
        'padding-left:8px;'
      ]
    )
  },
  {
    id: 'corner',
    name: '角标',
    apply: (el, level) => {
      paint(
        el,
        level,
        ['#0b1220', '#1d2534', '#1d2534', '#334155', '#475569', '#64748b'],
        ['1px solid #dbe6ff', '2px solid #3d6bff', '1px solid #cbd5e1', '1px solid #e2e8f0', '1px dotted #e2e8f0', ''],
        ['', 'background:#f8faff;']
      )
      if (level === 1) {
        addAffix(el, '⌜', `color:#3d6bff;font-family:${MONO};margin-right:8px;font-size:18px;`, 'before')
        addAffix(el, '⌟', `color:#3d6bff;font-family:${MONO};margin-left:8px;font-size:18px;`, 'after')
      }
    }
  },
  {
    id: 'ruler',
    name: '刻度',
    apply: rulePreset(
      ['#0b1220', '#1d2534', '#1d2534', '#334155', '#475569', '#64748b'],
      ['2px solid #3d6bff', '1px solid #94a3b8', '1px solid #cbd5e1', '1px solid #e2e8f0', '1px dotted #e2e8f0', ''],
      ['letter-spacing:4px;', 'letter-spacing:1px;', '', '', '', 'letter-spacing:1px;']
    )
  },
  {
    id: 'zen',
    name: '留白',
    apply: rulePreset(
      ['#111827', '#1f2937', '#1f2937', '#334155', '#475569', '#6b7280'],
      ['1px solid #e5e7eb', '1px solid #d1d5db', '1px solid #e5e7eb', '1px dotted #e5e7eb', '1px dotted #f1f5f9', ''],
      ['letter-spacing:6px;font-weight:600;', 'letter-spacing:2px;font-weight:600;', '', '', '', '']
    )
  },
  {
    id: 'noir',
    name: '墨黑',
    apply: rulePreset(
      ['#0f172a', '#0f172a', '#1e293b', '#334155', '#475569', '#64748b'],
      ['', '2px solid #0f172a', '1px solid #cbd5e1', '1px solid #e2e8f0', '1px dotted #e2e8f0', ''],
      [
        'background:#0f172a;color:#f8fafc;border-radius:8px;padding:11px 16px;letter-spacing:1px;',
        'background:#f8fafc;'
      ]
    )
  }
]

export const HEADING_PRESETS: HeadingPreset[] = [...BASE_HEADING_PRESETS, ...TECH_HEADING_PRESETS]

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  {
    id: 'none',
    name: '纯白',
    pageStyle: '',
    swatch: 'background:#ffffff;',
    padded: false
  },
  {
    id: 'grid',
    name: '网格',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:radial-gradient(circle at 100% 0%,rgba(34,211,238,0.10),transparent 42%),' +
      'linear-gradient(rgba(61,107,255,0.10) 1px,transparent 1px),linear-gradient(90deg,rgba(61,107,255,0.10) 1px,transparent 1px);' +
      'background-size:auto,24px 24px,24px 24px;',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:radial-gradient(circle at 100% 0%,rgba(34,211,238,0.35),transparent 55%),' +
      'linear-gradient(rgba(61,107,255,0.26) 1px,transparent 1px),linear-gradient(90deg,rgba(61,107,255,0.26) 1px,transparent 1px);' +
      'background-size:auto,7px 7px,7px 7px;',
    padded: true
  },
  {
    id: 'dots',
    name: '点阵',
    pageStyle: 'background-color:#fcfdff;background-image:radial-gradient(rgba(61,107,255,0.16) 1px,transparent 1px);background-size:18px 18px;',
    swatch: 'background-color:#fcfdff;background-image:radial-gradient(rgba(61,107,255,0.34) 1px,transparent 1px);background-size:6px 6px;',
    padded: true
  },
  {
    id: 'blueprint',
    name: '蓝图',
    pageStyle:
      'background-color:#f7faff;' +
      'background-image:radial-gradient(circle at 18% 0%,rgba(61,107,255,0.10),transparent 42%),' +
      'linear-gradient(rgba(61,107,255,0.09) 1px,transparent 1px),linear-gradient(90deg,rgba(61,107,255,0.09) 1px,transparent 1px);' +
      'background-size:auto,32px 32px,32px 32px;',
    swatch:
      'background-color:#f7faff;' +
      'background-image:radial-gradient(circle at 18% 0%,rgba(61,107,255,0.35),transparent 60%),' +
      'linear-gradient(rgba(61,107,255,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(61,107,255,0.2) 1px,transparent 1px);' +
      'background-size:auto,7px 7px,7px 7px;',
    padded: true
  },
  {
    id: 'diagonal',
    name: '斜纹',
    pageStyle:
      'background-color:#fbfcff;' +
      'background-image:repeating-linear-gradient(135deg,rgba(61,107,255,0.07) 0,rgba(61,107,255,0.07) 1px,transparent 1px,transparent 10px);',
    swatch:
      'background-color:#fbfcff;' +
      'background-image:repeating-linear-gradient(135deg,rgba(61,107,255,0.3) 0,rgba(61,107,255,0.3) 1px,transparent 1px,transparent 6px);',
    padded: true
  },
  {
    id: 'scanline',
    name: '扫描线',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:repeating-linear-gradient(0deg,rgba(15,23,42,0.045) 0,rgba(15,23,42,0.045) 1px,transparent 1px,transparent 4px);',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:repeating-linear-gradient(0deg,rgba(15,23,42,0.22) 0,rgba(15,23,42,0.22) 1px,transparent 1px,transparent 3px);',
    padded: true
  },
  {
    id: 'cross',
    name: '交叉网格',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:repeating-linear-gradient(45deg,rgba(61,107,255,0.06) 0,rgba(61,107,255,0.06) 1px,transparent 1px,transparent 12px),' +
      'repeating-linear-gradient(-45deg,rgba(61,107,255,0.06) 0,rgba(61,107,255,0.06) 1px,transparent 1px,transparent 12px);',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:repeating-linear-gradient(45deg,rgba(61,107,255,0.3) 0,rgba(61,107,255,0.3) 1px,transparent 1px,transparent 6px),' +
      'repeating-linear-gradient(-45deg,rgba(61,107,255,0.3) 0,rgba(61,107,255,0.3) 1px,transparent 1px,transparent 6px);',
    padded: true
  },
  {
    id: 'stars',
    name: '星点',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:radial-gradient(rgba(61,107,255,0.22) 1px,transparent 1px),radial-gradient(rgba(34,211,238,0.20) 1px,transparent 1px);' +
      'background-size:46px 46px,73px 73px;background-position:0 0,23px 31px;',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:radial-gradient(rgba(61,107,255,0.45) 1px,transparent 1px),radial-gradient(rgba(34,211,238,0.4) 1px,transparent 1px);' +
      'background-size:12px 12px,17px 17px;background-position:0 0,5px 7px;',
    padded: true
  },
  {
    id: 'circuit',
    name: '电路板',
    pageStyle:
      'background-color:#f8fbff;' +
      'background-image:linear-gradient(90deg,rgba(61,107,255,0.08) 1px,transparent 1px),' +
      'linear-gradient(rgba(61,107,255,0.08) 1px,transparent 1px),' +
      'radial-gradient(rgba(34,211,238,0.28) 1.4px,transparent 1.4px);' +
      'background-size:48px 48px,48px 48px,48px 48px;background-position:0 0,0 0,23px 23px;',
    swatch:
      'background-color:#f8fbff;' +
      'background-image:linear-gradient(90deg,rgba(61,107,255,0.25) 1px,transparent 1px),' +
      'linear-gradient(rgba(61,107,255,0.25) 1px,transparent 1px),' +
      'radial-gradient(rgba(34,211,238,0.55) 1px,transparent 1px);' +
      'background-size:10px 10px,10px 10px,10px 10px;background-position:0 0,0 0,4px 4px;',
    padded: true
  },
  {
    id: 'matrix',
    name: '矩阵',
    pageStyle:
      'background-color:#f7fbf9;' +
      'background-image:linear-gradient(rgba(16,185,129,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,0.08) 1px,transparent 1px);' +
      'background-size:12px 12px;',
    swatch:
      'background-color:#f7fbf9;' +
      'background-image:linear-gradient(rgba(16,185,129,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,0.3) 1px,transparent 1px);' +
      'background-size:6px 6px;',
    padded: true
  },
  {
    id: 'mesh',
    name: '极光',
    pageStyle:
      'background-color:#fbfcff;' +
      'background-image:radial-gradient(circle at 12% 8%,rgba(61,107,255,0.14),transparent 38%),' +
      'radial-gradient(circle at 88% 4%,rgba(34,211,238,0.13),transparent 34%),' +
      'radial-gradient(circle at 50% 100%,rgba(122,92,255,0.10),transparent 46%);',
    swatch:
      'background-color:#fbfcff;' +
      'background-image:radial-gradient(circle at 12% 8%,rgba(61,107,255,0.55),transparent 55%),' +
      'radial-gradient(circle at 88% 4%,rgba(34,211,238,0.5),transparent 50%),' +
      'radial-gradient(circle at 50% 100%,rgba(122,92,255,0.45),transparent 60%);',
    padded: true
  },
  {
    id: 'carbon',
    name: '碳纤维',
    pageStyle:
      'background-color:#f6f8fc;' +
      'background-image:linear-gradient(45deg,rgba(15,23,42,0.045) 25%,transparent 25%,transparent 75%,rgba(15,23,42,0.045) 75%),' +
      'linear-gradient(45deg,rgba(15,23,42,0.045) 25%,transparent 25%,transparent 75%,rgba(15,23,42,0.045) 75%);' +
      'background-size:16px 16px;background-position:0 0,8px 8px;',
    swatch:
      'background-color:#f6f8fc;' +
      'background-image:linear-gradient(45deg,rgba(15,23,42,0.16) 25%,transparent 25%,transparent 75%,rgba(15,23,42,0.16) 75%),' +
      'linear-gradient(45deg,rgba(15,23,42,0.16) 25%,transparent 25%,transparent 75%,rgba(15,23,42,0.16) 75%);' +
      'background-size:6px 6px;background-position:0 0,3px 3px;',
    padded: true
  },
  {
    id: 'radial',
    name: '涟漪',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:repeating-radial-gradient(circle at 0 0,rgba(61,107,255,0.07) 0,rgba(61,107,255,0.07) 1px,transparent 1px,transparent 18px);',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:repeating-radial-gradient(circle at 0 0,rgba(61,107,255,0.3) 0,rgba(61,107,255,0.3) 1px,transparent 1px,transparent 8px);',
    padded: true
  },
  {
    id: 'tri',
    name: '三角网格',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:repeating-linear-gradient(0deg,rgba(61,107,255,0.06) 0,rgba(61,107,255,0.06) 1px,transparent 1px,transparent 16px),' +
      'repeating-linear-gradient(60deg,rgba(61,107,255,0.06) 0,rgba(61,107,255,0.06) 1px,transparent 1px,transparent 16px),' +
      'repeating-linear-gradient(120deg,rgba(61,107,255,0.06) 0,rgba(61,107,255,0.06) 1px,transparent 1px,transparent 16px);',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:repeating-linear-gradient(0deg,rgba(61,107,255,0.26) 0,rgba(61,107,255,0.26) 1px,transparent 1px,transparent 8px),' +
      'repeating-linear-gradient(60deg,rgba(61,107,255,0.26) 0,rgba(61,107,255,0.26) 1px,transparent 1px,transparent 8px),' +
      'repeating-linear-gradient(120deg,rgba(61,107,255,0.26) 0,rgba(61,107,255,0.26) 1px,transparent 1px,transparent 8px);',
    padded: true
  },
  {
    id: 'horizon',
    name: '地平线',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:linear-gradient(180deg,rgba(61,107,255,0.07),transparent 42%),' +
      'repeating-linear-gradient(0deg,rgba(15,23,42,0.045) 0,rgba(15,23,42,0.045) 1px,transparent 1px,transparent 24px);',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:linear-gradient(180deg,rgba(61,107,255,0.35),transparent 60%),' +
      'repeating-linear-gradient(0deg,rgba(15,23,42,0.22) 0,rgba(15,23,42,0.22) 1px,transparent 1px,transparent 7px);',
    padded: true
  },
  {
    id: 'aurora',
    name: '极光带',
    pageStyle:
      'background-color:#fbfcff;' +
      'background-image:linear-gradient(120deg,rgba(61,107,255,0.10),rgba(34,211,238,0.08),rgba(124,58,237,0.10)),' +
      'repeating-linear-gradient(0deg,rgba(15,23,42,0.03) 0,rgba(15,23,42,0.03) 1px,transparent 1px,transparent 22px);',
    swatch:
      'background-color:#fbfcff;' +
      'background-image:linear-gradient(120deg,rgba(61,107,255,0.55),rgba(34,211,238,0.45),rgba(124,58,237,0.5)),' +
      'repeating-linear-gradient(0deg,rgba(15,23,42,0.14) 0,rgba(15,23,42,0.14) 1px,transparent 1px,transparent 8px);',
    padded: true
  },
  {
    id: 'grain',
    name: '微尘',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:radial-gradient(rgba(15,23,42,0.10) 1px,transparent 1px),' +
      'radial-gradient(rgba(61,107,255,0.10) 1px,transparent 1px),' +
      'radial-gradient(rgba(34,211,238,0.10) 1px,transparent 1px);' +
      'background-size:11px 13px,17px 19px,23px 29px;background-position:0 0,5px 7px,11px 3px;',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:radial-gradient(rgba(15,23,42,0.3) 1px,transparent 1px),' +
      'radial-gradient(rgba(61,107,255,0.3) 1px,transparent 1px),' +
      'radial-gradient(rgba(34,211,238,0.3) 1px,transparent 1px);' +
      'background-size:6px 7px,9px 10px,12px 14px;background-position:0 0,3px 4px,6px 2px;',
    padded: true
  },
  {
    id: 'pulse',
    name: '脉冲',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:radial-gradient(circle at 50% 0%,rgba(34,211,238,0.12),transparent 45%),' +
      'repeating-radial-gradient(circle at 50% 0%,rgba(61,107,255,0.08) 0,rgba(61,107,255,0.08) 1px,transparent 1px,transparent 26px);',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:radial-gradient(circle at 50% 0%,rgba(34,211,238,0.5),transparent 60%),' +
      'repeating-radial-gradient(circle at 50% 0%,rgba(61,107,255,0.3) 0,rgba(61,107,255,0.3) 1px,transparent 1px,transparent 9px);',
    padded: true
  },
  {
    id: 'topo',
    name: '等高线',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:repeating-radial-gradient(circle at 28% 18%,transparent 0,transparent 12px,rgba(61,107,255,0.07) 12px,rgba(61,107,255,0.07) 13px,transparent 13px,transparent 22px);',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:repeating-radial-gradient(circle at 28% 18%,transparent 0,transparent 4px,rgba(61,107,255,0.28) 4px,rgba(61,107,255,0.28) 5px,transparent 5px,transparent 9px);',
    padded: true
  },
  {
    id: 'glow',
    name: '光晕',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:radial-gradient(circle at 0% 0%,rgba(61,107,255,0.12),transparent 40%),' +
      'radial-gradient(circle at 100% 100%,rgba(34,211,238,0.10),transparent 42%),' +
      'linear-gradient(rgba(61,107,255,0.05) 1px,transparent 1px),' +
      'linear-gradient(90deg,rgba(61,107,255,0.05) 1px,transparent 1px);' +
      'background-size:auto,auto,28px 28px,28px 28px;',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:radial-gradient(circle at 0% 0%,rgba(61,107,255,0.55),transparent 55%),' +
      'radial-gradient(circle at 100% 100%,rgba(34,211,238,0.45),transparent 55%),' +
      'linear-gradient(rgba(61,107,255,0.18) 1px,transparent 1px),' +
      'linear-gradient(90deg,rgba(61,107,255,0.18) 1px,transparent 1px);' +
      'background-size:auto,auto,8px 8px,8px 8px;',
    padded: true
  },
  {
    id: 'hex',
    name: '六边形',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:repeating-linear-gradient(60deg,rgba(61,107,255,0.07) 0,rgba(61,107,255,0.07) 1px,transparent 1px,transparent 14px),' +
      'repeating-linear-gradient(-60deg,rgba(61,107,255,0.07) 0,rgba(61,107,255,0.07) 1px,transparent 1px,transparent 14px),' +
      'repeating-linear-gradient(0deg,rgba(61,107,255,0.045) 0,rgba(61,107,255,0.045) 1px,transparent 1px,transparent 24px);',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:repeating-linear-gradient(60deg,rgba(61,107,255,0.28) 0,rgba(61,107,255,0.28) 1px,transparent 1px,transparent 7px),' +
      'repeating-linear-gradient(-60deg,rgba(61,107,255,0.28) 0,rgba(61,107,255,0.28) 1px,transparent 1px,transparent 7px),' +
      'repeating-linear-gradient(0deg,rgba(61,107,255,0.18) 0,rgba(61,107,255,0.18) 1px,transparent 1px,transparent 12px);',
    padded: true
  },
  {
    id: 'wave',
    name: '波浪',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:repeating-radial-gradient(ellipse at 50% 0%,rgba(61,107,255,0.08) 0,rgba(61,107,255,0.08) 1px,transparent 1px,transparent 20px);',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:repeating-radial-gradient(ellipse at 50% 0%,rgba(61,107,255,0.32) 0,rgba(61,107,255,0.32) 1px,transparent 1px,transparent 9px);',
    padded: true
  },
  {
    id: 'checker',
    name: '棋盘',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:conic-gradient(rgba(61,107,255,0.07) 25%,transparent 0 50%,rgba(61,107,255,0.07) 0 75%,transparent 0);' +
      'background-size:20px 20px;',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:conic-gradient(rgba(61,107,255,0.26) 25%,transparent 0 50%,rgba(61,107,255,0.26) 0 75%,transparent 0);' +
      'background-size:8px 8px;',
    padded: true
  },
  {
    id: 'vstripe',
    name: '竖纹',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:repeating-linear-gradient(90deg,rgba(61,107,255,0.07) 0,rgba(61,107,255,0.07) 1px,transparent 1px,transparent 12px);',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:repeating-linear-gradient(90deg,rgba(61,107,255,0.3) 0,rgba(61,107,255,0.3) 1px,transparent 1px,transparent 6px);',
    padded: true
  },
  {
    id: 'neonGrid',
    name: '霓虹网格',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:linear-gradient(rgba(61,107,255,0.10) 1px,transparent 1px),' +
      'linear-gradient(90deg,rgba(34,211,238,0.10) 1px,transparent 1px);' +
      'background-size:28px 28px,28px 28px;',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:linear-gradient(rgba(61,107,255,0.32) 1px,transparent 1px),' +
      'linear-gradient(90deg,rgba(34,211,238,0.32) 1px,transparent 1px);' +
      'background-size:9px 9px,9px 9px;',
    padded: true
  },
  {
    id: 'dotgrid',
    name: '点网',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:linear-gradient(rgba(61,107,255,0.06) 1px,transparent 1px),' +
      'linear-gradient(90deg,rgba(61,107,255,0.06) 1px,transparent 1px),' +
      'radial-gradient(rgba(61,107,255,0.18) 1px,transparent 1px);' +
      'background-size:28px 28px,28px 28px,28px 28px;background-position:0 0,0 0,13px 13px;',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:linear-gradient(rgba(61,107,255,0.2) 1px,transparent 1px),' +
      'linear-gradient(90deg,rgba(61,107,255,0.2) 1px,transparent 1px),' +
      'radial-gradient(rgba(61,107,255,0.5) 1px,transparent 1px);' +
      'background-size:9px 9px,9px 9px,9px 9px;background-position:0 0,0 0,4px 4px;',
    padded: true
  },
  {
    id: 'nodes',
    name: '节点',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:linear-gradient(rgba(61,107,255,0.05) 1px,transparent 1px),' +
      'linear-gradient(90deg,rgba(61,107,255,0.05) 1px,transparent 1px),' +
      'radial-gradient(rgba(34,211,238,0.35) 2px,transparent 2px);' +
      'background-size:36px 36px,36px 36px,36px 36px;background-position:0 0,0 0,17px 17px;',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:linear-gradient(rgba(61,107,255,0.2) 1px,transparent 1px),' +
      'linear-gradient(90deg,rgba(61,107,255,0.2) 1px,transparent 1px),' +
      'radial-gradient(rgba(34,211,238,0.7) 1.6px,transparent 1.6px);' +
      'background-size:11px 11px,11px 11px,11px 11px;background-position:0 0,0 0,5px 5px;',
    padded: true
  },
  {
    id: 'ripple',
    name: '水波',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:repeating-radial-gradient(ellipse at 100% 100%,rgba(61,107,255,0.08) 0,rgba(61,107,255,0.08) 1px,transparent 1px,transparent 18px);',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:repeating-radial-gradient(ellipse at 100% 100%,rgba(61,107,255,0.3) 0,rgba(61,107,255,0.3) 1px,transparent 1px,transparent 8px);',
    padded: true
  },
  {
    id: 'beam',
    name: '光束',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:repeating-linear-gradient(115deg,transparent 0,transparent 16px,rgba(61,107,255,0.07) 16px,rgba(61,107,255,0.07) 24px,transparent 24px,transparent 40px);',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:repeating-linear-gradient(115deg,transparent 0,transparent 6px,rgba(61,107,255,0.3) 6px,rgba(61,107,255,0.3) 9px,transparent 9px,transparent 16px);',
    padded: true
  },
  {
    id: 'weave',
    name: '编织',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:repeating-linear-gradient(45deg,rgba(61,107,255,0.06) 0,rgba(61,107,255,0.06) 2px,transparent 2px,transparent 10px),' +
      'repeating-linear-gradient(-45deg,rgba(34,211,238,0.06) 0,rgba(34,211,238,0.06) 2px,transparent 2px,transparent 10px);',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:repeating-linear-gradient(45deg,rgba(61,107,255,0.28) 0,rgba(61,107,255,0.28) 1.5px,transparent 1.5px,transparent 5px),' +
      'repeating-linear-gradient(-45deg,rgba(34,211,238,0.28) 0,rgba(34,211,238,0.28) 1.5px,transparent 1.5px,transparent 5px);',
    padded: true
  },
  {
    id: 'scale',
    name: '鳞片',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:radial-gradient(circle at 50% 0%,rgba(61,107,255,0.10) 6px,transparent 6.5px),' +
      'radial-gradient(circle at 50% 100%,rgba(34,211,238,0.08) 6px,transparent 6.5px);' +
      'background-size:18px 18px;background-position:0 0,9px 9px;',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:radial-gradient(circle at 50% 0%,rgba(61,107,255,0.4) 4px,transparent 4.4px),' +
      'radial-gradient(circle at 50% 100%,rgba(34,211,238,0.35) 4px,transparent 4.4px);' +
      'background-size:11px 11px;background-position:0 0,5.5px 5.5px;',
    padded: true
  },
  {
    id: 'crosshair',
    name: '准星',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:linear-gradient(rgba(61,107,255,0.07) 1px,transparent 1px),' +
      'linear-gradient(90deg,rgba(61,107,255,0.07) 1px,transparent 1px),' +
      'radial-gradient(circle,transparent 0,transparent 4px,rgba(34,211,238,0.28) 4px,rgba(34,211,238,0.28) 4.6px,transparent 4.6px);' +
      'background-size:30px 30px,30px 30px,30px 30px;background-position:0 0,0 0,15px 15px;',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:linear-gradient(rgba(61,107,255,0.22) 1px,transparent 1px),' +
      'linear-gradient(90deg,rgba(61,107,255,0.22) 1px,transparent 1px),' +
      'radial-gradient(circle,transparent 0,transparent 3px,rgba(34,211,238,0.6) 3px,rgba(34,211,238,0.6) 3.5px,transparent 3.5px);' +
      'background-size:11px 11px,11px 11px,11px 11px;background-position:0 0,0 0,5.5px 5.5px;',
    padded: true
  },
  {
    id: 'pixel',
    name: '像素',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:conic-gradient(from 90deg at 50% 50%,rgba(61,107,255,0.08) 25%,transparent 0 50%,rgba(61,107,255,0.08) 0 75%,transparent 0);' +
      'background-size:14px 14px;',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:conic-gradient(from 90deg at 50% 50%,rgba(61,107,255,0.3) 25%,transparent 0 50%,rgba(61,107,255,0.3) 0 75%,transparent 0);' +
      'background-size:7px 7px;',
    padded: true
  },
  {
    id: 'constellation',
    name: '星座',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:radial-gradient(rgba(61,107,255,0.35) 1.4px,transparent 1.4px),' +
      'radial-gradient(rgba(34,211,238,0.30) 1px,transparent 1px),' +
      'radial-gradient(rgba(124,58,237,0.28) 1px,transparent 1px);' +
      'background-size:70px 70px,50px 50px,90px 90px;background-position:0 0,20px 30px,40px 10px;',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:radial-gradient(rgba(61,107,255,0.7) 1px,transparent 1px),' +
      'radial-gradient(rgba(34,211,238,0.65) 1px,transparent 1px),' +
      'radial-gradient(rgba(124,58,237,0.6) 1px,transparent 1px);' +
      'background-size:16px 16px,11px 11px,20px 20px;background-position:0 0,5px 7px,9px 3px;',
    padded: true
  },
  {
    id: 'cells',
    name: '蜂窝点',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:repeating-linear-gradient(60deg,rgba(61,107,255,0.05) 0,rgba(61,107,255,0.05) 1px,transparent 1px,transparent 16px),' +
      'repeating-linear-gradient(-60deg,rgba(61,107,255,0.05) 0,rgba(61,107,255,0.05) 1px,transparent 1px,transparent 16px),' +
      'radial-gradient(rgba(34,211,238,0.30) 1.5px,transparent 1.5px);' +
      'background-size:auto,auto,20px 20px;background-position:0 0,0 0,9px 9px;',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:repeating-linear-gradient(60deg,rgba(61,107,255,0.2) 0,rgba(61,107,255,0.2) 1px,transparent 1px,transparent 8px),' +
      'repeating-linear-gradient(-60deg,rgba(61,107,255,0.2) 0,rgba(61,107,255,0.2) 1px,transparent 1px,transparent 8px),' +
      'radial-gradient(rgba(34,211,238,0.6) 1px,transparent 1px);' +
      'background-size:auto,auto,10px 10px;background-position:0 0,0 0,4px 4px;',
    padded: true
  },
  {
    id: 'swirl',
    name: '漩涡',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:repeating-conic-gradient(from 0deg at 50% 50%,rgba(61,107,255,0.07) 0,rgba(61,107,255,0.07) 8deg,transparent 8deg,transparent 18deg);',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:repeating-conic-gradient(from 0deg at 50% 50%,rgba(61,107,255,0.28) 0,rgba(61,107,255,0.28) 10deg,transparent 10deg,transparent 24deg);',
    padded: true
  },
  {
    id: 'skyline',
    name: '天际线',
    pageStyle:
      'background-color:#fbfdff;' +
      'background-image:repeating-linear-gradient(90deg,transparent 0,transparent 10px,rgba(61,107,255,0.10) 10px,rgba(61,107,255,0.10) 11px,transparent 11px,transparent 16px),' +
      'linear-gradient(180deg,rgba(34,211,238,0.08),transparent 45%);',
    swatch:
      'background-color:#fbfdff;' +
      'background-image:repeating-linear-gradient(90deg,transparent 0,transparent 4px,rgba(61,107,255,0.35) 4px,rgba(61,107,255,0.35) 5px,transparent 5px,transparent 8px),' +
      'linear-gradient(180deg,rgba(34,211,238,0.35),transparent 60%);',
    padded: true
  },
  {
    id: 'frost',
    name: '霜纹',
    pageStyle:
      'background-color:#f8fcff;' +
      'background-image:repeating-linear-gradient(135deg,rgba(56,189,248,0.08) 0,rgba(56,189,248,0.08) 1px,transparent 1px,transparent 9px),' +
      'linear-gradient(180deg,rgba(186,230,253,0.25),transparent 40%);',
    swatch:
      'background-color:#f8fcff;' +
      'background-image:repeating-linear-gradient(135deg,rgba(56,189,248,0.32) 0,rgba(56,189,248,0.32) 1px,transparent 1px,transparent 5px),' +
      'linear-gradient(180deg,rgba(186,230,253,0.6),transparent 60%);',
    padded: true
  },
  {
    id: 'lava',
    name: '熔岩',
    pageStyle:
      'background-color:#fff8f5;' +
      'background-image:radial-gradient(circle at 12% 0%,rgba(239,68,68,0.12),transparent 42%),' +
      'radial-gradient(circle at 88% 100%,rgba(249,115,22,0.10),transparent 46%),' +
      'repeating-linear-gradient(0deg,rgba(239,68,68,0.04) 0,rgba(239,68,68,0.04) 1px,transparent 1px,transparent 26px);',
    swatch:
      'background-color:#fff8f5;' +
      'background-image:radial-gradient(circle at 12% 0%,rgba(239,68,68,0.6),transparent 60%),' +
      'radial-gradient(circle at 88% 100%,rgba(249,115,22,0.5),transparent 62%),' +
      'repeating-linear-gradient(0deg,rgba(239,68,68,0.18) 0,rgba(239,68,68,0.18) 1px,transparent 1px,transparent 9px);',
    padded: true
  },
  {
    id: 'deepsea',
    name: '深海',
    pageStyle:
      'background-color:#f4faff;' +
      'background-image:linear-gradient(180deg,rgba(3,105,161,0.10),rgba(224,242,254,0.10) 55%,rgba(3,105,161,0.08)),' +
      'repeating-radial-gradient(ellipse at 0% 100%,rgba(3,105,161,0.07) 0,rgba(3,105,161,0.07) 1px,transparent 1px,transparent 22px);',
    swatch:
      'background-color:#f4faff;' +
      'background-image:linear-gradient(180deg,rgba(3,105,161,0.45),rgba(224,242,254,0.4) 55%,rgba(3,105,161,0.4)),' +
      'repeating-radial-gradient(ellipse at 0% 100%,rgba(3,105,161,0.3) 0,rgba(3,105,161,0.3) 1px,transparent 1px,transparent 9px);',
    padded: true
  }
]

export function findBackground(id: BackgroundId): BackgroundPreset {
  return BACKGROUND_PRESETS.find((item) => item.id === id) ?? BACKGROUND_PRESETS[0]
}

export function findHeading(id: HeadingStyleId): HeadingPreset {
  return HEADING_PRESETS.find((item) => item.id === id) ?? HEADING_PRESETS[0]
}
