// components/DailyMoment.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DailyMomentManager } from '../utils/DailyMomentManager';

const MomentContainer = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
`;

const MomentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const MomentTitle = styled.h2`
  margin: 0;
  color: #5a6c94;
  font-size: 18px;
`;

const DateDisplay = styled.span`
  color: #a7b5d1;
  font-size: 14px;
`;

const MomentContent = styled.div`
  background: #f8fafc;
  border-left: 4px solid #a7c5eb;
  padding: 15px;
  border-radius: 0 8px 8px 0;
  margin-bottom: 15px;
`;

const MomentText = styled.p`
  margin: 0;
  color: #5a6c94;
  font-size: 16px;
  line-height: 1.6;
`;

const MomentFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  color: #8a9bb8;
  font-size: 14px;
`;

const LikeButton = styled.button`
  background: ${props => props.liked ? '#ff6b6b' : '#e0e6ed'};
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
`;

const LikeCount = styled.span`
  font-size: 14px;
`;

const dailyMomentManager = new DailyMomentManager();

const DailyMoment = () => {
  const [moment, setMoment] = useState(dailyMomentManager.getTodayMoment());
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setMoment(dailyMomentManager.getTodayMoment());
  }, []);

  const handleLike = () => {
    if (!liked) {
      dailyMomentManager.likeMoment(moment.id);
      setLiked(true);
    }
  };

  return (
    <MomentContainer>
      <MomentHeader>
        <MomentTitle>今日治愈瞬间</MomentTitle>
        <DateDisplay>{moment.date}</DateDisplay>
      </MomentHeader>
      
      <MomentContent>
        <MomentText>"{moment.text}"</MomentText>
      </MomentContent>
      
      <MomentFooter>
        <AuthorInfo>—— {moment.author}</AuthorInfo>
        <LikeButton liked={liked} onClick={handleLike}>
          {liked ? '❤️' : '🤍'}
          <LikeCount>{moment.likes + (liked ? 1 : 0)}</LikeCount>
        </LikeButton>
      </MomentFooter>
    </MomentContainer>
  );
};

export default DailyMoment;