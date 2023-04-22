<template>
    <div>
        <h1 class="text-3xl font-bold underline">
            Hello world!
        </h1>
    </div>
    <div class="w-100 h-screen bg-yellow-100 flex items-start">
        <div class="w-[100px] h-full bg-gray-300">
            <div class="w-[80px] h-[80px] rounded-lg border border-light-800">
                cat1
            </div>
            <div class="w-[80px] h-[80px] rounded-lg border border-light-800">
                dog
            </div>
            <div class="w-[80px] h-[80px] rounded-lg border border-light-800">
                echart
            </div>
        </div>
        <div class="w-full h-full bg-green-50 border border-light-800">
            <component :is="compRef" v-if="compRef"></component>
        </div>
    </div>
    
</template>
<script setup lang="ts">
import { defineAsyncComponent, onMounted, shallowRef } from "vue";
// import { fetchComponent } from './loader'
import componentLoader from "component-loader"
const compRef = shallowRef<any>(null)

onMounted(async () => {
    const remoteText = await componentLoader.load('remote-image.js')

    setTimeout(() => {
        compRef.value = remoteText
    }, 3000)
})
</script>