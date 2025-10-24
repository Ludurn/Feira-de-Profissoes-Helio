<template>
  <div id="cameraProp">
    <img @click="zoomCamera" :src="cameraTemplate" />
    <div class="overlay nxt" @click="nextPhoto"></div>
    <div class="overlay pri" @click="priorPhoto"></div>
    <div class="overlay dsp" :style="{ backgroundImage: `url(${currentPhoto})` }"></div>
  </div>
</template>

<script setup lang="ts">
import cameraTemplate from '@/assets/imgs/camera.png'
import catImg from '@/assets/imgs/cat.jpg'
import catStb from '@/assets/imgs/stabilo.png'

import { usePropZoom } from '@/composables/usePropZoom'
import { ref } from 'vue'

const { activate } = usePropZoom()
const currentPhoto = ref(catImg)

function zoomCamera() {
  activate({ label: '', imgUrl: cameraTemplate, type: 'camera' })
}

function nextPhoto() {
  currentPhoto.value = catStb
}

function priorPhoto() {
  currentPhoto.value = catImg
}

</script>
