<template>
    <div class="text">
        <input v-model="props.data.name" />
    </div>
</template>
<script setup lang="ts">
type TProps = {
    data: any
}

const props = defineProps<TProps>();
</script>
<style scoped>

</style>