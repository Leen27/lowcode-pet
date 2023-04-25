// 页面拖拽键名
export enum DragKeyEnum {
    DRAG_KEY = 'DRAG_KEY'
}

export const useDrag = () => {
    // 开始拖拽
    const dragStartHandle = (e: DragEvent, jsonData: object) => {
        // 将配置项绑定到拖拽属性上
        e!.dataTransfer!.setData(DragKeyEnum.DRAG_KEY, JSON.stringify(jsonData))
    }
    
    // * 进入拖拽区域
    const dragoverHandle = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy'
    }
    
    // 拖拽回调
    const dropHandle = (e: DragEvent, callback?: (data: any) => void) => {

        console.log(e.dataTransfer, e!.dataTransfer!.getData(DragKeyEnum.DRAG_KEY), 'e!.end')

        console.log(1)
        e.preventDefault()

        // 获取拖拽数据
        const dragDataString = e!.dataTransfer!.getData(DragKeyEnum.DRAG_KEY)
        if (!dragDataString) {
            return
        }

        const dropData = JSON.parse(dragDataString)

        callback && callback({
            x: e.clientX,
            y: e.clientY,
            data: dropData
        })
    }
    
    return {
        dragStartHandle,
        dragoverHandle,
        dropHandle,
    }
}

  