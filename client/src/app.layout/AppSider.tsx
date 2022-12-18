import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import { useRouter } from 'next/router';
import API from 'app.modules/api';
import SideMenuUserInfo from './menu/SideMenuUserInfo';
import SideMenu from './menu/SideMenu';
import SideMenuSetting from './menu/SideMenuSetting';

const AppSider = () => {
  const router = useRouter();

  const getSession = async () => {
    const res = await API.GET({ url: '/api/user/session' });
    if (!res.data.result.login) {
      history.pushState('', '', '/');
      return location.reload();
    }
  };

  useEffect(() => {
    getSession();
  }, [router.query]);

  return (
    <StyledWrapper>
      <Layout.Sider width={250}>
        <div>
          <SideMenuUserInfo />
          <SideMenu />
        </div>
        <SideMenuSetting />
      </Layout.Sider>
    </StyledWrapper>
  );
};

export default AppSider;

const StyledWrapper = styled.div`
  .ant-layout-sider {
    height: 100vh;
    position: fixed;
    background: #fff;

    .ant-layout-sider-children {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
`;
