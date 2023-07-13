export const CountHandle = defineComponent({
  setup() {
    const count = ref(0)
    const addCount = () => count.value++
    const subCount = () => count.value--
    return () => (
      <div>
        <button onClick={subCount}>-</button>
        <span>{count.value}</span>
        <button onClick={addCount}>+</button>
      </div>
    )
  },
})
