<script lang='ts' setup>
import { ref, inject, toRaw, type Reactive } from 'vue'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu'

import NodeArrow from './NodeArrow.vue'
import NodeName from './NodeName.vue'
import NodeType from './NodeType.vue'
import NodeVisible from './NodeVisible.vue'
import ExportDialog from './ExportDialog.vue'

import { consoleNode, exportNode, } from './function'
defineOptions({
  name: 'Node',
  inheritAttrs: false
})

const props = defineProps<{
  data: any
  level: number,
  isGeometry?: boolean,
  isMaterial?: boolean
}>()

const iconSize = inject('iconSize') as number
const activeNode = inject('activeNode') as any

const isExpanded = ref(!!props.data.$hasExpand)

// 导出对话框状态
const showExportDialog = ref(false)

// 打开导出对话框
const openExportDialog = () => {
  showExportDialog.value = true
}

// 处理导出操作
const handleExport = (data: any, options: any) => {
  // 调用导出函数，传递数据和配置选项
  const { fileName, ...exportOptions } = options

  // 调用导出函数
  exportNode(data, exportOptions, fileName)
}

const expandAll = () => {
  const targetValue = !isExpanded.value
  isExpanded.value = targetValue
  props.data.traverse((item: any) => {
    item.$hasExpand = targetValue
  })

}
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>
      <div :style="{
        'padding-left': (level * (iconSize + 4)) + 'px',
      }" :class="{
        'bg-accent': activeNode === data
      }" @click="activeNode = data"
        class="mb-[2px] select-none w-full flex relative px-[8px] pr-[22px] py-1 cursor-pointer leading-[10px] rounded-md  hover:bg-accent">
        <!-- 左 -->
        <div class="flex items-center pl-[6px] pr-[20px] w-full gap-1">
          <NodeArrow v-model="isExpanded" :data="data" />
          <NodeType :data="data" />
          <NodeName :data="data" />
        </div>
        <!-- 右 -->
        <div class="flex items-center h-full absolute right-[0px] top-[50%] translate-y-[-50%] z-10">
          <NodeVisible :data="data" />
        </div>
      </div>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem v-if="data.children && data.children.length" @click="expandAll" class=" leading-1 cursor-pointer">
        {{ isExpanded ? '收起全部' : '展开全部' }}
      </ContextMenuItem>
      <ContextMenuItem @click="consoleNode(data)" class=" leading-1 cursor-pointer">输出到控制台</ContextMenuItem>
      <ContextMenuItem v-if="data.isObject3D" @click="openExportDialog" class=" leading-1 cursor-pointer">导出
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>

  <!-- 导出配置对话框 -->
  <ExportDialog v-model:isOpen="showExportDialog" :data="data" @export="handleExport" />

  <div class="" v-if="isExpanded">
    <!-- 几何体 -->
    <Node v-if="data.geometry" :data="data.geometry" :level="level + 1" />
    <!-- 材质 -->
    <Node v-if="data.material" :data="data.material" :level="level + 1" />
    <!-- children -->
    <template v-if="data.children && data.children.length" ref="childrenContainer">
      <Node v-for="item in data.children" :data="item" :level="(level + 1)" :key="data.uuid" />
    </template>
  </div>

</template>

<style scoped lang='scss'></style>