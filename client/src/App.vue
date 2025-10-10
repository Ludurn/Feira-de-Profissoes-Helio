<template>
  <nav>
    
  </nav>
  <router-view/>
</template>

<script setup lang="ts">
import { useNoDragImages } from './composables/useNoDragImages'

useNoDragImages()

</script>
