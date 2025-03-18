import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { useContext, useEffect, useMemo } from 'react';
import { SidebarContext } from '@/layouts/admin/DashboardLayoutProvider';
import {
    WorkFlowDasbhard
} from '@/pages/workflow/WorkFlowDasbhard';

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
                <Route path='/catalog-monintoring' element={ <WorkFlowDasbhard /> } />
                <Route path='/configuration' element={ <WorkFlowDasbhard /> } />
                {/* user navigation */}
                <Route path='/users' element={ <WorkFlowDasbhard /> } />
                <Route path='/roles' element={ <WorkFlowDasbhard /> } />
                <Route path='/user-groups' element={ <WorkFlowDasbhard /> } />
            </Route>
            <Route index element={<Navigate to='/system/catalog-monintoring' />} />
        </Routes>
    )
}

export {SystemIndex} 
