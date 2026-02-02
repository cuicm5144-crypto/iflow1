// types/DailyMoments.js
export const DailyMoments = [
  {
    id: 'moment_1',
    text: '今天楼下咖啡店送了我一块饼干，甜到心里了',
    author: '小温暖',
    date: '2026-02-02',
    likes: 24,
    category: '生活小确幸'
  },
  {
    id: 'moment_2',
    text: '阳台上的薄荷长出了新叶子，生命真美好',
    author: '绿植爱好者',
    date: '2026-02-01',
    likes: 42,
    category: '自然疗愈'
  },
  {
    id: 'moment_3',
    text: '泡澡时听了一期播客，学到了新知识，很充实',
    author: '独居女孩',
    date: '2026-01-31',
    likes: 31,
    category: '自我提升'
  },
  {
    id: 'moment_4',
    text: '整理书架时发现了去年买的书，翻了几页很治愈',
    author: '书香',
    date: '2026-01-30',
    likes: 18,
    category: '阅读时光'
  },
  {
    id: 'moment_5',
    text: '点了香薰，整个房间都是温暖的味道，很安心',
    author: '慢生活',
    date: '2026-01-29',
    likes: 37,
    category: '氛围营造'
  }
];

// utils/DailyMomentManager.js
export class DailyMomentManager {
  constructor() {
    this.moments = DailyMoments;
  }

  // 获取今日治愈瞬间
  getTodayMoment() {
    const today = new Date().toISOString().split('T')[0];
    const lastViewedDate = localStorage.getItem('lastViewedMomentDate');
    let currentMomentId = localStorage.getItem('currentMomentId');
    
    // 如果是新的一天，获取新的治愈瞬间
    if (lastViewedDate !== today) {
      // 随机选择一个瞬间
      const randomIndex = Math.floor(Math.random() * this.moments.length);
      currentMomentId = this.moments[randomIndex].id;
      localStorage.setItem('currentMomentId', currentMomentId);
      localStorage.setItem('lastViewedMomentDate', today);
    }
    
    return this.moments.find(moment => moment.id === currentMomentId) || this.moments[0];
  }

  // 获取随机治愈瞬间
  getRandomMoment() {
    const randomIndex = Math.floor(Math.random() * this.moments.length);
    return this.moments[randomIndex];
  }

  // 获取所有治愈瞬间
  getAllMoments() {
    return this.moments;
  }

  // 提交新的治愈瞬间
  submitMoment(text, author) {
    const newMoment = {
      id: `moment_${Date.now()}`,
      text,
      author: author || '匿名用户',
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      category: '用户投稿'
    };

    // 将新瞬间添加到列表
    this.moments.unshift(newMoment);
    return newMoment;
  }

  // 点赞治愈瞬间
  likeMoment(momentId) {
    const moment = this.moments.find(m => m.id === momentId);
    if (moment) {
      moment.likes += 1;
      return moment;
    }
    return null;
  }
}