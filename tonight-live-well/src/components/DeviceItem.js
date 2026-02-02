// components/DeviceItem.js
import React from 'react';
import styled from 'styled-components';

const DeviceItemContainer = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

const DeviceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const DeviceName = styled.h3`
  margin: 0;
  color: #5a6c94;
  font-size: 16px;
`;

const DeviceStatus = styled.span`
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 12px;
  background: ${props => props.connected ? '#e8f5e9' : '#ffebee'};
  color: ${props => props.connected ? '#4caf50' : '#f44336'};
`;

const DeviceBrand = styled.div`
  color: #8a9bb8;
  font-size: 14px;
  margin-bottom: 10px;
`;

const DeviceFeatures = styled.div`
  margin: 10px 0;
`;

const FeatureList = styled.ul`
  padding-left: 15px;
  margin: 0;
`;

const FeatureItem = styled.li`
  color: #8a9bb8;
  font-size: 13px;
  margin-bottom: 5px;
`;

const ConnectButton = styled.button`
  background: ${props => props.connected ? '#ff6b6b' : 'linear-gradient(135deg, #a7c5eb 0%, #7fb0d3 100%)'};
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
`;

const DeviceItem = ({ device, onConnect, onDisconnect }) => {
  const handleConnectToggle = () => {
    if (device.connected) {
      onDisconnect(device.id);
    } else {
      onConnect(device.id);
    }
  };

  return (
    <DeviceItemContainer>
      <DeviceHeader>
        <DeviceName>{device.name}</DeviceName>
        <DeviceStatus connected={device.connected}>
          {device.connected ? '已连接' : '未连接'}
        </DeviceStatus>
      </DeviceHeader>
      
      <DeviceBrand>品牌: {device.brand}</DeviceBrand>
      
      <DeviceFeatures>
        <FeatureList>
          {device.features.map((feature, index) => (
            <FeatureItem key={index}>{feature}</FeatureItem>
          ))}
        </FeatureList>
      </DeviceFeatures>
      
      <ConnectButton 
        connected={device.connected} 
        onClick={handleConnectToggle}
      >
        {device.connected ? '断开连接' : '连接设备'}
      </ConnectButton>
    </DeviceItemContainer>
  );
};

export default DeviceItem;