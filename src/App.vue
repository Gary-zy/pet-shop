<template>
  <div id="app" class="min-h-screen bg-primary-white">
    <Navigation />
    <main>
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'
</script>

<style scoped>
main {
  min-height: calc(100vh - 120px);
}
</style>