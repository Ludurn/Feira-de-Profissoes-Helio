<template>
  <div id="post-it" @click="zoomPostIt">
    <img :src="emptyPostIt" />
    <p id="main"> {{ props.label }} </p>
    <p id="thumb"> aqui </p>
  </div>
</template>

<script setup lang="ts">
import postIt from '@/assets/imgs/note.png'
import emptyPostIt from '@/assets/imgs/empty-note.png'

import { usePropZoom } from '@/composables/usePropZoom'

import { defineProps } from 'vue'

const props = defineProps<{ label: string }>()
const { activate } = usePropZoom()

function zoomPostIt() {
  activate({ label: props.label, imgUrl: emptyPostIt, type: 'postIt' })
}
</script>
