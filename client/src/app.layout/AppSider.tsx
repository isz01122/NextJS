import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Button, Layout, Menu, Spin } from 'antd';
import { useRouter } from 'next/router';
import { menuItems } from './menu/menuItems';
import { errorNoti } from 'app.components/errorNoti';

const AppSider = () => {
  const router = useRouter();
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = ({ key }) => {
    router.push(key);
    setKey(key);
  };

  const request = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/user/signout');
      if (res.data.error) throw res.data.error;
      history.pushState('', '', '/');
      return location.reload();
    } catch (err) {
      errorNoti(err.response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    setKey(router.pathname);
  }, [router.query]);

  return (
    <StyledWrapper>
      <Layout.Sider width="250px">
        <div className="side-top">
          <div
            className="title"
            onClick={() => {
              router.push('/');
              setKey('');
            }}
          >
            <h1>Home</h1>
            <img className="logo" />
          </div>

          <Menu
            mode="inline"
            onClick={handleClick}
            selectedKeys={[key]}
            items={menuItems}
          />
        </div>

        <div className="side-bottom">
          <Button onClick={request}>
            <Spin size="small" spinning={loading}>
              로그아웃
            </Spin>
          </Button>
        </div>
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

  .side-top {
    .title {
      width: 100%;
      height: 200px;
      padding: 15px;

      h1 {
        font-size: 24px;
        font-weight: bold;
        margin-top: 10px;
      }

      .logo {
        width: 100px;
        height: 100px;
        background: #eee;
        margin-top: 10px;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }

  .side-bottom {
    padding: 15px;
    height: 100px;
  }
`;
