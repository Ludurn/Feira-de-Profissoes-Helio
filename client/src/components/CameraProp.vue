<template>
  <div id="cameraProp">
    <img @click="zoomCamera" :src="cameraTemplate" />
    <div class="overlay nxt" @click="nextPhoto"></div>
    <div class="overlay pri" @click="priorPhoto"></div>
    <div class="overlay dsp" :style="{ backgroundImage: `url(${displayedPhoto})` }"></div>
  </div>
</template>

<script setup lang="ts">
import cameraTemplate from '@/assets/imgs/camera.png'

import cameraPhotos from '@/assets/data/cameraPhotos.json'

import { usePropZoom } from '@/composables/usePropZoom'

import { ref } from 'vue'

const { activate } = usePropZoom()
const currentPhoto = ref(0)
const displayedPhoto = ref(cameraPhotos[0])

function zoomCamera() {
  activate({ label: '', imgUrl: cameraTemplate, type: 'camera' })
}

function nextPhoto() {
  if (currentPhoto.value < cameraPhotos.length - 1) {
    currentPhoto.value = currentPhoto.value + 1
    displayedPhoto.value = cameraPhotos[currentPhoto.value]
  }
}

function priorPhoto() {
  if (currentPhoto.value > 0) {
    currentPhoto.value = currentPhoto.value - 1
    displayedPhoto.value = cameraPhotos[currentPhoto.value]
  }
}

</script>
