<template>
  <div class="shop">
    <!-- Header -->
    <div class="shop-header">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <h1 class="text-5xl font-display font-bold text-primary-black mb-4">
            周边商城
          </h1>
          <p class="text-xl text-secondary-gray max-w-2xl mx-auto">
            精选边牧主题周边产品，每售出1件捐赠10元给流浪小狗救助
          </p>
        </div>
      </div>
    </div>

    <!-- Charity Banner -->
    <div class="charity-banner">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-dark-gray text-primary-white p-6 rounded-lg flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="text-4xl">🐕</div>
            <div>
              <h3 class="text-lg font-semibold">爱心公益计划</h3>
              <p class="text-gray-300">每笔订单捐赠10元用于流浪小狗救助</p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bold">已捐赠 ¥1,280</div>
            <div class="text-sm text-gray-300">累计救助 128 只小狗</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Filter -->
    <div class="category-filter">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-wrap justify-center gap-4">
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="selectedCategory = category.id"
            :class="['category-btn', { active: selectedCategory === category.id }]"
          >
            <span class="category-icon">{{ category.icon }}</span>
            <span class="category-label">{{ category.name }}</span>
            <span class="category-count">{{ getCategoryCount(category.id) }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Products Grid -->
    <div class="products-section">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div 
            v-for="product in filteredProducts" 
            :key="product.id"
            class="product-card"
          >
            <div class="product-image">
              <img :src="product.image" :alt="product.name" class="w-full h-64 object-cover">
              <div v-if="product.featured" class="featured-badge">
                推荐
              </div>
              <div v-if="product.stock === 0" class="out-of-stock">
                售罄
              </div>
            </div>
            
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-description">{{ product.description }}</p>
              
              <div class="product-price">
                <span class="price">¥{{ product.price }}</span>
                <span v-if="product.stock > 0 && product.stock <= 5" class="stock-warning">
                  仅剩 {{ product.stock }} 件
                </span>
              </div>
              
              <div class="product-actions">
                <button 
                  @click="addToCart(product)"
                  :disabled="product.stock === 0"
                  :class="[
                    'add-to-cart-btn',
                    { 'disabled': product.stock === 0 }
                  ]"
                >
                  <span v-if="product.stock > 0">
                    🛒 加入购物车
                  </span>
                  <span v-else>
                    暂时缺货
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Collection -->
    <section class="featured-collection">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-display font-bold text-primary-black mb-4">
            限量收藏系列
          </h2>
          <p class="text-lg text-secondary-gray">
            独家设计，限量发售，收藏价值的边牧艺术品
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="collection-image">
            <div class="image-placeholder">
              <div class="placeholder-content">
                <svg class="w-16 h-16 text-secondary-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <p class="mt-2 text-secondary-gray">限量银箔海报展示</p>
              </div>
            </div>
          </div>
          
          <div class="collection-info">
            <h3 class="text-2xl font-display font-bold text-primary-black mb-4">
              西高地头像限量系列
            </h3>
            <p class="text-secondary-gray mb-6 leading-relaxed">
              我们与知名艺术家合作，推出限量版的西高地头像系列周边。
              每件产品都经过精心设计，采用高品质材料制作，具有极高的收藏价值。
              该系列包括限量银箔海报、精品卫衣等，每款产品都有独立编号。
            </p>
            
            <div class="collection-features">
              <div class="feature-item">
                <span class="feature-icon">✨</span>
                <span class="feature-text">限量编号，独一无二</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🎨</span>
                <span class="feature-text">艺术家联名设计</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🏆</span>
                <span class="feature-text">高品质材料制作</span>
              </div>
            </div>
            
            <button class="btn-primary collection-btn">
              查看收藏系列
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores'
import type { Product } from '@/types'

const store = useAppStore()
const selectedCategory = ref('all')

const categories = [
  { id: 'all', name: '全部商品', icon: '🛍️' },
  { id: 'clothing', name: '服饰', icon: '👕' },
  { id: 'poster', name: '海报', icon: '🖼️' },
  { id: 'accessory', name: '配饰', icon: '👜' }
]

