<template>
  <div class="home">
    <form @submit.prevent method="POST">
      <input type="text" name="name" v-model="txt_name">
      <br><br>
      <input type="email" name="email" v-model="txt_email">
      <br><br>
      <input type="submit" @click="submitForm" value="SEND">
    </form>
    <div>
      <p>{{ message }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const txt_name = ref<string>('')
const txt_email = ref<string>('')
const message = ref<string>('')

const submitForm = async () => {
  try {
    const response = await axios.post('http://localhost:3000/sendData/', {
      name: txt_name.value,
      email: txt_email.value
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    if (response.data == 'SUCCESS') {
      message.value = 'Formulário enviado'
    } else {
      message.value = 'Erro ao enviar formulário'
    }
  } catch (err: unknown) {
    message.value = 'Erro ao enviar formulário'
  }
}

</script>
