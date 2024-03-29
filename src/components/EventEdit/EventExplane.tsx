import { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { EventEditState } from '../../recoil';

export const EventExplane = () => {
  const [eventval, setEventval] = useRecoilState(EventEditState);

  let [inputCount, setInputCount] = useState(0);
  const onInputHandler = (e: any) => {
    setInputCount(e.target.value.length);
    setEventval({ ...eventval, text: e.target.value });
  };

  return (
    <ReviewBox>
      <TextBox placeholder="최소 10자 최대 255자 (공백 포함)" onChange={onInputHandler} maxLength={255} />
      <Textcount>{inputCount}/255</Textcount>
    </ReviewBox>
  );
};

const ReviewBox = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  align-items: flex-start;
`;
const TextBox = styled.textarea`
  width: 90%;
  height: 16.5rem;
  padding: 1.6rem;
  margin-top: 1.4rem;
  margin-left: 6rem;
  border-radius: 0.8rem;
  border: 0.5px solid #e0e0e0;
  background: #f2f2f2;
  resize: none;
  font-size: 1rem;
  outline: none;
  &::placeholder {
    color: #848484;
    font-weight: 400;
  }
  @media (max-width: 768px) {
    width: 100%;
    font-size: 2.5rem;
    border-radius: 2rem;
    padding: 4rem;
    border: 0.5px solid #e0e0e0;
    height: 30rem;
    margin-top: 3.5rem;
  }
`;
const Textcount = styled.div`
  width: 90%;
  margin-left: 6rem;
  color: #e0e0e0;
  text-align: right;
  font-size: 0.8rem;
  padding: 0.8rem;
  @media (max-width: 768px) {
    font-size: 2rem;
    padding: 2rem;
    height: 6.5rem;
  }
`;
