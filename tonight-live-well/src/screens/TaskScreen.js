// screens/TaskScreen.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TaskList from '../components/TaskList';
import { UserManager } from '../utils/UserManager';
import { TaskManager } from '../utils/TaskManager';
import { SmartDeviceManager } from '../utils/SmartDeviceManager';

const TaskScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
`;

const ScreenHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ScreenTitle = styled.h1`
  color: #5a6c94;
  margin: 0;
  font-size: 24px;
`;

const BackButton = styled.button`
  background: #e0e6ed;
  color: #5a6c94;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
`;

const TaskCompletionMessage = styled.div`
  background: #e8f5e9;
  color: #4caf50;
  padding: 15px;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 20px;
  display: ${props => props.show ? 'block' : 'none'};
`;

const userManager = new UserManager();
const taskManager = new TaskManager();
const deviceManager = new SmartDeviceManager();

const TaskScreen = ({ navigate }) => {
  const [user, setUser] = useState(userManager.currentUser);
  const [showCompletion, setShowCompletion] = useState(false);
  const [completedTask, setCompletedTask] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(userManager.loadUser());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleTaskComplete = (task) => {
    // 触发相关智能设备
    deviceManager.triggerDevicesForTask(task.type);
    
    // 更新用户数据
    const updatedUser = userManager.completeTask(task);
    setUser(updatedUser);
    
    // 显示完成消息
    setCompletedTask(task);
    setShowCompletion(true);
    setTimeout(() => setShowCompletion(false), 3000);
  };

  return (
    <TaskScreenContainer>
      <ScreenHeader>
        <ScreenTitle>仪式感任务</ScreenTitle>
        <BackButton onClick={() => navigate('/')}>返回首页</BackButton>
      </ScreenHeader>
      
      <TaskCompletionMessage show={showCompletion}>
        恭喜完成任务：{completedTask?.title}！获得+{completedTask?.calmValueReward}平静值
      </TaskCompletionMessage>
      
      <TaskList onTaskComplete={handleTaskComplete} />
    </TaskScreenContainer>
  );
};

export default TaskScreen;