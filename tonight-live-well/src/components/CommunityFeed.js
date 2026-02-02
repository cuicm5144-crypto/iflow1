// components/CommunityFeed.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DailyMomentManager } from '../utils/DailyMomentManager';
import MomentItem from './MomentItem';

const FeedContainer = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
`;

const FeedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const FeedTitle = styled.h2`
  margin: 0;
  color: #5a6c94;
  font-size: 18px;
`;

const PostButton = styled.button`
  background: linear-gradient(135deg, #a7c5eb 0%, #7fb0d3 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 14px;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
`;

const MomentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CommunityFeed = () => {
  const [moments, setMoments] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);
  
  const momentManager = new DailyMomentManager();

  useEffect(() => {
    // 获取所有瞬间（除了今天的）
    const allMoments = momentManager.getAllMoments();
    const today = new Date().toISOString().split('T')[0];
    const otherMoments = allMoments.filter(m => m.date !== today);
    setMoments(otherMoments);
  }, []);

  const handlePostSubmit = (text) => {
    if (text.trim()) {
      const newMoment = momentManager.submitMoment(text);
      setMoments([newMoment, ...moments]);
      setShowPostModal(false);
    }
  };

  return (
    <FeedContainer>
      <FeedHeader>
        <FeedTitle>温暖社区</FeedTitle>
        <PostButton onClick={() => setShowPostModal(true)}>
          分享治愈瞬间
        </PostButton>
      </FeedHeader>
      
      <MomentList>
        {moments.map(moment => (
          <MomentItem key={moment.id} moment={moment} />
        ))}
      </MomentList>
      
      {showPostModal && (
        <PostModal 
          onSubmit={handlePostSubmit} 
          onClose={() => setShowPostModal(false)} 
        />
      )}
    </FeedContainer>
  );
};

// PostModal Component
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const ModalTitle = styled.h3`
  margin: 0;
  color: #5a6c94;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #8a9bb8;
`;

const PostInput = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 15px;
  border: 1px solid #e0e6ed;
  border-radius: 10px;
  resize: none;
  font-family: inherit;
  font-size: 16px;
  margin-bottom: 15px;
  
  &:focus {
    outline: none;
    border-color: #a7c5eb;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #a7c5eb 0%, #7fb0d3 100%);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  
  &:hover {
    opacity: 0.9;
  }
`;

const PostModal = ({ onSubmit, onClose }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    onSubmit(text);
    setText('');
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>分享你的治愈瞬间</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        
        <PostInput
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="今天有什么温暖的小事想和大家分享吗？比如：收到了朋友的问候、看到了美丽的夕阳、完成了一项小任务..."
        />
        
        <SubmitButton onClick={handleSubmit}>
          分享瞬间
        </SubmitButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CommunityFeed;