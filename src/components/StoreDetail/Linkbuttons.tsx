import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { useSetRecoilState } from 'recoil';
import { detailModalState } from '../../recoil';

import { useRecoilValue } from 'recoil';
import { StoreState } from '../../recoil';

export const Linkbuttons = () => {
  const storeDetail = useRecoilValue(StoreState);
  const setModal = useSetRecoilState(detailModalState);

  const copyClipboard = async (text: string, successAction?: () => void, failAction?: () => void) => {
    try {
      await navigator.clipboard.writeText(text);
      successAction && successAction();
    } catch (error) {
      failAction && failAction();
    }
  };

  return (
    <PicBox>
      <Button
        href={
          isMobile
            ? `nmap://search?query=${storeDetail.name}&zoom=20&appname=com.example.myapp`
            : storeDetail.naver_map_url
        }
      >
        <ButtonImg src={`${process.env.PUBLIC_URL}/assets/StoreDetail/location.svg`} />
        <ButtonText>위치</ButtonText>
      </Button>
      <Line />
      {isMobile ? (
        <>
          <Button href={`tel:${storeDetail.contact}`}>
            <ButtonImg src={`${process.env.PUBLIC_URL}/assets/StoreDetail/call.svg`} />
            <ButtonText>전화</ButtonText>
          </Button>
        </>
      ) : (
        <>
          <Button
            href="#"
            onClick={() => copyClipboard(storeDetail.contact, () => alert('전화번호가 클립보드에 저장되었습니다.'))}
          >
            <ButtonImg src={`${process.env.PUBLIC_URL}/assets/StoreDetail/call.svg`} />
            <ButtonText>전화</ButtonText>
          </Button>
        </>
      )}
      <Line />
      <Button onClick={() => setModal(true)}>
        <ButtonImg src={`${process.env.PUBLIC_URL}/assets/StoreDetail/storefront.svg`} />
        <ButtonText>매장정보</ButtonText>
      </Button>
    </PicBox>
  );
};

const PicBox = styled.div`
  margin-top: 1.6rem;
  display: flex;
  width: 92.4rem;
  height: 6.3rem;
  padding: 1.6rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid;
  border-color: #f2f2f2;

  @media (max-width: 768px) {
    width: 100%;
    padding: 4rem;
    height: 12.25rem;
  }
`;
const Button = styled.a`
  width: 29.7333rem;
  height: 1.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;
  text-decoration-line: none;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    gap: 4rem;
  }
`;
const ButtonImg = styled.img`
  height: 1.5rem;
  width: 1.5rem;
  @media (max-width: 768px) {
    width: 3rem;
    height: 3.75rem;
  }
`;
const ButtonText = styled.div`
  color: #000;
  height: 1.6rem;
  font-family: 'Noto Sans KR';
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 3rem;
    height: 4rem;
  }
`;
const Line = styled.div`
  height: 1.6rem;
  width: 1px;
  background-color: #848484;
  @media (max-width: 768px) {
    height: 4rem;
  }
`;
