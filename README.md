# 边牧小狗网站 - Vue3 + TypeScript + Vue Router

一个专为边牧小狗打造的现代化网站，采用黑白主色调设计，提供影棚级AI写真、养护百科、周边商城和公益捐赠功能。

## 🌟 项目特色

### 设计特色
- **黑白主色调**：采用经典的黑白配色方案，营造现代简约的视觉体验
- **专业字体搭配**：使用 Inter 和 Playfair Display 字体组合
- **响应式设计**：完美适配桌面端和移动端设备
- **优雅动画效果**：内置多种过渡动画，提升用户体验

### 功能模块

#### 📸 影棚级写真日历
- AI驱动的专业写真生成器
- 多种拍摄风格选择（影棚/户外/创意）
- 自定义光线、背景和姿势设置
- 实时预览和下载功能

#### 🔬 卷毛实验室
- 科学养护知识库
- 分类浏览（饮食/美容/训练/健康）
- 详细的文章内容和阅读体验
- 实用的养护小贴士

#### 🛍️ 周边商城
- 精选边牧主题周边产品
- 西高地头像卫衣、限量银箔海报等特色商品
- 完整的购物车功能
- 库存管理和商品分类

#### 💝 公益捐赠
- 每售出1件商品捐赠10元给流浪小狗救助
- 实时显示捐赠进度
- 透明的公益信息展示

## 🛠️ 技术栈

- **Vue 3** - 渐进式JavaScript框架
- **TypeScript** - 类型安全的JavaScript超集
- **Vue Router 4** - Vue.js官方路由管理器
- **Pinia** - 状态管理库
- **Tailwind CSS** - 实用优先的CSS框架
- **Vite** - 现代前端构建工具

## 📦 项目结构

```
src/
├── components/          # 可复用组件
│   ├── Navigation.vue   # 导航栏组件
│   └── Footer.vue       # 页脚组件
├── views/              # 页面组件
│   ├── Home.vue        # 首页
│   ├── PhotoStudio.vue # 影棚写真页面
│   ├── CareLab.vue     # 卷毛实验室页面
│   ├── Shop.vue        # 周边商城页面
│   └── Checkout.vue    # 结账页面
├── stores/             # 状态管理
│   └── index.ts        # Pinia状态存储
├── types/              # TypeScript类型定义
│   └── index.ts        # 类型定义文件
├── router/             # 路由配置
│   └── index.ts        # 路由配置文件
├── main.ts             # 应用入口文件
├── App.vue             # 根组件
└── style.css           # 全局样式
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

访问 http://localhost:3000 查看网站

### 构建生产版本

```bash
npm run build
```

### 类型检查

```bash
npm run type-check
```

## 📱 页面导航

- **首页 (/)** - 网站主页，展示核心功能
- **影棚写真 (/studio)** - AI写真生成器
- **卷毛实验室 (/lab)** - 养护知识库
- **周边商城 (/shop)** - 产品展示和购物
- **结账页面 (/checkout)** - 购物车和支付

## 🎨 设计系统

### 颜色方案
- **Primary Black**: `#000000` - 主黑色
- **Primary White**: `#FFFFFF` - 主白色
- **Secondary Gray**: `#6B7280` - 次要灰色
- **Light Gray**: `#F3F4F6` - 浅灰色背景
- **Dark Gray**: `#1F2937` - 深灰色
- **Accent Gray**: `#9CA3AF` - 装饰灰色

### 组件样式
- **按钮**: 支持主要按钮和次要按钮样式
- **卡片**: 带有悬停效果的卡片组件
- **表单**: 统一的输入框和表单样式
- **动画**: 内置淡入、上滑、缩放等动画效果

## 🛒 购物流程

1. **浏览商品** - 在商城页面查看所有商品
2. **加入购物车** - 选择商品数量和规格
3. **查看购物车** - 在结账页面确认商品信息
4. **填写信息** - 输入收货地址和联系方式
5. **选择支付** - 选择微信支付或支付宝
6. **确认订单** - 查看订单总额和公益捐赠
7. **完成支付** - 提交订单并完成支付

## 💝 公益模块

- **自动捐赠**: 每售出1件商品自动捐赠10元
- **进度显示**: 实时显示本月救助进度
- **透明信息**: 展示累计捐赠金额和救助小狗数量
- **用户参与**: 用户可在结账页面看到具体捐赠金额

## 🔧 自定义配置

### 添加新商品
在 `src/views/Shop.vue` 中的 `products` 数组添加新商品：

```typescript
{
  id: 'new-id',
  name: '商品名称',
  description: '商品描述',
  price: 299,
  image: '商品图片URL',
  category: 'clothing' | 'poster' | 'accessory',
  stock: 10,
  featured: false // 是否为推荐商品
}
```

### 添加新文章
在 `src/views/CareLab.vue` 中的 `articles` 数组添加新文章：

```typescript
{
  id: 'new-id',
  title: '文章标题',
  summary: '文章摘要',
  content: 'HTML格式的文章内容',
  category: 'feeding' | 'grooming' | 'training' | 'health',
  image: '文章配图URL',
  readTime: 8, // 阅读时间（分钟）
  tags: ['标签1', '标签2'],
  publishedAt: new Date('发布日期')
}
```

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📞 联系我们

- 邮箱: hello@bordercollie.com
- 电话: +86 138 0000 0000
- 地址: 北京市朝阳区宠物街1号

---

**用爱记录每一只边牧的美好瞬间** 🐕❤️