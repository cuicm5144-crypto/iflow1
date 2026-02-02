// components/SubscriptionItem.js
import React from 'react';
import styled from 'styled-components';
import { MonetizationManager } from '../utils/MonetizationManager';

const SubscriptionItemContainer = styled.div`
  background: white;
  border: 2px solid #e0e6ed;
  border-radius: 12px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  
  ${props => props.popular && `
    border-color: #a7c5eb;
    box-shadow: 0 5px 15px rgba(167, 197, 235, 0.3);
    
    &::before {
      content: '推荐';
      position: absolute;
      top: -10px;
      right: -30px;
      background: #a7c5eb;
      color: white;
      padding: 5px 30px;
      transform: rotate(45deg);
      font-size: 12px;
      font-weight: bold;
    }
  `}
`;

const SubscriptionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const SubscriptionName = styled.h3`
  margin: 0;
  color: #5a6c94;
  font-size: 18px;
`;

const SubscriptionPrice = styled.div`
  text-align: right;
`;

const Price = styled.div`
  font-weight: bold;
  color: #ff6b6b;
  font-size: 24px;
`;

const Period = styled.div`
  color: #8a9bb8;
  font-size: 14px;
`;

const SubscriptionDescription = styled.p`
  margin: 0 0 15px 0;
  color: #8a9bb8;
  font-size: 14px;
`;

const FeatureList = styled.ul`
  padding-left: 20px;
  margin: 15px 0;
`;

const FeatureItem = styled.li`
  color: #5a6c94;
  font-size: 14px;
  margin-bottom: 8px;
`;

const SubscribeButton = styled.button`
  background: ${props => props.subscribed ? '#e0e6ed' : 'linear-gradient(135deg, #a7c5eb 0%, #7fb0d3 100%)'};
  color: ${props => props.subscribed ? '#8a9bb8' : 'white'};
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  cursor: ${props => props.subscribed ? 'default' : 'pointer'};
  font-size: 16px;
  width: 100%;
  transition: opacity 0.2s;
  
  &:hover {
    ${props => !props.subscribed && 'opacity: 0.9;'}
  }
`;

const monetizationManager = new MonetizationManager();

const SubscriptionItem = ({ plan }) => {
  const isSubscribed = monetizationManager.isSubscribedTo(plan.id);
  
  const handleSubscribe = () => {
    if (!isSubscribed) {
      const result = monetizationManager.subscribeToPlan(plan.id);
      if (result.success) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    }
  };

  return (
    <SubscriptionItemContainer popular={plan.name === '高级版'}>
      <SubscriptionHeader>
        <SubscriptionName>{plan.name}</SubscriptionName>
        <SubscriptionPrice>
          <Price>¥{plan.price}</Price>
          <Period>/{plan.period === 'month' ? '月' : '年'}</Period>
        </SubscriptionPrice>
      </SubscriptionHeader>
      
      <SubscriptionDescription>{plan.description}</SubscriptionDescription>
      
      <FeatureList>
        {plan.features.map((feature, index) => (
          <FeatureItem key={index}>{feature}</FeatureItem>
        ))}
      </FeatureList>
      
      <SubscribeButton 
        subscribed={isSubscribed} 
        onClick={handleSubscribe}
      >
        {isSubscribed ? '已订阅' : '立即订阅'}
      </SubscribeButton>
    </SubscriptionItemContainer>
  );
};

export default SubscriptionItem;