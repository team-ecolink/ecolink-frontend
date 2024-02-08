import styled from 'styled-components';
import { StarRating, Storetag, Text, Addpic } from '.';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { reviewmodalState, starRate, textRate, tagitem } from '../../recoil';
import { useEffect, useRef } from 'react';

export const ReviewWrite = () => {
  const setModal = useSetRecoilState(reviewmodalState);
  const modalRef = useRef<HTMLDivElement>(null); // 모달 ref 추가
  const star = useRecoilValue(starRate);
  const text = useRecoilValue(textRate);
  const tag = useRecoilValue(tagitem);
  const isConditionMet = star !== 0 && text !== '';
  const closeModal = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeModal);
    return () => {
      document.removeEventListener('mousedown', closeModal);
    };
  }, []);

  return (
    <Background>
      <Modal ref={modalRef}>
        <Xbutton
          src={`${process.env.PUBLIC_URL}/assets/StoreDetail/xbutton.png`}
          onClick={() => {
            setModal(false);
          }}
        />
        <Title>리뷰 작성</Title>
        <Texts $margintopPC={'3.7rem'} $margintopMB={'10.25rem'}>
          별점을 선택해 주세요
        </Texts>
        <StarRating />
        <Texts $margintopPC={'3.2rem'} $margintopMB={'8rem'}>
          태그를 선택해 주세요
        </Texts>
        <Storetag />
        <Texts $margintopPC={'5.6rem'} $margintopMB={'6.5rem'}>
          리뷰를 작성해 주세요
        </Texts>
        <Text />
        <Texts $margintopPC={'3.2rem'} $margintopMB={'8rem'}>
          사진을 추가해 주세요
        </Texts>
        <Addpic />
        <CompleteButton
          disabled={!isConditionMet}
          onClick={() => {
            console.log({ star: star, tag: tag, text: text });
          }}
        >
          작성 완료
        </CompleteButton>
      </Modal>
    </Background>
  );
};
const Background = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 2;
  background: rgba(0, 0, 0, 0.3);
  @media (max-width: 768px) {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
const Modal = styled.div`
  position: fixed;
  display: flex;
  overflow: scroll;
  flex-direction: column;
  background: #fff;
  z-index: 3;
  width: 60.8rem;
  height: 80rem;
  border-radius: 1.6rem;
  padding-bottom: 6rem;
  @media (max-width: 768px) {
    border-radius: 4rem 4rem 0rem 0rem;
    bottom: 0rem;
    width: 100%;
    height: 90%;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Xbutton = styled.img`
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  right: 1.6rem;
  top: 1.6rem;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    width: 3.75rem;
    height: 3.75rem;
    right: 4rem;
    top: 4rem;
  }
`;
const Title = styled.div`
  position: relative;
  margin-top: 6.25rem;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.6rem;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;
const Texts = styled.div<{ $margintopPC: string; $margintopMB: string }>`
  margin-top: ${(props) => props.$margintopPC};
  margin-left: 6.4rem;
  font-size: 1.2rem;
  font-weight: 500;
  @media (max-width: 768px) {
    width: 90%;
    font-size: 3rem;
    margin-top: ${(props) => props.$margintopMB};
  }
`;
const CompleteButton = styled.button`
  width: 32.7rem;
  padding: 1.6rem;
  text-align: center;
  margin-top: 6.1rem;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.2rem;
  font-family: 'Noto Sans KR';
  font-weight: 600;
  border-radius: 0.8rem;
  background-color: #0b5c71;
  color: #fff;
  cursor: pointer;
  &:disabled {
    cursor: auto;
    background-color: #f2f2f2;
    color: #565656;
  }
  @media (max-width: 768px) {
    width: 90%;
    padding: 4rem;
    margin-top: 5.5rem;
    border-radius: 2rem;
    font-size: 3rem;
  }
`;
