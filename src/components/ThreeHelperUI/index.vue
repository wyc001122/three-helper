<script lang='ts' setup>
import { ref, computed, onMounted, provide, reactive, shallowReactive, onBeforeUnmount } from 'vue'
import { useColorMode } from '@vueuse/core'
import { X, Move, Sun, Moon } from 'lucide-vue-next'
import { Icon } from '@iconify/vue'
import { useDraggable } from '@/lib/drag'
import { mapTree } from "@/lib/mapTree"
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import NodeTree from './NodeTree/index.vue'
import NodeDetail from './NodeDetail/index.vue'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'


defineOptions({
    inheritAttrs: false
})
const props = defineProps<{
    renderers: any | any[]
    scenes: any | any[]
}>()

const mode = useColorMode() // Ref<'dark' | 'light'>

// 切换类型管理
const activeType = ref('scenes')

// 场景管理
const scenes = computed(() => {
    if (!props.scenes) {
        return []
    }
    return Array.isArray(props.scenes) ? props.scenes : [props.scenes]
})

// 渲染器管理
const renderers = computed(() => {
    if (!props.renderers) {
        return []
    }
    return Array.isArray(props.renderers) ? props.renderers : [props.renderers]
})

// 场景选择状态
const selectedSceneIndex = ref(scenes.value.length > 0 ? scenes.value[0].uuid : '')
const currentScene = computed(() => {
    return scenes.value.find(scene => scene.uuid === selectedSceneIndex.value) || null
})

// 渲染器选择状态
const selectedRendererIndex = ref(renderers.value.length > 0 ? renderers.value[0].uuid : '')
const currentRenderer = computed(() => {
    return renderers.value.find(renderer => renderer.uuid === selectedRendererIndex.value) || null
})

const containerRef = ref<HTMLElement>()
onMounted(() => {
    if (containerRef.value) {
        useDraggable(containerRef.value, {
            handler: '.move-handler',
            onDragStart: () => {
                if (containerRef.value) {
                    containerRef.value.style.cursor = 'move'
                }
            },
            onDragEnd: () => {
                if (containerRef.value) {
                    containerRef.value.style.cursor = 'default'
                }
            }
        })
    }
})

const iconSize = 12;
provide('iconSize', iconSize)

const activeNode = ref()
provide('activeNode', activeNode)


function contextmenu(e: MouseEvent) {
    if (e.target instanceof HTMLElement && e.target.nodeName === 'HTML') {
        e.preventDefault()
    }
}

onMounted(() => {
    window.addEventListener('contextmenu', contextmenu)

})
onBeforeUnmount(() => {
    window.removeEventListener('contextmenu', contextmenu)
})

// 阻止滚轮事件冒泡
function handleWheel(e: WheelEvent) {
  e.stopPropagation()
}
</script>

