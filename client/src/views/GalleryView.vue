<template>
  <div id="gallery">
    <h1 class="title-80">
      Bem-vindo a galeria!
    </h1>
    <p class="paragraph-40">
      Caso esteja procurando a sua foto ou de alguém que participou da melhor feira do Hélio,
      você está no lugar certo :D
    </p>
    <div id="visitors-gallery">
      <img v-for="(visitor, index) in visitors" :key="index" :src="visitor.image_url" />
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { API_URL } from '@/composables/useApi'
import { ref, onMounted } from 'vue'

interface Visitor {
  image_url: string
}

const visitors = ref<Visitor[]>([])
const message = ref('')

const getImages = async () => {
  try {
    const response = await axios.get(`${API_URL.value}/getImages/`)
    if (Array.isArray(response.data)) {
      visitors.value = response.data
    } else {
      message.value = 'Nenhuma imagem encontrada.'
    }
  } catch (err: unknown) {
    message.value = 'Erro ao buscar imagens: ' + err
  }
  console.log(message.value)
}


onMounted(() => {
  getImages()
})
</script>
