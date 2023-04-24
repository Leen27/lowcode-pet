<template>
  <div
    class="box"
    :style="{
      width: state.width,
      height: state.height,
      transform: `translate(${state.x}px, ${state.y}px)`,
    }"
    ref="box"
    @mousedown="startDrag"
  >
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

<script>
import { ref } from 'vue';

export default {
  setup() {
    const box = ref(null)
    const state = ref({
      x: 0,
      y: 0,
      width: '100px',
      height: '100px'
    });
    const startX = ref(0);
    const startY = ref(0);
    const startWidth = ref(0);
    const startHeight = ref(0);
    const dragging = ref(false);
    const resizing = ref(false);
    const resizeDirection = ref('');

    const startDrag = (event) => {
      if (event.target.classList.contains('drag-point')) {
        return;
      }
      startX.value = event.clientX - state.value.x;
      startY.value = event.clientY - state.value.y;
      dragging.value = true;
      document.addEventListener('mousemove', doDrag);
      document.addEventListener('mouseup', stopDrag);
    };

    const doDrag = (event) => {
      if (dragging.value) {
        state.value.x = event.clientX - startX.value;
        state.value.y = event.clientY - startY.value;
      }
    };

    const stopDrag = () => {
      dragging.value = false;
      document.removeEventListener('mousemove', doDrag);
      document.removeEventListener('mouseup', stopDrag);
    };

    const startResize = (event, direction) => {
      startX.value = event.clientX;
      startY.value = event.clientY;
      startWidth.value = parseInt(state.value.width);
      startHeight.value = parseInt(state.value.height);
      resizing.value = true;
      resizeDirection.value = direction;
      document.addEventListener('mousemove', doResize);
      document.addEventListener('mouseup', stopResize);
    };

    const doResize = (event) => {
      if (resizing.value) {
        if (resizeDirection.value === 'top') {
          state.value.height = `${startHeight.value - (event.clientY - startY.value)}px`;
        } else if (resizeDirection.value === 'right') {
          state.value.width = `${startWidth.value + (event.clientX - startX.value)}px`;
        } else if (resizeDirection.value === 'bottom') {
          state.value.height = `${startHeight.value + (event.clientY - startY.value)}px`;
        } else if (resizeDirection.value === 'left') {
          state.value.width = `${startWidth.value - (event.clientX - startX.value)}px`;
        } else if (resizeDirection.value === 'top-left') {
          state.value.width = `${startWidth.value - (event.clientX - startX.value)}px`;
          state.value.height = `${startHeight.value - (event.clientY - startY.value)}px`;
        } else if (resizeDirection.value === 'top-right') {
          state.value.height = `${startHeight.value - (event.clientY - startY.value)}px`;
          state.value.width = `${startWidth.value + (event.clientX - startX.value)}px`;
        } else if (resizeDirection.value === 'bottom-left') {
          state.value.width = `${startWidth.value - (event.clientX - startX.value)}px`;
          state.value.height = `${startHeight.value + (event.clientY - startY.value)}px`;
        } else if (resizeDirection.value === 'bottom-right') {
          state.value.width = `${startWidth.value + (event.clientX - startX.value)}px`;
          state.value.height = `${startHeight.value + (event.clientY - startY.value)}px`;
        }
      }
    };

    const stopResize = () => {
      resizing.value = false;
      document.removeEventListener('mousemove', doResize);
      document.removeEventListener('mouseup', stopResize);
    };

    return {
      state,
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

