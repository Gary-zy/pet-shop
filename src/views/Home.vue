<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="block">记录边牧的</span>
            <span class="gradient-text">每一个精彩瞬间</span>
          </h1>
          <p class="hero-description">
            专业影棚级AI写真生成，科学养护知识库，精选周边产品。
            为您的边牧小伙伴提供全方位的专业服务。
          </p>
          <div class="hero-actions">
            <RouterLink to="/studio" class="btn-primary hero-btn">
              开始拍摄
            </RouterLink>
            <RouterLink to="/shop" class="btn-secondary hero-btn">
              选购周边
            </RouterLink>
          </div>
        </div>
        <div class="hero-image">
          <div class="image-placeholder">
            <div class="placeholder-content">
              <svg class="w-16 h-16 text-secondary-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <p class="mt-2 text-secondary-gray">边牧写真展示</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-display font-bold text-primary-black mb-4">
            专业服务
          </h2>
          <p class="text-xl text-secondary-gray max-w-2xl mx-auto">
            从AI写真到科学养护，从精选周边到公益救助，我们用心服务每一位边牧家庭
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Photo Studio Feature -->
          <div class="feature-card">
            <div class="feature-icon">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 class="feature-title">影棚级AI写真</h3>
            <p class="feature-description">
              专业AI算法生成影棚级边牧写真，支持多种风格和场景定制，让您的爱犬成为镜头焦点。
            </p>
            <RouterLink to="/studio" class="feature-link">
              立即体验
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </RouterLink>
          </div>

          <!-- Care Lab Feature -->
          <div class="feature-card">
            <div class="feature-icon">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h3 class="feature-title">卷毛实验室</h3>
            <p class="feature-description">
              科学养护知识库，从饮食营养到训练技巧，从健康护理到行为解读，专业指导边牧成长。
            </p>
            <RouterLink to="/lab" class="feature-link">
              学习更多
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </RouterLink>
          </div>

          <!-- Shop Feature -->
          <div class="feature-card">
            <div class="feature-icon">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
            <h3 class="feature-title">精选周边商城</h3>
            <p class="feature-description">
              西高地头像卫衣、限量银箔海报等精品周边，每售出1件捐赠10元给流浪小狗救助。
            </p>
            <RouterLink to="/shop" class="feature-link">
              选购商品
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl font-display font-bold text-primary-black mb-6">
          开始您的边牧专业之旅
        </h2>
        <p class="text-xl text-secondary-gray mb-8">
          加入我们的边牧爱好者社区，享受专业服务和爱心公益
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink to="/studio" class="btn-primary">
            免费试用AI写真
          </RouterLink>
          <RouterLink to="/lab" class="btn-secondary">
            查看养护指南
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// No additional logic needed for home page
</script>

<style scoped>
.hero-section {
  @apply bg-light-gray py-20;
}

.hero-content {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center;
}

.hero-title {
  @apply text-5xl lg:text-6xl font-display font-bold text-primary-black leading-tight mb-6;
}

.gradient-text {
  @apply bg-gradient-to-r from-primary-black to-secondary-gray bg-clip-text text-transparent;
}

.hero-description {
  @apply text-xl text-secondary-gray mb-8 leading-relaxed;
}

.hero-actions {
  @apply flex flex-col sm:flex-row gap-4;
}

.hero-btn {
  @apply text-center;
}

.hero-image {
  @apply flex justify-center;
}

.image-placeholder {
  @apply w-full max-w-md h-96 bg-gray-200 rounded-lg flex items-center justify-center;
}

.placeholder-content {
  @apply text-center;
}

.features-section {
  @apply py-20 bg-primary-white;
}

.feature-card {
  @apply bg-light-gray p-8 rounded-lg card-hover;
}

.feature-icon {
  @apply w-16 h-16 bg-primary-black text-primary-white rounded-lg flex items-center justify-center mb-6;
}

.feature-title {
  @apply text-2xl font-semibold text-primary-black mb-4;
}

.feature-description {
  @apply text-secondary-gray mb-6 leading-relaxed;
}

.feature-link {
  @apply inline-flex items-center text-primary-black font-medium hover:text-secondary-gray transition-colors duration-300;
}

.cta-section {
  @apply py-20 bg-light-gray;
}
</style>