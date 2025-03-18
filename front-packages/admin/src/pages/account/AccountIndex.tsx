import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { useContext, useEffect, useMemo } from 'react';
import { SidebarContext } from '@/layouts/admin/DashboardLayoutProvider';
import { AccountLayout } from "./AccountLayout"

import { useLayout } from '@/providers';

import {
    ProfileDefaultContent
} from './profile/ProfileDefaultContent'

const AccountIndex = () => {
    const { currentLayout } = useLayout();

    const context = useContext(SidebarContext)
    const sideBarMenuData = useMemo(
        () => [ ],
        []
    );
    useEffect(() => {
        if (context?.setSidebarMenu) {
            context.setSidebarMenu(sideBarMenuData);
        }
    }, [context]);

    return (
        <Routes>
            <Route element={ <AccountLayout /> }>
                <Route path='/user-profile' element={ <ProfileDefaultContent /> } />
                <Route path='/additional' element={ <ProfileDefaultContent /> } />
                <Route path='/roles' element={ <ProfileDefaultContent /> } />
                <Route path='/password' element={ <ProfileDefaultContent /> } />
            </Route>
            <Route index element={<Navigate to='/account/:id/user-profile' />} />
        </Routes>
    );
};

export { AccountIndex };
