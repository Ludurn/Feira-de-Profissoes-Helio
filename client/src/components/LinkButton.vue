<template>
    <div @click="redirect" class="link-button">
      {{ label }}
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'

const props = defineProps<{ route: string, label: string }>()
const router = useRouter()

function redirect () {
  router.push(props.route)
}
</script>
