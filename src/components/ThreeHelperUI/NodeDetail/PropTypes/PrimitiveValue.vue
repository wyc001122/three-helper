<script lang='ts' setup>
import { computed, ref, onBeforeUnmount } from 'vue'

const props = defineProps<{
  value: any,
  label: string,
  valueType: string,
  constantName?: string
  rawData?: any
}>()

// 格式化基本类型值的显示
const formattedValue = computed(() => {
  const value = props.rawData[props.label];
  // if (refreshKey.value < 0) {
  //   return
  // }
  refreshKey.value
  if (props.constantName) {
    return `${props.constantName}(${value})`
  }

  if (props.valueType === 'string') return `"${value}"`
  if (props.valueType === 'undefined') return 'undefined'
  if (props.valueType === 'null') return 'null'
  if (props.valueType === 'function') return 'ƒ () { ... }'

  return String(value)
})

// 根据类型确定CSS类名
const valueClass = computed(() => {
  const classMap: Record<string, string> = {
    'string': 'text-[#A31515] dark:text-[#CE9178]',
    'boolean': 'text-[#0000FF] dark:text-[#569CD6]',
    'number': 'text-[#098658] dark:text-[#B5CEA8]',
    'typedarray': 'text-[#098658] dark:text-[#B5CEA8]',
    'undefined': 'text-[#7A7A7A] dark:text-[#808080]',
    'null': 'text-[#7A7A7A] dark:text-[#808080]',
    'function': 'text-[#795E26] dark:text-[#DCDCAA]'
  }

  return classMap[props.valueType] || ''
})

// 获取详细的提示信息
const tooltipInfo = computed(() => {
  // 如果有常量名，显示常量信息
  if (props.constantName) {
    return `${props.constantName}(${props.value})`
  }

  // 根据不同类型提供不同的提示
  return String(props.value)
})

// 监听值变化
let refreshKey = ref(1)
let oldV: any;
let timer: any;
function hasChange() {
  if (oldV !== props.rawData[props.label]) {
    refreshKey.value++
  }
  oldV = props.rawData[props.label]
  timer = setTimeout(() => {
    hasChange()
  }, 500);
}

onBeforeUnmount(() => {
  timer && clearTimeout(timer)
})

hasChange()
</script>

<template>
  <span :class="valueClass" :title="tooltipInfo" class="text-[12px]" :key="refreshKey">{{ formattedValue }}</span>
</template>