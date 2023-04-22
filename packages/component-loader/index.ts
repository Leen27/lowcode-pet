import { defineAsyncComponent } from "vue";

const compKeyMap = new Map()

const remotes = [
    {
        key: './remote-component/remote-text.js',
        loader: () => import('./remote-component/remote-text.js')
    },
    {
        key: './remote-component/remote-image.js',
        loader: () => import('./remote-component/remote-image.js')
    }
]
const init = () => {
    remotes.forEach((remote: any) => {
        const { key, loader } = remote;

        const RemoteComponent = defineAsyncComponent({
            loader
        })

        compKeyMap.set(key, {
            key,
            url: key,
            comp: RemoteComponent
        })
    })
}

init()

const fetchComponent = (compUrl: string) => {
    const key = `./remote-component/${compUrl}`
    const value = compKeyMap.get(key);

    if (!value) {
        console.error('没有找到 key 对应的组件，请检查 key 是否为注册过的组件名称')

        return null;
    }

    return value.comp
}

async function loadComp(compUrl: string) {

    const comp = fetchComponent(compUrl)

    if (!comp) return null;

    return comp
}

const componentLoader = {
    list: compKeyMap,
    load: loadComp
}

export default componentLoader