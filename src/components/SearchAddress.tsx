import { useDaumPostcodePopup } from 'react-daum-postcode';
import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { InputState } from '../recoil';
import { AddressesType } from '../recoil/Owner/ownerTypes';

const SearchAddress = (addresses: AddressesType) => {
  const [inputs, setInputs] = useRecoilState(InputState);
  const { address, detailAddress } = addresses;
  const [isDisabled, setIsDisabled] = useState(true);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputs({
      ...inputs,
      addresses: {
        ...inputs.addresses,
        [id]: value,
      },
    });
  };

  const scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

  const open = useDaumPostcodePopup(scriptUrl);
  const handleComplete = (data: any) => {
    let { address } = data;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      address += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setInputs({
      ...inputs,
      addresses: {
        ...inputs.addresses,
        address: address,
      },
    });
    isDisabled && setIsDisabled(false);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <>
      <AddressBtn onClick={handleClick}>우편번호찾기</AddressBtn>
      <AddressInput id="address" type="text" disabled={isDisabled} onChange={onChange} value={address} />
      <AddressInput
        id="detailAddress"
        type="text"
        placeholder="상세 주소 입력"
        onChange={onChange}
        value={detailAddress}
      />
    </>
  );
};

export default SearchAddress;

const AddressBtn = styled.button`
  background-color: transparent;
  border-radius: 4px;
  line-height: 3.2rem;
  height: 3.2rem;
  width: 16.4rem;
  text-align: center;
  color: rgba(255, 100, 100, 1);
  font-size: 1rem;
  border: 0.1rem solid rgba(255, 100, 100, 1);
  margin-bottom: 1rem;
  cursor: pointer;
`;

const AddressInput = styled.input`
  border: 0.1rem solid rgba(224, 224, 224, 1);
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: ${(props) => (props.disabled ? '#F2F2F2' : 'white')}; // 비활성화 시 회색, 활성화 시 흰색 배경
  &::placeholder {
    color: rgba(224, 224, 224, 1); // placeholder 색상 변경
  }
  &:focus {
    outline: none; // 포커스 시 외곽선 제거
  }
`;
