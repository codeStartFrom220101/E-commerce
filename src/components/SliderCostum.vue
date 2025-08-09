<template>
  <svg viewBox="0 0 120 120" preserveAspectRatio="xMidYMid meet" class="svg">
    <!-- 外圈：小圓點 -->
    <g id="circle-spot" :transform="`rotate(${rotateAngleCircle % 360}, ${CX}, ${CY})`">
      <circle
        v-for="(c, i) in circles" :key="i"
        :cx="c.cx" :cy="c.cy"
        :r="i === topCircleIndex ? 1.2 : 0.8"
        :class="i === topCircleIndex ? 'st1' : 'st3'"
      />
    </g>

    <!-- 內圈：文字 -->
    <g id="font-spot" :transform="`rotate(${rotateAngleFont % 360}, ${CX}, ${CY})`">
      <template v-for="(lbl, i) in visibleLabels" :key="i">
        <text
          :x="lbl.x" :y="lbl.y"
          text-anchor="middle" dominant-baseline="middle"
          :transform="`rotate(${lbl.baseAngle + 90}, ${lbl.x}, ${lbl.y})`"
          class="text"
          :class="{ focus: i === topVisibleLabelIndex }"
        >
          {{ lbl.text }}
        </text>
      </template>
    </g>
  </svg>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

/* ====== 基本參數 ====== */
const VBW = 120, VBH = 120
const CX = 60,  CY = 60
const N  = 8                 // 一圈 8 格
const STEP_DEG = -45         // 每步旋轉角度（順/逆時針自己選）
const STEP_MS  = 2000        // 每步時間（毫秒）
const R_OUT = 56             // 文字/圖片所在半徑（依你實際需求調整）

/* ====== 小工具 ====== */
const norm = a => ((a % 360) + 360) % 360
const angleDiff = (a, b) => Math.abs(((a - b + 540) % 360) - 180)
function posFromAngle(deg) {
  const rad = deg * Math.PI / 180
  return { x: CX + R_OUT * Math.cos(rad), y: CY + R_OUT * Math.sin(rad) }
}
/** 由一組 baseAngles 找「目前在頂部(270°)」的 index */
function topIndexFromBase(baseAngles, rotateAngle, topDeg = 270) {
  let bestI = 0, bestD = Infinity
  for (let i = 0; i < baseAngles.length; i++) {
    const d = angleDiff(norm(baseAngles[i] + rotateAngle), topDeg)
    if (d < bestD) { bestD = d; bestI = i }
  }
  return bestI
}

/* ====== 旋轉：以「步數」為唯一真相，角度由步數推導 ====== */
const stepIndex = ref(0)                      // 唯一真相：第幾步
const rotateAngleFont   = computed(() => STEP_DEG * (stepIndex.value % N))
const rotateAngleCircle = computed(() => STEP_DEG * (stepIndex.value % N)) // 需要時間差可在這裡加固定偏移

let t0 = 0, rafId
function loop(t) {
  // 時間→步數：避免切分頁/卡頓導致半步
  
  const i = Math.floor((t - t0) / STEP_MS)
  stepIndex.value = i
  rafId = requestAnimationFrame(loop)
}
onMounted(() => { t0 = performance.now(); rafId = requestAnimationFrame(loop) })
onBeforeUnmount(() => cancelAnimationFrame(rafId))
document.addEventListener('visibilitychange', () => { if (!document.hidden) t0 = performance.now() - stepIndex.value * STEP_MS })

/* ====== 外圈小圓點 ====== */
const circles = ref([
  { cx: 60,   cy: 10 },
  { cx: 24.6, cy: 24.6 },
  { cx: 10,   cy: 60 },
  { cx: 24.6, cy: 95.4 },
  { cx: 60,   cy: 110 },
  { cx: 95.4, cy: 95.4 },
  { cx: 110,  cy: 60 },
  { cx: 95.4, cy: 24.6 }
])
// 只算一次：每顆點的 baseAngle
circles.value.forEach(c => {
  c.baseAngle = norm(Math.atan2(c.cy - CY, c.cx - CX) * 180 / Math.PI)
})
const topCircleIndex = computed(() =>
  topIndexFromBase(circles.value.map(c => c.baseAngle), rotateAngleCircle.value)
)

/* ====== 內圈文字（只顯示 3 個，但各自有 baseAngle） ====== */
const visibleLabels = ref([])   // 每項：{ text, baseAngle, x, y }
const currentIndex = ref(0)
// 這裡用你的資料來源替換
const originalItems = ref([
  { text: '貓咪' }, { text: '狗狗' }, { text: '刺蝟' }, { text: '海豹' },
  { text: '熊熊' }, { text: '兔兔' }, { text: '長頸鹿' }, { text: '企鵝' }
])

function pushNextLabel(baseAngle) {
  const item = originalItems.value[currentIndex.value % originalItems.value.length]
  const { x, y } = posFromAngle(baseAngle)
  visibleLabels.value.push({ text: item.text, baseAngle, x, y })
  if (visibleLabels.value.length > 3) visibleLabels.value.shift()
  currentIndex.value++
}
// 範例：初始化先塞三個（依你實際邏輯替換）
;[270, 315, 0].forEach(a => pushNextLabel(a))

// 目前三個可見文字裡，哪個在頂部
const topVisibleLabelIndex = computed(() =>
  topIndexFromBase(visibleLabels.value.map(l => l.baseAngle), rotateAngleFont.value)
)
</script>

<style scoped>
.svg { width: 100%; height: auto; display: block; }
.st1 { fill: #333; }      /* 頂部小點 */
.st3 { fill: #9aa0a6; }   /* 其他小點 */
.text { font-size: 8px; fill: #222; transition: font-weight .4s;}
.text.focus { font-weight: 700; }
</style>