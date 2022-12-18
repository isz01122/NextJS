import Link from 'next/link';
import { UserOutlined } from '@ant-design/icons';

export const menuItems = [
  {
    key: '/dashboard',
    icon: <UserOutlined />,
    label: <Link href="/dashboard">대시보드</Link>,
  },
  {
    key: '/user',
    icon: <UserOutlined />,
    label: <Link href="/user">유저</Link>,
  },
];
