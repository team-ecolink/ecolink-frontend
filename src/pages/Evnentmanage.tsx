import styled from 'styled-components';
import { EventDetail, Mobiletop, ScrollToTop } from '../components';
import { EventEdit, Item } from '../components/EventEdit';
import { useEffect, useState } from 'react';
import { eventManageModalState, eventDetailModal } from '../recoil';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Cookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import GetEventDetail from '../apis/StoreDetail/EventDetail';
import { EventDetailType } from '../recoil/StoreDetail/types';
import { EventDetailState, EventId } from '../recoil/StoreDetail/StoresState';

export const EventManage = () => {
  const seteventDetail = useSetRecoilState<EventDetailType>(EventDetailState);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [fadeInOut, setFadeInOut] = useState('');
  const [modal, setmodal] = useRecoilState(eventManageModalState);
  const eventId = useRecoilValue(EventId);
  document.body.style.overflow = modal ? 'hidden' : 'unset';
  const eventmodal = useRecoilValue(eventDetailModal);
  document.body.style.overflow = eventmodal ? 'hidden' : 'unset';

  const cookies = new Cookies();

  useEffect(() => {
    if (eventId) getEventdata(eventId);
  }, [eventId]);

  const setCookie = (name: string, value: string, options?: any) => {
    return cookies.set(name, value, { ...options });
  };

  const getCookie = (name: string) => {
    return cookies.get(name);
  };
  const getEventdata = async (id: number) => {
    const data = await GetEventDetail(id);
    seteventDetail(data.data);
  };
  useEffect(() => {
    if (!getCookie('eventmanage_visit')) {
      setShowSideMenu(true);
      setCookie('eventmanage_visit', 'true');
    }
  }, []);
  const showMenuList = () => {
    setFadeInOut('fade-in');
    setShowSideMenu(true);
  };
  const closeMenuList = () => {
    setFadeInOut('fade-out');
    setShowSideMenu(false);
  };
  return (
    <ProductBox>
      <ScrollToTop />
      <Mobiletop pagename="이벤트 관리" />
      <Title>이벤트 관리</Title>
      <Item />
      <ButtonBox>
        {showSideMenu ? <ArrowBubble className={'side-menu ' + fadeInOut}>이벤트 추가</ArrowBubble> : null}
        <Button onClick={() => setmodal(true)} onMouseOver={showMenuList} onMouseLeave={closeMenuList} />
      </ButtonBox>
      {modal == true ? <EventEdit /> : null}
      {eventmodal == true ? <EventDetail /> : null}
    </ProductBox>
  );
};
const ProductBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto 800rem auto;
  width: 92.4rem;
  @media (max-width: 768px) {
    width: 90%;
  }
  .fade-in {
    opacity: 1;
    animation: fadeIn ease-in-out 1s;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
const Title = styled.div`
  width: 92.4rem;
  margin-top: 6.4rem;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  @media (max-width: 768px) {
    display: none;
  }
`;
const ButtonBox = styled.div`
  position: fixed;
  bottom: 6rem;
  width: 92.4rem;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 90%;
    bottom: 20rem;
  }
`;
const ArrowBubble = styled.div`
  padding-top: 1rem;
  color: #0b5c71;
  font-size: 1.2rem;
  text-align: center;
  margin-left: auto;
  margin-right: 0.5rem;
  width: 7rem;
  height: 4.5rem;
  background-image: url('/assets/ProductList/balloon.svg');
  background-size: cover;
  background-repeat: no-repeat;
  bottom: 4rem;
  right: 4rem;
  @media (max-width: 768px) {
    padding-top: 2rem;
    font-size: 2.5rem;
    width: 16rem;
    height: 10rem;
    bottom: 40px;
    right: 40px;
  }
`;

const Button = styled.div`
  background-image: url('/assets/ProductList/plusbutton.svg');
  width: 6.4rem;
  height: 6.4rem;
  margin: 1rem 0.5rem 0 auto;
  @media (max-width: 768px) {
    font-size: 2.5rem;
    width: 16rem;
    height: 16rem;
  }
`;
