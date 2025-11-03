<template>
  <div class="care-lab">
    <!-- Header -->
    <div class="lab-header">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <h1 class="text-5xl font-display font-bold text-primary-black mb-4">
            卷毛实验室
          </h1>
          <p class="text-xl text-secondary-gray max-w-2xl mx-auto">
            科学养护知识库，专业指导边牧的饮食、训练、健康护理和行为解读
          </p>
        </div>
      </div>
    </div>

    <!-- Category Filter -->
    <div class="category-filter">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap justify-center gap-4">
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="selectedCategory = category.id"
            :class="['category-btn', { active: selectedCategory === category.id }]"
          >
            <span class="category-icon">{{ category.icon }}</span>
            <span class="category-label">{{ category.name }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Articles Grid -->
    <div class="articles-section">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article 
            v-for="article in filteredArticles" 
            :key="article.id"
            class="article-card"
          >
            <div class="article-image">
              <img :src="article.image" :alt="article.title" class="w-full h-48 object-cover">
              <div class="article-category">
                {{ getCategoryLabel(article.category) }}
              </div>
            </div>
            
            <div class="article-content">
              <div class="article-meta">
                <span class="read-time">{{ article.readTime }} 分钟阅读</span>
                <span class="publish-date">{{ formatDate(article.publishedAt) }}</span>
              </div>
              
              <h3 class="article-title">
                {{ article.title }}
              </h3>
              
              <p class="article-summary">
                {{ article.summary }}
              </p>
              
              <div class="article-tags">
                <span 
                  v-for="tag in article.tags" 
                  :key="tag"
                  class="tag"
                >
                  {{ tag }}
                </span>
              </div>
              
              <button @click="openArticle(article)" class="read-more">
                阅读全文
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>

    <!-- Article Modal -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="transform opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div v-if="selectedArticle" class="modal-overlay" @click="closeArticle">
        <div class="modal-content" @click.stop>
          <button @click="closeArticle" class="modal-close">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          
          <article class="article-full">
            <div class="article-header">
              <img 
                :src="selectedArticle.image" 
                :alt="selectedArticle.title"
                class="article-hero-image"
              >
              <div class="article-header-content">
                <div class="article-category-large">
                  {{ getCategoryLabel(selectedArticle.category) }}
                </div>
                <h1 class="article-full-title">{{ selectedArticle.title }}</h1>
                <div class="article-meta-large">
                  <span>{{ selectedArticle.readTime }} 分钟阅读</span>
                  <span>•</span>
                  <span>{{ formatDate(selectedArticle.publishedAt) }}</span>
                </div>
              </div>
            </div>
            
            <div class="article-body">
              <div class="article-tags-large">
                <span 
                  v-for="tag in selectedArticle.tags" 
                  :key="tag"
                  class="tag-large"
                >
                  {{ tag }}
                </span>
              </div>
              
              <div class="article-content-text">
                <p class="article-summary-large">{{ selectedArticle.summary }}</p>
                <div v-html="selectedArticle.content" class="prose prose-lg max-w-none"></div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </transition>

    <!-- Quick Tips Section -->
    <section class="tips-section">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-display font-bold text-primary-black mb-4">
            养护小贴士
          </h2>
          <p class="text-lg text-secondary-gray">
            快速掌握边牧日常护理的关键要点
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="tip-card">
            <div class="tip-icon">🍽️</div>
            <h3 class="tip-title">科学饮食</h3>
            <p class="tip-desc">高蛋白、适量脂肪，定时定量喂养</p>
          </div>
          
          <div class="tip-card">
            <div class="tip-icon">🏃‍♂️</div>
            <h3 class="tip-title">充足运动</h3>
            <p class="tip-desc">每天至少2小时户外活动，消耗精力</p>
          </div>
          
          <div class="tip-card">
            <div class="tip-icon">🧠</div>
            <h3 class="tip-title">智力训练</h3>
            <p class="tip-desc">提供智力玩具，进行服从性训练</p>
          </div>
          
          <div class="tip-card">
            <div class="tip-icon">💊</div>
            <h3 class="tip-title">定期体检</h3>
            <p class="tip-desc">年度体检，疫苗接种，预防疾病</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CareArticle } from '@/types'

