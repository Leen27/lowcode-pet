 
<template>
  <div
    class="box"
    :style="{
      width: state.width + 'px',
      height: state.height + 'px',
      transform: `translate(${state.x}px, ${state.y}px)`,
    }"
    ref="box"
    @mousedown="startDrag"
  >
    <div
      :style="slotStyle"
      class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <slot></slot>
    </div>
    
    <div class="drag-point top" @mousedown="startResize($event, 'top')"></div>
    <div class="drag-point right" @mousedown="startResize($event, 'right')"></div>
    <div class="drag-point bottom" @mousedown="startResize($event, 'bottom')"></div>
    <div class="drag-point left" @mousedown="startResize($event, 'left')"></div>
    <div class="drag-point top-left" @mousedown="startResize($event, 'top-left')"></div>
    <div class="drag-point top-right" @mousedown="startResize($event, 'top-right')"></div>
    <div class="drag-point bottom-left" @mousedown="startResize($event, 'bottom-left')"></div>
    <div class="drag-point bottom-right" @mousedown="startResize($event, 'bottom-right')"></div>
  </div>
</template>
<script lang="ts">
import { ref, Ref, computed, ComputedRef } from 'vue';

// 定义状态类型
interface State {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default {
  props: {
    // 添加代码
    style: {
      type: Object,
      default: {
        x: 0,
        y: 0
      }
    },
  },
  setup(props): {
    state: Ref<State>;
    slotStyle: ComputedRef<any>;
    startDrag: (event: MouseEvent) => void;
    startResize: (event: MouseEvent, direction: string) => void;
  } {
    
    // 定义响应式变量
    const box = ref(null);
    const state = ref<State>({
      x: props.style.x,
      y: props.style.y,
      width: 100,
      height: 100
    });
    const startX = ref(0);
    const startY = ref(0);
    const startWidth = ref(0);
    const startHeight = ref(0);
    const dragging = ref(false);
    const resizing = ref(false);
    const resizeDirection = ref('');

    // 计算属性
    const slotStyle = computed(() => {
      return { transform: 'scale(' + (state.value.width / 100) + ',' + (state.value.height / 100) + ')' };
    });

    // 开始拖拽
    const startDrag = (event: MouseEvent): void => {
      // 如果点击的是拖拽点，则不进行拖拽
      if (event.target instanceof HTMLElement && event.target.classList.contains('drag-point')) {
        return;
      }
      startX.value = event.clientX - state.value.x;
      startY.value = event.clientY - state.value.y;
      dragging.value = true;
      document.addEventListener('mousemove', doDrag);
      document.addEventListener('mouseup', stopDrag);
    };

    // 拖拽中
    const doDrag = (event: MouseEvent): void => {
      if (dragging.value) {
        state.value.x = event.clientX - startX.value;
        state.value.y = event.clientY - startY.value;
      }
    };

    // 停止拖拽
    const stopDrag = (): void => {
      dragging.value = false;
      document.removeEventListener('mousemove', doDrag);
      document.removeEventListener('mouseup', stopDrag);
    };

    // 开始缩放
    const startResize = (event: MouseEvent, direction: string): void => {
      startX.value = event.clientX;
      startY.value = event.clientY;
      startWidth.value = state.value.width;
      startHeight.value = state.value.height;
      resizing.value = true;
      resizeDirection.value = direction;
      document.addEventListener('mousemove', doResize);
      document.addEventListener('mouseup', stopResize);
    };

    // 缩放中
    const doResize = (event: MouseEvent): void => {
      if (resizing.value) {
        if (resizeDirection.value === 'top') {
          state.value.height = startHeight.value - (event.clientY - startY.value);
        } else if (resizeDirection.value === 'right') {
          state.value.width = startWidth.value + (event.clientX - startX.value);
        } else if (resizeDirection.value === 'bottom') {
          state.value.height = startHeight.value + (event.clientY - startY.value);
        } else if (resizeDirection.value === 'left') {
          state.value.width = startWidth.value - (event.clientX - startX.value);
        } else if (resizeDirection.value === 'top-left') {
          state.value.width = startWidth.value - (event.clientX - startX.value);
          state.value.height = startHeight.value - (event.clientY - startY.value);
        } else if (resizeDirection.value === 'top-right') {
          state.value.height = startHeight.value - (event.clientY - startY.value);
          state.value.width = startWidth.value + (event.clientX - startX.value);
        } else if (resizeDirection.value === 'bottom-left') {
          state.value.width = startWidth.value - (event.clientX - startX.value);
          state.value.height = startHeight.value + (event.clientY - startY.value);
        } else if (resizeDirection.value === 'bottom-right') {
          state.value.width = startWidth.value + (event.clientX - startX.value);
          state.value.height = startHeight.value + (event.clientY - startY.value);
        }
      }
    };

    // 停止缩放
    const stopResize = (): void => {
      resizing.value = false;
      document.removeEventListener('mousemove', doResize);
      document.removeEventListener('mouseup', stopResize);
    };

    return {
      state,
      slotStyle,
      startDrag,
      startResize,
    };
  },
};
</script>

<style scoped>
.box {
  position: absolute;
  background-color: #ccc;
  cursor: move;
  user-select: none; /* box 里的元素禁止鼠标选择文字 */
}


.drag-point {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #fff;
  border: 1px solid #000;
}

.drag-point.top {
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  cursor: n-resize;
}

.drag-point.right {
  top: 50%;
  right: -5px;
  transform: translateY(-50%);
  cursor: e-resize;
}

.drag-point.bottom {
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  cursor: s-resize;
}

.drag-point.left {
  top: 50%;
  left: -5px;
  transform: translateY(-50%);
  cursor: w-resize;
}

.drag-point.top-left {
  top: -5px;
  left: -5px;
  cursor: nw-resize;
}

.drag-point.top-right {
  top: -5px;
  right: -5px;
  cursor: ne-resize;
}

.drag-point.bottom-left {
  bottom: -5px;
  left: -5px;
  cursor: sw-resize;
}

.drag-point.bottom-right {
  bottom: -5px;
  right: -5px;
  cursor: se-resize;
}
</style>

