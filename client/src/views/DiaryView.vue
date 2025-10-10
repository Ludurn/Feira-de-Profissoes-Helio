<template>
  <div id="diary">
    <div id="column-1">
      <div id="pencil">
        <img width="100%" :src="pencil" alt="pencil">
      </div>
      <PolaroidProp id="polaroid1" :reveal="shield" label="ola" :imgUrl="polaroid2" />
    </div>
    <div id="column-2">
        <img id="notebook" draggable="false" :src="notebook" alt="">
    </div>
    <div id="column-3">
      <div id="titbit">
        <img width="100%" :src="titbit" alt="tibit">
      </div>
      <PolaroidProp id="polaroid2" :reveal="shield" label="ciao" :imgUrl="polaroid2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import pencil from '@/assets/imgs/pencil.png'
import titbit from '@/assets/imgs/titbit.png'
import notebook from '@/assets/imgs/notebook.png'
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
