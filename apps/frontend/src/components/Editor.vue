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
        {{ compList }} #1
            <remote-box
                v-for="item in compList"
                :key="item.key"
                :style="item.style"
                @click="handleSelectComp(item)"
                :data="item.data"
            >
                <component :is="item.comp" v-if="item.comp" :data="item.data"></component>
            </remote-box>

            <!-- <component
                v-for="item in compList"
                :key="item.key"
                :is="item.comp"
                :name="'text'"
            ></component> -->

        </div>
        <div class="w-[400px] h-full bg-gray-300">
            {{ state.selectedComp }} #{{ state?.selectedComp?.config }}#
            <component
                v-if="state?.selectedComp?.config"
                :is="state.selectedComp.config"
                :comp="state.selectedComp.comp"
                :data="state.selectedComp.data"
            ></component>
        </div>
    </div>
    
</template>
<script setup lang="ts">
import { onMounted, shallowRef, ref, markRaw, reactive } from 'vue'
import componentLoader from "component-loader"
import remoteBox from './remote-component/remote-box.js'
import { useCompRepo, TCompCategory } from '@/service/api.adapter'
import { useDrag } from '@/hooks/useDrag.hook'

const compRepo = useCompRepo()
const dragHook = useDrag()

type TCompCreated = {
    comp: any;
    config: any;
    key: string;
    data: any;
    style: {
        x: number,
        y: number
    }
}

const compRef = shallowRef<any>(null)
const boxRef = shallowRef<any>(null)
const compList = ref<TCompCreated[]>([])
const compCategory = shallowRef<TCompCategory[]>([])

type TState = {
    selectedComp: TCompCreated | null
}

const state = reactive<TState>({
    selectedComp: null
})

const dropCallback = async ({ x, y, data }: { x: number, y: number, data: TCompCategory }) => {
    const remoteCompConfig = await componentLoader.load(data.key)

    const dataRef = ref({})

    compList.value.push({
        comp: markRaw(remoteCompConfig.material),
        config: markRaw(remoteCompConfig.configView),
        data: dataRef,
        key: data.key,
        style: {
            x,
            y
        }
    })
}

const handleSelectComp = (comp: TCompCreated) => {
    state.selectedComp = comp
}

onMounted(async () => {
    const result = await compRepo.getCategory()

    if (!result) return

    compCategory.value = result
})
</script>