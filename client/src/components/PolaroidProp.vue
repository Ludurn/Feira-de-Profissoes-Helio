<template>
    <div class="polaroid-template">
        <div class="polaroid-body">
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

const props = defineProps<{ label: string, imgUrl: string, reveal: boolean }>()


</script>
