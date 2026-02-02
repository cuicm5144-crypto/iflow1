// components/MomentItem.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { DailyMomentManager } from '../utils/DailyMomentManager';

const MomentItemContainer = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
`;

const MomentContent = styled.div`
  margin-bottom: 10px;
`;

const MomentText = styled.p`
  margin: 0;
  color: #5a6c94;
  font-size: 15px;
  line-height: 1.5;
`;

const MomentFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #8a9bb8;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CategoryTag = styled.span`
  background: #e3eef7;
  color: #7fb0d3;
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 11px;
`;

const LikeButton = styled.button`
  background: ${props => props.liked ? '#ff6b6b' : 'transparent'};
  color: ${props => props.liked ? 'white' : '#8a9bb8'};
  border: 1px solid ${props => props.liked ? '#ff6b6b' : '#e0e6ed'};
  padding: 5px 10px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background: ${props => props.liked ? '#ff5252' : '#f0f4f8'};
  }
`;

const momentManager = new DailyMomentManager();

const MomentItem = ({ moment }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(moment.likes);

  const handleLike = () => {
    if (!liked) {
      momentManager.likeMoment(moment.id);
      setLikeCount(likeCount + 1);
      setLiked(true);
    }
  };

  return (
    <MomentItemContainer>
      <MomentContent>
        <MomentText>"{moment.text}"</MomentText>
      </MomentContent>
      
      <MomentFooter>
        <AuthorInfo>
          <span>{moment.author}</span>
          <CategoryTag>{moment.category}</CategoryTag>
        </AuthorInfo>
        
        <LikeButton liked={liked} onClick={handleLike}>
          {liked ? '❤️' : '🤍'} {likeCount + (liked ? 1 : 0)}
        </LikeButton>
      </MomentFooter>
    </MomentItemContainer>
  );
};

export default MomentItem;