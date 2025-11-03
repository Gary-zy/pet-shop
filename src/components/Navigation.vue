<template>
  <nav class="bg-primary-white border-b-2 border-primary-black sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <RouterLink to="/" class="text-2xl font-display font-bold text-gradient">
            边牧小狗
          </RouterLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-8">
            <RouterLink 
              to="/studio" 
              class="nav-link"
              :class="{ 'active': $route.path === '/studio' }"
            >
              影棚写真
            </RouterLink>
            <RouterLink 
              to="/lab" 
              class="nav-link"
              :class="{ 'active': $route.path === '/lab' }"
            >
              卷毛实验室
            </RouterLink>
            <RouterLink 
              to="/shop" 
              class="nav-link"
              :class="{ 'active': $route.path === '/shop' }"
            >
              周边商城
            </RouterLink>
          </div>
        </div>

        <!-- Cart Icon -->
        <div class="flex items-center space-x-4">
          <RouterLink to="/checkout" class="relative">
            <div class="cart-icon">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2 2v-2a2 2 0 012-2h6a2 2 0 012 2z"/>
</svg>
              <span v-if="cartItemCount > 0" class="cart-badge">
                {{ cartItemCount }}
              </span>
            </div>
          </RouterLink>

          <!-- Mobile menu button -->
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden mobile-menu-btn"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-show="isMobileMenuOpen" class="md:hidden mobile-menu">
          <RouterLink 
            to="/studio" 
            class="mobile-nav-link"
            @click="isMobileMenuOpen = false"
          >
            影棚写真
          </RouterLink>
          <RouterLink 
            to="/lab" 
            class="mobile-nav-link"
            @click="isMobileMenuOpen = false"
          >
            卷毛实验室
          </RouterLink>
          <RouterLink 
            to="/shop" 
            class="mobile-nav-link"
            @click="isMobileMenuOpen = false"
          >
            周边商城
          </RouterLink>
        </div>
      </transition>
    </div>

    <!-- Notification -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-2 opacity-0"
    >
      <div v-if="notification" class="notification">
        {{ notification }}
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores'

const store = useAppStore()
const isMobileMenuOpen = ref(false)

const cartItemCount = computed(() => store.cartItemCount)
const notification = computed(() => store.notification)
</script>

<style scoped>
.nav-link {
  @apply relative text-primary-black hover:text-secondary-gray transition-colors duration-300 font-medium;
}

.nav-link.active::after {
  content: '';
  @apply absolute -bottom-1 left-0 w-full h-0.5 bg-primary-black;
}

.cart-icon {
  @apply relative p-2 text-primary-black hover:text-secondary-gray transition-colors duration-300;
}

.cart-badge {
  @apply absolute -top-1 -right-1 bg-primary-black text-primary-white text-xs rounded-full w-5 h-5 flex items-center justify-center;
}

.mobile-menu-btn {
  @apply p-2 text-primary-black hover:text-secondary-gray transition-colors duration-300;
}

.mobile-menu {
  @apply px-2 pt-2 pb-3 space-y-1 bg-primary-white border-t border-gray-200;
}

.mobile-nav-link {
  @apply block px-3 py-2 text-primary-black hover:bg-light-gray rounded-md transition-colors duration-300 font-medium;
}

.notification {
  @apply fixed top-20 right-4 bg-primary-black text-primary-white px-4 py-2 rounded-none shadow-lg z-50;
}
</style>