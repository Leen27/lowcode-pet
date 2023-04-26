import remoteBox from './remote-component/remote-preload.js'

const cacheMap: any = {}
const REMOTE_ENTRY = './remote.js'

const fetchRemote = async (entry: string) => {
    // @ts-ignore
    const remote = await import('http://localhost:4174/assets/remoteEntry.js');
    const comp = await (remote as any).get(entry)
    return comp().default
}

async function loadCompConfig(compKey: string) {
    let remoteConfig;

    if (cacheMap[REMOTE_ENTRY]) {
        remoteConfig = cacheMap[REMOTE_ENTRY]
    } else {
        remoteConfig = await fetchRemote(REMOTE_ENTRY);
    }

    const compConfig = remoteConfig[compKey];

    console.log(remoteConfig,compConfig, 'compConfig' )

    if (!compConfig) return null

    return compConfig
}

const componentLoader = {
    load: loadCompConfig
}

export default componentLoader
