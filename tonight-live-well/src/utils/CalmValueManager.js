// utils/CalmValueManager.js
import { UserManager } from './UserManager';

export class CalmValueManager {
  constructor() {
    this.userManager = new UserManager();
  }

  // 获取平静值进度信息
  getCalmValueInfo(user) {
    return {
      current: user.calmValue,
      max: user.maxCalmValue,
      percentage: (user.calmValue / user.maxCalmValue) * 100,
      level: user.level,
      experience: user.experience,
      nextLevelExp: user.nextLevelExp
    };
  }

  // 计算完成任务后的平静值增长
  calculateCalmIncrease(task, user, bonus = 0) {
    let baseIncrease = task.calmValueReward;
    
    // 添加完成任务的bonus
    let totalIncrease = baseIncrease + bonus;
    
    // 根据用户偏好调整
    if (user.personalization.goals.includes(task.category)) {
      totalIncrease = Math.floor(totalIncrease * 1.2); // 偏好任务额外+20%
    }
    
    // 检查是否达到最大值
    const newCalmValue = Math.min(user.maxCalmValue, user.calmValue + totalIncrease);
    const actualIncrease = newCalmValue - user.calmValue;
    
    return {
      baseIncrease,
      bonus,
      totalIncrease,
      actualIncrease,
      newCalmValue
    };
  }

  // 检查用户平静值状态
  checkCalmStatus(user) {
    const percentage = (user.calmValue / user.maxCalmValue) * 100;
    
    if (percentage >= 90) {
      return { status: 'peaceful', message: '内心非常平静' };
    } else if (percentage >= 70) {
      return { status: 'calm', message: '心情平静' };
    } else if (percentage >= 50) {
      return { status: 'balanced', message: '情绪平稳' };
    } else if (percentage >= 30) {
      return { status: 'tense', message: '有些紧张' };
    } else {
      return { status: 'stressed', message: '感到焦虑' };
    }
  }

  // 恢复平静值（例如：睡觉后恢复）
  restoreCalmValue(user, amount) {
    const newUser = { ...user };
    newUser.calmValue = Math.min(newUser.maxCalmValue, newUser.calmValue + amount);
    this.userManager.saveUser(newUser);
    return newUser;
  }

  // 每日重置平静值恢复机会
  dailyReset() {
    // 可以用于重置每日的特殊恢复机会
    localStorage.setItem('dailyRestoreUsed', 'false');
  }
}

// hooks/useCalmValue.js
import { useState, useEffect } from 'react';
import { UserManager } from '../utils/UserManager';

export const useCalmValue = () => {
  const [user, setUser] = useState(new UserManager().currentUser);
  
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(new UserManager().loadUser());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateCalmValue = (amount) => {
    const userManager = new UserManager();
    const updatedUser = userManager.updateCalmValue(amount);
    setUser(updatedUser);
    return updatedUser;
  };

  return { user, updateCalmValue };
};