import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const Error = () => {
  const router = useRouter();
  const errorMsg = <>페이지를 찾을 수 없습니다.</>;

  return (
    <StyledWrapper>
      <div className="container">
        <div className="errorMsg">{errorMsg}</div>
        <Button danger size="large" onClick={() => router.replace('/')}>
          <ArrowLeftOutlined />
          돌아가기
        </Button>
      </div>
    </StyledWrapper>
  );
};

export default Error;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .container {
    text-align: center;

    .errorMsg {
      color: #aaa;
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
`;
