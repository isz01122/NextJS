import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Spin } from 'antd';
import API from 'app.modules/api';
import { errorNoti } from 'app.components/errorNoti';

const SignForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async ({ id, password }) => {
    try {
      setIsLoading(true);
      const res = await API.POST({
        url: '/api/user/signin',
        data: { id, password },
      });
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
      <div className="logo">
        <img src="/images/logo.png" />
      </div>
      <Form className="form-login" onFinish={onFinish}>
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

        <Form.Item className="button-login">
          <Spin spinning={isLoading}>
            <Button type="primary" htmlType="submit" disabled={isLoading}>
              LOGIN
            </Button>
          </Spin>
        </Form.Item>
      </Form>
    </StyledWrapper>
  );
};

export default SignForm;

const _height = 56;
const StyledWrapper = styled.div`
  .logo {
    margin-bottom: 40px;

    img {
      width: 80px;
    }
  }

  .form-login {
    .ant-input {
      padding: 4px 24px;
    }

    #password.ant-input {
      padding: 4px 12px;
    }

    .ant-form-item {
      width: 100%;
      margin-bottom: 16px;
    }

    .ant-row.ant-form-item-row {
      position: relative;
      margin: 0 0 -1px;

      input {
        height: 100%;
        font-weight: 700;
        font-size: 16px !important;
        border-radius: 16px;

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
        border-radius: 16px;

        img {
          width: 24px;

          &:hover {
            cursor: pointer;
          }
        }
      }

      .ant-form-item-explain {
        width: unset;
        position: absolute;
        top: 19px;
        right: 40px;
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

    .button-login {
      margin: 56px 20px 0 0 !important;

      .ant-spin-dot-item {
        background: #ff4141;
      }

      .ant-btn {
        width: 100%;
        height: ${_height}px;
        border: none;
        border-radius: 16px;
        background: var(--color-main);

        span {
          font-size: 18px;
          font-weight: 500;
          line-height: 1.33;
          letter-spacing: 2px;
          text-align: center;
          color: #383838;
          margin-top: 2px;
        }
      }
    }
  }
`;
