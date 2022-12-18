import { menuItems } from 'app.layout/menu/menuItems';

export const menuKeys = () => {
  return {
    getInitMenuKeys: () => {
      let openKeys = [];
      let selectedKey = null;

      const findMenuKeys = (rootMenu) => {
        const pathname = location.pathname;
        const subPath = rootMenu.filter((item) => pathname.includes(item.key));
        if (!subPath.length) return;

        subPath.forEach((item) => {
          if (item.children) {
            openKeys.push(item.key);
            findMenuKeys(item.children);
          }
          if (!item.children && pathname.includes(item.key)) {
            selectedKey = item.key;
            return;
          }
        });
      };

      findMenuKeys(menuItems);
      return { openKeys, selectedKey };
    },
  };
};
