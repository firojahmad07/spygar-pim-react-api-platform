import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { useContext, useEffect, useMemo } from 'react';
import { SidebarContext } from '@/layouts/admin/DashboardLayoutProvider';
import {
    UserContainer,
    RoleContainer,
    CatalogMonitoring,
    SystemConfiguration
} from './index';

const SystemIndex = () => {
    const context = useContext(SidebarContext)
        const sideBarMenuData = useMemo(
            () => [
                {
                    title: "System Navigation",
                    children: [
                        { title: "Catalog Moinitoring", path: "/system/catalog-monintoring" },
                        { title: "Configuration", path: "/system/configuration" }
                    ],
                },
                {
                    title: "Users Management",
                    children: [
                        { title: "Users", path: "/system/users" },
                        { title: "Roles", path: "/system/roles" },
                        { title: "User groups", path: "/system/user-groups" }
                    ]
                }
            ],
            []
        );
        useEffect(() => {
            if (context?.setSidebarMenu) {
                context.setSidebarMenu(sideBarMenuData);
            }
        }, [context]);
    return (
        <Routes>
            <Route>
                <Route path='/catalog-monintoring' element={ <CatalogMonitoring /> } />
                <Route path='/configuration' element={ <SystemConfiguration /> } />
                {/* user navigation */}
                <Route path='/users' element={ <UserContainer /> } />
                <Route path='/roles' element={ <RoleContainer /> } />
                <Route path='/user-groups' element={ <UserContainer /> } />
            </Route>
            <Route index element={<Navigate to='/system/catalog-monintoring' />} />
        </Routes>
    )
}

export {SystemIndex} 
