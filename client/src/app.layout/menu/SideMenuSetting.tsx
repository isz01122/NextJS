import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Spin } from 'antd';
import API from 'app.modules/api';
import { errorNoti } from 'app.components/errorNoti';

const SideMenuSetting = () => {
  const [isLoading, setIsLoading] = useState(false);

  const request = async () => {
    try {
      setIsLoading(true);
      const res = await API.POST({ url: '/api/user/signout' });
      if (res.data.error) throw res.data.error;
      history.pushState('', '', '/');
      return location.reload();
    } catch (err) {
      errorNoti(err);
      setIsLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <Button onClick={request} disabled={isLoading}>
        <Spin size="small" spinning={isLoading}>
          로그아웃
        </Spin>
      </Button>
    </StyledWrapper>
  );
};

export default SideMenuSetting;

const StyledWrapper = styled.div`
  padding: 15px;
`;
