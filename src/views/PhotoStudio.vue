<template>
  <div class="photo-studio">
    <!-- Header -->
    <div class="studio-header">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <h1 class="text-5xl font-display font-bold text-primary-black mb-4">
            影棚级AI写真
          </h1>
          <p class="text-xl text-secondary-gray max-w-2xl mx-auto">
            使用先进的AI技术，为您的边牧生成专业影棚级别的写真照片
          </p>
        </div>
      </div>
    </div>

    <!-- Studio Interface -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Control Panel -->
        <div class="control-panel">
          <div class="bg-light-gray p-8 rounded-lg">
            <h2 class="text-2xl font-semibold text-primary-black mb-6">
              写真设置
            </h2>
            
            <form @submit.prevent="generatePhoto" class="space-y-6">
              <!-- Dog Info -->
              <div>
                <label class="block text-sm font-medium text-primary-black mb-2">
                  狗狗姓名
                </label>
                <input 
                  v-model="form.dogName" 
                  type="text" 
                  class="input-field"
                  placeholder="请输入您的边牧名字"
                  required
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-primary-black mb-2">
                  狗狗品种
                </label>
                <select v-model="form.dogBreed" class="input-field" required>
                  <option value="">请选择品种</option>
                  <option value="border-collie">边境牧羊犬</option>
                  <option value="australian-shepherd">澳大利亚牧羊犬</option>
                  <option value="collie">柯利犬</option>
                  <option value="other">其他</option>
                </select>
              </div>

              <!-- Photo Style -->
              <div>
                <label class="block text-sm font-medium text-primary-black mb-2">
                  拍摄风格
                </label>
                <div class="grid grid-cols-3 gap-3">
                  <label class="style-option">
                    <input 
                      v-model="form.style" 
                      type="radio" 
                      value="studio" 
                      class="sr-only"
                    >
                    <div class="style-card" :class="{ active: form.style === 'studio' }">
                      <div class="style-icon">🎬</div>
                      <span class="style-label">影棚</span>
                    </div>
                  </label>
                  
                  <label class="style-option">
                    <input 
                      v-model="form.style" 
                      type="radio" 
                      value="outdoor" 
                      class="sr-only"
                    >
                    <div class="style-card" :class="{ active: form.style === 'outdoor' }">
                      <div class="style-icon">🏞️</div>
                      <span class="style-label">户外</span>
                    </div>
                  </label>
                  
                  <label class="style-option">
                    <input 
                      v-model="form.style" 
                      type="radio" 
                      value="creative" 
                      class="sr-only"
                    >
                    <div class="style-card" :class="{ active: form.style === 'creative' }">
                      <div class="style-icon">🎨</div>
                      <span class="style-label">创意</span>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Lighting -->
              <div>
                <label class="block text-sm font-medium text-primary-black mb-2">
                  光线设置
                </label>
                <select v-model="form.lighting" class="input-field">
                  <option value="soft">柔和光线</option>
                  <option value="dramatic">戏剧性光线</option>
                  <option value="natural">自然光线</option>
                  <option value="studio">影棚光线</option>
                </select>
              </div>

              <!-- Background -->
              <div>
                <label class="block text-sm font-medium text-primary-black mb-2">
                  背景选择
                </label>
                <select v-model="form.background" class="input-field">
                  <option value="white">纯白背景</option>
                  <option value="black">纯黑背景</option>
                  <option value="gray">灰色背景</option>
                  <option value="nature">自然风景</option>
                  <option value="urban">城市景观</option>
                </select>
              </div>

              <!-- Pose -->
              <div>
                <label class="block text-sm font-medium text-primary-black mb-2">
                  姿势描述
                </label>
                <textarea 
                  v-model="form.pose" 
                  rows="3" 
                  class="input-field"
                  placeholder="描述您希望狗狗呈现的姿势，如：端坐、侧躺、奔跑等"
                ></textarea>
              </div>

              <!-- Generate Button -->
              <button 
                type="submit" 
                :disabled="isGenerating"
                class="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="!isGenerating">
                  🎬 生成写真
                </span>
                <span v-else class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  生成中...
                </span>
              </button>
            </form>
          </div>
        </div>

        <!-- Preview Panel -->
        <div class="preview-panel">
          <div class="bg-light-gray p-8 rounded-lg">
            <h2 class="text-2xl font-semibold text-primary-black mb-6">
              预览效果
            </h2>
            
            <div v-if="!generatedPhoto" class="preview-placeholder">
              <div class="placeholder-content">
                <svg class="w-16 h-16 text-secondary-gray mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <p class="text-secondary-gray">调整左侧设置生成写真</p>
              </div>
            </div>
            
            <div v-else class="photo-result">
              <div class="photo-container">
                <img 
                  :src="generatedPhoto.url" 
                  :alt="generatedPhoto.prompt"
                  class="generated-photo"
                >
                <div class="photo-overlay">
                  <button @click="downloadPhoto" class="download-btn">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                    下载
                  </button>
                </div>
              </div>
              
              <div class="photo-info">
                <h3 class="text-lg font-semibold text-primary-black mb-2">
                  {{ form.dogName }}的写真
                </h3>
                <p class="text-sm text-secondary-gray mb-4">
                  {{ generatedPhoto.prompt }}
                </p>
                
                <div class="photo-settings">
                  <div class="setting-item">
                    <span class="setting-label">风格:</span>
                    <span class="setting-value">{{ getStyleLabel(form.style) }}</span>
                  </div>
                  <div class="setting-item">
                    <span class="setting-label">光线:</span>
                    <span class="setting-value">{{ getLightingLabel(form.lighting) }}</span>
                  </div>
                  <div class="setting-item">
                    <span class="setting-label">背景:</span>
                    <span class="setting-value">{{ getBackgroundLabel(form.background) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Gallery Section -->
    <section class="gallery-section">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-display font-bold text-primary-black mb-4">
            作品展示
          </h2>
          <p class="text-lg text-secondary-gray">
            精选优秀边牧写真作品，激发您的创作灵感
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="photo in galleryPhotos" :key="photo.id" class="gallery-item">
            <div class="gallery-photo">
              <img :src="photo.url" :alt="photo.title" class="w-full h-64 object-cover rounded-lg">
              <div class="gallery-overlay">
                <h3 class="gallery-title">{{ photo.title }}</h3>
                <p class="gallery-desc">{{ photo.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAppStore } from '@/stores'
import type { Photo } from '@/types'

const store = useAppStore()
const isGenerating = ref(false)
const generatedPhoto = ref<Photo | null>(null)

const form = reactive({
  dogName: '',
  dogBreed: '',
  style: 'studio',
  lighting: 'soft',
  background: 'white',
  pose: ''
})

const galleryPhotos = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
    title: '经典影棚风',
    description: '专业影棚光线，突出边牧的优雅气质'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop',
    title: '自然风光',
    description: '户外自然光线，展现边牧的活力与自由'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    title: '创意艺术',
    description: '独特创意构图，彰显边牧的个性魅力'
  }
]

const generatePhoto = async () => {
  isGenerating.value = true
  
  // 模拟AI生成过程
  setTimeout(() => {
    generatedPhoto.value = {
      id: Date.now().toString(),
      url: `https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=600&fit=crop&${Date.now()}`,
      thumbnail: '',
      prompt: `${form.dogName} - ${form.style}风格的专业边牧写真，${form.lighting}光线，${form.background}背景`,
      settings: {
        lighting: form.lighting,
        background: form.background,
        pose: form.pose || '经典姿势',
        mood: '专业'
      }
    }
    isGenerating.value = false
  }, 3000)
}

const downloadPhoto = () => {
  if (generatedPhoto.value) {
    const link = document.createElement('a')
    link.href = generatedPhoto.value.url
    link.download = `${form.dogName}-photo.jpg`
    link.click()
    store.showNotification('照片下载成功！')
  }
}

const getStyleLabel = (style: string) => {
  const labels: Record<string, string> = {
    studio: '影棚',
    outdoor: '户外',
    creative: '创意'
  }
  return labels[style] || style
}

const getLightingLabel = (lighting: string) => {
  const labels: Record<string, string> = {
    soft: '柔和光线',
    dramatic: '戏剧性光线',
    natural: '自然光线',
    studio: '影棚光线'
  }
  return labels[lighting] || lighting
}

const getBackgroundLabel = (background: string) => {
  const labels: Record<string, string> = {
    white: '纯白背景',
    black: '纯黑背景',
    gray: '灰色背景',
    nature: '自然风景',
    urban: '城市景观'
  }
  return labels[background] || background
}
</script>

<style scoped>
.photo-studio {
  @apply min-h-screen bg-primary-white;
}

.studio-header {
  @apply bg-light-gray;
}

.control-panel {
  @apply animate-fade-in;
}

.preview-panel {
  @apply animate-fade-in;
}

.input-field {
  @apply w-full px-4 py-3 border-2 border-gray-300 rounded-none focus:border-primary-black focus:outline-none transition-colors duration-300;
}

.style-option {
  @apply cursor-pointer;
}

.style-card {
  @apply p-4 border-2 border-gray-300 rounded-lg text-center transition-all duration-300 hover:border-primary-black;
}

.style-card.active {
  @apply border-primary-black bg-primary-black text-primary-white;
}

.style-icon {
  @apply text-2xl mb-2;
}

.style-label {
  @apply text-sm font-medium;
}

.preview-placeholder {
  @apply h-96 bg-gray-200 rounded-lg flex items-center justify-center;
}

.placeholder-content {
  @apply text-center;
}

.photo-result {
  @apply animate-scale-in;
}

.photo-container {
  @apply relative mb-6 rounded-lg overflow-hidden;
}

.generated-photo {
  @apply w-full h-96 object-cover;
}

.photo-overlay {
  @apply absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100;
}

.download-btn {
  @apply bg-primary-white text-primary-black px-4 py-2 rounded-none font-medium flex items-center transition-all duration-300 hover:bg-gray-100;
}

.photo-info {
  @apply space-y-4;
}

.photo-settings {
  @apply space-y-2;
}

.setting-item {
  @apply flex justify-between text-sm;
}

.setting-label {
  @apply text-secondary-gray;
}

.setting-value {
  @apply text-primary-black font-medium;
}

.gallery-section {
  @apply bg-light-gray;
}

.gallery-item {
  @apply card-hover;
}

.gallery-photo {
  @apply relative overflow-hidden rounded-lg;
}

.gallery-overlay {
  @apply absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end;
}

.gallery-title {
  @apply text-white font-semibold mb-1;
}

.gallery-desc {
  @apply text-gray-300 text-sm;
}
</style>