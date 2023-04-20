// 组件配置
export type ConfigType = {
    key: string
    thumbnail: string | (() => Promise<typeof import('*.png')>)
}