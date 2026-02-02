// types/Tasks.js
export const TaskTypes = {
  BATH: 'bath',
  AROMATHERAPY: 'aromatherapy',
  BOOKSHELF: 'bookshelf',
  PLANTING: 'planting',
  MEDITATION: 'meditation',
  JOURNAL: 'journal',
  MUSIC: 'music',
  TEA: 'tea',
  CANDLE: 'candle',
  STRETCH: 'stretch'
};

export const TaskCategories = {
  RELAXATION: 'relaxation',
  ORGANIZATION: 'organization',
  NATURE: 'nature',
  CREATIVE: 'creative',
  WELLNESS: 'wellness'
};

export const Tasks = [
  {
    id: 'bath_1',
    title: '泡个热水澡',
    description: '点燃蜡烛，放些花瓣，享受温暖的泡澡时光',
    type: TaskTypes.BATH,
    category: TaskCategories.RELAXATION,
    duration: 30,
    calmValueReward: 15,
    icon: '🛁',
    tips: ['水温控制在38-40度', '可以加入薰衣草浴盐', '关掉手机，专心享受']
  },
  {
    id: 'aromatherapy_1',
    title: '点个香薰',
    description: '选择喜欢的香氛，让房间充满治愈气息',
    type: TaskTypes.AROMATHERAPY,
    category: TaskCategories.RELAXATION,
    duration: 15,
    calmValueReward: 10,
    icon: '🕯️',
    tips: ['薰衣草助眠', '柠檬草提神', '根据心情选择香型']
  },
  {
    id: 'bookshelf_1',
    title: '整理书架',
    description: '给书籍们一个整齐的家，也整理一下心情',
    type: TaskTypes.BOOKSHELF,
    category: TaskCategories.ORGANIZATION,
    duration: 25,
    calmValueReward: 12,
    icon: '📚',
    tips: ['按颜色排列更有视觉享受', '可以边整理边回忆每本书', '整理完可以挑一本静静阅读']
  },
  {
    id: 'planting_1',
    title: '阳台种薄荷',
    description: '在窗台种上薄荷，看着生命慢慢成长',
    type: TaskTypes.PLANTING,
    category: TaskCategories.NATURE,
    duration: 20,
    calmValueReward: 13,
    icon: '🌿',
    tips: ['选择有阳光的角落', '记得每天浇水', '看着植物成长会很有成就感']
  },
  {
    id: 'meditation_1',
    title: '冥想10分钟',
    description: '闭上眼睛，关注呼吸，让心平静下来',
    type: TaskTypes.MEDITATION,
    category: TaskCategories.WELLNESS,
    duration: 10,
    calmValueReward: 18,
    icon: '🧘',
    tips: ['找个安静的地方', '专注于呼吸', '不要评判自己的想法']
  },
  {
    id: 'journal_1',
    title: '写写日记',
    description: '记录今天的心情和感受，整理思绪',
    type: TaskTypes.JOURNAL,
    category: TaskCategories.CREATIVE,
    duration: 15,
    calmValueReward: 11,
    icon: '📝',
    tips: ['不要追求完美', '写任何想到的', '可以记录感恩的事']
  },
  {
    id: 'music_1',
    title: '播放播客',
    description: '选一个温暖的声音，让思绪随声音流淌',
    type: TaskTypes.MUSIC,
    category: TaskCategories.RELAXATION,
    duration: 30,
    calmValueReward: 14,
    icon: '🎧',
    tips: ['选择治愈系播客', '调至舒适音量', '闭眼静静聆听']
  },
  {
    id: 'tea_1',
    title: '泡杯热茶',
    description: '慢慢品味茶香，感受温暖在身体里流淌',
    type: TaskTypes.TEA,
    category: TaskCategories.RELAXATION,
    duration: 12,
    calmValueReward: 9,
    icon: '🍵',
    tips: ['选择喜欢的茶类', '慢慢品味', '感受茶的温度']
  },
  {
    id: 'candle_1',
    title: '点个蜡烛',
    description: '温暖的烛光，让房间充满温馨氛围',
    type: TaskTypes.CANDLE,
    category: TaskCategories.RELAXATION,
    duration: 20,
    calmValueReward: 10,
    icon: '🕯️',
    tips: ['确保安全', '可以搭配轻音乐', '感受烛光的宁静']
  },
  {
    id: 'stretch_1',
    title: '伸展身体',
    description: '简单的伸展运动，放松紧张的肌肉',
    type: TaskTypes.STRETCH,
    category: TaskCategories.WELLNESS,
    duration: 10,
    calmValueReward: 8,
    icon: '🧘‍♀️',
    tips: ['动作要缓慢', '配合深呼吸', '感受身体的放松']
  }
];

// utils/TaskManager.js
export class TaskManager {
  constructor() {
    this.tasks = Tasks;
  }

  getTasksByCategory(category) {
    return this.tasks.filter(task => task.category === category);
  }

  getTaskById(taskId) {
    return this.tasks.find(task => task.id === taskId);
  }

  getTasksByType(type) {
    return this.tasks.filter(task => task.type === type);
  }

  getAllTasks() {
    return this.tasks;
  }

  completeTask(taskId, user) {
    const task = this.getTaskById(taskId);
    if (!task) return null;

    // 更新用户平静值
    user.calmValue = Math.min(user.maxCalmValue, user.calmValue + task.calmValueReward);
    
    // 添加到完成列表
    if (!user.completedTasks.includes(taskId)) {
      user.completedTasks.push(taskId);
    }

    return { user, task };
  }
}