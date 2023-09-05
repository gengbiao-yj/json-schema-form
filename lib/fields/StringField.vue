<script setup lang="ts">
  import { FieldPropsDefine } from '../types.ts'
  const props = defineProps(FieldPropsDefine)

  const handleChange = (e: any) => {
    props.onChange(e.target.value)
  }
</script>

<template>
  <input type="text" :value="value" @change="handleChange" />
</template>

<style scoped lang="scss"></style>