const selectedCategory = ref('all')
const selectedArticle = ref<CareArticle | null>(null)

const categories = [
  { id: 'all', name: '全部', icon: '📚' },
  { id: 'feeding', name: '饮食营养', icon: '🍽️' },
  { id: 'grooming', name: '美容护理', icon: '✂️' },
  { id: 'training', name: '训练技巧', icon: '🎾' },
  { id: 'health', name: '健康护理', icon: '🏥' }
]

const articles: CareArticle[] = [
  {
    id: '1',
    title: '边牧幼犬饮食指南：科学喂养从0开始',
    summary: '详细介绍边牧幼犬各个成长阶段的营养需求和喂养方法，帮助您的爱犬健康成长。',
    content: `
      <h3>幼犬期营养需求</h3>
      <p>边牧幼犬在成长过程中需要充足的蛋白质、脂肪和碳水化合物。建议选择优质的幼犬专用狗粮，蛋白质含量应在25-30%之间。</p>
      
      <h3>喂养时间表</h3>
      <ul>
        <li>2-3个月：每日4-5次，少量多餐</li>
        <li>4-6个月：每日3-4次</li>
        <li>6-12个月：每日2-3次</li>
      </ul>
      
      <h3>注意事项</h3>
      <p>避免喂食人类食物，特别是巧克力、洋葱、葡萄等对狗狗有毒的食物。保持充足的清水供应。</p>
    `,
    category: 'feeding',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=400&fit=crop',
    readTime: 8,
    tags: ['幼犬', '饮食', '营养', '喂养'],
    publishedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: '边牧毛发护理全攻略：让您的爱犬光彩照人',
    summary: '从日常梳理到专业美容，全面解析边牧双层被毛的护理技巧和注意事项。',
    content: `
      <h3>边牧的被毛特点</h3>
      <p>边牧拥有浓密的双层被毛，外层毛发较长且粗糙，内层毛发柔软密集。这种被毛结构需要定期护理。</p>
      
      <h3>日常梳理</h3>
      <p>建议每天梳理一次，使用针梳和排梳配合。特别注意耳后、腋下和尾巴等容易打结的部位。</p>
      
      <h3>洗澡频率</h3>
      <p>一般2-3周洗一次澡，过于频繁的洗澡会破坏皮肤的天然保护层。使用温和的狗狗专用洗发水。</p>
    `,
    category: 'grooming',
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&h=400&fit=crop',
    readTime: 6,
    tags: ['毛发护理', '美容', '梳理', '洗澡'],
    publishedAt: new Date('2024-01-20')
  },
  {
    id: '3',
    title: '边牧训练秘籍：从基础服从到高级技能',
    summary: '边牧是智商最高的犬种之一，科学的训练方法能让它们成为理想的家庭伙伴。',
    content: `
      <h3>基础服从训练</h3>
      <p>从简单的坐、卧、等待等基础指令开始，使用正向强化训练方法，奖励好的行为。</p>
      
      <h3>智力游戏</h3>
      <p>边牧需要大量的智力刺激，可以使用智力玩具、嗅闻游戏等方式满足它们的需求。</p>
      
      <h3>社交训练</h3>
      <p>从小开始进行社交训练，让边牧适应不同的人、动物和环境，培养良好的社交能力。</p>
    `,
    category: 'training',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop',
    readTime: 10,
    tags: ['训练', '服从', '智力', '社交'],
    publishedAt: new Date('2024-01-25')
  },
  {
    id: '4',
    title: '边牧常见健康问题及预防措施',
    summary: '了解边牧的常见健康问题和预防方法，及时发现并处理健康隐患。',
    content: `
      <h3>遗传性疾病</h3>
      <p>边牧可能面临髋关节发育不良、眼部疾病等遗传性问题，选择正规犬舍很重要。</p>
      
      <h3>日常观察</h3>
      <p>注意观察狗狗的食欲、精神状态、排便情况等，发现异常及时就医。</p>
      
      <h3>预防措施</h3>
      <ul>
        <li>定期疫苗接种和驱虫</li>
        <li>保持适量运动，避免过度运动</li>
        <li>定期体检，早发现早治疗</li>
      </ul>
    `,
    category: 'health',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop',
    readTime: 7,
    tags: ['健康', '疾病预防', '体检', '疫苗'],
    publishedAt: new Date('2024-02-01')
  }
]

