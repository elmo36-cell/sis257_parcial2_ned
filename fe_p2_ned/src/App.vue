<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'
</script>

<template>
  <MainHeader />

  <main class="content-container">
    <RouterView />
  </main>

  <MainFooter />
</template>

<style scoped>
.content-container {
  padding: 2rem;
}
</style>
