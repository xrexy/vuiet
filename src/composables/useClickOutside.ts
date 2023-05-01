import type { Nullable } from '..'
import type { Ref } from 'vue'

export function useClickOutside(
  target: Ref<Nullable<HTMLElement>>,
  handler: (e: MouseEvent) => void
) {
  const listener = (e: MouseEvent) => {
    if (!target.value) return
    if (!target.value.contains(e.target as HTMLElement)) {
      handler(e)
    }
  }
  document.addEventListener('click', listener)
  return () => {
    document.removeEventListener('click', listener)
  }
}
