<script lang='ts' setup>
import { inject, computed } from 'vue'
import { ChevronRight, Dot } from 'lucide-vue-next';
import { useMagicKeys } from '@vueuse/core'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

const { shift } = useMagicKeys()

const props = defineProps<{
    data: any
}>()

const isExpanded = defineModel()
function toggleExpand() {
    const targetValue = !isExpanded.value
    if (shift.value) {
        // TODO
        isExpanded.value = targetValue
        props.data.traverse((item: any) => {
            item.$hasExpand = targetValue
        })
    } else {
        isExpanded.value = targetValue
    }
}

const hasChildren = computed(() => {
    return props.data.children && props.data.children.length
})
const hasExpand = computed(() => {
    return hasChildren.value || props.data.geometry || props.data.material
})

const iconSize = inject('iconSize') as number

</script>

<template>
    <div :style="{ width: iconSize + 'px' }" class="cursor-pointer">
        <TooltipProvider v-if="hasExpand">
            <Tooltip>
                <TooltipTrigger as-child>
                    <ChevronRight  :size="iconSize" :class="{
                        'rotate-90': isExpanded
                    }" @click.stop="toggleExpand" class="transition-transform" />
                    
                </TooltipTrigger>
                <TooltipContent>
                    <div class="text-xs">按住shift展开全部children</div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <Dot v-else :size="iconSize"></Dot>
    </div>
</template>

<style scoped lang='scss'></style>