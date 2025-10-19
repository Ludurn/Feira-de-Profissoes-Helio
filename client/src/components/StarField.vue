<template>
  <div id="star-field">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Star {
    x: number
    y: number
    size: number
    opacity: number
    speed: number
    fadingIn: boolean
}

const starLimit = 200
const starSize = 0.001

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null

let stars: Star[] = []

onMounted(() => {
    if (!canvas.value) return

    ctx = canvas.value.getContext('2d')
    
    if (!ctx) return

    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight

    createStars(canvas.value.width, canvas.value.height)

    animate()
})

function randomStar(canvasWidth: number, canvasHeight: number): Star {
  return {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    size: starSize * canvasWidth,
    opacity: 0,
    speed: Math.random() * 0.01 + 0.002,
    fadingIn: true
  }
}

function createStars(canvasWidth: number, canvasHeight: number) {
  while (stars.length < starLimit) {
    stars.push(randomStar(canvasWidth, canvasHeight))
  }
}

function animate() {
    if (!ctx || !canvas.value) return
    
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

    for (let i = 0; i < stars.length; i++) {
        const star = stars[i]

        if (star.fadingIn) {
        star.opacity += star.speed
        if (star.opacity >= 1) star.fadingIn = false
        } else {
        star.opacity -= star.speed
        if (star.opacity <= 0) {
            stars[i] = randomStar(canvas.value.width, canvas.value.height)
        }
        }

        if (star.opacity > 0.03) {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
        }
    }

    requestAnimationFrame(animate)
}

</script>
