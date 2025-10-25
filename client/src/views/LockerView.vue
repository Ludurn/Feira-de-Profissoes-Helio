<template>
  <div id="locker">
    <div id="locker-bg"></div>
    
    <div class="above-splitter bs1">
    <PostItProp :label="label" />
    <img id="voleyball" :src="voleyBall" />
    </div>
    <img :src="lockerSplitter" class="splitter sp1" />
    
    <div class="above-splitter bs2">
      <CameraProp />
      <img @click="redirect" id="stanley" :src="stanleyProp" />
    </div>
    <img :src="lockerSplitter" class="splitter sp1" />

    <img id="bookshelf" :src="bookshelfProp" />
  </div>
</template>

<script setup lang="ts">
import lockerSplitter from '@/assets/imgs/locker-splitter.png'
import voleyBall from '@/assets/imgs/voleyball.png'
import stanleyProp from '@/assets/imgs/stanley.png'
import bookshelfProp  from '@/assets/imgs/bookshelf.png'

import PostItProp from '@/components/PostItProp.vue'
import CameraProp from '@/components/CameraProp.vue'

import { useRouter } from 'vue-router'

const label = "Quando pensavamos no terceiro, sempre tratavamos como algo distante e quase impossivel. Contudo, conforme o passar do tempo, com a união das turmas da tarde e da manhã no 9º, com o famigerado HopiHari de cada ano,  com a saida de alguns colegas e, sobretudo, com o primeiro dia de aula já no terceirão; percebemos que aquele \"longe\" nunca esteve tão perto. Então cá estamos fazendo nossa última feira, relembrando momentos e sonhando com esse novo futuro, fora da escola."
const router = useRouter()

function redirect () {
  router.push('/dream')
}

</script>
