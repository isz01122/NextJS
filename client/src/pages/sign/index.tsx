import React from 'react';
import styled from 'styled-components';
import SignForm from 'app.layout/sign/SignForm';

const Page_Sign = () => {
  return (
    <StyledWrapper>
      <div className="login-body">
        <SignForm />
      </div>
    </StyledWrapper>
  );
};

export default Page_Sign;

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-body {
    padding: 70px 50px;
    box-shadow: 1px 1px 6px #f3f3f3;
    text-align: center;
    width: 440px;
    border: 1px solid #eee;
    background: #fff;
  }
`;
