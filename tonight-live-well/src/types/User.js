// types/User.js
export const User = {
  id: 0,
  name: '独居女孩',
  avatar: '/assets/default-avatar.png',
  calmValue: 50,
  level: 1,
  completedTasks: [],
  dailyStreak: 0,
  personalization: {
    roomTheme: 'minimal',
    preferredTime: 'evening',
    goals: ['reduce stress', 'improve sleep', 'find joy']
  }
};

// types/User.js
export const UserProfile = {
  id: 0,
  name: '独居女孩',
  avatar: '/assets/default-avatar.png',
  calmValue: 50,
  level: 1,
  maxCalmValue: 100,
  experience: 0,
  nextLevelExp: 100,
  completedTasks: [],
  dailyStreak: 0,
  personalization: {
    roomTheme: 'minimal',
    preferredTime: 'evening',
    goals: ['reduce stress', 'improve sleep', 'find joy']
  }
};

// utils/UserManager.js
export class UserManager {
  constructor() {
    this.currentUser = this.loadUser();
  }

  loadUser() {
    const savedUser = localStorage.getItem('userProfile');
    return savedUser ? JSON.parse(savedUser) : this.getDefaultUser();
  }

  saveUser(user) {
    localStorage.setItem('userProfile', JSON.stringify(user));
    this.currentUser = user;
  }

  getDefaultUser() {
    return {
      id: Date.now(),
      name: '独居女孩',
      avatar: '/assets/default-avatar.png',
      calmValue: 50,
      maxCalmValue: 100,
      level: 1,
      experience: 0,
      nextLevelExp: 100,
      completedTasks: [],
      dailyStreak: 0,
      personalization: {
        roomTheme: 'minimal',
        preferredTime: 'evening',
        goals: ['reduce stress', 'improve sleep', 'find joy']
      }
    };
  }

  updateCalmValue(amount) {
    const user = { ...this.currentUser };
    user.calmValue = Math.min(user.maxCalmValue, Math.max(0, user.calmValue + amount));
    
    // 增加经验值
    if (amount > 0) {
      user.experience += amount;
      if (user.experience >= user.nextLevelExp) {
        user.level += 1;
        user.experience = user.experience - user.nextLevelExp;
        user.nextLevelExp = user.level * 100;
        user.maxCalmValue += 10; // 每级提升平静值上限
      }
    }
    
    this.saveUser(user);
    return user;
  }

  completeTask(task) {
    const user = { ...this.currentUser };
    if (!user.completedTasks.includes(task.id)) {
      user.completedTasks.push(task.id);
      user = this.updateCalmValue(task.calmValueReward);
    }
    this.saveUser(user);
    return user;
  }

  updateStreak() {
    const user = { ...this.currentUser };
    const today = new Date().toDateString();
    const lastLogin = localStorage.getItem('lastLogin');
    
    if (lastLogin === today) {
      // 今天已登录，不增加连续天数
    } else if (lastLogin === new Date(Date.now() - 86400000).toDateString()) {
      // 昨天登录，连续天数+1
      user.dailyStreak += 1;
    } else {
      // 断了连续，重置为1
      user.dailyStreak = 1;
    }
    
    localStorage.setItem('lastLogin', today);
    this.saveUser(user);
    return user;
  }
}