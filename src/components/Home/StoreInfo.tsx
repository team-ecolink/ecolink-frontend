import React from 'react';
import styled from 'styled-components';
import { StoreInfoDummyType } from './Dummy/StoreDummy';

const StoreInfo = ({ info }: { info: StoreInfoDummyType }) => {
  return (
    <Container>
      <ImgWrap>
        <img src={info.img} alt={info.name} />
        <Promotation>{info.promotion}</Promotation>
        <Arrow>
          <img src={`${process.env.PUBLIC_URL}/assets/Home/arrow.svg`} alt={'화살표'} />
        </Arrow>
      </ImgWrap>

      <Info>
        <h1>{info.name}</h1>
        <div>
          <Star src={`${process.env.PUBLIC_URL}/assets/Home/star.svg`} alt={'스타'} />
          <Score>{info.reviewScore}</Score>
          <Count>{`(${info.reviewCount})`}</Count>
        </div>
        <Address>{info.address}</Address>
      </Info>
    </Container>
  );
};

export default StoreInfo;
const Container = styled.div`
  width: 80%;
  height: 72.3rem;
`;

const ImgWrap = styled.div`
  position: relative;
  img {
    height: 56rem;
    width: 100%;
    @media (max-width: 768px) {
      /* width: 100%;
      height: 93.75rem; */
    }
  }
  /* 이미지 위에 그라데이션 추가 */
  &::after {
    content: '';
    position: absolute;
    top: 49rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
    z-index: 1;
  }
`;

const Promotation = styled.p`
  color: #fff;
  font-weight: 600;
  position: absolute;
  bottom: 3.6rem;
  font-size: 1.8rem;
  left: 2.4rem;
`;
const Arrow = styled.div`
  > img {
    height: 3rem;
    width: 2rem;
  }

  position: absolute;
  bottom: 3.6rem;
  right: 2.4rem;
`;
const Info = styled.div`
  width: 100%;
  height: 12.7rem;
  padding: 2.4rem;
  display: flex;
  flex-direction: column;

  > h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  > div {
    align-items: center;
    display: flex;
    flex-direction: row;
    margin-bottom: 1.5rem;
  }
`;

const Star = styled.img`
  width: 2rem;
  height: 2rem;
`;

const Score = styled.p`
  font-size: 1.4rem;
  color: #ff6464;
  margin: 0.5rem 1rem 0 1rem;
`;
const Count = styled.p`
  font-size: 1.4rem;
  color: #e0e0e0;
  margin-top: 0.5rem;
`;

const Address = styled.p`
  font-size: 1.2rem;
  color: #565656;
`;
