<script lang='ts' setup>
import { inject } from "vue"
import { get, useMagicKeys } from '@vueuse/core'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { Eye, EyeClosed } from 'lucide-vue-next';

const props = defineProps<{
    data: any
}>()
const iconSize = inject('iconSize') as number

const { shift } = useMagicKeys()

function toggleVisible() {
    const targetValue = !props.data.visible
    if (shift.value) {
        // TODO
    } else {
        props.data.visible = targetValue
    }
}
</script>

<template>
    <div v-if="data.visible !== undefined" :style="{ width: iconSize + 'px', height: iconSize + 'px' }" @click.stop="toggleVisible" class="box-content p-[4px]">
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger as-child>
                    <Eye v-if="data.visible" :size="iconSize" />
                    <EyeClosed v-else :size="iconSize" />
                </TooltipTrigger>
                <TooltipContent>
                    <div class="text-xs">可见性</div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>

</template>

<style scoped lang='scss'></style>