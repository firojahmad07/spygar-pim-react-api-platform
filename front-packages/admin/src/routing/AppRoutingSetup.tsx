import { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { Demo4Layout } from '@/layouts/admin';

import {
  WorkFlowIndex,
  SystemIndex,
  SettingIndex,
  ActivityIndex,
  ProductIndex,
  ShopIndex,
  BlogIndex,
  ProductDetails
} from '@/pages';


import {
  AccountIndex
} from '@/pages/account/AccountIndex';
// Authentication
import { AuthPage } from '@/auth';
import { RequireAuth } from '@/auth/RequireAuth';
import { ErrorsRouting } from '@/errors';


const AppRoutingSetup = (): ReactElement => {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
      <Route element={<Demo4Layout />}>
        <Route path="/*" element={<ActivityIndex />} />
        <Route path="/workflow/*" element={<WorkFlowIndex />} />
        <Route path="/system/*" element={<SystemIndex />} />
        <Route path="/settings/*" element={<SettingIndex />} />
        <Route path="/products" element={<ProductIndex />} />
        <Route path="/blogs/*" element={<BlogIndex />} />
        <Route path="/shop/*" element={<ShopIndex />} />
        <Route path="/account/:id/*" element={<AccountIndex />} />
        <Route path="/product/:id/*" element={<ProductDetails />} />



      </Route>
      </Route>
      <Route path="error/*" element={<ErrorsRouting />} />
      <Route path="auth/*" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
};

export { AppRoutingSetup };
