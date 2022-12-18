import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const SideMenuUserInfo = () => {
  return (
    <StyledWrapper>
      <Link href="/" className="title">
        <h1>Home</h1>
        <img />
      </Link>
    </StyledWrapper>
  );
};

export default SideMenuUserInfo;

const StyledWrapper = styled.div`
  display: flex;
  padding: 15px;

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-top: 10px;
    color: #000;
  }

  img {
    width: 100px;
    height: 100px;
    background: #eee;
    margin-top: 10px;
  }
`;
