import { defineAsyncComponent } from "vue";

export const fetchComponent = async (compUrl: string) => {
    // const RemoteComponent = await import(`./remote-component/remote-${compUrl}.js`);
    const RemoteComponent = await import('http://localhost:4174/assets/remoteEntry.js').then((m: any) => m.get(`./remote-${compUrl}.js`).then((x: any) => x().default))
    console.log(RemoteComponent, 'RemoteComponent')
    return RemoteComponent
}