<template>
    <div ref="containerRef" class="three-helper-ui flex gap-2 items-start" 
        @contextmenu="(e) => e.preventDefault()"
        @wheel="handleWheel">
        <Card class="w-[300px] flex flex-col shrink-0">
            <CardHeader class="p-1.5 border-b flex move-handler cursor-move">
                <CardTitle class="leading-none w-full px-1.5">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-1">
                            <Move :size="iconSize"></Move>
                            <div>Three.js 助手</div>
                        </div>
                        <div class="cursor-pointer" @click.stop="mode = mode === 'dark' ? 'light' : 'dark'">
                            <Sun v-if="mode === 'dark'" :size="iconSize" />
                            <Moon v-else :size="iconSize" />
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>

            <!-- 切换按钮 -->
            <div class="w-full px-2 pt-1.5 pb-1 flex gap-1">
                <Button variant="ghost" size="sm" class="flex-1 h-5 text-xs py-0 px-1"
                    :class="{ 'bg-muted': activeType === 'scenes' }" @click="activeType = 'scenes'">
                    场景
                </Button>
                <Button variant="ghost" size="sm" class="flex-1 h-5 text-xs py-0 px-1"
                    :class="{ 'bg-muted': activeType === 'renderers' }" @click="activeType = 'renderers'">
                    渲染器
                </Button>
            </div>

            <!-- 场景管理内容 -->
            <div v-if="activeType === 'scenes'" class="flex-1 overflow-hidden flex flex-col">
                <div class="px-2 pt-1 pb-1" v-if="scenes.length > 1">
                    <Select v-model="selectedSceneIndex">
                        <SelectTrigger class="h-6 text-xs py-0 px-2 w-full">
                            <SelectValue :placeholder="'选择场景 (' + scenes.length + ')'" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem v-for="(scene, index) in scenes" :key="index" :value="scene.uuid"
                                class="text-xs">
                                {{ scene.name || `场景 ${index + 1}` }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div class="flex-1 min-h-0 overflow-auto max-h-[80vh] custom-scrollbar">
                    <CardContent class="p-2">
                        <div class="node-tree-wrapper">
                            <NodeTree v-if="currentScene" :data="[currentScene]" />
                            <div v-else class="text-muted-foreground text-center py-2">没有可用场景</div>
                        </div>
                    </CardContent>
                </div>
            </div>

            <!-- 渲染器管理内容 -->
            <div v-else-if="activeType === 'renderers'" class="flex-1 overflow-hidden flex flex-col">
                <div class="px-2 pt-1 pb-1" v-if="renderers.length > 1">
                    <Select v-model="selectedRendererIndex">
                        <SelectTrigger class="h-6 text-xs py-0 px-2 w-full">
                            <SelectValue :placeholder="'选择渲染器 (' + renderers.length + ')'" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem v-for="(renderer, index) in renderers" :key="index" :value="renderer.uuid"
                                class="text-xs">
                                {{ renderer.name || `渲染器 ${index + 1}` }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div class="flex-1 min-h-0 overflow-auto max-h-[80vh] custom-scrollbar">
                    <CardContent class="p-2">
                        <div class="node-tree-wrapper">
                            <NodeTree v-if="currentRenderer" :data="[currentRenderer]" />
                            <div v-else class="text-muted-foreground text-center py-2">没有可用渲染器</div>
                        </div>
                    </CardContent>
                </div>
            </div>
        </Card>

        <Card class="w-[400px] flex flex-col h-auto max-h-[90vh]" v-if="!!activeNode">
            <CardHeader class="p-1.5 border-b flex h-fit">
                <CardTitle class="leading-none flex items-center justify-between gap-1 px-1.5">
                    <span>节点信息</span>
                    <div :style="{ width: iconSize + 'px', height: iconSize + 'px' }" class="cursor-pointer"
                        @click="activeNode = null">
                        <X :size="iconSize" />
                    </div>
                </CardTitle>
            </CardHeader>
            <div class="flex-1 min-h-0 overflow-auto max-h-[80vh] custom-scrollbar">
                <CardContent class="p-2">
                    <NodeDetail />
                </CardContent>
            </div>
        </Card>
    </div>
</template>
<style lang="scss">
.three-helper-ui {
    * {
        font-size: 12px;
    }
    
    .node-tree-wrapper {
        width: 100%;
        height: auto;
        min-width: 240px; /* 确保内容有最小宽度，触发水平滚动 */
    }
    
    // 确保左侧卡片容器不被撑开
    > .card:first-child {
        height: fit-content;
        min-height: auto;
        overflow: visible;
    }
    
    // 自定义滚动条样式
    .custom-scrollbar {
        /* 滚动条轨道 */
        &::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        
        /* 滚动条滑块 */
        &::-webkit-scrollbar-thumb {
            background: rgba(155, 155, 155, 0.5);
            border-radius: 4px;
            
            &:hover {
                background: rgba(155, 155, 155, 0.8);
            }
        }
        
        /* 滚动条轨道背景 */
        &::-webkit-scrollbar-track {
            background: transparent;
        }
    }
}
</style>