import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Form, Input, Button, Spin } from 'antd';
import { errorNoti } from 'app.components/errorNoti';

const SignForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async ({ id, password }) => {
    try {
      setLoading(true);
      const res = await axios.post('/api/user/signin', { id, password });
      if (res.data.error) throw res.data.error;
      history.pushState('', '', '/');
      return location.reload();
    } catch (err) {
      errorNoti(err.response.data);
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <div className="sign-logo">
        <img src="/images/logo.png" className="logo" />
      </div>

      <Form
        name="form-login"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="id"
          rules={[{ required: true, message: '아이디를 입력해주세요' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item className="submit-item">
          <Spin spinning={loading}>
            <Button type="primary" htmlType="submit">
              LOGIN
            </Button>
          </Spin>
        </Form.Item>
      </Form>
    </StyledWrapper>
  );
};

export default SignForm;

const _height = 60;
const StyledWrapper = styled.div`
  .sign-logo {
    display: block;
    width: 80px;
    margin: 0 auto 30px;
  }

  .ant-row.ant-form-item {
    position: relative;
    margin: 0 0 -1px;
    input {
      height: 100%;
      font-weight: 700;
      font-size: 15px !important;
      &:focus,
      &:hover {
        z-index: 1;
      }
    }

    .ant-form-item-control-input-content {
      height: ${_height}px;
    }
    .ant-input-password {
      height: 58px;
    }

    .ant-form-item-explain {
      position: absolute;
      top: 18px;
      right: 37px;
      z-index: 1;
      &:focus,
      &:hover {
        z-index: 1;
      }
      &:active {
        z-index: -1;
      }
    }
  }

  .submit-item {
    margin: 20px 0 0 !important;
    .ant-btn {
      width: 100%;
      height: ${_height}px;
      border: none;
      background: var(--color-main);
      font-weight: 700;
      font-size: 21px;
      letter-spacing: 1.1px;
      color: #000;
    }
  }
`;
