<template>
  <div class="checkout">
    <!-- Header -->
    <div class="checkout-header">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <h1 class="text-5xl font-display font-bold text-primary-black mb-4">
            购物车结算
          </h1>
          <p class="text-xl text-secondary-gray">
            您的爱心购物将为流浪小狗救助贡献力量
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div v-if="cartItems.length === 0" class="empty-cart">
        <div class="empty-cart-content">

          <h2 class="text-2xl font-semibold text-primary-black mb-4">
            购物车是空的
          </h2>
          <p class="text-secondary-gray mb-8">
            还没有选择任何商品，去商城看看吧！
          </p>
          <RouterLink to="/shop" class="btn-primary">
            去购物
          </RouterLink>
        </div>
      </div>

      <div v-else class="checkout-content">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Cart Items -->
          <div class="cart-section">
            <h2 class="text-2xl font-semibold text-primary-black mb-6">
              购物车 ({{ cartItemCount }} 件商品)
            </h2>
            
            <div class="cart-items">
              <div 
                v-for="item in cartItems" 
                :key="item.product.id"
                class="cart-item"
              >
                <div class="item-image">
                  <img :src="item.product.image" :alt="item.product.name" class="w-20 h-20 object-cover rounded">
                </div>
                
                <div class="item-details">
                  <h3 class="item-name">{{ item.product.name }}</h3>
                  <p class="item-description">{{ item.product.description }}</p>
                  <div class="item-price">¥{{ item.product.price }}</div>
                </div>
                
                <div class="item-controls">
                  <div class="quantity-controls">
                    <button 
                      @click="updateQuantity(item.product.id, item.quantity - 1)"
                      class="quantity-btn"
                    >
                      -
                    </button>
                    <span class="quantity">{{ item.quantity }}</span>
                    <button 
                      @click="updateQuantity(item.product.id, item.quantity + 1)"
                      class="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    @click="removeFromCart(item.product.id)"
                    class="remove-btn"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Charity Section -->
            <div class="charity-section">
              <div class="charity-card">
                <div class="charity-header">
                  <span class="charity-icon">🐕</span>
                  <h3 class="charity-title">爱心公益</h3>
                </div>
                <p class="charity-description">
                  本次订单将捐赠 <strong>¥{{ charityAmount }}</strong> 用于流浪小狗救助
                </p>
                <div class="charity-progress">
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: '64%' }"></div>
                  </div>
                  <div class="progress-text">
                    <span>本月已救助 64 只小狗</span>
                    <span>目标 100 只</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Checkout Form -->
          <div class="checkout-section">
            <div class="checkout-card">
              <h2 class="text-2xl font-semibold text-primary-black mb-6">
                订单信息
              </h2>
              
              <form @submit.prevent="submitOrder" class="space-y-6">
                <div class="form-section">
                  <h3 class="section-title">收货信息</h3>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="form-label">姓名 *</label>
                      <input 
                        v-model="orderForm.name" 
                        type="text" 
                        class="form-input"
                        required
                      >
                    </div>
                    
                    <div>
                      <label class="form-label">手机号 *</label>
                      <input 
                        v-model="orderForm.phone" 
                        type="tel" 
                        class="form-input"
                        required
                      >
                    </div>
                  </div>
                  
                  <div>
                    <label class="form-label">邮箱</label>
                    <input 
                      v-model="orderForm.email" 
                      type="email" 
                      class="form-input"
                    >
                  </div>
                  
                  <div>
                    <label class="form-label">收货地址 *</label>
                    <textarea 
                      v-model="orderForm.address" 
                      rows="3" 
                      class="form-input"
                      required
                    ></textarea>
                  </div>
                </div>

                <div class="form-section">
                  <h3 class="section-title">支付方式</h3>
                  
                  <div class="payment-options">
                    <label class="payment-option">
                      <input 
                        v-model="orderForm.paymentMethod" 
                        type="radio" 
                        value="wechat"
                        class="sr-only"
                      >
                      <div class="payment-card" :class="{ active: orderForm.paymentMethod === 'wechat' }">
                        <div class="payment-icon">💚</div>
                        <span class="payment-name">微信支付</span>
                      </div>
                    </label>
                    
                    <label class="payment-option">
                      <input 
                        v-model="orderForm.paymentMethod" 
                        type="radio" 
                        value="alipay"
                        class="sr-only"
                      >
                      <div class="payment-card" :class="{ active: orderForm.paymentMethod === 'alipay' }">
                        <div class="payment-icon">💙</div>
                        <span class="payment-name">支付宝</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div class="order-summary">
                  <h3 class="section-title">订单摘要</h3>
                  
                  <div class="summary-row">
                    <span>商品小计</span>
                    <span>¥{{ cartTotal }}</span>
                  </div>
                  
                  <div class="summary-row">
                    <span>运费</span>
                    <span class="free-shipping">免费</span>
                  </div>
                  
                  <div class="summary-row">
                    <span>公益捐赠</span>
                    <span class="charity-donation">¥{{ charityAmount }}</span>
                  </div>
                  
                  <div class="summary-row total">
                    <span>总计</span>
                    <span>¥{{ finalTotal }}</span>
                  </div>
                </div>

                <button 
                  type="submit" 
                  :disabled="isSubmitting"
                  class="submit-btn"
                >
                  <span v-if="!isSubmitting">
                    立即支付 ¥{{ finalTotal }}
                  </span>
                  <span v-else class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    处理中...
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-if="showSuccessModal" class="modal-overlay">
        <div class="modal-content">
          <div class="success-content">
            <div class="success-icon">🎉</div>
            <h2 class="success-title">订单提交成功！</h2>
            <p class="success-message">
              感谢您的购买！您的订单编号是：<strong>{{ orderNumber }}</strong>
            </p>
            <p class="success-charity">
              您为流浪小狗救助捐赠了 ¥{{ charityAmount }}，感谢您的爱心！
            </p>
            <div class="success-actions">
              <button @click="continueShopping" class="btn-primary">
                继续购物
              </button>
              <RouterLink to="/" class="btn-secondary">
                返回首页
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useAppStore } from '@/stores'
import { useRouter } from 'vue-router'
import type { CustomerInfo } from '@/types'

