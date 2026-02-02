import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainScreen from './screens/MainScreen';
import TaskScreen from './screens/TaskScreen';
import CommunityScreen from './screens/CommunityScreen';
import DeviceScreen from './screens/DeviceScreen';
import ShopScreen from './screens/ShopScreen';
import styled from 'styled-components';

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const App = () => {
  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/tasks" element={<TaskScreen />} />
        <Route path="/community" element={<CommunityScreen />} />
        <Route path="/devices" element={<DeviceScreen />} />
        <Route path="/shop" element={<ShopScreen />} />
      </Routes>
    </AppContainer>
  );
};

export default App;