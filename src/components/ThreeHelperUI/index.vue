<script lang='ts' setup>
import { ref, computed, onMounted, provide, reactive, shallowReactive, onBeforeUnmount } from 'vue'
import { useColorMode } from '@vueuse/core'
import { X, Move, Sun, Moon } from 'lucide-vue-next'
import { Icon } from '@iconify/vue'
import { useDraggable } from '@/lib/drag'
import { mapTree } from "@/lib/mapTree"
import { Switch } from '@/components/ui/switch'
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


defineOptions({
    inheritAttrs: false
})
const props = defineProps<{
    scene: any | any[]
}>()

const mode = useColorMode() // Ref<'dark' | 'light'>

const scenes = computed(() => {
    if (!props.scene) {
        return []
    }
    return Array.isArray(props.scene) ? props.scene : [props.scene]
})

const reactiveScene = reactive(scenes.value)




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
                <CardTitle class=" leading-none w-full px-1.5">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-1">
                            <Move :size="iconSize"></Move>
                            <div>场景大纲</div>
                        </div>
                        <div class="cursor-pointer " @click.stop="mode = mode === 'dark' ? 'light' : 'dark'">
                            <Sun v-if="mode === 'dark'" :size="iconSize" />
                            <Moon v-else :size="iconSize" />
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>
            <ScrollArea type="auto">
                <CardContent class="p-2">
                    <NodeTree :data="reactiveScene" />
                </CardContent>
            </ScrollArea>
        </Card>
        <Card class="w-[400px] flex flex-col" v-if="!!activeNode">
            <CardHeader class="p-1.5 border-b flex h-fit">
                <CardTitle class=" leading-none flex items-center justify-between gap-1 px-1.5">
                    <span>节点信息</span>
                    <div :style="{ width: iconSize + 'px', height: iconSize + 'px' }" class="cursor-pointer "
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