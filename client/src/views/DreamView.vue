<template>
  <div id="dream" ref="page">
    <StarField/>
    <div id="content">
      <h1 class="title-100">NOSSO SONHO</h1>
      <p class="paragraph-40 p-dream">
        Nós não estamos apenas terminando mais um ano mas, também, um ciclo. Assim, sonhamos com um futuro onde
        o fim dessa etapa inaugurará o início de muitas outras.
      </p>
      <img id="graduation-cap" :src="graduationCap"/>
      <div id="filter">
        <div @click="filter_job(area)" v-for="area in areas.filter(a => a.title !== 'Default')" :key="area.title" :class="['btns-area', area.title[0], { 'pressed': selectedArea === area.title }]">
          <p> {{ area.title }} </p>
        </div>
      </div>
      <div id="avatar-gallery" :class="{ 'fade-out': !showGallery, 'fade-in': showGallery }">
        <div id="area-label">
          <p class="paragraph-40 p-dream">
            {{ areaDesc }}
          </p>
        </div>
        <div id="avatar-photos">
          <figure v-for="avatar in filteredAvatars" :key="avatar" class="avatars-fig">
            <div class="mask-wrapper">
            <img :src="avatar['img']" alt="">
            </div>
            <p class="avatar-job">{{ avatar['job'] }}</p>
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import graduationCap from '@/assets/imgs/graduation cap drawing.png'

import StarField from '@/components/StarField.vue'
import { ref, computed, watch } from 'vue'

import avatarsData from '@/assets/data/avatars.json'

interface area {
  title: string,
  text: string
}

const areas: area[] = [
  {
    title: "TI",
    text: "TI é a área que cuida do uso da tecnologia para criar, armazenar, processar "
    + "e transmitir informações. Em outras palavras, tudo o que envolve computadores, "
    + "internet, softwares, redes e dados faz parte de TI."
  },
  {
    title: "Saúde",
    text: "Transformar vidas com empatia, dedicação e amor; o cuidado vai além da profissão, "
    + "sendo representado pela área da saúde. Buscando um só propósito por meio da união "
    + "entre ciência e humanidade: fazer a diferença no mundo."
  },
  {
    title: "Marketing",
    text: "Comunicação e Marketing são áreas estratégicas que utilizam criatividade, "
    + "planejamento e análise para posicionar marcas, divulgar produtos e fortalecer "
    + "relacionamentos com o público."
  },
  {
    title: "Default",
    text: "\"Por vezes acordamos. Por vezes caimos. E por vezes, quando caimos, voamos.\" -Sandman"
  }
]
const areaDesc = ref<string>(areas[3].text)
const avatars = ref(avatarsData)
const selectedArea = ref<string | null>(null)
const showGallery = ref(true)

const filteredAvatars = computed(() => {
  if (!selectedArea.value) return avatars.value
  else return avatars.value
    .filter(avatar => avatar.area === selectedArea.value)
    .sort((a, b) => a.job.localeCompare(b.job))
})

function filter_job(area: area) {
  showGallery.value = false

  setTimeout(() => {
    areaDesc.value = (selectedArea.value == area.title) ? areas[3].text : area.text
    selectedArea.value = (selectedArea.value == area.title) ? null : area.title
  }, 1000);
}

watch(showGallery, (toggle) => {
  if (!toggle) {
    setTimeout(() => {
      showGallery.value = true
    }, 1000)
  }
})

</script>
