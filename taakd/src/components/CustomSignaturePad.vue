<!-- src/components/CustomSignaturePad.vue -->
<template>
  <div class="relative w-full max-w-md">
    <canvas
      ref="canvas"
      :width="canvasWidth"
      :height="canvasHeight"
      class="w-full h-auto border border-gray-300 rounded shadow-sm"
    ></canvas>
    <button
      @click="clear"
      class="absolute top-2 end-2 bg-white bg-opacity-70 hover:bg-opacity-100 text-red-500 rounded-full p-2 shadow-md transition-opacity duration-200"
      aria-label="Clear Signature"
      title="مسح التوقيع"
    >
      <!-- أيقونة مسح التوقيع باستخدام SVG -->
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';

// تعريف الأحداث المسموعة من المكون الأب
const emit = defineEmits(['update-signature']);

// تعريف props
const props = defineProps({
  initialSignature: {
    type: String,
    default: '',
  },
});

// المراجع
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null); // استخدم ref للـ ctx
let drawing = false;

// إعدادات الـ canvas الديناميكية
const canvasWidth = computed(() => 400); // يمكنك جعلها ديناميكية أو تعتمد على props
const canvasHeight = computed(() => 200);

// دالة بدء الرسم
const startDrawing = (e: MouseEvent | TouchEvent) => {
  drawing = true;
  if (ctx.value && canvas.value) {
    const { offsetX, offsetY } = getEventPosition(e);
    ctx.value.beginPath();
    ctx.value.moveTo(offsetX, offsetY);
  }
};

// دالة الرسم المستمر
const draw = (e: MouseEvent | TouchEvent) => {
  if (drawing && ctx.value && canvas.value) {
    const { offsetX, offsetY } = getEventPosition(e);
    ctx.value.lineTo(offsetX, offsetY);
    ctx.value.stroke();
  }
};

// دالة إنهاء الرسم
const stopDrawing = () => {
  if (drawing) {
    drawing = false;
    if (ctx.value) {
      ctx.value.closePath();
      emitSignature(); // إرسال التوقيع بعد إنهاء الرسم
    }
  }
};

// الحصول على موقع الحدث على اللوحة
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

// دالة لمسح التوقيع
const clear = () => {
  if (ctx.value && canvas.value) {
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
    emit('update-signature', ''); // إرسال توقيع فارغ عند المسح
  }
};

// دالة لإرسال التوقيع
const emitSignature = () => {
  if (canvas.value) {
    const dataUrl = canvas.value.toDataURL('image/png');
    emit('update-signature', dataUrl);
  }
};

// دالة لتحميل التوقيع المبدئي إذا كانت موجودة
const loadInitialSignature = () => {
  if (props.initialSignature && ctx.value && canvas.value) {
    const image = new Image();
    image.onload = () => {
      ctx.value!.drawImage(image, 0, 0, canvas.value!.width, canvas.value!.height);
    };
    image.src = props.initialSignature;
  }
};

// إعداد الـ canvas عند تحميل المكون
onMounted(() => {
  if (canvas.value) {
    const context = canvas.value.getContext('2d');
    if (context) {
      ctx.value = context; // تحديث ref للـ ctx
      ctx.value.strokeStyle = '#000';
      ctx.value.lineWidth = 2;
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

      // تحميل التوقيع المبدئي إذا كان موجودًا
      loadInitialSignature();
    }
  }
});

// مراقبة تغييرات الـ Prop `initialSignature` وتحميل التوقيع الجديد إذا تغير
watch(() => props.initialSignature, (newSignature) => {
  if (newSignature && ctx.value && canvas.value) {
    // مسح اللوحة الحالية قبل تحميل التوقيع الجديد
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
    const image = new Image();
    image.onload = () => {
      ctx.value!.drawImage(image, 0, 0, canvas.value!.width, canvas.value!.height);
    };
    image.src = newSignature;
  } else if (!newSignature && ctx.value && canvas.value) {
    // مسح اللوحة إذا لم يعد هناك توقيع
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  }
}, { immediate: true });

// إزالة المستمعين عند إزالة المكون
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
</style>