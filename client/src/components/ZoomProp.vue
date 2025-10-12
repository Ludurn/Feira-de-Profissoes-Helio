<template>
    <div v-if="activeProp" class="zoom">
        <div id="disable-zoom">
            <p @click="deactivate">X</p>
        </div>
        <PolaroidProp :reveal="false" :label="activeProp.label" :imgUrl="activeProp.imgUrl" />
    </div>
</template>

<script setup lang="ts">
import PolaroidProp from './PolaroidProp.vue'

import { usePropZoom } from '@/composables/usePropZoom'

const { activeProp, deactivate } = usePropZoom() 

</script>
