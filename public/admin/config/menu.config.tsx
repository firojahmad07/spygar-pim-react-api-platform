import { type TMenuConfig } from '@/components/menu';

export const MENU_ROOT: TMenuConfig = [
  {
    title: 'Activity',
    icon: 'chart-line-star', 
    path: '/', 
    rootPath: '/',
    childrenIndex: 0

  }, {
    title: 'Products',
    icon: 'tablet-text-down',
    path: '/products/',
    rootPath: '/products/',
    childrenIndex: 100
  }, { 
    title: 'Workflow',
    icon: 'data',
    path: '/workflow/dashboard',
    rootPath: 'workflow/',
    childrenIndex: 1

  }, {
    icon: 'book-open',
    title: 'Blogs',
    path: '/blogs/user-guide',
    rootPath: '/blogs/',
    childrenIndex: 2

  }, {
    icon: 'shop',
    title: 'Shop',
    path: '/shop/orders',
    rootPath: '/shop/',
    childrenIndex: 3

  }, { 
    icon: 'setting-2', 
    title: 'Settings', 
    path: '/settings/categories',
    rootPath: 'settings/',
    childrenIndex: 4
  }, { 
    icon: 'setting-3', 
    title: 'System',
    path: '/system/catalog-monintoring', 
    rootPath: 'system/',
    childrenIndex: 1
  }
];




export const MENU_SIDEBAR: TMenuConfig = [
  {
    title: 'Activity Navigation',
    children: [
      {
        title: 'Dashboard',
        path: '/'
      },
      {
        title: 'Proposals',
        path: '/proposals'
      },
      {
        title: 'Proposals',
        path: '/Process tracker'
      }
    ]
  },
  {
    title: 'System Navigation',
    children: [
      {
        title: 'Dashboard',
        path: '/'
      },
      {
        heading: 'User Management'
      },
      {
        title: 'Users',
        path: '/proposals'
      },
      {
        title: 'Roles',
        path: '/Process tracker'
      },
      {
        title: 'Groups',
        path: '/Process tracker'
      }
    ]
  }
];