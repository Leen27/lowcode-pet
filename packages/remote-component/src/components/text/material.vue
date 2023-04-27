<template>
    <div class="text">{{ props.data?.name }}</div>
</template>

<script setup lang="ts">
type TProps = {
    data: any
}

const props = withDefaults(defineProps<TProps>(), { data: {} });
</script>
<style scoped>
.text {
    border: 1px solid #ddd;
}
</style>