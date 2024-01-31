import styled from 'styled-components';
import { Mobiletop } from '../components';
import { useRecoilValue, useRecoilState } from 'recoil';
import { imgModalState, logoutModalState, withdrawModalState } from '../recoil';
import ProfileImgModal from '../components/Edit/ProfileImgModal';
import ProfileEdit from '../components/Edit/ProfileEdit';
import NickNameEdit from '../components/Edit/NickNameEdit';
import KakaoEmail from '../components/Edit/KakaoEmail';
import EditButton from '../components/Edit/EditButton';
import AccountButton from '../components/Edit/AccountButton';
import AccountModal from '../components/Edit/AccountModal';

export default function AccountSetting() {
  const imgModalOpen = useRecoilValue(imgModalState);
  const [logoutModalOpen, setLogoutModalOpen] = useRecoilState(logoutModalState);
  const [withdrawModalOpen, setWithdrawModalOpen] = useRecoilState(withdrawModalState);

  //로그아웃
  const logoutHandler = () => {
    setLogoutModalOpen(!logoutModalOpen);
  };

  //회원탈퇴
  const withdrawHandler = () => {
    setWithdrawModalOpen(!withdrawModalOpen);
  };

  return (
    <Container>
      {logoutModalOpen && (
        <AccountModal
          title="로그아웃을 진행할까요?"
          confirmText="네, 로그아웃할게요"
          cancelText="아니요"
          confirmHandler={logoutHandler}
          cancelHandler={() => setLogoutModalOpen(!logoutModalOpen)}
        />
      )}
      {withdrawModalOpen && (
        <AccountModal
          title="회원을 탈퇴하실 건가요?"
          confirmText="네, 탈퇴할게요"
          cancelText="조금 더 생각해 볼게요"
          confirmHandler={withdrawHandler}
          cancelHandler={() => setWithdrawModalOpen(!withdrawModalOpen)}
        />
      )}
      {imgModalOpen && <ProfileImgModal />}
      <Mobiletop pagename="계정관리" />
      <h1>계정 관리</h1>
      <ProfileEdit />
      <NickNameEdit />
      <KakaoEmail />
      <EditButton />
      <AccountButton />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > h1 {
    margin-top: 5.6rem;
    color: #181818;
    font-family: 'Noto Sans KR';
    font-size: 16px;
    font-weight: 600;

    @media (max-width: 768px) {
      display: none;
    }
  }
`;