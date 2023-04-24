<template>
    <div>
        <h1 class="text-3xl font-bold underline">
            Hello world!
        </h1>
    </div>
    
    <div class="w-100 h-screen bg-yellow-100 flex items-start">
        <div class="w-[100px] h-full bg-gray-300">
            <div draggable="true" class="w-[80px] h-[80px] rounded-lg border border-light-800">
                容器
            </div>
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
            <v-box />
        </div>
    </div>
    
</template>
<script setup lang="ts">
import { onMounted, shallowRef } from "vue";
import componentLoader from "component-loader"
import VBox from './Box.vue';
const compRef = shallowRef<any>(null)

onMounted(async () => {
    setTimeout(async () => {
        const remoteText = await componentLoader.load('./remote-image.js')
        compRef.value = remoteText
    }, 3000)

    // Select the DOM-element, so that you can replace it with content
    let PROJECT_ID = "b9k2lt78";
    let DATASET = "production";
    let QUERY = encodeURIComponent(`
        *[_type == "pet"]{_id, name}
    `);

    // Compose the URL for your project's endpoint and add the query
    let PROJECT_URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

    // fetch the content
    fetch(PROJECT_URL)
    .then((res) => res.json())
    .then(({ result }) => {
        console.log(result, '2222')
    })
})
</script>