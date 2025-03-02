<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps<{
    data: any
}>()


const showName = computed(() => {
    return props.data.name && props.data.geometry && props.data.material
})
</script>

<template>
    <div :title="data.name || 'unknown'" class="flex-1 overflow-hidden truncate" v-if="showName">
        {{ data.name || 'unknown' }}
    </div>
</template>
