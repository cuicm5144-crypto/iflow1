// screens/ShopScreen.js
import React from 'react';
import styled from 'styled-components';
import Shop from '../components/Shop';

const ShopScreenContainer = styled.div`
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

const ShopInstruction = styled.div`
  background: #fff8e1;
  border-left: 4px solid #ffc107;
  padding: 15px;
  border-radius: 0 8px 8px 0;
  margin-bottom: 20px;
`;

const ShopScreen = ({ navigate }) => {
  return (
    <ShopScreenContainer>
      <ScreenHeader>
        <ScreenTitle>治愈生活好物</ScreenTitle>
        <BackButton onClick={() => navigate('/')}>返回首页</BackButton>
      </ScreenHeader>
      
      <ShopInstruction>
        <p>发现更多治愈系好物，让生活充满仪式感与温暖。</p>
        <p>联名香氛品牌、家居好物推荐、冥想音频订阅等。</p>
      </ShopInstruction>
      
      <Shop />
    </ShopScreenContainer>
  );
};

export default ShopScreen;