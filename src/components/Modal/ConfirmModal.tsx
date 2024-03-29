import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { BookMarkModalState, ReviewModalState } from '../../recoil/confirmModal';
import { allowScroll, preventScroll } from './scroll';

type ConfirmModalProps = {
  onRequestClose: any;
  type: string;
};

const ConfirmModal = ({ onRequestClose, type }: ConfirmModalProps) => {
  const [modalOpen, setModalOpen] =
    type === '리뷰' ? useRecoilState(ReviewModalState) : useRecoilState(BookMarkModalState);

  const modalHandler = () => {
    setModalOpen(!modalOpen);
  };
  const isSmallScreen = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  };

  useEffect(() => {
    if (modalOpen) {
      const prevScrollY = preventScroll();
      return () => {
        allowScroll(prevScrollY);
      };
    }
  }, [modalOpen]);
  // 뒤로가기 버튼 누를 시 모달 닫기
  useEffect(() => {
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', () => setModalOpen(false));
    return () => {
      window.removeEventListener('popstate', () => setModalOpen(false));
    };
  }, []);

  return (
    <Modal
      isOpen={modalOpen}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: ' rgba(0, 0, 0, 0.3)',
          width: '100%',
          zIndex: 2,
          boxSizing: 'border-box',
        },
        content: {
          boxSizing: 'border-box',
          justifyContent: 'center',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '16px',
          alignItems: 'center',
          backgroundColor: 'white',
          ...(isSmallScreen()
            ? {
                height: '66rem',
                top: undefined,
                bottom: '0',
                left: '0',
                width: '100vw',
              }
            : {
                height: '23.7rem',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                position: 'relative',
                width: '47.2rem',
              }),
        },
      }}
    >
      <Message>{`${type}`}를 삭제할까요?</Message>
      <Close src={`${process.env.PUBLIC_URL}/assets/Edit/close.svg`} alt="닫기" onClick={modalHandler} />
      <BtnWrap>
        <ConfirmBtn onClick={onRequestClose}>네</ConfirmBtn>
        <ConfirmBtn onClick={modalHandler}>아니오</ConfirmBtn>
      </BtnWrap>
    </Modal>
  );
};

export default ConfirmModal;

const Message = styled.h1`
  font-weight: border;
  font-size: 2rem;
  margin-bottom: 5rem;
  @media (max-width: 768px) {
    margin-bottom: 8rem;
    font-size: 5rem;
  }
`;
const Close = styled.img`
  width: 1.5rem;
  position: absolute;
  top: 2rem;
  right: 2rem;
  cursor: pointer;
`;
const BtnWrap = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    margin: 0;
  }
`;
const ConfirmBtn = styled.button`
  background-color: rgba(242, 242, 242, 1);
  width: 20rem;
  height: 4.7rem;
  font-size: 1.2rem;
  margin: 0 0.5rem 0 0.5rem;
  border: 0;
  border-radius: 8px;
  font-weight: bolder;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 81.75rem;
    height: 11.75rem;
    font-size: 3rem;
    margin-bottom: 3rem;
  }
`;
const Background = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 4;
  background: rgba(0, 0, 0, 0.3);
  @media (max-width: 768px) {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
