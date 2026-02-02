// screens/MainScreen.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserProfile from '../components/UserProfile';
import CalmValueDisplay from '../components/CalmValueDisplay';
import DailyMoment from '../components/DailyMoment';
import { UserManager } from '../utils/UserManager';
import { CalmValueManager } from '../utils/CalmValueManager';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
`;

const WelcomeMessage = styled.h1`
  color: #5a6c94;
  text-align: center;
  margin: 10px 0 20px 0;
  font-size: 24px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  flex: 1;
  overflow-y: auto;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const NavigateButton = styled.button`
  flex: 1;
  background: linear-gradient(135deg, #a7c5eb 0%, #7fb0d3 100%);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const userManager = new UserManager();
const calmValueManager = new CalmValueManager();

const MainScreen = ({ navigate }) => {
  const [user, setUser] = useState(userManager.currentUser);
  const [calmStatus, setCalmStatus] = useState({ status: '', message: '' });

  useEffect(() => {
    // 更新用户连续登录天数
    const updatedUser = userManager.updateStreak();
    setUser(updatedUser);
    
    // 获取平静值状态
    const status = calmValueManager.checkCalmStatus(updatedUser);
    setCalmStatus(status);
    
    const handleStorageChange = () => {
      setUser(userManager.loadUser());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <MainContainer>
      <WelcomeMessage>今晚好好过 🌙</WelcomeMessage>
      
      <GridContainer>
        <LeftColumn>
          <UserProfile />
          <CalmValueDisplay user={user} statusMessage={calmStatus.message} />
          <DailyMoment />
        </LeftColumn>
        
        <RightColumn>
          <ButtonGroup>
            <NavigateButton onClick={() => navigate('/tasks')}>
              开始任务
            </NavigateButton>
            <NavigateButton onClick={() => navigate('/community')}>
              温暖社区
            </NavigateButton>
          </ButtonGroup>
          
          <ButtonGroup>
            <NavigateButton onClick={() => navigate('/devices')}>
              智能设备
            </NavigateButton>
            <NavigateButton onClick={() => navigate('/shop')}>
              治愈好物
            </NavigateButton>
          </ButtonGroup>
        </RightColumn>
      </GridContainer>
    </MainContainer>
  );
};

export default MainScreen;