<template>
    <div>{{ props.name }}</div>
</template>

<script setup lang="ts">
type TProps = {
    name: string
}

const props = withDefaults(defineProps<TProps>(), { name: '' });
</script>