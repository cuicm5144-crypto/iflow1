// components/ProductItem.js
import React from 'react';
import styled from 'styled-components';
import { MonetizationManager } from '../utils/MonetizationManager';

const ProductItemContainer = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.div`
  height: 150px;
  background: linear-gradient(135deg, #a7c5eb 0%, #7fb0d3 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
`;

const ProductInfo = styled.div`
  padding: 15px;
`;

const ProductName = styled.h3`
  margin: 0 0 8px 0;
  color: #5a6c94;
  font-size: 16px;
`;

const ProductDescription = styled.p`
  margin: 0 0 10px 0;
  color: #8a9bb8;
  font-size: 13px;
  line-height: 1.4;
`;

const ProductFeatures = styled.div`
  margin: 10px 0;
`;

const FeatureTag = styled.span`
  display: inline-block;
  background: #e3eef7;
  color: #7fb0d3;
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 11px;
  margin-right: 5px;
  margin-bottom: 5px;
`;

const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const ProductPrice = styled.div`
  display: flex;
  flex-direction: column;
`;

const CurrentPrice = styled.span`
  font-weight: bold;
  color: #ff6b6b;
  font-size: 16px;
`;

const OriginalPrice = styled.span`
  font-size: 12px;
  color: #a7b5d1;
  text-decoration: line-through;
`;

const RatingInfo = styled.div`
  text-align: right;
`;

const Rating = styled.div`
  color: #ffb300;
  font-size: 14px;
  margin-bottom: 3px;
`;

const SoldInfo = styled.div`
  font-size: 11px;
  color: #8a9bb8;
`;

const PurchaseButton = styled.button`
  background: linear-gradient(135deg, #a7c5eb 0%, #7fb0d3 100%);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  margin-top: 10px;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
`;

const monetizationManager = new MonetizationManager();

const ProductItem = ({ product }) => {
  const handlePurchase = () => {
    const result = monetizationManager.purchaseProduct(product.id);
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  return (
    <ProductItemContainer>
      <ProductImage>
        🧘‍♀️ {/* Placeholder for product image */}
      </ProductImage>
      
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductDescription>{product.description}</ProductDescription>
        
        <ProductFeatures>
          {product.features.map((feature, index) => (
            <FeatureTag key={index}>{feature}</FeatureTag>
          ))}
        </ProductFeatures>
        
        <ProductFooter>
          <ProductPrice>
            <CurrentPrice>¥{product.price}</CurrentPrice>
            <OriginalPrice>¥{product.originalPrice}</OriginalPrice>
          </ProductPrice>
          
          <RatingInfo>
            <Rating>⭐{product.rating}</Rating>
            <SoldInfo>已售{product.sold}</SoldInfo>
          </RatingInfo>
        </ProductFooter>
        
        <PurchaseButton onClick={handlePurchase}>
          立即购买
        </PurchaseButton>
      </ProductInfo>
    </ProductItemContainer>
  );
};

export default ProductItem;