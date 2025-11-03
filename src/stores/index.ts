import { defineStore } from 'pinia'
import type { Product, CartItem, PhotoSession, CareArticle } from '@/types'

export const useAppStore = defineStore('app', {
  state: () => ({
    // 购物车状态
    cart: [] as CartItem[],
    
    // 影棚状态
    photoSessions: [] as PhotoSession[],
    currentSession: null as PhotoSession | null,
    
    // 养护百科状态
    careArticles: [] as CareArticle[],
    
    // UI状态
    isLoading: false,
    notification: null as string | null
  }),

  getters: {
    cartTotal: (state) => {
      return state.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0)
    },
    
    cartItemCount: (state) => {
      return state.cart.reduce((total, item) => total + item.quantity, 0)
    },
    
    charityAmount: (state) => {
      return state.cart.length * 10 // 每售出1件捐10元
    }
  },

  actions: {
    // 购物车操作
    addToCart(product: Product) {
      const existingItem = this.cart.find(item => item.product.id === product.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.cart.push({ product, quantity: 1 })
      }
      this.showNotification('已添加到购物车')
    },

    removeFromCart(productId: string) {
      const index = this.cart.findIndex(item => item.product.id === productId)
      if (index > -1) {
        this.cart.splice(index, 1)
        this.showNotification('已从购物车移除')
      }
    },

    updateQuantity(productId: string, quantity: number) {
      const item = this.cart.find(item => item.product.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(productId)
        } else {
          item.quantity = quantity
        }
      }
    },

    clearCart() {
      this.cart = []
    },

    // 影棚操作
    createPhotoSession(session: PhotoSession) {
      this.photoSessions.push(session)
      this.currentSession = session
    },

    // 通知操作
    showNotification(message: string) {
      this.notification = message
      setTimeout(() => {
        this.notification = null
      }, 3000)
    }
  }
})