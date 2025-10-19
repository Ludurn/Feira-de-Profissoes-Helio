<template>
  <nav>
    
  </nav>
  <transition :name="transitionName" mode="out-in" >
    <router-view :key="$route.fullPath" />
  </transition>
  <transition name="fade" mode="default">
    <ZoomProp/>
  </transition>
</template>

<script setup lang="ts">
import ZoomProp from '@/components/ZoomProp.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useNoDragImages } from './composables/useNoDragImages'

const route = useRoute()

const transitionName = computed(() => {
  if (route.path.startsWith('/dream')) return 'fade'
  return 'scroll'
})

useNoDragImages()

</script>
