<!-- src/components/CustomSignaturePad.vue -->
<template>
    <div class="signature-pad-container">
      <canvas ref="signatureCanvas" class="signature-pad"></canvas>
      <div class="signature-buttons mt-2 flex space-x-2">
        <button type="button" level="secondary" @click="clearSignature">مسح التوقيع</button>
        <button type="button" level="secondary" @click="saveSignature">حفظ التوقيع</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import SignaturePad from 'signature_pad'
  import button from './button.vue' // تأكد من مسار مكون الزر الصحيح
  
  const emit = defineEmits(['save-signature'])
  
  const signatureCanvas = ref(null)
  let signaturePad = null
  
  onMounted(() => {
    const canvas = signatureCanvas.value
  
    // ضبط حجم اللوحة لتناسب الجهاز
    function resizeCanvas() {
      const ratio = Math.max(window.devicePixelRatio || 1, 1)
      canvas.width = canvas.offsetWidth * ratio
      canvas.height = canvas.offsetHeight * ratio
      canvas.getContext('2d').scale(ratio, ratio)
      signaturePad.clear() // مسح أي توقيع موجود بعد تغيير الحجم
    }
  
    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
  
    // تهيئة SignaturePad
    signaturePad = new SignaturePad(canvas, {
      minWidth: 1,
      maxWidth: 3,
      penColor: 'black',
    })
  })
  
  onBeforeUnmount(() => {
    if (signaturePad) {
      signaturePad.off()
      signaturePad = null
    }
  })
  
  const clearSignature = () => {
    if (signaturePad) {
      signaturePad.clear()
    }
  }
  
  const saveSignature = () => {
    if (signaturePad.isEmpty()) {
      alert('يرجى توقيع المستند قبل الحفظ.')
    } else {
      const dataURL = signaturePad.toDataURL()
      emit('save-signature', dataURL)
    }
  }
  </script>
  
  <style scoped>
  .signature-pad-container {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
  }
  .signature-pad {
    width: 100%;
    height: 200px;
    border: 1px solid #000;
    border-radius: 4px;
  }
  .signature-buttons {
    display: flex;
    justify-content: flex-end;
  }
  </style>