<script lang='ts' setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu'
import { getConstantName } from '../utils/constant'
import { 
  TextureValue, 
  HTMLElementValue, 
  ObjectValue, 
  PrimitiveValue,
  isHTMLElement,
  isTexture,
  getValueType as getValueTypeUtil,
  hasChildren as hasChildrenUtil
} from './PropTypes'

const props = defineProps<{
  label: string
  value: any
  level: number
  valueType: string
  rawData: any
}>()

const isExpanded = ref(false)
const indent = computed(() => (props.level * 16 + 2) + 'px')
const INITIAL_SHOW_COUNT = 100  // 初始显示的数组元素数量
const LOAD_MORE_COUNT = 100     // 每次加载更多时的数量
const displayCount = ref(INITIAL_SHOW_COUNT)

// 使用导入的工具函数
const hasChildren = computed(() => hasChildrenUtil(props.value, props.valueType))
const isHTMLElementValue = computed(() => isHTMLElement(props.value))
const isTextureValue = computed(() => isTexture(props.value))

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
  if (isExpanded.value) {
    displayCount.value = INITIAL_SHOW_COUNT
  }
}

const loadMore = () => {
  displayCount.value += LOAD_MORE_COUNT
}

const constantName = computed(() => getConstantName(props.rawData, props.label, props.value))

// 计算可见的子键
const visibleKeys = computed(() => {
  if (props.valueType === 'array' || props.valueType === 'typedarray') {
    return Array.from({ length: Math.min(props.value.length, displayCount.value) }, (_, i) => i)
  }
  return Object.keys(props.value || {})
})

// 计算剩余的子元素数量
const remainingCount = computed(() => {
  if (props.valueType === 'array' || props.valueType === 'typedarray') {
    return Math.max(0, props.value.length - displayCount.value)
  }
  return 0
})

// 获取值的类型
const getValueType = (value: any): string => {
  return getValueTypeUtil(value)
}

// 复制值到剪贴板
const copyValue = () => {
  let textToCopy = props.value
  if (typeof textToCopy === 'object') {
    textToCopy = JSON.stringify(textToCopy, null, 2)
  } else {
    textToCopy = String(textToCopy)
  }
  navigator.clipboard.writeText(textToCopy)
}

// 复制常量名到剪贴板
const copyConstantName = () => {
  if (constantName.value) {
    navigator.clipboard.writeText('THREE.'+constantName.value)
  }
}

// 输出到控制台
const consoleLog = () => {
  if (props.valueType === 'function') {
    console.log(`%c 🔍 ${props.label}:`, 'color: #4c9668; font-weight: bold;', {
      name: props.value.name || '(anonymous)',
      source: props.value.toString()
    })
  } else {
    console.log(
      `%c 🔍 ${props.label}:`,
      'color: #4c9668; font-weight: bold;',
      props.value,
      constantName.value ? `(${constantName.value})` : ''
    )
  }
}

// 监听值变化
let refreshKey = ref(0)
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
  <div class="prop-field text-sm">
    <ContextMenu>
      <ContextMenuTrigger>
        <div class="flex items-center py-[2px] rounded-md hover:bg-accent cursor-pointer font-mono whitespace-nowrap"
          :style="{ paddingLeft: indent }" @click="toggleExpand">
          <!-- 展开/折叠箭头 -->
          <span v-if="hasChildren && !isHTMLElementValue" class="mr-1 w-4 inline-flex items-center">
            <span class="select-none text-[#919191] dark:text-[#6B6B6B]" :style="{
              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
              display: 'inline-block',
              transition: 'transform 0.2s'
            }">▶</span>
          </span>
          <span v-else class="mr-1 w-4"></span>

          <!-- 属性名 -->
          <span class="text-[#001080] dark:text-[#9CDCFE]">{{ label }}</span>
          <span class="text-[#000000] dark:text-[#D4D4D4] mx-1">:</span>

          <!-- 属性值 - 使用拆分后的组件 -->
          <span :key="refreshKey" class="truncate max-w-[300px]" :title="String(rawData[label])">
            <!-- 纹理类型 -->
            <TextureValue v-if="isTextureValue" :value="value" />
            
            <!-- HTML元素类型 -->
            <HTMLElementValue v-else-if="isHTMLElementValue" :value="value" />
            
            <!-- 对象/数组类型 -->
            <ObjectValue 
              v-else-if="hasChildren" 
              :value="value" 
              :valueType="valueType" 
              :isExpanded="isExpanded" 
            />
            
            <!-- 基本类型 -->
            <PrimitiveValue 
              v-else 
              :value="value" 
              :valueType="valueType" 
              :constantName="constantName" 
            />
          </span>
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuItem @click="copyValue" class=" leading-1 cursor-pointer">
          {{ constantName ? '复制实际值' : '复制值' }}
        </ContextMenuItem>
        <ContextMenuItem v-if="constantName" @click="copyConstantName" class=" leading-1 cursor-pointer">
          复制常量名
        </ContextMenuItem>
        <ContextMenuItem @click="consoleLog" class=" leading-1 cursor-pointer">
          输出到控制台
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>

    <!-- 递归渲染子属性 -->
    <template v-if="isExpanded && hasChildren">
      <PropField v-for="childKey in visibleKeys" :key="String(childKey)" :label="String(childKey)"
        :value="value[childKey]" :level="level + 1" :value-type="getValueType(value[childKey])" :rawData="value" />

      <!-- 显示加载更多按钮 -->
      <div v-if="remainingCount > 0" class="flex items-center py-[2px] cursor-pointer text-blue-500 hover:text-blue-600"
        :style="{ paddingLeft: indent }" @click="loadMore">
        <span class="mr-1 w-4"></span>
        <span class="">···还有 {{ remainingCount }} 项，点击加载更多</span>
      </div>
    </template>
  </div>
</template>

<style scoped>
.prop-field {
  color: #000000;
  /* VSCode 默认主题文本颜色 */
}

:global(.dark) .prop-field {
  color: #D4D4D4;
  /* VSCode Dark+ 主题文本颜色 */
}
</style>