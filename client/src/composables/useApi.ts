import { ref } from "vue"

export const API_URL = ref(
    process.env.VUE_APP_API_URL || 'http://localhost:3000'
)
