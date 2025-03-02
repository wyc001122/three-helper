<script lang='ts' setup>
import { computed } from 'vue'

const props = defineProps<{
  value: any
}>()

// 获取纹理的预览信息
const textureInfo = computed(() => {
  const texture = props.value
  return {
    name: texture.name || '未命名贴图',
    width: texture.image?.width || 0,
    height: texture.image?.height || 0,
    source: texture.source?.data?.currentSrc || texture.image?.src || null
  }
})

// 格式化纹理显示文本
const formattedText = computed(() => {
  const info = textureInfo.value
  return `<Texture ${info.name} (${info.width}×${info.height})>`
})

// 详细的纹理信息提示
const tooltipInfo = computed(() => {
  const texture = props.value
  const info = textureInfo.value
  return `纹理: ${info.name}
尺寸: ${info.width}×${info.height}
UUID: ${texture.uuid || '无'}
类型: ${texture.constructor?.name || 'Texture'}`
})
</script>

<template>
  <div v-if="textureInfo.source" class="flex items-center gap-1">
    <img :src="textureInfo.source"
      class="w-16 h-16 object-cover border border-gray-300 dark:border-gray-700 rounded-sm"
      :title="tooltipInfo" />
  </div>
  <span v-else class="text-[#267f99] dark:text-[#4EC9B0]" :title="tooltipInfo">{{ formattedText }}</span>
</template> 