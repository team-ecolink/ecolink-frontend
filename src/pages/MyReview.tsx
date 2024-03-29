import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { popUpModalState } from '../recoil';
import AccountModal from '../components/Edit/AccountModal';
import { Mobiletop } from '../components';
import { deleteSingleReviewApi, getReviewsApi } from '../apis/ReviewApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type TReviewList = {
  id: number;
  text: string;
  createdDate: string;
  score: number;
  likeCnt: number;
  store: {
    id: number;
    name: string;
    address: {
      province: string;
      city: string;
      road_name: string;
      lot_number: string;
    };
  };
  photo: {
    url: string;
    width: number;
    height: number;
  };
  liked: boolean;
  writer: boolean;
  isWriter: boolean;
};

export default function MyReview() {
  const [modalOpen, setModalOpen] = useRecoilState(popUpModalState);
  const [reviews, setReviews] = useState<TReviewList[]>();
  const [toDelete, setToDelete] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    reviewList();
  }, []);

  const reviewList = async () => {
    const data = await getReviewsApi();
    console.log(data);
    setReviews(data.data);
  };

  const modalHandler = () => {
    setModalOpen(false);
    setToDelete(null);
  };

  const deleteModalOpen = (reviewId: number) => {
    setToDelete(reviewId);
    setModalOpen(true);
  };

  //리뷰 삭제
  const deleteReviewHandler = async () => {
    if (reviews && toDelete !== null) {
      const data = await deleteSingleReviewApi({ review_id: toDelete });
      if (data.message === 'OK') {
        const newTags = reviews.filter((item) => item.id !== toDelete);
        setReviews(newTags);
      }
    }
    setModalOpen(!modalOpen);
  };

  //날짜 형식 수정
  const formatDate = (dateString: string): string => {
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const date = String(dateObject.getDate()).padStart(2, '0');

    return `${year}.${month}.${date}`;
  };

  return (
    <Container $nonescroll={modalOpen}>
      <Mobiletop pagename="내가 쓴 리뷰" />
      {modalOpen && (
        <AccountModal
          title="리뷰를 삭제할까요?"
          confirmText="네"
          cancelText="아니요"
          confirmHandler={deleteReviewHandler}
          cancelHandler={modalHandler}
        />
      )}
      <h1>내가 쓴 리뷰</h1>
      {reviews && reviews.length > 0 ? (
        <Reviews>
          {reviews.map((item) => (
            <Review key={item.id} onClick={() => navigate(`/store/${item.store.id}`)}>
              {item.photo && item.photo.url ? (
                <StoreImg src={item.photo.url} alt={item.store.name} />
              ) : (
                <NoneImg></NoneImg>
              )}
              <Heart>
                <img
                  src={
                    item.liked
                      ? `${process.env.PUBLIC_URL}/assets/StoreDetail/like.svg`
                      : `${process.env.PUBLIC_URL}/assets/StoreDetail/not_like.svg`
                  }
                  alt="heart"
                />
                <p>{item.likeCnt}</p>
              </Heart>
              <DataWrap>
                <Contents>
                  <h3>{item.store.name}</h3>
                  <p>{item.text}</p>
                </Contents>
                <RightWrap>
                  <ReviewDate>{formatDate(item.createdDate)}</ReviewDate>
                  <TrashWrap
                    onClick={(event) => {
                      event.stopPropagation();
                      deleteModalOpen(item.id);
                    }}
                  >
                    <TrashIcon src={`${process.env.PUBLIC_URL}/assets/ReviewList/trash.svg`} alt="trash" />
                    <TrashText>삭제</TrashText>
                  </TrashWrap>
                </RightWrap>
              </DataWrap>
            </Review>
          ))}
        </Reviews>
      ) : (
        <NoReview>* 작성한 리뷰가 없습니다</NoReview>
      )}
    </Container>
  );
}

const Container = styled.div<{ $nonescroll: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: ${(props) => (props.$nonescroll ? 'hidden' : 'auto')};
  position: ${(props) => (props.$nonescroll ? 'fixed' : 'static')};
  z-index: ${(props) => (props.$nonescroll ? 2 : 0)};
  left: 0;
  right: 0;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  > h1 {
    margin-top: 6.4rem;
    color: #000000;
    font-family: 'Noto Sans KR';
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 40px;
    width: 92.4rem;

    @media (max-width: 1000px) {
      width: 72rem;
    }

    @media (max-width: 768px) {
      display: none;
    }
  }
`;
const NoReview = styled.p`
  width: 92.4rem;
  margin-top: 3rem;
  font-size: 1.4rem;
  @media (max-width: 768px) {
    margin-top: 8rem;
    font-size: 4rem;
  }
`;
const Reviews = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 20rem;
  @media (max-width: 768px) {
    margin-top: 24px;
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const Review = styled.div`
  width: 45rem;
  height: 10rem;
  border: 1px solid #f2f2f2;
  border-radius: 8px;
  flex-shrink: 0;
  position: relative;
  display: flex;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  @media (max-width: 1000px) {
    width: 35rem;
  }
  @media (max-width: 768px) {
    width: 81.25rem;
    height: 16rem;
  }
`;

const StoreImg = styled.img`
  min-width: 10rem;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  @media (max-width: 768px) {
    min-width: 16rem;
  }
`;

const NoneImg = styled.div`
  min-width: 10rem;
  height: 100%;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: #d9d9d9;

  @media (max-width: 768px) {
    min-width: 16rem;
  }
`;

const Heart = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 7.5rem;
  bottom: 0.5rem;

  @media (max-width: 768px) {
    left: 12rem;
  }

  > img {
    width: 16px;
    height: 14px;

    @media (max-width: 768px) {
      width: 11px;
      height: 10px;
    }
  }

  > p {
    font-weight: 400;
    font-size: 8px;
    line-height: 11px;
  }
`;

const DataWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  width: 100%;
`;

const Contents = styled.div`
  overflow: hidden;

  > h3 {
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    white-space: nowrap;
    max-width: 180px;

    @media (max-width: 768px) {
      font-size: 10px;
    }
  }

  > p {
    font-size: 10px;
    line-height: 15px;
    margin-top: 5px;
    margin-right: 5px;
    color: #565656;

    @media (max-width: 768px) {
      font-size: 8px;
      line-height: 11px;
      margin-top: 4px;
    }
  }
`;

const RightWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

const ReviewDate = styled.p`
  font-size: 10px;
  color: #d9d9d9;

  @media (max-width: 768px) {
    font-size: 8px;
  }
`;

const TrashText = styled.p`
  position: absolute;
  visibility: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 2.7rem;
  color: #565656;

  @media (max-width: 768px) {
    font-size: 8px;
    width: 6.25rem;
  }
`;

const TrashWrap = styled.div`
  position: relative;
  width: 2.7rem;
  height: 2.7rem;
  margin: -8px;

  &:hover ${TrashText} {
    visibility: visible;
  }

  @media (max-width: 768px) {
    font-size: 8px;
    width: 6.25rem;
    height: 6.25rem;
  }
`;

const TrashIcon = styled.img`
  width: 100%;
  height: 100%;
`;
