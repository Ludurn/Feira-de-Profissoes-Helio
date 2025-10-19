<template>
  <div id="home">
    <div id="column-1">
      <div id="coffee-mug">
        <img width="100%" :src="coffeeMug" alt="coffee mug">
      </div>
      <PolaroidProp id="polaroid1" :reveal="shield" label="turma S2" :imgUrl="polaroid1" />
    </div>
    <div id="column-2">
      <h1 class="title-80">Comunidade <br> do <br> Hélio</h1>
      <div id="options">
        <LinkButton route="/diary" label="Diário" />
        <LinkButton route="/" label="Sair" />
      </div>
    </div>
    <div id="column-3">
      <div id="stabilo">
        <img width="100%" :src="stabilo" alt="stabilo pen">
      </div>
      <PolaroidProp id="polaroid2" :reveal="shield" label="unidade 1" :imgUrl="polaroid2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import coffeeMug from '@/assets/imgs/coffee-mug.png'
import stabilo from '@/assets/imgs/stabilo.png'
import polaroid1 from '@/assets/imgs/turma-25.png'
import polaroid2 from '@/assets/imgs/fachada.png'

import PolaroidProp from '@/components/PolaroidProp.vue'
import LinkButton from '@/components/LinkButton.vue'
import { onMounted, ref } from 'vue'

const shield = ref(true)

onMounted(() => {
  setTimeout(() => {
    shield.value = false
  }, 1000)
})

</script>
