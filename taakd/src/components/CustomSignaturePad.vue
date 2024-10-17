<!-- src/components/CustomSignaturePad.vue -->
<template>
  <div>
    <canvas ref="canvas" width="400" height="200" class="border"></canvas>
    <div class="mt-2">
      <button @click="clear" class="px-4 py-2 bg-gray-300 rounded">Clear</button>
      <button @click="save" class="px-4 py-2 bg-blue-500 text-white rounded ml-2">Save</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const emit = defineEmits(['save-signature']);

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let drawing = false;

const startDrawing = (e: MouseEvent | TouchEvent) => {
  drawing = true;
  if (ctx && canvas.value) {
    const { offsetX, offsetY } = getEventPosition(e);
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  }
};

const draw = (e: MouseEvent | TouchEvent) => {
  if (drawing && ctx && canvas.value) {
    const { offsetX, offsetY } = getEventPosition(e);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  }
};

const stopDrawing = () => {
  drawing = false;
  if (ctx) {
    ctx.closePath();
  }
};

const getEventPosition = (e: MouseEvent | TouchEvent) => {
  if (e instanceof MouseEvent) {
    return { offsetX: e.offsetX, offsetY: e.offsetY };
  } else {
    const touch = e.touches[0];
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const offsetX = touch.clientX - rect.left;
    const offsetY = touch.clientY - rect.top;
    return { offsetX, offsetY };
  }
};

const clear = () => {
  if (ctx && canvas.value) {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
    emit('save-signature', ''); // إرسال توقيع فارغ عند المسح
  }
};

const save = () => {
  if (canvas.value) {
    const dataUrl = canvas.value.toDataURL('image/png');
    emit('save-signature', dataUrl);
  }
};

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      canvas.value.style.touchAction = 'none'; // لمنع التمرير عند استخدام اللمس

      // إضافة مستمعي الأحداث
      canvas.value.addEventListener('mousedown', startDrawing);
      canvas.value.addEventListener('mousemove', draw);
      canvas.value.addEventListener('mouseup', stopDrawing);
      canvas.value.addEventListener('mouseout', stopDrawing);

      // للأجهزة اللمسية
      canvas.value.addEventListener('touchstart', startDrawing);
      canvas.value.addEventListener('touchmove', draw);
      canvas.value.addEventListener('touchend', stopDrawing);
      canvas.value.addEventListener('touchcancel', stopDrawing);
    }
  }
});

onBeforeUnmount(() => {
  if (canvas.value) {
    canvas.value.removeEventListener('mousedown', startDrawing);
    canvas.value.removeEventListener('mousemove', draw);
    canvas.value.removeEventListener('mouseup', stopDrawing);
    canvas.value.removeEventListener('mouseout', stopDrawing);

    canvas.value.removeEventListener('touchstart', startDrawing);
    canvas.value.removeEventListener('touchmove', draw);
    canvas.value.removeEventListener('touchend', stopDrawing);
    canvas.value.removeEventListener('touchcancel', stopDrawing);
  }
});
</script>

<style scoped>
canvas {
  cursor: crosshair;
}
button {
  margin-right: 10px;
}
</style>