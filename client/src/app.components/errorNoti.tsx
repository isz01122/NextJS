import { notification } from 'antd';

export const errorNoti = (error) => {
  return notification.error({
    message: `[서버에러]`,
    description: error.message,
  });
};
