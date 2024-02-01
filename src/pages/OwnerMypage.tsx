import React from 'react';
import styled from 'styled-components';
import { BookMarkList, ReviewList, PersonalInfo, StoreOwner, MyStoreManagement } from '../components/Mypage';
import { OwnerPersonalInfoDummy } from '../components/Mypage/Dummy/PersonalInfoDummy';
const OwnerMypage = () => {
  return (
    <ContentWrap>
      <PersonalInfo info={OwnerPersonalInfoDummy} />
      <Line />
      <MyStoreManagement />
      <Line mobileVisible />
      <BookMarkList />
      <Line mobileVisible />
      <ReviewList />
      <Line mobileVisible />
      <StoreOwner />
    </ContentWrap>
  );
};

type LineType = {
  mobileVisible?: boolean;
};

const ContentWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
`;
const Line = styled.hr<LineType>`
  width: 80%;
  border: none;
  height: 0.5px;
  background-color: #d9d9d9;
  @media (max-width: 768px) {
    width: 85%;
    display: ${(props) => (props.mobileVisible ? 'flex' : 'none')};
  }
`;

export default OwnerMypage;