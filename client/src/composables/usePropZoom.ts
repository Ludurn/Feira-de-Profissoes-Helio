import { ref } from 'vue'

const activeProp = ref<{ label: string; imgUrl: string; type: string } | null>(null)

export function usePropZoom() {
  function activate(prop: { label: string; imgUrl: string; type: string }) {
    activeProp.value = prop
  }

  function deactivate() {
    activeProp.value = null
  }

  return {
    activeProp,
    activate,
    deactivate
  }
}
