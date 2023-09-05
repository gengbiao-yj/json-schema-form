<script setup lang="ts">
  import { FieldPropsDefine } from '../types.ts'
  const props = defineProps(FieldPropsDefine)

  const handleChange = (e: any) => {
    const value = e.target.value
    const num = Number(value)

    if (Number.isNaN(num)) {
      props.onChange(undefined)
    } else {
      props.onChange(num)
    }
  }
</script>

<template>
  <input type="number" :value="value" @input="handleChange" />
</template>

<style scoped lang="scss"></style>
