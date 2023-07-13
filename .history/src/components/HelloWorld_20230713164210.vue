<script setup lang="ts">
  import { CountHandle } from './coun.tsx'
  defineProps<{ msg: string }>()
</script>

<template>
  <h1>{{ msg }}</h1>
  <CountHandle />
</template>

<style scoped lang="scss">
  .read-the-docs {
    color: #888888;
  }
</style>
