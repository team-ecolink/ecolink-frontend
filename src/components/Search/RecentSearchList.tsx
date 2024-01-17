import React, { useState } from 'react';
import styled from 'styled-components';

export const RecentSearchList = () => {
  const [tags, setTags] = useState(['태그1태그1태그1', '태그2', '태그3태그3', '태그4', '태그5태그5태그5']);

  //최근 검색어 모두 지우기
  const AllClear = () => {
    setTags([]);
  };

  //특정 최근 검색어 지우기
  const ItemClear = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  return (
    <ListWrap>
      <SearchHead>
        <h1>최근 검색어</h1>
        <button onClick={AllClear}>모두 지우기</button>
      </SearchHead>
      <TagsWrap>
        {tags.map((item, index) => {
          return (
            <TagItem key={index}>
              <img src="assets/delete.png" alt="삭제" onClick={() => ItemClear(index)} />
              <span>{item}</span>
            </TagItem>
          );
        })}
      </TagsWrap>
    </ListWrap>
  );
};

const ListWrap = styled.div``;

const SearchHead = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 80px;

  @media (max-width: 768px) {
    margin-top: 32px;
  }

  h1 {
    color: #000;
    text-align: center;
    font-size: 14px;
    font-weight: 510;
  }

  button {
    color: #565656;
    font-size: 10px;
    font-weight: 400;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

const TagsWrap = styled.div`
  display: flex;
  margin-top: 20px;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 768px) {
    margin-top: 16px;
  }
`;

const TagItem = styled.div`
  border-radius: 30px;
  background: #f4ece1;
  padding: 5px 8px;
  display: inline-flex;
  align-items: center;

  img {
    width: 9px;
    height: 9px;
    margin-right: 5px;
    cursor: pointer;
  }

  span {
    color: #565656;
    font-size: 10px;
    font-weight: 400;
  }
`;