import css from './style/componentas/count.module.scss'
export default defineComponent({
  name: 'App',
  setup() {
    const count = ref(0)
    const addCount = () => count.value++
    const subCount = () => count.value--
    return () => (
      <div>
        <button class={css.btn} onClick={subCount}>
          -
        </button>
        <span class={css.count}>{count.value}</span>
        <button class={css.btn} onClick={addCount}>
          +
        </button>
      </div>
    )
  },
})
