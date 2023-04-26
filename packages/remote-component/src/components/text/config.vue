<template>
    <div>
        <input v-model="name" />
    </div>
</template>
<script setup lang="ts">
type TProps = {
    comp: any
}

const props = defineProps<TProps>();

import { ref } from 'vue'
const name = ref('')
</script>