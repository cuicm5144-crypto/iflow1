// components/SmartDeviceList.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SmartDeviceManager } from '../utils/SmartDeviceManager';
import DeviceItem from './DeviceItem';

const DeviceListContainer = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
`;

const DeviceListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const DeviceListTitle = styled.h2`
  margin: 0;
  color: #5a6c94;
  font-size: 18px;
`;

const DeviceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
`;

const smartDeviceManager = new SmartDeviceManager();

const SmartDeviceList = () => {
  const [devices, setDevices] = useState(smartDeviceManager.getAllDevices());

  useEffect(() => {
    setDevices(smartDeviceManager.getAllDevices());
  }, []);

  const handleDeviceConnect = (deviceId) => {
    smartDeviceManager.connectDevice(deviceId);
    setDevices([...smartDeviceManager.getAllDevices()]);
  };

  const handleDeviceDisconnect = (deviceId) => {
    smartDeviceManager.disconnectDevice(deviceId);
    setDevices([...smartDeviceManager.getAllDevices()]);
  };

  return (
    <DeviceListContainer>
      <DeviceListHeader>
        <DeviceListTitle>智能设备</DeviceListTitle>
      </DeviceListHeader>
      
      <DeviceGrid>
        {devices.map(device => (
          <DeviceItem 
            key={device.id} 
            device={device} 
            onConnect={handleDeviceConnect}
            onDisconnect={handleDeviceDisconnect}
          />
        ))}
      </DeviceGrid>
    </DeviceListContainer>
  );
};

export default SmartDeviceList;