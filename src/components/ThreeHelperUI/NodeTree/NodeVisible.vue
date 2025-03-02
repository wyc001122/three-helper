<script lang='ts' setup>
import { inject,ref } from "vue"
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

const reloadKey = ref(0)
function toggleVisible() {
    const targetValue = !props.data.visible
    if (shift.value) {
        // TODO
    } else {
        props.data.visible = targetValue
        reloadKey.value++
    }
}
</script>

<template>
    <div v-if="data.visible !== undefined" :key="reloadKey" :style="{ width: iconSize + 'px', height: iconSize + 'px' }" @click.stop="toggleVisible" class="text-[12px] box-content p-[4px]">
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger as-child>
                    <div class="w-full h-full flex items-center justify-center">
                        <Eye v-if="data.visible" :size="iconSize" />
                        <EyeClosed v-else :size="iconSize" />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <div class="">可见性</div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>

</template>

<style scoped lang='scss'></style>