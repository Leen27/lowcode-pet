const fetchComponent = async (compUrl: string) => {
    // @ts-ignore
    const remote = await import('http://localhost:4174/assets/remoteEntry.js');
    const comp = await (remote as any).get(compUrl)
    return comp().default
}

async function loadComp(compUrl: string) {

    const comp = fetchComponent(compUrl)

    if (!comp) return null;

    return comp
}

const componentLoader = {
    load: loadComp
}

export default componentLoader
