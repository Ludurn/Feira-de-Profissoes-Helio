<template>
    <div class="polaroid-template">
        <div class="polaroid-body" @click="zoomPolaroid">
            <img class="photo" :src="props.imgUrl" alt="">
            <transition name="fade" mode="default">
                <div v-if="props.reveal" class="shield"></div>
            </transition>
            <div class="label">
                <h1>{{ props.label }}</h1>
            </div>
        </div>
        <div class="tape">
            <img :src="tape">
        </div>
    </div>
</template>

<script setup lang="ts">
import tape from '@/assets/imgs/tape.png'

import { defineProps } from 'vue'
import { usePropZoom } from '@/composables/usePropZoom'

const props = defineProps<{ label: string, imgUrl: string, reveal: boolean }>()
const { activate } = usePropZoom()

function zoomPolaroid() {
    activate({ label: props.label, imgUrl: props.imgUrl, type: 'polaroid' })
}

</script>
