// screens/CommunityScreen.js
import React from 'react';
import styled from 'styled-components';
import CommunityFeed from '../components/CommunityFeed';

const CommunityScreenContainer = styled.div`
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

const CommunityScreen = ({ navigate }) => {
  return (
    <CommunityScreenContainer>
      <ScreenHeader>
        <ScreenTitle>温暖社区</ScreenTitle>
        <BackButton onClick={() => navigate('/')}>返回首页</BackButton>
      </ScreenHeader>
      
      <CommunityFeed />
    </CommunityScreenContainer>
  );
};

export default CommunityScreen;