import React, { useEffect } from 'react';
import { useUserInfo } from 'app.store/intoAPP/store.intoAPP';

const MainPage = () => {
  const getUser = useUserInfo();

  useEffect(() => {
    console.log(getUser);
  }, []);

  return <div>Next JS 프로젝트 초기 세팅</div>;
};

export default MainPage;
