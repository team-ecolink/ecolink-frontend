import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MyStoreManagement = ({ id, name }: any) => {
  return (
    <Wrap>
      <Title>{`${name} 관리`}</Title>
      <div>
        <Link to={`/sellingproductmanage/${id}`}>
          <Btn>판매 제품 관리</Btn>
        </Link>
        <Link to={`/eventmanage/${id}`}>
          <Btn>진행중인 이벤트 관리</Btn>
        </Link>
      </div>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 30rem;
  margin-right: 5%;
  @media (max-width: 768px) {
    margin-left: 5%;
    width: 85%;
  }
  > div {
    display: flex;
    flex-direction: column;
    margin: 3rem 0 3rem 0;
    @media (max-width: 768px) {
      flex-direction: row;
    }
  }
`;
const Title = styled.h1`
  margin: 2rem 0 0rem 1rem;
  font-size: 1.4rem;
  padding-top: 2rem;
  @media (max-width: 768px) {
    font-size: 3rem;
    padding: 0;
    margin: 4rem 0 0 2rem;
  }
`;

const Btn = styled.button`
  background-color: #0b5c71;
  border-radius: 8px;
  line-height: 4.8rem;
  height: 4.7rem;
  width: 29.2rem;
  text-align: center;
  color: white;
  font-size: 1.2rem;
  font-weight: bolder;
  margin-bottom: 1.5rem;
  cursor: pointer;
  @media (max-width: 768px) {
    height: 11.75rem;
    line-height: 11.75rem;
    width: 38rem;
    font-size: 3rem;
    margin-right: 4rem;
    margin-left: 5%;
  }
`;
export default MyStoreManagement;
