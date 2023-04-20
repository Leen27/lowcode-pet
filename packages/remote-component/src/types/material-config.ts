// 组件配置
export type TMaterialConfig = {
    key: string
    thumbnail: string | (() => Promise<typeof import('*.png')>)
}