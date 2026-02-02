// components/Shop.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { MonetizationManager } from '../utils/MonetizationManager';
import ProductItem from './ProductItem';
import SubscriptionItem from './SubscriptionItem';

const ShopContainer = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
`;

const ShopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ShopTitle = styled.h2`
  margin: 0;
  color: #5a6c94;
  font-size: 18px;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e6ed;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  border: none;
  background: ${props => props.active ? 'linear-gradient(135deg, #a7c5eb 0%, #7fb0d3 100%)' : '#e0e6ed'};
  color: ${props => props.active ? 'white' : '#8a9bb8'};
  border-radius: 20px 20px 0 0;
  cursor: pointer;
  font-size: 14px;
  margin-right: 5px;
  
  &:hover {
    opacity: 0.9;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const SubscriptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const monetizationManager = new MonetizationManager();

const Shop = () => {
  const [activeTab, setActiveTab] = useState('products');
  const products = monetizationManager.getAllProducts();
  const subscriptions = monetizationManager.getSubscriptionPlans();

  return (
    <ShopContainer>
      <ShopHeader>
        <ShopTitle>治愈生活好物</ShopTitle>
      </ShopHeader>
      
      <TabContainer>
        <TabButton 
          active={activeTab === 'products'} 
          onClick={() => setActiveTab('products')}
        >
          精选好物
        </TabButton>
        <TabButton 
          active={activeTab === 'subscriptions'} 
          onClick={() => setActiveTab('subscriptions')}
        >
          订阅服务
        </TabButton>
      </TabContainer>
      
      {activeTab === 'products' ? (
        <ProductGrid>
          {products.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </ProductGrid>
      ) : (
        <SubscriptionList>
          {subscriptions.map(plan => (
            <SubscriptionItem key={plan.id} plan={plan} />
          ))}
        </SubscriptionList>
      )}
    </ShopContainer>
  );
};

export default Shop;