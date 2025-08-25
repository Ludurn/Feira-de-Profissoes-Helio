<template>
  <div class="home">
    <button @click="toggleUserForm">User Form</button>
    <div v-if="toggle">
      <LinkButton route="/" label="sla" />
      <UserForm />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import LinkButton from '@/components/LinkButton.vue'
import UserForm from '@/components/UserForm.vue'

const toggle = ref<boolean>(false)

function toggleUserForm() {
  toggle.value = !toggle.value
}

</script>
