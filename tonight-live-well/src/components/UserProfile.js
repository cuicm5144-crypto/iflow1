// components/UserProfile.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { UserManager } from '../utils/UserManager';

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;
  border: 2px solid #a7c5eb;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h3`
  margin: 0 0 5px 0;
  color: #5a6c94;
  font-size: 16px;
`;

const UserStats = styled.div`
  display: flex;
  gap: 10px;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatValue = styled.span`
  font-weight: bold;
  color: #5a6c94;
`;

const StatLabel = styled.span`
  font-size: 12px;
  color: #8a9bb8;
`;

const CalmBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: #e0e6ed;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 5px;
`;

const CalmBarFill = styled.div`
  height: 100%;
  width: ${(props) => (props.value / props.max) * 100}%;
  background: linear-gradient(90deg, #a7c5eb, #7fb0d3);
  transition: width 0.3s ease;
`;

const userManager = new UserManager();

const UserProfile = () => {
  const [user, setUser] = useState(userManager.currentUser);

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(userManager.loadUser());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <ProfileContainer>
      <Avatar src={user.avatar} alt="用户头像" />
      <UserInfo>
        <UserName>{user.name}</UserName>
        <UserStats>
          <Stat>
            <StatValue>{user.level}</StatValue>
            <StatLabel>等级</StatLabel>
          </Stat>
          <Stat>
            <StatValue>{user.dailyStreak}</StatValue>
            <StatLabel>连续天数</StatLabel>
          </Stat>
          <Stat>
            <StatValue>{user.calmValue}/{user.maxCalmValue}</StatValue>
            <StatLabel>平静值</StatLabel>
          </Stat>
        </UserStats>
        <CalmBarContainer>
          <CalmBarFill value={user.calmValue} max={user.maxCalmValue} />
        </CalmBarContainer>
      </UserInfo>
    </ProfileContainer>
  );
};

export default UserProfile;