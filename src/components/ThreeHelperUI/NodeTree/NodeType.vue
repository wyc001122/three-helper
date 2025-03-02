<script lang='ts' setup>
import { computed } from 'vue'
const props = defineProps<{
    data: any
}>()

const isWebGLRenderer = computed(() => {
    return props.data.isWebGLRenderer
})
</script>

<template>
    <div class="text-[12px] px-[4px] py-[2px] flex justify-center items-center">
        {{ data.type || (isWebGLRenderer ? 'WebGLRenderer' : 'unknown') }}
    </div>
</template>

<style scoped lang='scss'></style>