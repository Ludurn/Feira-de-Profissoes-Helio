<template>
  <div class="home">
    <div id="column-1">
      <div id="coffee-mug">
        <img width="100%" :src="coffeeMug" alt="coffee mug">
      </div>
      <PolaroidProp :reveal="shield" label="ola" :imgUrl="polaroid1" />
    </div>
    <div id="column-2">
      <h1 class="title-80">Textão texto de <br> texto</h1>
    </div>
    <div id="column-3">
      <div id="stabilo">
        <img width="100%" :src="stabilo" alt="stabilo pen">
      </div>
      <PolaroidProp :reveal="shield" label="ciao" :imgUrl="polaroid2" />
    </div>
  </div>
</template>
<script setup lang="ts">
import coffeeMug from '@/assets/imgs/coffee-mug.png'
import stabilo from '@/assets/imgs/stabilo.png'
import polaroid1 from '@/assets/logo.png'
import polaroid2 from '@/assets/imgs/cat.jpg'

import PolaroidProp from '@/components/PolaroidProp.vue'
import { onMounted, ref } from 'vue'

const shield = ref(true)

onMounted(() => {
  setTimeout(() => {
    shield.value = false
  }, 1000)
})

</script>
