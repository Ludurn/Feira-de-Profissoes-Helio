<template>
  <nav>
    
  </nav>
  <router-view/>
  <transition name="fade" mode="default">
    <ZoomProp/>
  </transition>
</template>

<script setup lang="ts">
import ZoomProp from '@/components/ZoomProp.vue'

import { useNoDragImages } from './composables/useNoDragImages'

useNoDragImages()

</script>
