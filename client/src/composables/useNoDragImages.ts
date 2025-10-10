import { onBeforeMount, onMounted } from "vue"

export function useNoDragImages(): void {
    let observer: MutationObserver

    const applyNoDrag = (img: HTMLImageElement) => {
        img.draggable = false
    }

    const processImages = (root: ParentNode) => {
        root.querySelectorAll('img').forEach(applyNoDrag)
    }

    onMounted(() => {
        processImages(document)

        observer = new MutationObserver(() => processImages(document))
        observer.observe(document.body, { childList: true, subtree: true })
    })

    onBeforeMount(() => { if (observer) observer.disconnect() })
}
