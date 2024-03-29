import styled from 'styled-components';
import { StarRating, Storetag, Text, Addpic } from '.';
import { useSetRecoilState, useResetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { reviewmodalState } from '../../recoil';
import { ReviewWriteState, ReviewImgState } from '../../recoil/StoreDetail/StoresState';
import ReviewSend from '../../apis/StoreDetail/ReviewSend';
import { useEffect } from 'react';

interface Props {
  id: number;
}

export const ReviewWrite = ({ id }: Props) => {
  const setModal = useSetRecoilState(reviewmodalState);
  const [reviewState, setreviewState] = useRecoilState(ReviewWriteState);
  const reviewImgState = useRecoilValue(ReviewImgState);
  const reset = useResetRecoilState(ReviewWriteState);
  const imgreset = useResetRecoilState(ReviewImgState);
  const isConditionMet = reviewState.score !== 0 && reviewState.text.length >= 10;

  const sendReview = async () => {
    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(reviewState)], { type: 'application/json' }));
    for (let i = 0; i < reviewImgState.length; i++) {
      formData.append('images', reviewImgState[i]);
    }
    if (await ReviewSend(formData)) {
      alert('리뷰가 작성되었습니다.');
      reset();
      imgreset();
      setModal(false);
      window.location.reload();
    }
  };

  const handleEvent = () => {
    if (window.confirm('작성중인 내용이 삭제됩니다.\n그래도 나가시겠습니까?')) {
      setModal(false);
      reset();
      imgreset();
    }
  };

  useEffect(() => {
    setreviewState({ ...reviewState, store_id: id });
    const preventGoBack = () => {
      history.pushState(null, '', location.href);
      handleEvent();
    };
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', preventGoBack);
    return () => window.removeEventListener('popstate', preventGoBack);
  }, []);

  return (
    <Background onClick={handleEvent}>
      <Modal onClick={(event) => event.stopPropagation()}>
        <Xbutton src={`${process.env.PUBLIC_URL}/assets/Edit/close.svg`} onClick={handleEvent} />
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
          사진을 추가해 주세요 (최대 5장)
        </Texts>
        <Addpic />
        <CompleteButton disabled={!isConditionMet} onClick={sendReview}>
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
  z-index: 4;
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
  z-index: 5;
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
