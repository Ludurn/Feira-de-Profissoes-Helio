<template>
  <div id="diary">
    <div id="column-1">
      <div id="pencil">
        <img width="100%" :src="pencil" alt="pencil">
      </div>
      <PolaroidProp id="polaroid1" :reveal="shield" label="adms do hélio" :imgUrl="polaroid1" />
    </div>
    <div id="column-2">
        <img id="notebook" draggable="false" :src="notebook" alt="">
        <transition name="fade" mode="default">
        <div id="page" v-if="showPage">
          <div><p class="notes">{{ notes[0] }}</p></div>
          <div class="drawings">
            <img :src="draw1" :class="{ 'last-draw': draw1 === drawings[2][0] }" />
          </div>
          <div><p class="notes">{{ notes[1] }}</p></div>
          <div class="drawings">
            <img v-if="draw2" :src="draw2" />
          </div>
          <div><p class="notes">{{ notes[2] }}</p></div>
          <div id="page-index"><p class="notes">{{ (targetPage+1) + '/' + bookPages.length }}</p></div>
        </div>
        </transition>
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
      <div @click="redirect" id="titbit">
        <img width="100%" :src="titbit" alt="tibit">
      </div>
      <PolaroidProp id="polaroid2" :reveal="shield" label="as mais mais" :imgUrl="polaroid2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import pencil from '@/assets/imgs/pencil.png'
import titbit from '@/assets/imgs/titbit.png'
import notebook from '@/assets/imgs/notebook.png'
import polaroid1 from '@/assets/imgs/secretaria-1.png'
import polaroid2 from '@/assets/imgs/secretaria-2.png'

import PolaroidProp from '@/components/PolaroidProp.vue'
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import bookPages from '@/assets/data/bookPages.json'

const showIntro = ref(false)
const showPage = ref(false)
const targetPage = ref(0)
const notes = computed<Array<string>>(
  () => bookPages[targetPage.value]
)
const drawings = [['/drawings/draw-1.png', '/drawings/draw-2.png'], ['/drawings/draw-3.png', '/drawings/draw-4.png'], ['/drawings/draw-5.png', '']]
const draw1 = ref(drawings[0][0])
const draw2 = ref(drawings[0][1])

const router = useRouter()

function redirect () {
  router.push('/locker')
}

function nextPage() {
  if (targetPage.value < bookPages.length - 1) {
    targetPage.value++
    draw1.value = drawings[targetPage.value][0]
    draw2.value = drawings[targetPage.value][1]
    showPage.value = false

    setTimeout(() => {
      showPage.value = true
    }, 500)
  }
}

function priorPage() {
  if (targetPage.value > 0) {
    targetPage.value--
    draw1.value = drawings[targetPage.value][0]
    draw2.value = drawings[targetPage.value][1]
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
