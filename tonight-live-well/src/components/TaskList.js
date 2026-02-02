// components/TaskList.js
import React from 'react';
import styled from 'styled-components';
import { TaskManager } from '../utils/TaskManager';
import TaskItem from './TaskItem';

const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CategoryTitle = styled.h3`
  margin: 10px 0;
  color: #5a6c94;
  font-size: 18px;
  border-bottom: 1px solid #e0e6ed;
  padding-bottom: 5px;
`;

const taskManager = new TaskManager();

const TaskList = ({ onTaskComplete }) => {
  const allTasks = taskManager.getAllTasks();
  
  const categories = [
    { id: 'relaxation', name: '放松身心', tasks: taskManager.getTasksByCategory('relaxation') },
    { id: 'organization', name: '整理收纳', tasks: taskManager.getTasksByCategory('organization') },
    { id: 'nature', name: '自然疗愈', tasks: taskManager.getTasksByCategory('nature') },
    { id: 'wellness', name: '健康生活', tasks: taskManager.getTasksByCategory('wellness') },
    { id: 'creative', name: '创意表达', tasks: taskManager.getTasksByCategory('creative') }
  ];

  return (
    <TaskListContainer>
      {categories.map(category => 
        category.tasks.length > 0 ? (
          <div key={category.id}>
            <CategoryTitle>{category.name}</CategoryTitle>
            {category.tasks.map(task => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onComplete={onTaskComplete} 
              />
            ))}
          </div>
        ) : null
      )}
    </TaskListContainer>
  );
};

export default TaskList;