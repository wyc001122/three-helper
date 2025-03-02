<script lang='ts' setup>
import { computed } from 'vue'

const props = defineProps<{
  value: any
}>()

// 获取HTML元素的标签名
const getHTMLTagName = (element: any): string => {
  if (!element) return 'HTML'

  // 尝试获取标签名
  if (element.tagName) {
    return element.tagName.toLowerCase()
  }

  if (element.nodeName) {
    return element.nodeName.toLowerCase()
  }

  return 'HTML'
}

const tagName = computed(() => getHTMLTagName(props.value))

// 获取元素的详细信息
const elementDetails = computed(() => {
  const element = props.value
  if (!element) return '未知HTML元素'
  
  let details = `元素: <${tagName.value}>`
  
  // 添加ID信息
  if (element.id) {
    details += `\nID: ${element.id}`
  }
  
  // 添加类名信息
  if (element.className && typeof element.className === 'string' && element.className.trim()) {
    details += `\n类名: ${element.className}`
  }
  
  // 添加尺寸信息（如果可用）
  if (element.offsetWidth !== undefined && element.offsetHeight !== undefined) {
    details += `\n尺寸: ${element.offsetWidth}×${element.offsetHeight}`
  }
  
  return details
})
</script>

<template>
  <span class="text-[#267f99] dark:text-[#4EC9B0]" :title="elementDetails">&lt;{{ tagName }}&gt;</span>
</template> 