const filteredArticles = computed(() => {
  if (selectedCategory.value === 'all') {
    return articles
  }
  return articles.filter(article => article.category === selectedCategory.value)
})

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    feeding: '饮食营养',
    grooming: '美容护理',
    training: '训练技巧',
    health: '健康护理'
  }
  return labels[category] || category
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

const openArticle = (article: CareArticle) => {
  selectedArticle.value = article
  document.body.style.overflow = 'hidden'
}

const closeArticle = () => {
  selectedArticle.value = null
  document.body.style.overflow = ''
}
</script>

<style scoped>
.care-lab {
  @apply min-h-screen bg-primary-white;
}

.lab-header {
  @apply bg-light-gray;
}

.category-filter {
  @apply py-8 bg-primary-white border-b border-gray-200;
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

.articles-section {
  @apply py-12;
}

.article-card {
  @apply bg-light-gray rounded-lg overflow-hidden card-hover;
}

.article-image {
  @apply relative;
}

.article-category {
  @apply absolute top-4 left-4 bg-primary-black text-primary-white px-3 py-1 rounded-full text-sm font-medium;
}

.article-content {
  @apply p-6;
}

.article-meta {
  @apply flex items-center justify-between text-sm text-secondary-gray mb-3;
}

.read-time {
  @apply flex items-center;
}

.publish-date {
  @apply flex items-center;
}

.article-title {
  @apply text-xl font-semibold text-primary-black mb-3 line-clamp-2;
}

.article-summary {
  @apply text-secondary-gray mb-4 line-clamp-3;
}

.article-tags {
  @apply flex flex-wrap gap-2 mb-4;
}

.tag {
  @apply bg-primary-white text-secondary-gray px-3 py-1 rounded-full text-sm;
}

.read-more {
  @apply inline-flex items-center text-primary-black font-medium hover:text-secondary-gray transition-colors duration-300;
}

.modal-overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4;
}

.modal-content {
  @apply bg-primary-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto;
}

.modal-close {
  @apply absolute top-4 right-4 z-10 bg-primary-black text-primary-white p-2 rounded-full hover:bg-dark-gray transition-colors duration-300;
}

.article-full {
  @apply relative;
}

.article-header {
  @apply relative;
}

.article-hero-image {
  @apply w-full h-64 md:h-96 object-cover;
}

.article-header-content {
  @apply absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent p-6 text-primary-white;
}

.article-category-large {
  @apply bg-primary-white text-primary-black px-4 py-2 rounded-full text-sm font-medium inline-block mb-4;
}

.article-full-title {
  @apply text-3xl md:text-4xl font-display font-bold mb-4;
}

.article-meta-large {
  @apply flex items-center space-x-2 text-gray-300;
}

.article-body {
  @apply p-6;
}

.article-tags-large {
  @apply flex flex-wrap gap-2 mb-6;
}

.tag-large {
  @apply bg-light-gray text-secondary-gray px-4 py-2 rounded-full;
}

.article-content-text {
  @apply space-y-6;
}

.article-summary-large {
  @apply text-xl text-secondary-gray leading-relaxed;
}

.tips-section {
  @apply bg-light-gray;
}

.tip-card {
  @apply bg-primary-white p-6 rounded-lg text-center card-hover;
}

.tip-icon {
  @apply text-4xl mb-4;
}

.tip-title {
  @apply text-lg font-semibold text-primary-black mb-2;
}

.tip-desc {
  @apply text-secondary-gray;
}
</style>