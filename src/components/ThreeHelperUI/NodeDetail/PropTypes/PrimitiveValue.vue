<script lang='ts' setup>
import { computed } from 'vue'

const props = defineProps<{
  value: any,
  valueType: string,
  constantName?: string
}>()

// 格式化基本类型值的显示
const formattedValue = computed(() => {
  if (props.constantName) {
    return `${props.constantName}(${props.value})`
  }

  if (props.valueType === 'string') return `"${props.value}"`
  if (props.valueType === 'undefined') return 'undefined'
  if (props.valueType === 'null') return 'null'
  if (props.valueType === 'function') return 'ƒ () { ... }'

  return String(props.value)
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
</script>

<template>
  <span :class="valueClass" :title="tooltipInfo" class=text-[12px]>{{ formattedValue }}</span>
</template>