<script lang='ts' setup>
import { computed } from 'vue'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from '@/components/ui/context-menu'

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

// 下载纹理图片
function downloadTexture() {
  if (!textureInfo.value.source) return

  const link = document.createElement('a')
  link.href = textureInfo.value.source
  link.download = `${textureInfo.value.name || 'texture'}.png`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// 在新窗口预览纹理
function previewTexture() {
  if (!textureInfo.value.source) return
  window.open(textureInfo.value.source, '_blank')
}

// 是图片
const isImage = computed(() => {
  return props.value.source?.data instanceof HTMLImageElement
})

const isCubeTexture = computed(() => {
  return props.value.isCubeTexture === true
})
</script>

<template>
  <div v-if="textureInfo.source" class="flex items-center gap-1">
    <ContextMenu>
      <ContextMenuTrigger>
        <img :src="textureInfo.source"
          class="w-16 h-16 object-cover border border-gray-300 dark:border-gray-700 rounded-sm cursor-pointer"
          :title="tooltipInfo" />
      </ContextMenuTrigger>

      <ContextMenuContent class="w-40">
        <ContextMenuItem @click="previewTexture" :disabled="!isImage">
          <span class="text-xs">在新窗口预览</span>
        </ContextMenuItem>
        <ContextMenuItem @click="downloadTexture" :disabled="!isImage">
          <span class="text-xs">下载保存</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  </div>
  <span v-else class="text-[12px] text-[#267f99] dark:text-[#4EC9B0]" :title="tooltipInfo">{{ formattedText }}</span>
</template>