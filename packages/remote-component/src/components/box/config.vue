<template>
    <div>
        <input v-model="name" />
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const name = ref('')
</script>