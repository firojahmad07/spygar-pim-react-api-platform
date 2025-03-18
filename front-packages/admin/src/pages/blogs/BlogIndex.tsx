import { Route, Routes, Navigate } from 'react-router-dom'
import { useContext, useEffect, useMemo } from 'react';
import { SidebarContext } from '@/layouts/admin/DashboardLayoutProvider';

import {
    WorkFlowDasbhard
} from '@/pages/workflow/WorkFlowDasbhard';

const BlogIndex = () => {
    const context = useContext(SidebarContext)
        const sideBarMenuData = useMemo(
            () => [
                {
                    title: "Blogs Navigation",
                    children: [
                        { title: "User Guide", path: "/blogs/user-guide" },
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
                <Route path='/user-guide' element={ <WorkFlowDasbhard /> } />
            </Route>
            <Route index element={<Navigate to='/blogs/user-guide' />} />
        </Routes>
    )
}

export {BlogIndex} 