const store = useAppStore()
const router = useRouter()
const isSubmitting = ref(false)
const showSuccessModal = ref(false)
const orderNumber = ref('')

const orderForm = reactive({
  name: '',
  phone: '',
  email: '',
  address: '',
  paymentMethod: 'wechat'
})

const cartItems = computed(() => store.cart)
const cartItemCount = computed(() => store.cartItemCount)
const cartTotal = computed(() => store.cartTotal)
const charityAmount = computed(() => store.charityAmount)
const finalTotal = computed(() => cartTotal.value + charityAmount.value)

const updateQuantity = (productId: string, quantity: number) => {
  store.updateQuantity(productId, quantity)
}

const removeFromCart = (productId: string) => {
  store.removeFromCart(productId)
}

const submitOrder = async () => {
  isSubmitting.value = true
  
  // 模拟订单处理
  setTimeout(() => {
    orderNumber.value = 'BC' + Date.now().toString().slice(-6)
    showSuccessModal.value = true
    store.clearCart()
    isSubmitting.value = false
  }, 2000)
}

const continueShopping = () => {
  showSuccessModal.value = false
  router.push('/shop')
}
</script>

<style scoped>
.checkout {
  @apply min-h-screen bg-primary-white;
}

.checkout-header {
  @apply bg-light-gray;
}

.empty-cart {
  @apply py-20;
}

.empty-cart-content {
  @apply text-center max-w-md mx-auto;
}

.checkout-content {
  @apply animate-fade-in;
}