const products: Product[] = [
  {
    id: '1',
    name: '西高地头像连帽卫衣',
    description: '纯棉材质，舒适透气，经典西高地头像印花设计',
    price: 299,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
    category: 'clothing',
    stock: 15,
    featured: true
  },
  {
    id: '2',
    name: '限量银箔海报 - 经典款',
    description: 'A2尺寸，银箔材质，限量编号，收藏价值极高',
    price: 199,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
    category: 'poster',
    stock: 8,
    featured: true
  },
  {
    id: '3',
    name: '边牧主题帆布包',
    description: '环保帆布材质，大容量设计，边牧图案印花',
    price: 89,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    category: 'accessory',
    stock: 25
  },
  {
    id: '4',
    name: '西高地头像T恤',
    description: '优质棉质T恤，简约设计，多色可选',
    price: 159,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    category: 'clothing',
    stock: 32
  },
  {
    id: '5',
    name: '艺术装饰画 - 抽象边牧',
    description: '现代简约风格，高品质印刷，适合家居装饰',
    price: 129,
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=400&fit=crop',
    category: 'poster',
    stock: 18
  },
  {
    id: '6',
    name: '边牧主题手机壳',
    description: '环保材质，精准开孔，保护手机同时展现个性',
    price: 59,
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&h=400&fit=crop',
    category: 'accessory',
    stock: 42
  },
  {
    id: '7',
    name: '限量收藏版卫衣',
    description: '限量版设计，独立编号，收藏价值极高',
    price: 399,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
    category: 'clothing',
    stock: 5,
    featured: true
  },
  {
    id: '8',
    name: '边牧肖像海报套装',
    description: '3张不同风格海报组合，超值套装',
    price: 299,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
    category: 'poster',
    stock: 12
  }
]

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') {
    return products
  }
  return products.filter(product => product.category === selectedCategory.value)
})

const getCategoryCount = (categoryId: string) => {
  if (categoryId === 'all') {
    return products.length
  }
  return products.filter(product => product.category === categoryId).length
}

const addToCart = (product: Product) => {
  store.addToCart(product)
}
</script>

<style scoped>
.shop {
  @apply min-h-screen bg-primary-white;
}

.shop-header {
  @apply bg-light-gray;
}

.charity-banner {
  @apply bg-primary-white;
}

.category-filter {
  @apply bg-light-gray;
}

.category-btn {
  @apply flex items-center space-x-2 px-6 py-3 rounded-full border-2 border-gray-300 transition-all duration-300 hover:border-primary-black;
}

.category-btn.active {
  @apply bg-primary-black text-primary-white border-primary-black;
}

.category-icon {
  @apply text-xl;
}

.category-label {
  @apply font-medium;
}

.category-count {
  @apply bg-gray-200 text-secondary-gray px-2 py-1 rounded-full text-sm;
}

.category-btn.active .category-count {
  @apply bg-primary-white text-primary-black;
}

.products-section {
  @apply py-12;
}

.product-card {
  @apply bg-light-gray rounded-lg overflow-hidden card-hover;
}

.product-image {
  @apply relative;
}

.featured-badge {
  @apply absolute top-4 left-4 bg-primary-black text-primary-white px-3 py-1 rounded-full text-sm font-medium;
}

.out-of-stock {
  @apply absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-primary-white font-semibold text-lg;
}

.product-info {
  @apply p-6;
}

.product-name {
  @apply text-xl font-semibold text-primary-black mb-2;
}

.product-description {
  @apply text-secondary-gray mb-4;
}

.product-price {
  @apply flex items-center justify-between mb-4;
}

.price {
  @apply text-2xl font-bold text-primary-black;
}

.stock-warning {
  @apply text-red-500 text-sm font-medium;
}

.product-actions {
  @apply space-y-3;
}

.add-to-cart-btn {
  @apply w-full bg-primary-black text-primary-white py-3 rounded-none font-medium transition-all duration-300 hover:bg-dark-gray;
}

.add-to-cart-btn.disabled {
  @apply bg-gray-400 cursor-not-allowed hover:bg-gray-400;
}

.featured-collection {
  @apply bg-light-gray;
}

.collection-image {
  @apply flex justify-center;
}

.image-placeholder {
  @apply w-full max-w-md h-96 bg-gray-200 rounded-lg flex items-center justify-center;
}

.placeholder-content {
  @apply text-center;
}

.collection-info {
  @apply space-y-6;
}

.collection-features {
  @apply space-y-3;
}

.feature-item {
  @apply flex items-center space-x-3;
}

.feature-icon {
  @apply text-xl;
}

.feature-text {
  @apply text-secondary-gray;
}

.collection-btn {
  @apply inline-block;
}
</style>