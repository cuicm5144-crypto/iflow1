// screens/DeviceScreen.js
import React from 'react';
import styled from 'styled-components';
import SmartDeviceList from '../components/SmartDeviceList';

const DeviceScreenContainer = styled.div`
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

const DeviceInstruction = styled.div`
  background: #f8fafc;
  border-left: 4px solid #a7c5eb;
  padding: 15px;
  border-radius: 0 8px 8px 0;
  margin-bottom: 20px;
`;

const DeviceScreen = ({ navigate }) => {
  return (
    <DeviceScreenContainer>
      <ScreenHeader>
        <ScreenTitle>智能设备</ScreenTitle>
        <BackButton onClick={() => navigate('/')}>返回首页</BackButton>
      </ScreenHeader>
      
      <DeviceInstruction>
        <p>连接智能设备，实现现实与虚拟同步的疗愈体验。</p>
        <p>完成虚拟任务时，相关智能设备将自动触发，增强仪式感。</p>
      </DeviceInstruction>
      
      <SmartDeviceList />
    </DeviceScreenContainer>
  );
};

export default DeviceScreen;