import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { StoreReviewtype } from '../../recoil/StoreDetail/types';
import { UserInfoState } from '../../recoil';
import { useRecoilValue } from 'recoil';
import { Like, LikeDel } from '../../apis/StoreDetail/Like';

export const Review = ({
  id,
  text,
  created_date,
  score,
  like_cnt,
  writer,
  photos,
  tags,
  liked,
  isWriter,
}: StoreReviewtype) => {
  const [likeon, setlike] = useState(false);
  const [likecnt, setlikecnt] = useState(0);
  const islogin = useRecoilValue(UserInfoState);

  useEffect(() => {
    setlike(liked);
    setlikecnt(like_cnt);
  }, [like_cnt, liked]);

  const increaseLike = async () => {
    await Like({ review_id: id });
    setlike(true);
    setlikecnt(likecnt + 1);
  };

  const decreaseLike = async () => {
    await LikeDel({ review_id: id });
    setlike(false);
    setlikecnt(likecnt - 1);
  };
  const onclickLike = async () => {
    if (islogin.islogin) {
      likeon ? decreaseLike() : increaseLike();
    } else {
      alert('로그인 후 이용해주세요');
    }
  };
  return (
    <Box>
      <ReviewTop>
        <Profile>
          <ProfileImg src={writer.photo.url} />
          <ProfileBox>
            <Nickname>{writer.nickname}</Nickname>
            <DateText>
              {created_date.slice(0, 10)} {created_date.slice(11, 16)}
            </DateText>
            <Stars>
              {[...Array(5)].map((_, index) => (
                <Rate
                  key={index}
                  src={
                    index < score
                      ? `${process.env.PUBLIC_URL}/assets/StoreDetail/star_full.svg`
                      : `${process.env.PUBLIC_URL}/assets/StoreDetail/star_empty.svg`
                  }
                  alt={`Star ${index}`}
                />
              ))}
            </Stars>
          </ProfileBox>
        </Profile>
        <LikeBox>
          <LikeImg
            onClick={onclickLike}
            src={
              likeon
                ? `${process.env.PUBLIC_URL}/assets/StoreDetail/like.svg`
                : `${process.env.PUBLIC_URL}/assets/StoreDetail/not_like.svg`
            }
          />
          <LikeNum>{likecnt}</LikeNum>
        </LikeBox>
      </ReviewTop>
      <ReviewBottom>
        <ReviewImgBox>
          {photos.map((item, index) => (
            <ReviewImg src={item.url} alt={`${index}`} key={index} />
          ))}
        </ReviewImgBox>
        <ReviewTagBox>
          {tags.map((item, index) => (
            <ReviewTag key={index}># {item.name}</ReviewTag>
          ))}
        </ReviewTagBox>
        <ReviewText>{text}</ReviewText>
      </ReviewBottom>
    </Box>
  );
};

const Box = styled.div`
  width: 92.4rem;
  display: flex;
  flex-direction: column;
  border-top: 0.5px solid #f2f2f2;
  border-bottom: 0.5px solid #f2f2f2;
  @media (max-width: 768px) {
    width: 100%;
  }
  &:hover {
    background-color: #00000010;
  }
`;
const ReviewTop = styled.div`
  display: flex;
  padding: 1.6rem 1.6rem 0rem 1.6rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  @media (max-width: 768px) {
    padding: 4rem 4rem 0rem 4rem;
  }
`;
const Profile = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.6rem;
  @media (max-width: 768px) {
    gap: 4rem;
  }
`;
const ProfileImg = styled.img`
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 100%;
  @media (max-width: 768px) {
    width: 12rem;
    height: 12rem;
  }
`;
const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const Nickname = styled.div`
  height: 1.7rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  height: 2rem;
  @media (max-width: 768px) {
    height: 5.5rem;
    font-size: 3.5rem;
    font-weight: 600;
  }
`;

const DateText = styled.div`
  color: #e0e0e0;
  font-size: 1.2rem;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Stars = styled.div`
  display: flex;
`;

const Rate = styled.img`
  width: 1.2rem;
  height: 1.2rem;
  @media (max-width: 768px) {
    width: 3rem;
    height: 3rem;
    margin: 0.2rem;
  }
`;
const LikeBox = styled.div`
  display: flex;
  padding: 0.8rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  @media (max-width: 768px) {
    padding: 2rem;
    gap: 1.25rem;
  }
`;

const LikeImg = styled.img`
  width: 1.6rem;
  height: 1.5rem;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    width: 4rem;
    height: 3.75rem;
  }
`;

const LikeNum = styled.div`
  color: #565656;
  font-family: 'Noto Sans KR';
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const ReviewBottom = styled.div`
  display: flex;
  padding: 1.6rem 1.6rem 1.6rem 8rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
  @media (max-width: 768px) {
    padding: 4rem 4rem 4rem 20rem;
    gap: 2rem;
  }
`;

const ReviewImgBox = styled.div`
  display: flex;
  gap: 0.2rem;
  width: 100%;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    gap: 0.5rem;
    flex-wrap: nowrap;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const ReviewImg = styled.img`
  width: 8.9rem;
  height: 8.9rem;
  @media (max-width: 768px) {
    width: 22.25rem;
    height: 22.25rem;
  }
`;
const ReviewTagBox = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;
const ReviewTag = styled.div`
  margin-top: 0.5rem;
  height: 2.2rem;
  padding: 0.4rem 0.8rem;
  color: #fff;
  text-align: center;
  font-family: 'Noto Sans KR';
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  border-radius: 1.6rem;
  background: #74b69d;
  line-height: normal;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    border-radius: 4rem;
    font-size: 2.5rem;
    padding: 1rem 2rem;
    height: 5.5rem;
  }
`;

const ReviewText = styled.div`
  width: 81.3rem;
  color: #565656;
  font-family: 'Noto Sans KR';
  font-size: 1rem;
  font-weight: 400;
  line-height: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-line;
  @media (max-width: 768px) {
    font-size: 2.5rem;
    width: 100%;
  }
`;
