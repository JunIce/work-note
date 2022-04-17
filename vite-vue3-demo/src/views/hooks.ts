import { onMounted, Ref } from 'vue'

export const useDrag = (ref: Ref): void => {
  const dragStart = (e: PointerEvent) => {
    console.log(e)
  }

  const init = (target: HTMLElement) => {
    target.addEventListener('pointerdown', dragStart, true)
    target.addEventListener('dragmove', dragStart, true)
    target.addEventListener('dragend', dragStart, true)
    return () => {
      target.removeEventListener('dragstart', dragStart)
      target.removeEventListener('dragmove', dragStart)
      target.removeEventListener('dragend', dragStart)
    }
  }

  onMounted(() => {
    if(ref.value) {
      init(ref.value)
    }
  })
}
