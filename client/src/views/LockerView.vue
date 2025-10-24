<template>
  <div id="locker">
    <div id="locker-bg"></div>
    
    <img :src="lockerSplitter" class="splitter sp1" />
    
    <CameraProp />
    <img :src="lockerSplitter" class="splitter sp2" />
  </div>
</template>

<script setup lang="ts">
import lockerSplitter from '@/assets/imgs/locker-splitter.png'

import CameraProp from '../components/CameraProp.vue'
</script>
