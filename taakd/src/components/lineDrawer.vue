<template>
    <canvas ref="canvas" class="line-drawing-canvas"></canvas>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  
  // Props for the two points (x1, y1) and (x2, y2)
  const props = defineProps({
    pointA: {
      type: Object,
      required: true,
      validator(value) {
        return 'x' in value && 'y' in value;
      }
    },
    pointB: {
      type: Object,
      required: true,
      validator(value) {
        return 'x' in value && 'y' in value;
      }
    }
  });
  
  // Ref to hold the canvas element
  const canvasRef = ref(null);
  
  // Function to draw the line
  const drawLine = (ctx, startX, startY, endX, endY) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas before each drawing
    ctx.beginPath();
    ctx.moveTo(startX, startY); // Starting point
    ctx.lineTo(endX, endY); // Ending point
    ctx.stroke(); // Actually draw the line
  };
  
  const resizeCanvas = () => {
    const canvas = canvasRef.value;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  
  onMounted(() => {
    // Resize canvas to match window size
    resizeCanvas();
  
    const canvas = canvasRef.value;
    const ctx = canvas.getContext('2d');
  
    // Draw the initial line
    drawLine(ctx, props.pointA.x, props.pointA.y, props.pointB.x, props.pointB.y);
  
    // Re-draw the line if the window is resized
    window.addEventListener('resize', resizeCanvas);
    watch(() => props.pointA, () => drawLine(ctx, props.pointA.x, props.pointA.y, props.pointB.x, props.pointB.y));
    watch(() => props.pointB, () => drawLine(ctx, props.pointA.x, props.pointA.y, props.pointB.x, props.pointB.y));
  });
  </script>
  
  <style scoped>
  .line-drawing-canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 80; /* Put canvas behind other content */
    border: 1px solid black; /* Optional border for visibility */
  }
  </style>
  