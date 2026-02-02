import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/App.css';

// 类型定义
export interface Task {
  id: string;
  name: string;
  description: string;
  peacePoints: number;
  completed: boolean;
  icon?: string;
  category?: string;
  timeRequired?: number; // 完成任务所需时间（分钟）
  difficulty?: 'easy' | 'medium' | 'hard'; // 任务难度
  seasonal?: boolean; // 是否为季节性任务
  repeatable?: boolean; // 是否可重复完成
}

export interface User {
  id: string;
  username: string;
  peaceValue: number;
  level: number;
  tasksCompleted: number;
  completedTasks: string[]; // 记录已完成任务的ID
  dailyStreak: number; // 连续完成任务天数
  maxStreak: number; // 最大连续完成天数
}

export interface CommunityPost {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: Date;
  likes: number;
  category: string; // 帖子分类
  comments: Comment[]; // 评论列表
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: Date;
  likes: number;
}

export interface Device {
  id: string;
  name: string;
  type: 'diffuser' | 'light' | 'speaker' | 'other';
  connected: boolean;
  status: 'on' | 'off';
  automation: boolean; // 是否启用自动化
  settings?: {[key: string]: any}; // 设备特定设置
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  achieved: boolean;
  unlockCondition: string;
}

// App 主组件
function App() {
  // 用户状态
  const [user, setUser] = useState<User>({
    id: '1',
    username: '今晚好好过',
    peaceValue: 50,
    level: 1,
    tasksCompleted: 3,
    completedTasks: [],
    dailyStreak: 2,
    maxStreak: 3
  });

  // 任务列表
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      name: '泡澡+香薰+播客',
      description: '点燃香薰蜡烛，播放喜欢的播客，享受温暖的泡澡时光',
      peacePoints: 15,
      completed: false,
      icon: '🛁',
      category: 'relaxation',
      timeRequired: 30,
      difficulty: 'medium',
      repeatable: true
    },
    {
      id: '2',
      name: '整理书架',
      description: '按照心情重新排列书本，给每一本书一个新位置',
      peacePoints: 10,
      completed: false,
      icon: '📚',
      category: 'organization',
      timeRequired: 20,
      difficulty: 'easy',
      repeatable: true
    },
    {
      id: '3',
      name: '阳台种薄荷',
      description: '在阳台种一盆薄荷，为生活增添一点绿意',
      peacePoints: 20,
      completed: false,
      icon: '🌿',
      category: 'nature',
      timeRequired: 15,
      difficulty: 'medium',
      repeatable: false
    },
    {
      id: '4',
      name: '制作手写日记',
      description: '用漂亮的笔记录今天的三件小确幸',
      peacePoints: 12,
      completed: false,
      icon: '📝',
      category: 'reflection',
      timeRequired: 10,
      difficulty: 'easy',
      repeatable: true
    },
    {
      id: '5',
      name: '冥想5分钟',
      description: '找一个安静的角落，专注呼吸，让心情平静',
      peacePoints: 18,
      completed: false,
      icon: '🧘',
      category: 'meditation',
      timeRequired: 5,
      difficulty: 'easy',
      repeatable: true
    },
    {
      id: '6',
      name: '制作花茶',
      description: '挑选喜欢的花草，冲泡一杯温暖的花茶',
      peacePoints: 8,
      completed: false,
      icon: '🍵',
      category: 'beverage',
      timeRequired: 10,
      difficulty: 'easy',
      repeatable: true
    },
    {
      id: '7',
      name: '听音乐放松',
      description: '播放喜欢的轻音乐，闭上眼睛静静聆听',
      peacePoints: 10,
      completed: false,
      icon: '🎵',
      category: 'audio',
      timeRequired: 15,
      difficulty: 'easy',
      repeatable: true
    },
    {
      id: '8',
      name: '整理化妆台',
      description: '清洁并整理化妆用品，让小物件井井有条',
      peacePoints: 8,
      completed: false,
      icon: '💄',
      category: 'organization',
      timeRequired: 15,
      difficulty: 'easy',
      repeatable: true
    },
    {
      id: '9',
      name: '写一封感谢信',
      description: '给朋友或家人写一封感谢信，表达你的感激',
      peacePoints: 15,
      completed: false,
      icon: '✉️',
      category: 'social',
      timeRequired: 20,
      difficulty: 'medium',
      repeatable: true
    },
    {
      id: '10',
      name: '夜间护肤仪式',
      description: '使用喜欢的护肤品，为自己进行一次全面的夜间护理',
      peacePoints: 12,
      completed: false,
      icon: '🧴',
      category: 'self-care',
      timeRequired: 15,
      difficulty: 'easy',
      repeatable: true
    }
  ]);

  // 社区帖子
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([
    {
      id: '1',
      userId: '2',
      username: '小鹿',
      content: '今天楼下咖啡店送了我一块饼干，是开心的一天！',
      timestamp: new Date(Date.now() - 3600000),
      likes: 24,
      category: 'daily-joy',
      comments: [
        {
          id: 'c1',
          userId: '3',
          username: '月亮不睡',
          content: '真好！这种小惊喜最暖心了',
          timestamp: new Date(Date.now() - 3500000),
          likes: 3
        }
      ]
    },
    {
      id: '2',
      userId: '3',
      username: '月亮不睡',
      content: '深夜听了一首很治愈的歌，瞬间被温暖了',
      timestamp: new Date(Date.now() - 86400000),
      likes: 42,
      category: 'audio-therapy',
      comments: [
        {
          id: 'c2',
          userId: '4',
          username: '慢生活',
          content: '可以分享一下歌单吗？',
          timestamp: new Date(Date.now() - 86300000),
          likes: 1
        }
      ]
    },
    {
      id: '3',
      userId: '4',
      username: '慢生活',
      content: '今天整理房间时发现了一张很久以前的照片，回忆涌上心头',
      timestamp: new Date(Date.now() - 172800000),
      likes: 31,
      category: 'memories',
      comments: []
    },
    {
      id: '4',
      userId: '5',
      username: '晨露',
      content: '早起在阳台看到了绝美的日出，感觉充满希望',
      timestamp: new Date(Date.now() - 43200000),
      likes: 56,
      category: 'nature',
      comments: []
    }
  ]);

  // 智能设备
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: '智能香薰机',
      type: 'diffuser',
      connected: false,
      status: 'off',
      automation: false,
      settings: {
        scent: 'lavender',
        intensity: 3,
        timer: 60
      }
    },
    {
      id: '2',
      name: '氛围灯',
      type: 'light',
      connected: false,
      status: 'off',
      automation: false,
      settings: {
        color: 'warm',
        brightness: 70,
        timer: 120
      }
    },
    {
      id: '3',
      name: '智能音箱',
      type: 'speaker',
      connected: false,
      status: 'off',
      automation: false,
      settings: {
        volume: 50,
        playlist: 'relaxing'
      }
    },
    {
      id: '4',
      name: '智能插座',
      type: 'other',
      connected: false,
      status: 'off',
      automation: false,
      settings: {
        schedule: 'off'
      }
    }
  ]);

  // 设备控制状态
  const [deviceControls, setDeviceControls] = useState<{[deviceId: string]: boolean}>({});

  // 成就系统
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: '新手上路',
      description: '完成第一个任务',
      icon: '🆕',
      achieved: user.tasksCompleted > 0,
      unlockCondition: 'tasksCompleted > 0'
    },
    {
      id: '2',
      title: '平静入门',
      description: '平静值达到100',
      icon: '🌱',
      achieved: user.peaceValue >= 100,
      unlockCondition: 'peaceValue >= 100'
    },
    {
      id: '3',
      title: '连续打卡',
      description: '连续完成任务3天',
      icon: '🔥',
      achieved: user.dailyStreak >= 3,
      unlockCondition: 'dailyStreak >= 3'
    },
    {
      id: '4',
      title: '整理达人',
      description: '完成5个整理类任务',
      icon: '🧹',
      achieved: tasks.filter(t => t.category === 'organization' && t.completed).length >= 5,
      unlockCondition: 'organizationTasks >= 5'
    },
    {
      id: '5',
      title: '冥想初学者',
      description: '完成3个冥想/放松类任务',
      icon: '🧘',
      achieved: tasks.filter(t => (t.category === 'meditation' || t.category === 'relaxation') && t.completed).length >= 3,
      unlockCondition: 'meditationTasks >= 3'
    }
  ]);

  // 完成任务
  const completeTask = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId && (!task.completed || task.repeatable)) {
        // 更新用户状态
        const newUser = {
          ...user,
          peaceValue: user.peaceValue + task.peacePoints,
          tasksCompleted: user.tasksCompleted + 1,
          completedTasks: task.completed 
            ? user.completedTasks 
            : [...user.completedTasks, task.id]
        };
        setUser(newUser);
        
        // 如果任务涉及智能设备，尝试连接设备
        if (task.category === 'relaxation' || task.category === 'meditation' || task.category === 'audio') {
          connectToDevice('1'); // 连接香薰机
          connectToDevice('2'); // 连接氛围灯
          connectToDevice('3'); // 连接智能音箱
        }
        
        // 如果是首次完成，标记为已完成
        if (!task.completed) {
          return { ...task, completed: true };
        } else {
          return task; // 可重复任务保持原状态
        }
      }
      return task;
    }));
  };

  // 计算用户等级
  useEffect(() => {
    const newLevel = Math.floor(user.peaceValue / 100) + 1;
    setUser(prev => ({ ...prev, level: newLevel }));
    
    // 更新成就
    setAchievements(achievements.map(achievement => {
      if (!achievement.achieved) {
        if (achievement.id === '1' && user.tasksCompleted > 0) {
          return { ...achievement, achieved: true };
        } else if (achievement.id === '2' && user.peaceValue >= 100) {
          return { ...achievement, achieved: true };
        } else if (achievement.id === '3' && user.dailyStreak >= 3) {
          return { ...achievement, achieved: true };
        } else if (achievement.id === '4' && 
                  tasks.filter(t => t.category === 'organization' && t.completed).length >= 5) {
          return { ...achievement, achieved: true };
        } else if (achievement.id === '5' && 
                  tasks.filter(t => (t.category === 'meditation' || t.category === 'relaxation') && t.completed).length >= 3) {
          return { ...achievement, achieved: true };
        }
      }
      return achievement;
    }));
  }, [user.peaceValue, user.tasksCompleted, user.dailyStreak, tasks]);

  // 连接智能设备
  const connectToDevice = (deviceId: string) => {
    setDevices(devices.map(device => {
      if (device.id === deviceId && !device.connected) {
        return { ...device, connected: true, status: 'on' };
      }
      return device;
    }));
  };

  // 断开智能设备
  const disconnectDevice = (deviceId: string) => {
    setDevices(devices.map(device => {
      if (device.id === deviceId) {
        return { ...device, connected: false, status: 'off' };
      }
      return device;
    }));
  };

  // 切换设备自动化
  const toggleAutomation = (deviceId: string) => {
    setDevices(devices.map(device => {
      if (device.id === deviceId) {
        return { ...device, automation: !device.automation };
      }
      return device;
    }));
  };

  // 更新设备设置
  const updateDeviceSetting = (deviceId: string, setting: string, value: any) => {
    setDevices(devices.map(device => {
      if (device.id === deviceId) {
        return {
          ...device,
          settings: {
            ...device.settings,
            [setting]: value
          }
        };
      }
      return device;
    }));
  };

  // 模拟设备控制
  const toggleDeviceControl = (deviceId: string) => {
    setDeviceControls(prev => ({
      ...prev,
      [deviceId]: !prev[deviceId]
    }));
  };

  // 发布社区帖子
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('daily-joy');
  const publishPost = () => {
    if (newPostContent.trim() === '') return;
    
    const newPost: CommunityPost = {
      id: (communityPosts.length + 1).toString(),
      userId: user.id,
      username: user.username,
      content: newPostContent,
      timestamp: new Date(),
      likes: 0,
      category: newPostCategory,
      comments: []
    };
    
    setCommunityPosts([newPost, ...communityPosts]);
    setNewPostContent('');
  };

  // 点赞帖子
  const likePost = (postId: string) => {
    setCommunityPosts(communityPosts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    }));
  };

  // 点赞评论
  const likeComment = (postId: string, commentId: string) => {
    setCommunityPosts(communityPosts.map(post => {
      if (post.id === postId) {
        const updatedComments = post.comments.map(comment => {
          if (comment.id === commentId) {
            return { ...comment, likes: comment.likes + 1 };
          }
          return comment;
        });
        return { ...post, comments: updatedComments };
      }
      return post;
    }));
  };

  // 添加评论
  const addComment = (postId: string) => {
    const content = commentInputs[postId] || '';
    if (content.trim() === '') return;
    
    const newComment: Comment = {
      id: `c${Date.now()}`,
      userId: user.id,
      username: user.username,
      content: content,
      timestamp: new Date(),
      likes: 0
    };
    
    setCommunityPosts(communityPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [newComment, ...post.comments]
        };
      }
      return post;
    }));
    
    // 清空评论输入框
    setCommentInputs(prev => ({
      ...prev,
      [postId]: ''
    }));
  };

  // 处理评论输入变化
  const handleCommentChange = (postId: string, content: string) => {
    setCommentInputs(prev => ({
      ...prev,
      [postId]: content
    }));
  };

  // 获取随机每日推荐
  const dailyRecommendation = tasks.filter(task => !task.completed)[0] || tasks[0];

  // 过滤任务
  const [filter, setFilter] = useState('all');
  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(task => task.category === filter);

  // 评论状态
  const [commentInputs, setCommentInputs] = useState<{[postId: string]: string}>({});
  const commentInputRefs = useRef<{[postId: string]: HTMLTextAreaElement | null}>({}); // Refs for comment textareas

  return (
    <div className="app">
      <header className="app-header">
        <h1>今晚好好过</h1>
        <div className="user-info">
          <div className="peace-value">平静值: {user.peaceValue}</div>
          <div className="user-level">等级: {user.level}</div>
          <div className="tasks-completed">已完成: {user.tasksCompleted}</div>
          <div className="daily-streak">连续打卡: {user.dailyStreak}天</div>
        </div>
      </header>

      <main className="main-content">
        <section className="dashboard-section">
          <div className="daily-recommendation">
            <h3>今日推荐</h3>
            <div className="recommendation-card">
              <div className="task-icon">{dailyRecommendation.icon}</div>
              <h4>{dailyRecommendation.name}</h4>
              <p>{dailyRecommendation.description}</p>
              <div className="recommendation-footer">
                <span className="peace-points">+{dailyRecommendation.peacePoints} 平静值</span>
                <span className="time-required">{dailyRecommendation.timeRequired}分钟</span>
              </div>
            </div>
          </div>
          
          <div className="achievements-section">
            <h3>成就</h3>
            <div className="achievements-grid">
              {achievements.map(achievement => (
                <div 
                  key={achievement.id} 
                  className={`achievement-card ${achievement.achieved ? 'unlocked' : 'locked'}`}
                >
                  <div className="achievement-icon">{achievement.icon}</div>
                  <h4>{achievement.title}</h4>
                  <p>{achievement.description}</p>
                  <span className={`achievement-status ${achievement.achieved ? 'achieved' : ''}`}>
                    {achievement.achieved ? '已解锁' : '未解锁'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="tasks-section">
          <div className="tasks-header">
            <h2>今日仪式感任务</h2>
            <div className="task-filters">
              <button 
                className={filter === 'all' ? 'active' : ''} 
                onClick={() => setFilter('all')}
              >
                全部
              </button>
              <button 
                className={filter === 'relaxation' ? 'active' : ''} 
                onClick={() => setFilter('relaxation')}
              >
                放松
              </button>
              <button 
                className={filter === 'organization' ? 'active' : ''} 
                onClick={() => setFilter('organization')}
              >
                整理
              </button>
              <button 
                className={filter === 'nature' ? 'active' : ''} 
                onClick={() => setFilter('nature')}
              >
                自然
              </button>
              <button 
                className={filter === 'meditation' ? 'active' : ''} 
                onClick={() => setFilter('meditation')}
              >
                冥想
              </button>
            </div>
          </div>
          
          <div className="tasks-grid">
            {filteredTasks.map(task => (
              <div 
                key={task.id} 
                className={`task-card ${task.completed ? 'completed' : ''}`}
              >
                <div className="task-icon">{task.icon}</div>
                <h3>{task.name}</h3>
                <p>{task.description}</p>
                <div className="task-footer">
                  <div className="task-meta">
                    <div className="task-stats">
                      <span className="peace-points">+{task.peacePoints} 平静值</span>
                      <span className="time-required">{task.timeRequired}分钟</span>
                      <span className={`difficulty ${task.difficulty}`}>{task.difficulty === 'easy' ? '简单' : task.difficulty === 'medium' ? '中等' : '困难'}</span>
                    </div>
                    {task.repeatable && <span className="repeatable">可重复</span>}
                  </div>
                  {!task.completed && (
                    <button 
                      className="complete-btn" 
                      onClick={() => completeTask(task.id)}
                    >
                      完成
                    </button>
                  )}
                  {task.completed && !task.repeatable && (
                    <span className="completed-text">已完成</span>
                  )}
                  {task.completed && task.repeatable && (
                    <button 
                      className="complete-btn" 
                      onClick={() => completeTask(task.id)}
                    >
                      再次完成
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="community-section">
          <h2>温暖社区</h2>
          <div className="create-post">
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="分享今天的治愈瞬间..."
              rows={3}
            />
            <div className="post-controls">
              <select 
                value={newPostCategory} 
                onChange={(e) => setNewPostCategory(e.target.value)}
              >
                <option value="daily-joy">日常小确幸</option>
                <option value="audio-therapy">音乐治愈</option>
                <option value="memories">温暖回忆</option>
                <option value="nature">自然之美</option>
                <option value="meditation">冥想心得</option>
                <option value="self-care">自我关爱</option>
                <option value="organization">整理心得</option>
              </select>
              <button onClick={publishPost}>发布</button>
            </div>
          </div>
          <div className="community-posts">
            {communityPosts.map(post => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <span className="username">{post.username}</span>
                  <span className="timestamp">
                    {Math.floor((Date.now() - post.timestamp.getTime()) / 60000) > 0 
                      ? `${Math.floor((Date.now() - post.timestamp.getTime()) / 60000)}分钟前`
                      : '刚刚'}
                  </span>
                </div>
                <p className="post-content">{post.content}</p>
                <div className="post-footer">
                  <span className="post-category">{post.category.replace('-', ' ')}</span>
                  <button className="like-btn" onClick={() => likePost(post.id)}>👍 {post.likes}</button>
                </div>
                
                {/* 评论部分 */}
                <div className="comments-section">
                  {post.comments.length > 0 && (
                    <div className="comments-list">
                      {post.comments.map(comment => (
                        <div key={comment.id} className="comment">
                          <div className="comment-header">
                            <span className="comment-username">{comment.username}</span>
                            <span className="comment-timestamp">
                              {Math.floor((Date.now() - comment.timestamp.getTime()) / 60000) > 0 
                                ? `${Math.floor((Date.now() - comment.timestamp.getTime()) / 60000)}分钟前`
                                : '刚刚'}
                            </span>
                          </div>
                          <p className="comment-content">{comment.content}</p>
                          <button 
                            className="comment-like-btn" 
                            onClick={() => likeComment(post.id, comment.id)}
                          >
                            👍 {comment.likes}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="add-comment">
                    <textarea
                      ref={el => commentInputRefs.current[post.id] = el}
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                      placeholder="写下你的想法..."
                      rows={2}
                    />
                    <button 
                      className="comment-submit-btn" 
                      onClick={() => addComment(post.id)}
                    >
                      发表评论
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="devices-section">
          <h2>智能设备</h2>
          <div className="devices-grid">
            {devices.map(device => (
              <div key={device.id} className={`device-card ${device.connected ? 'connected' : 'disconnected'}`}>
                <h3>{device.name}</h3>
                <p>状态: {device.connected ? '已连接' : '未连接'}</p>
                <p>自动化: {device.automation ? '已开启' : '已关闭'}</p>
                
                {device.connected && (
                  <div className="device-settings">
                    <div className="setting-item">
                      <label>设备控制:</label>
                      <button 
                        className={`device-control-btn ${deviceControls[device.id] ? 'active' : ''}`}
                        onClick={() => toggleDeviceControl(device.id)}
                      >
                        {deviceControls[device.id] ? '关闭设备' : '启动设备'}
                      </button>
                    </div>
                    
                    {device.type === 'diffuser' && (
                      <div className="setting-item">
                        <label>香薰类型:</label>
                        <select 
                          value={device.settings?.scent || 'lavender'} 
                          onChange={(e) => updateDeviceSetting(device.id, 'scent', e.target.value)}
                        >
                          <option value="lavender">薰衣草</option>
                          <option value="eucalyptus">桉树</option>
                          <option value="citrus">柑橘</option>
                          <option value="vanilla">香草</option>
                        </select>
                      </div>
                    )}
                    
                    {device.type === 'light' && (
                      <div className="setting-item">
                        <label>灯光颜色:</label>
                        <select 
                          value={device.settings?.color || 'warm'} 
                          onChange={(e) => updateDeviceSetting(device.id, 'color', e.target.value)}
                        >
                          <option value="warm">暖色</option>
                          <option value="cool">冷色</option>
                          <option value="blue">蓝色</option>
                          <option value="green">绿色</option>
                        </select>
                      </div>
                    )}
                    
                    {device.type === 'speaker' && (
                      <div className="setting-item">
                        <label>播放列表:</label>
                        <select 
                          value={device.settings?.playlist || 'relaxing'} 
                          onChange={(e) => updateDeviceSetting(device.id, 'playlist', e.target.value)}
                        >
                          <option value="relaxing">放松音乐</option>
                          <option value="nature">自然声音</option>
                          <option value="meditation">冥想音乐</option>
                          <option value="ambient">环境音乐</option>
                        </select>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="device-controls">
                  {!device.connected ? (
                    <button className="connect-btn" onClick={() => connectToDevice(device.id)}>
                      连接
                    </button>
                  ) : (
                    <button className="disconnect-btn" onClick={() => disconnectDevice(device.id)}>
                      断开
                    </button>
                  )}
                  <button 
                    className={`automation-btn ${device.automation ? 'enabled' : 'disabled'}`} 
                    onClick={() => toggleAutomation(device.id)}
                    disabled={!device.connected}
                  >
                    {device.automation ? '关闭自动化' : '开启自动化'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>在快节奏的生活中，为自己创造一些温暖的仪式感时刻</p>
      </footer>
    </div>
  );
}

// 创建根节点并渲染应用
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);

export default App;