.cart-section {
  @apply space-y-6;
}

.cart-items {
  @apply space-y-4;
}

.cart-item {
  @apply bg-light-gray p-4 rounded-lg flex items-center space-x-4;
}

.item-image {
  @apply flex-shrink-0;
}

.item-details {
  @apply flex-1 min-w-0;
}

.item-name {
  @apply text-lg font-semibold text-primary-black mb-1;
}

.item-description {
  @apply text-sm text-secondary-gray mb-2;
}

.item-price {
  @apply text-lg font-bold text-primary-black;
}

.item-controls {
  @apply flex items-center space-x-4;
}

.quantity-controls {
  @apply flex items-center space-x-2;
}

.quantity-btn {
  @apply w-8 h-8 bg-primary-black text-primary-white rounded-full flex items-center justify-center font-bold hover:bg-dark-gray transition-colors duration-300;
}

.quantity {
  @apply w-8 text-center font-medium;
}

.remove-btn {
  @apply text-secondary-gray hover:text-red-500 transition-colors duration-300;
}

.charity-section {
  @apply mt-8;
}

.charity-card {
  @apply bg-dark-gray text-primary-white p-6 rounded-lg;
}

.charity-header {
  @apply flex items-center space-x-3 mb-3;
}

.charity-icon {
  @apply text-2xl;
}

.charity-title {
  @apply text-lg font-semibold;
}

.charity-description {
  @apply text-gray-300 mb-4;
}

.charity-progress {
  @apply space-y-2;
}

.progress-bar {
  @apply w-full bg-gray-600 rounded-full h-2;
}

.progress-fill {
  @apply bg-primary-white h-2 rounded-full transition-all duration-500;
}

.progress-text {
  @apply flex justify-between text-sm text-gray-300;
}

.checkout-section {
  @apply lg:sticky lg:top-24;
}

.checkout-card {
  @apply bg-light-gray p-8 rounded-lg;
}

.form-section {
  @apply space-y-4;
}

.section-title {
  @apply text-lg font-semibold text-primary-black mb-4;
}

.form-label {
  @apply block text-sm font-medium text-primary-black mb-2;
}

.form-input {
  @apply w-full px-4 py-3 border-2 border-gray-300 rounded-none focus:border-primary-black focus:outline-none transition-colors duration-300;
}

.payment-options {
  @apply grid grid-cols-2 gap-4;
}

.payment-option {
  @apply cursor-pointer;
}

.payment-card {
  @apply p-4 border-2 border-gray-300 rounded-lg text-center transition-all duration-300 hover:border-primary-black;
}

.payment-card.active {
  @apply border-primary-black bg-primary-black text-primary-white;
}

.payment-icon {
  @apply text-2xl mb-2;
}

.payment-name {
  @apply font-medium;
}

.order-summary {
  @apply space-y-3 border-t border-gray-300 pt-6;
}

.summary-row {
  @apply flex justify-between items-center;
}

.free-shipping {
  @apply text-green-600 font-medium;
}

.charity-donation {
  @apply text-red-500 font-medium;
}

.total {
  @apply text-xl font-bold text-primary-black border-t border-gray-300 pt-3 mt-3;
}

.submit-btn {
  @apply w-full bg-primary-black text-primary-white py-4 rounded-none font-semibold text-lg transition-all duration-300 hover:bg-dark-gray disabled:opacity-50 disabled:cursor-not-allowed;
}

.modal-overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4;
}

.modal-content {
  @apply bg-primary-white rounded-lg p-8 max-w-md w-full text-center;
}

.success-content {
  @apply space-y-6;
}

.success-icon {
  @apply text-6xl;
}

.success-title {
  @apply text-2xl font-bold text-primary-black;
}

.success-message {
  @apply text-secondary-gray;
}

.success-charity {
  @apply text-green-600 font-medium;
}

.success-actions {
  @apply space-y-3;
}
</style>