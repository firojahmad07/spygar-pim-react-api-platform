import { Route, Routes, Navigate } from 'react-router-dom'
import { useContext, useEffect, useMemo } from 'react';
import { SidebarContext } from '@/layouts/admin/DashboardLayoutProvider';

import {
    WorkFlowDasbhard
} from '@/pages/workflow/WorkFlowDasbhard';

import {
    Dashboard
} from './Index';

const ActivityIndex = () => {
    const context = useContext(SidebarContext)
    const sideBarMenuData = useMemo(
        () => [
            {
                title: "Activity Navigation",
                children: [
                    { title: "Dashboard", path: "/dashboard" },
                    { title: "Proposals", path: "/proposals" }
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
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/proposals' element={<WorkFlowDasbhard />} />
            </Route>
            <Route index element={<Navigate to='/dashboard' />} />
        </Routes>
    )
}

export { ActivityIndex } 
