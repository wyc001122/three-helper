<script lang='ts' setup>
import { computed } from 'vue'
const props = defineProps<{
    data: any
}>() 
</script>

<template>
    <div class="px-[4px] py-[2px] flex justify-center items-center">
        {{ data.type }}
    </div>
</template>

<style scoped lang='scss'></style>