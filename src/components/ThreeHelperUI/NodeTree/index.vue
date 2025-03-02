<script lang='ts' setup>
import Node from "./Node.vue"
defineProps<{
    data: any[]
}>()
</script>

<template>
    <Node v-for="item in data" :data="item" :level="0"></Node>
</template>