import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { useContext, useEffect, useMemo } from 'react';
import { SidebarContext } from '@/layouts/admin/DashboardLayoutProvider';

import {
    WorkFlowDasbhard
} from '@/pages/workflow/WorkFlowDasbhard';

const WorkFlowIndex = () => {
    const context = useContext(SidebarContext)
    const sideBarMenuData = useMemo(
        () => [
            {
                title: "Workflow Navigation",
                children: [
                    { title: "Dashboard", path: "/workflow/dashboard" },
                    { title: "Settings", path: "/workflow/settings" },
                ],
            },
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
                <Route path='/dashboard' element={ <WorkFlowDasbhard /> } />
                <Route path='/settings' element={ <WorkFlowDasbhard /> } />
            </Route>
            <Route index element={<Navigate to='/workflow/dashboard' />} />
        </Routes>
    )
}

export {WorkFlowIndex} 
