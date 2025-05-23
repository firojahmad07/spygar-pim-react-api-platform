import { KeenIcon } from '@/components/keenicons';
import { useContext } from 'react';
import { SidebarContext } from '@/layouts/admin/DashboardLayoutProvider';

import {
  Menu,
  MenuIcon,
  MenuItem,
  MenuLink,
  MenuSub,
  MenuTitle,
  MenuToggle
} from '@/components/menu';
import { useLanguage } from '@/i18n';

interface IDropdownItem {
  title: string;
  path: string;
  icon: string;
  active?: boolean;
}

interface IMenuItem {
  title: string;
  path?: string;
  active?: boolean;
  children?: IMenuItem[];
}

const SidebarMenuDashboard = () => {
  const dropdownItems: IDropdownItem[] = [
    {
      title: 'Client API',
      path: '/account/home/user-profile',
      icon: 'calendar',
      active: true
    },
    {
      title: 'Profile',
      path: '/public-profile/profiles/company',
      icon: 'profile-circle'
    },
    {
      title: 'My Account',
      path: '/account/integrations',
      icon: 'setting-2'
    },
    {
      title: 'Projects',
      path: '/public-profile/projects/3-columns',
      icon: 'questionnaire-tablet'
    },
    {
      title: 'Personal info',
      path: '/public-profile/profiles/creator',
      icon: 'badge'
    }
  ];
  const { isRTL } = useLanguage();

  const contextData = useContext(SidebarContext);
  const sideBarDataAvailable = contextData?.sidebarMenu.length != 0 ? true : false;

  const productFilter = () => {
    return (
    <form className="max-w-sm mx-auto">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Small select</label>
      <select id="small" className="w-full btn btn-light btn-sm justify-between flex-nowrap">
        <option selected>Choose a country</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
      </select>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Default select</label>
      <select id="default" className="w-full btn btn-light btn-sm justify-between flex-nowrap">
        <option selected>Choose a country</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
      </select>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Large select</label>
      <select id="large" className="w-full btn btn-light btn-sm justify-between flex-nowrap">
        <option selected>Choose a country</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
      </select>
    </form>

    )
  }

  const buildMenu = () => {
    return (
      <Menu highlight={true} className="flex-col gap-5">
        {contextData?.sidebarMenu.map((mainItem, index) => {
          return (
            <div className="flex flex-col gap-px" key={index}>
              <MenuItem>
                <div className="px-2.5 text-xs font-medium text-gray-600 mb-1 uppercase">
                  {mainItem.title}
                </div>
              </MenuItem>
              {mainItem.children?.map((item, index) => {
                return (
                  <MenuItem key={index} className={item.active ? 'active' : ''}>
                    <MenuLink
                      path={item.path}
                      className="py-2 px-2.5 rounded-md border border-transparent menu-item-active:border-gray-200 menu-item-active:bg-light menu-link-hover:bg-light menu-link-hover:border-gray-200 "
                    >
                      <MenuIcon>
                        <KeenIcon icon="" />
                      </MenuIcon>
                      <MenuTitle className="text-2sm text-gray-800 menu-item-active:font-medium menu-item-active:text-primary menu-link-hover:text-primary">
                        {item.title}
                      </MenuTitle>
                    </MenuLink>
                  </MenuItem>
                );
              })}
            </div>
          );
        })}
      </Menu>
    );
  };

  return (
    <div className="flex flex-col gap-7.5 px-2">
      { !sideBarDataAvailable ? productFilter() :  buildMenu()}
    </div>
  );
};

export { SidebarMenuDashboard };
