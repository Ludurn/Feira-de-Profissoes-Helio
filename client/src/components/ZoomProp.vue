<template>
    <div v-if="activeProp" class="zoom">
      <div id="disable-zoom" :class="`disable-${activeProp.type}`">
            <p @click="deactivate">X</p>
        </div>
        <PolaroidProp v-if="activeProp.type === 'polaroid'" :reveal="false" :label="activeProp.label" :imgUrl="activeProp.imgUrl" />
        <CameraProp v-if="activeProp.type === 'camera'" />
    </div>
</template>

<script setup lang="ts">
import PolaroidProp from './PolaroidProp.vue'
import CameraProp from './CameraProp.vue'

import { usePropZoom } from '@/composables/usePropZoom'

const { activeProp, deactivate } = usePropZoom() 

</script>
