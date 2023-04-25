<template>
    <div>
        <h1 class="text-3xl font-bold underline">
            Hello world!
        </h1>
    </div>
    
    <div class="w-100 h-screen bg-yellow-100 flex items-start">
        <div class="w-[100px] h-full bg-gray-300">
            <div
                v-for="item in compCategory"
                :key="item.key"
                draggable="true"
                class="w-[80px] h-[80px] rounded-lg border border-light-800"
                @dragstart="dragHook.dragStartHandle($event, item)"
            >
                {{ item.key }}
            </div>
        </div>
        <div
            class="w-full h-full bg-green-50 border border-light-800"
            @dragover="dragHook.dragoverHandle"
            @drop="dragHook.dropHandle($event, dropCallback)"
        >
        {{ compList }}
            <remote-box v-for="item in compList" :key="item.key" :style="item.style">
                <component :is="item.comp" v-if="item.comp"></component>
            </remote-box>
        </div>
    </div>
    
</template>
<script setup lang="ts">
import { onMounted, shallowRef, ref, markRaw } from 'vue'
import componentLoader from "component-loader"
import remoteBox from './remote-component/remote-box.js'
import { useCompRepo, TCompCategory } from '@/service/api.adapter'
import { useDrag } from '@/hooks/useDrag.hook'

const compRepo = useCompRepo()
const dragHook = useDrag()

type TCompList = {
    comp: any;
    key: string;
    style: {
        x: number,
        y: number
    }
}[]

const compRef = shallowRef<any>(null)
const boxRef = shallowRef<any>(null)
const compList = ref<TCompList>([])
const compCategory = shallowRef<TCompCategory[]>([])

const dropCallback = async ({ x, y, data }: { x: number, y: number, data: TCompCategory }) => {
    const remoteComp = await componentLoader.load(data.pkgUrl)
    // compRef.value = remoteComp

    console.log(data, x, y, remoteComp)

    compList.value.push({
        comp: markRaw(remoteComp),
        key: data.key,
        style: {
            x,
            y
        }
    })
}

onMounted(async () => {
    const result = await compRepo.getCategory()

    if (!result) return

    compCategory.value = result
})
</script>