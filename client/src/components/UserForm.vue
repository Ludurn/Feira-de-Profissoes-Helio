<template>
  <div class="home">
    <form @submit.prevent method="POST" enctype="multipart/form-data">
      <input type="text" name="name" v-model="txt_name">
      <br><br>
      <input type="email" name="email" v-model="txt_email">
      <br><br>
      <input type="file" name="arquivo" @change="handleFileChange"
        accept=".png, .gif, application/pdf" multiple />
      <br><br>
      <input type="submit" @click="submitForm" value="SEND">
    </form>
    <div>
      <p>{{ message }}</p>
    </div>
    <br><br>
    <button @click="getImage">get image</button>
    <br><br>
    <img :src="image_url" alt="" width="20%">
  </div>
</template>
<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const txt_name = ref<string>('')
const txt_email = ref<string>('')
const input_files = ref<Array<File>>([])
const message = ref<string>('')
const image_url = ref<string>('')

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement | null;
  if (target && target.files) {
    input_files.value = Array.from(target.files)
  }
}

const submitForm = async () => {
  try {
    const formData = new FormData()
    formData.append('name', txt_name.value)
    formData.append('email', txt_email.value)
    input_files.value.forEach(file => {
      formData.append('files', file)
    })

    const response = await axios.post('http://localhost:3000/sendData/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    if (response.data == 'SUCCESS') {
      message.value = 'Formulário enviado'
    } else {
      message.value = response.data
    }
  } catch (err: unknown) {
    message.value = err+''
  }
}

const getImage = async () => {
  try {
    await axios.get('http://localhost:3000/getImage/30', { responseType: 'blob'})
      .then((response) => {
        console.log(response.data)
        const blob = new Blob([response.data])
        const url = window.URL.createObjectURL(blob)

        setTimeout(() => {
          window.URL.revokeObjectURL(url)
        }, 100)

        image_url.value = url
      })
      .catch((error) => {
        message.value = error
      })
  } catch (err: unknown) {
    message.value = err+''
  }
}

</script>
