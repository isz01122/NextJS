import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import AppSider from './AppSider';

const AppLayout = ({ contentsComponent }) => {
  return (
    <StyledWrapper>
      <Layout>
        <AppSider />
        <Layout className="content">
          <Layout.Content>{contentsComponent}</Layout.Content>
          <Layout.Footer style={{ textAlign: 'center' }}>
            copyright ©2022
          </Layout.Footer>
        </Layout>
      </Layout>
    </StyledWrapper>
  );
};

export default AppLayout;

const StyledWrapper = styled.div`
  .ant-layout {
    width: 100%;
    height: 100vh;
  }

  .content {
    margin: 0;
    padding: 40px 50px;
    margin-left: 250px;
  }
`;
