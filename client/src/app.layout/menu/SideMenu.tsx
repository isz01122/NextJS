import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Menu } from 'antd';
import { useRouter } from 'next/router';
import { menuKeys } from '../module/menuKeys';
import { menuItems } from './menuItems';

const SideMenu = () => {
  const router = useRouter();
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(null);
  const { getInitMenuKeys } = menuKeys();
  const rootSubmenuKeys = menuItems.map(({ key }) => key);

  const handleOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) return setOpenKeys(keys);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  useEffect(() => {
    const { openKeys, selectedKey } = getInitMenuKeys();
    setOpenKeys(openKeys);
    setSelectedKeys(selectedKey);
  }, [router.query]);

  return (
    <StyledWrapper>
      <Menu
        mode="inline"
        items={menuItems}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={handleOpenChange}
      />
    </StyledWrapper>
  );
};

export default SideMenu;

const StyledWrapper = styled.div``;
