<script lang='ts' setup>
import { computed } from 'vue'

const props = defineProps<{
  value: any,
  valueType: string,
  isExpanded: boolean
}>()

// 计算子元素数量
const childrenCount = computed(() => {
  if (props.valueType === 'array' || props.valueType === 'typedarray') {
    return `${props.value.length} items`
  }
  const count = Object.keys(props.value || {}).length
  return `${count} ${count === 1 ? 'property' : 'properties'}`
})

// 格式化对象/数组显示
const formattedValue = computed(() => {
  if (props.valueType === 'array') {
    const length = props.value.length
    if (length === 0) return '[]'
    return `Array(${length})`
  }
  if (props.valueType === 'typedarray') {
    const typeName = props.value.constructor.name
    const length = props.value.length
    if (length === 0) return `${typeName}[]`
    return `${typeName}(${length})`
  }
  
  const keys = Object.keys(props.value || {})
  if (keys.length === 0) {
    // 检查是否为DOM元素但未被识别
    if (props.value.toString && props.value.toString() === '[object HTMLElement]') {
      return '<HTML>'
    }
    return '{}'
  }
  return '{ ... }'
})

// 获取对象的详细信息
const objectDetails = computed(() => {
  const value = props.value
  if (!value) return '空对象'
  
  let details = ''
  
  // 添加类型信息
  if (props.valueType === 'array') {
    details += `数组: ${value.length} 项`
  } else if (props.valueType === 'typedarray') {
    details += `类型化数组: ${value.constructor.name}(${value.length})`
  } else {
    const constructor = value.constructor?.name || 'Object'
    details += `对象: ${constructor}`
    
    // 添加Three.js对象的特殊信息
    if (value.isObject3D) {
      details += `\n类型: ${value.type || 'Object3D'}`
      details += `\nUUID: ${value.uuid || '无'}`
      if (value.name) details += `\n名称: ${value.name}`
    }
  }
  
  // 添加属性数量信息
  const keys = Object.keys(value)
  details += `\n属性数量: ${keys.length}`
  
  // 添加前几个属性的预览
  if (keys.length > 0) {
    const previewKeys = keys.slice(0, 3)
    details += `\n预览: { ${previewKeys.map(k => `${k}: ...`).join(', ')}${keys.length > 3 ? ', ...' : ''} }`
  }
  
  return details
})
</script>

<template>
  <span class="text-[12px] text-[#001080] dark:text-[#9CDCFE]" :title="objectDetails">
    {{ formattedValue }}
    <span v-if="!isExpanded" class="text-[#919191] dark:text-[#6B6B6B]">
      {{ ` // ${childrenCount}` }}
    </span>
  </span>
</template> 