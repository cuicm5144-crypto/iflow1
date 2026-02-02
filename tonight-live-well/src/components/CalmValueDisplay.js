// components/CalmValueDisplay.js
import React from 'react';
import styled from 'styled-components';

const CalmContainer = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
`;

const CalmHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const CalmTitle = styled.h2`
  margin: 0;
  color: #5a6c94;
  font-size: 18px;
`;

const CalmValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #5a6c94;
`;

const CalmBarContainer = styled.div`
  width: 100%;
  height: 20px;
  background: #e0e6ed;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
`;

const CalmBarFill = styled.div`
  height: 100%;
  width: ${(props) => (props.value / props.max) * 100}%;
  background: linear-gradient(90deg, #a7c5eb, #7fb0d3);
  transition: width 0.3s ease;
  position: relative;
`;

const CalmBarLabel = styled.div`
  position: absolute;
  top: 50%;
  left: ${(props) => (props.value / props.max) * 100}%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
`;

const StatusMessage = styled.p`
  margin: 10px 0 0 0;
  color: #8a9bb8;
  font-size: 14px;
  text-align: center;
`;

const ExperienceBar = styled.div`
  width: 100%;
  height: 6px;
  background: #e0e6ed;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 15px;
`;

const ExperienceFill = styled.div`
  height: 100%;
  width: ${(props) => (props.value / props.max) * 100}%;
  background: linear-gradient(90deg, #d1c4e9, #b39ddb);
  transition: width 0.3s ease;
`;

const LevelInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  font-size: 12px;
  color: #8a9bb8;
`;

const CalmValueDisplay = ({ user, statusMessage }) => {
  const calmPercentage = (user.calmValue / user.maxCalmValue) * 100;
  const expPercentage = (user.experience / user.nextLevelExp) * 100;

  return (
    <CalmContainer>
      <CalmHeader>
        <CalmTitle>平静值</CalmTitle>
        <CalmValue>{user.calmValue}/{user.maxCalmValue}</CalmValue>
      </CalmHeader>
      
      <CalmBarContainer>
        <CalmBarFill value={user.calmValue} max={user.maxCalmValue}>
          <CalmBarLabel value={user.calmValue} max={user.maxCalmValue}>
            {Math.round(calmPercentage)}%
          </CalmBarLabel>
        </CalmBarFill>
      </CalmBarContainer>
      
      <StatusMessage>{statusMessage}</StatusMessage>
      
      <div>
        <ExperienceBar>
          <ExperienceFill value={user.experience} max={user.nextLevelExp} />
        </ExperienceBar>
        <LevelInfo>
          <span>等级 {user.level}</span>
          <span>{user.experience}/{user.nextLevelExp} 经验</span>
        </LevelInfo>
      </div>
    </CalmContainer>
  );
};

export default CalmValueDisplay;