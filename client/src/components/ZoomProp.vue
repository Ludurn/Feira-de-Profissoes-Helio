<template>
    <div v-if="activeProp" class="zoom">
      <div id="disable-zoom" :class="`disable-${activeProp.type}`">
            <p @click="deactivate">X</p>
        </div>
        <PolaroidProp v-if="activeProp.type === 'polaroid'" :reveal="false" :label="activeProp.label" :imgUrl="activeProp.imgUrl" />
        <CameraProp v-if="activeProp.type === 'camera'" />
        <PostItProp v-if="activeProp.type === 'postIt'" :label="activeProp.label" />
    </div>
</template>

<script setup lang="ts">
import PolaroidProp from './PolaroidProp.vue'
import CameraProp from './CameraProp.vue'
import PostItProp from './PostItProp.vue'

import { usePropZoom } from '@/composables/usePropZoom'

const { activeProp, deactivate } = usePropZoom() 

</script>
