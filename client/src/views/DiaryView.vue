<template>
  <div id="diary">
    <div id="column-1">
      <div id="pencil">
        <img width="100%" :src="pencil" alt="pencil">
      </div>
      <PolaroidProp id="polaroid1" :reveal="shield" label=":D" :imgUrl="polaroid2" />
    </div>
    <div id="column-2">
        <img id="notebook" draggable="false" :src="notebook" alt="">
        <div id="page">
          <div>
            <transition name="fade" mode="default">
              <p v-if="showPage" class="notes">{{ notes[0] }}</p>
            </transition>
          </div>
          <div>
            <transition name="fade" mode="default">
              <p v-if="showPage" class="notes">{{ notes[1] }}</p>
            </transition>
          </div>
          <div>
            <transition name="fade" mode="default">
              <p v-if="showPage" class="notes">{{ notes[2] }}</p>
            </transition>
          </div>
          <div id="page-index">
            <transition name="fade" mode="default">
              <p v-if="showPage" class="notes">{{ (targetPage+1) + '/' + bookPages.length }}</p>
            </transition>
          </div>
        </div>
        <div id="intro" :style="{ opacity: showIntro ? 1 : 0 }">
          <div @click="priorPage" id="priorPage">
            <p class="paragraph-100"> &lt;&lt; </p>
            <p>Para voltar a página, <br> clique aqui</p>
          </div>
          <div @click="nextPage" id="nextPage">
            <p class="paragraph-100"> &gt;&gt; </p>
            <p>Para avançar a página, <br> clique aqui</p>
          </div>
        </div>
    </div>
    <div id="column-3">
      <div id="titbit">
        <img width="100%" :src="titbit" alt="tibit">
      </div>
      <PolaroidProp id="polaroid2" :reveal="shield" label="school" :imgUrl="polaroid2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import pencil from '@/assets/imgs/pencil.png'
import titbit from '@/assets/imgs/titbit.png'
import notebook from '@/assets/imgs/notebook.png'
import polaroid2 from '@/assets/imgs/cat.jpg'

import PolaroidProp from '@/components/PolaroidProp.vue'
import { onMounted, ref, computed } from 'vue'

import bookPages from '@/assets/data/bookPages.json'

const showIntro = ref(false)
const showPage = ref(false)
const targetPage = ref(0)
const notes = computed<Array<string>>(
  () => bookPages[targetPage.value]
)

function nextPage() {
  if (targetPage.value < bookPages.length - 1) {
    targetPage.value++
    showPage.value = false

    setTimeout(() => {
      showPage.value = true
    }, 500)
  }
}

function priorPage() {
  if (targetPage.value > 0) {
    targetPage.value--
    showPage.value = false
    
    setTimeout(() => {
      showPage.value = true
    }, 500)
  }
}

const shield = ref(true)

onMounted(() => {
  setTimeout(() => {
    shield.value = false
    showIntro.value = true

    setTimeout(() => {
      showIntro.value = false
      
      setTimeout(() => showPage.value = true, 500)
    }, 2000)
  }, 1000)
})

</script>
