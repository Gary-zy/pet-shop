// 产品类型
export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: 'clothing' | 'poster' | 'accessory'
  stock: number
  featured?: boolean
}

// 购物车项目类型
export interface CartItem {
  product: Product
  quantity: number
}

// 影棚会话类型
export interface PhotoSession {
  id: string
  date: Date
  dogName: string
  dogBreed: string
  style: 'studio' | 'outdoor' | 'creative'
  photos: Photo[]
  status: 'pending' | 'processing' | 'completed'
}

export interface Photo {
  id: string
  url: string
  thumbnail: string
  prompt: string
  settings: PhotoSettings
}

export interface PhotoSettings {
  lighting: string
  background: string
  pose: string
  mood: string
}

// 养护文章类型
export interface CareArticle {
  id: string
  title: string
  summary: string
  content: string
  category: 'feeding' | 'grooming' | 'training' | 'health'
  image: string
  readTime: number
  tags: string[]
  publishedAt: Date
}

// 订单类型
export interface Order {
  id: string
  items: CartItem[]
  total: number
  charityAmount: number
  customerInfo: CustomerInfo
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered'
  createdAt: Date
}

export interface CustomerInfo {
  name: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
}