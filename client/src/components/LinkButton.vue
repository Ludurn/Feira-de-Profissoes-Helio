<template>
    <div @click="redirect" class="link-button">
      <img class="paper" :src="paper" alt="">
      <p class="paper-label paragraph-40">{{ label }}</p>
    </div>
</template>

<script setup lang="ts">
import paper from '@/assets/imgs/paper.png'

import { useRouter } from 'vue-router'
import { defineProps } from 'vue'

const props = defineProps<{ route: string, label: string }>()
const router = useRouter()

function redirect () {
  router.push(props.route)
}
</script>
