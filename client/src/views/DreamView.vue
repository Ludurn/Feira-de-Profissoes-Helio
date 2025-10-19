<template>
  <div id="dream">
    <StarField/>
    <div id="content">
        <h1>OLÁ</h1>
        <div id="sprite">
          <img :src="sprite" @click="playAnimation" alt="">
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StarField from '@/components/StarField.vue'
import { ref } from 'vue'

import image1 from '@/assets/imgs/cat.jpg'
import image2 from '@/assets/imgs/fachada.png'
import image3 from '@/assets/imgs/turma-25.png'

const sprites = [image1, image2, image3]
const sprite = ref(image1)

function playAnimation() {
  let i = 0
  const interval = setInterval(() => {
    sprite.value = sprites[i]
    i++
    if (i >= sprites.length) clearInterval(interval)
  }, 250)
}

</script>
