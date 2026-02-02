// components/TaskItem.js
import React from 'react';
import styled from 'styled-components';

const TaskItemContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const TaskIcon = styled.div`
  font-size: 24px;
  margin-right: 15px;
`;

const TaskInfo = styled.div`
  flex: 1;
`;

const TaskTitle = styled.h3`
  margin: 0 0 5px 0;
  color: #5a6c94;
  font-size: 16px;
`;

const TaskDescription = styled.p`
  margin: 0 0 8px 0;
  color: #8a9bb8;
  font-size: 14px;
`;

const TaskFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskDetails = styled.div`
  display: flex;
  gap: 15px;
`;

const TaskDetail = styled.span`
  font-size: 12px;
  color: #a7b5d1;
  display: flex;
  align-items: center;
`;

const CompleteButton = styled.button`
  background: linear-gradient(135deg, #a7c5eb 0%, #7fb0d3 100%);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
`;

const TaskItem = ({ task, onComplete }) => {
  const handleComplete = () => {
    onComplete(task);
  };

  return (
    <TaskItemContainer>
      <TaskIcon>{task.icon}</TaskIcon>
      <TaskInfo>
        <TaskTitle>{task.title}</TaskTitle>
        <TaskDescription>{task.description}</TaskDescription>
        <TaskFooter>
          <TaskDetails>
            <TaskDetail>⏱️ {task.duration}分钟</TaskDetail>
            <TaskDetail>✨ +{task.calmValueReward}平静值</TaskDetail>
          </TaskDetails>
          <CompleteButton onClick={handleComplete}>
            开始
          </CompleteButton>
        </TaskFooter>
      </TaskInfo>
    </TaskItemContainer>
  );
};

export default TaskItem;