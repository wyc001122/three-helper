<script lang='ts' setup>
import { inject } from 'vue'
import PropField from './PropField.vue'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
interface NodeData {
  [key: string]: any
}

const activeNode = inject('activeNode') as NodeData

// 添加一个函数来判断值的类型
const getValueType = (value: any): string => {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (Array.isArray(value)) return 'array'
  return typeof value
}
</script>

<template>
  <div class="flex flex-col gap-[2px] px-[6px] h-full font-mono overflow-x-auto w-max">
    <div class="" v-for="(value, key) in activeNode" :key="String(key)">
      <PropField :label="String(key)" :value="value" :level="0" :value-type="getValueType(value)" :rawData="activeNode">
      </PropField>
    </div>
  </div>
</template>

<style scoped lang='scss'>
:deep(.prop-field) {
  font-size: 12px;
  white-space: nowrap;
}

.beautify-scroll-bar {
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 5px;
  }
}
</style>