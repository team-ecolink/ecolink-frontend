import styled from 'styled-components';
import { Category, Addonepic, Name, Price } from '.';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { productRegistModalState } from '../../recoil';
import { ProductAdd, ProductImg } from '../../recoil/Products/Products';
import { useEffect } from 'react';
import { ProductSend } from '../../apis/SellingProduct/Products';

interface Prop {
  id: number;
}

export const ProductRegistration = ({ id }: Prop) => {
  const setModal = useSetRecoilState(productRegistModalState);
  const values = useRecoilValue(ProductAdd);
  const img = useRecoilValue(ProductImg);
  const reset = useResetRecoilState(ProductAdd);
  const imgreset = useResetRecoilState(ProductImg);
  const isConditionMet = values.name !== '' && values.tag_id !== 0;
  const handleEvent = () => {
    if (window.confirm('작성중인 내용이 삭제됩니다.\n그래도 나가시겠습니까?')) {
      setModal(false);
      reset();
      imgreset();
    }
  };
  useEffect(() => {
    const preventGoBack = () => {
      history.pushState(null, '', location.href);
      handleEvent();
    };
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', preventGoBack);
    return () => window.removeEventListener('popstate', preventGoBack);
  }, []);

  const sendReview = async () => {
    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(values)], { type: 'application/json' }));
    for (let i = 0; i < img.length; i++) {
      formData.append('images', img[i]);
    }
    if (await ProductSend(id, formData)) {
      alert('물품이 등록되었습니다.');
      reset();
      imgreset();
      setModal(false);
      window.location.reload();
    }
  };

  return (
    <Background onClick={handleEvent}>
      <Modal onClick={(event) => event.stopPropagation()}>
        <Xbutton src={`${process.env.PUBLIC_URL}/assets/Edit/close.svg`} onClick={handleEvent} />
        <Title>판매 제품 등록</Title>
        <Texts $margintopPC={'3.7rem'} $margintopMB={'10.25rem'}>
          품목명을 작성해 주세요
        </Texts>
        <Name />
        <Texts $margintopPC={'3.2rem'} $margintopMB={'8rem'}>
          카테고리를 선택해 주세요(단일 선택)
        </Texts>
        <Category />
        <Texts $margintopPC={'5.6rem'} $margintopMB={'6.5rem'}>
          가격을 작성해 주세요
        </Texts>
        <Price />
        <Texts $margintopPC={'3.2rem'} $margintopMB={'8rem'}>
          사진을 추가해 주세요
        </Texts>
        <Addonepic />
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
  font-weight: 800;
  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;
const Texts = styled.div<{ $margintopPC: string; $margintopMB: string }>`
  position: relative;
  margin-top: ${(props) => props.$margintopPC};
  color: #000;
  margin-left: 6.4rem;
  font-size: 1.2rem;
  font-weight: 800;
  @media (max-width: 768px) {
    font-size: 3rem;
    margin-top: ${(props) => props.$margintopMB};
    margin-left: 6.5rem;
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
