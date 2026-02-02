// types/Monetization.js
export const ProductCategories = {
  AROMATHERAPY: 'aromatherapy',
  HOME_GOODS: 'home_goods',
  AUDIO: 'audio',
  WELLNESS_KIT: 'wellness_kit'
};

export const Products = [
  {
    id: 'prod_1',
    name: '薰衣草助眠香薰精油',
    category: ProductCategories.AROMATHERAPY,
    price: 89,
    originalPrice: 129,
    description: '100%纯天然薰衣草精油，帮助深度睡眠',
    image: '/assets/lavender-oil.jpg',
    rating: 4.8,
    sold: 1242,
    features: ['纯天然', '助眠', '舒缓压力']
  },
  {
    id: 'prod_2',
    name: '治愈系香薰蜡烛礼盒',
    category: ProductCategories.AROMATHERAPY,
    price: 128,
    originalPrice: 168,
    description: '三种香味组合，营造温馨居家氛围',
    image: '/assets/candle-set.jpg',
    rating: 4.9,
    sold: 987,
    features: ['天然大豆蜡', '长效燃烧', '治愈香气']
  },
  {
    id: 'prod_3',
    name: '治愈生活冥想音频包',
    category: ProductCategories.AUDIO,
    price: 39,
    originalPrice: 59,
    description: '专业冥想指导音频，助你找到内心平静',
    image: '/assets/meditation-audio.jpg',
    rating: 4.7,
    sold: 2156,
    features: ['专业指导', '多种场景', '高质量音频']
  },
  {
    id: 'prod_4',
    name: '治愈系书桌整理套装',
    category: ProductCategories.HOME_GOODS,
    price: 69,
    originalPrice: 89,
    description: '让书桌井井有条，让心情也井井有条',
    image: '/assets/desk-organizer.jpg',
    rating: 4.6,
    sold: 756,
    features: ['简约设计', '实用收纳', '治愈系外观']
  },
  {
    id: 'prod_5',
    name: '治愈生活定制茶具',
    category: ProductCategories.HOME_GOODS,
    price: 158,
    originalPrice: 198,
    description: '手作陶瓷茶具，品味生活的每一刻',
    image: '/assets/tea-set.jpg',
    rating: 4.9,
    sold: 543,
    features: ['手工制作', '独特设计', '品质保证']
  },
  {
    id: 'prod_6',
    name: '治愈系生活大礼包',
    category: ProductCategories.WELLNESS_KIT,
    price: 299,
    originalPrice: 399,
    description: '包含香薰、茶具、音频等，开启治愈生活',
    image: '/assets/wellness-kit.jpg',
    rating: 5.0,
    sold: 324,
    features: ['全套搭配', '优惠价格', '生活仪式感']
  }
];

export const SubscriptionPlans = [
  {
    id: 'sub_basic',
    name: '基础版',
    price: 19,
    period: 'month',
    description: '基础冥想音频访问',
    features: ['100+冥想音频', '基础功能', '每日治愈瞬间']
  },
  {
    id: 'sub_premium',
    name: '高级版',
    price: 39,
    period: 'month',
    description: '完整冥想库 + 专家指导',
    features: ['完整音频库', '专家指导', '高级功能', '优先客服']
  },
  {
    id: 'sub_annual',
    name: '年度版',
    price: 299,
    period: 'year',
    description: '全年无限访问 + 专属内容',
    features: ['全年无限访问', '专属内容', '折扣价格', '专属客服']
  }
];

// utils/MonetizationManager.js
export class MonetizationManager {
  constructor() {
    this.products = Products;
    this.subscriptionPlans = SubscriptionPlans;
    this.userSubscriptions = this.loadSubscriptions();
  }

  loadSubscriptions() {
    return JSON.parse(localStorage.getItem('userSubscriptions') || '[]');
  }

  saveSubscriptions() {
    localStorage.setItem('userSubscriptions', JSON.stringify(this.userSubscriptions));
  }

  getProductsByCategory(category) {
    return this.products.filter(product => product.category === category);
  }

  getProductById(productId) {
    return this.products.find(product => product.id === productId);
  }

  getAllProducts() {
    return this.products;
  }

  getSubscriptionPlans() {
    return this.subscriptionPlans;
  }

  purchaseProduct(productId) {
    const product = this.getProductById(productId);
    if (product) {
      // 这里可以集成实际的支付逻辑
      console.log(`购买产品: ${product.name}`);
      return { success: true, product, message: '购买成功！' };
    }
    return { success: false, message: '产品不存在' };
  }

  subscribeToPlan(planId) {
    const plan = this.subscriptionPlans.find(p => p.id === planId);
    if (plan) {
      // 添加订阅到用户订阅列表
      const newSubscription = {
        id: `sub_${Date.now()}`,
        planId: plan.id,
        planName: plan.name,
        startDate: new Date().toISOString(),
        status: 'active'
      };
      
      this.userSubscriptions.push(newSubscription);
      this.saveSubscriptions();
      
      console.log(`订阅计划: ${plan.name}`);
      return { success: true, plan, subscription: newSubscription, message: '订阅成功！' };
    }
    return { success: false, message: '订阅计划不存在' };
  }

  getUserSubscriptions() {
    return this.userSubscriptions;
  }

  isSubscribedTo(planId) {
    return this.userSubscriptions.some(sub => sub.planId === planId && sub.status === 'active');
  }
}