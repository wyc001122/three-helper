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
</script>

<template>
    <div ref="containerRef" class="three-helper-ui max-h-[800px] flex gap-2" @contextmenu="(e) => e.preventDefault()">
        <Card class="w-[300px] flex flex-col h-fit">
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
            <div v-if="activeType === 'scenes'">
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

                <ScrollArea type="auto" class="max-h-[600px]">
                    <CardContent class="p-2 h-fit">
                        <NodeTree v-if="currentScene" :data="[currentScene]" />
                        <div v-else class="text-muted-foreground text-center py-2">没有可用场景</div>
                    </CardContent>
                </ScrollArea>
            </div>

            <!-- 渲染器管理内容 -->
            <div v-else-if="activeType === 'renderers'">
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

                <ScrollArea type="auto" class="max-h-[600px]">
                    <CardContent class="p-2 h-fit">
                        <NodeTree v-if="currentRenderer" :data="[currentRenderer]" />
                        <div v-else class="text-muted-foreground text-center py-2">没有可用渲染器</div>
                    </CardContent>
                </ScrollArea>
            </div>
        </Card>

        <Card class="w-[400px] flex flex-col" v-if="!!activeNode">
            <CardHeader class="p-1.5 border-b flex h-fit">
                <CardTitle class="leading-none flex items-center justify-between gap-1 px-1.5">
                    <span>节点信息</span>
                    <div :style="{ width: iconSize + 'px', height: iconSize + 'px' }" class="cursor-pointer"
                        @click="activeNode = null">
                        <X :size="iconSize" />
                    </div>
                </CardTitle>
            </CardHeader>
            <ScrollArea class="h-full" type="auto">
                <CardContent class="p-2">
                    <NodeDetail />
                </CardContent>
                <ScrollBar orientation="horizontal" />
                <ScrollBar orientation="vertical" />
            </ScrollArea>
        </Card>
    </div>
</template>
<style lang="scss">
.three-helper-ui {
    * {
        font-size: 12px;
        // line-height: 1.25;
    }
}
</style>