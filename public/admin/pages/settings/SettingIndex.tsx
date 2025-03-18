import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { useContext, useEffect, useMemo } from 'react';
import { SidebarContext } from '@/layouts/admin/DashboardLayoutProvider';
import {
    WorkFlowDasbhard
} from '@/pages/workflow/WorkFlowDasbhard';

const SettingIndex = () => {
    const context = useContext(SidebarContext)
        const sideBarMenuData = useMemo(
            () => [
                {
                    title: "Catalog settings",
                    children: [
                        { title: "Categories", path: "/settings/categories" },
                        { title: "Channels", path: "/settings/channels" },
                        { title: "Locales", path: "/settings/locales" },
                        { title: "Currencies", path: "/settings/currencies" }
                    ],
                },
                {
                    title: "Product settings",
                    children: [
                        { title: "Attribute groups", path: "/settings/attribute-groups" },
                        { title: "Attributes", path: "/settings/attributes" },
                        { title: "Families", path: "/settings/families" },
                        { title: "Association types", path: "/settings/association-types" },
                        { title: "Group types", path: "/settings/group-types" },
                        { title: "Groups", path: "/settings/groups" }
                    ]
                },
                {
                    title: "Automation",
                    children: [
                        { title: "Rules", path: "/settings/rules" },
                        { title: "Identifier generator", path: "/settings/identifier-generator" }
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
                {/* Catalog settings */}
                <Route path='/categories' element={ <WorkFlowDasbhard /> } />
                <Route path='/channels' element={ <WorkFlowDasbhard /> } />
                <Route path='/locales' element={ <WorkFlowDasbhard /> } />
                <Route path='/currencies' element={ <WorkFlowDasbhard /> } />

                {/* Catalog settings */}
                <Route path='/attribute-groups' element={ <WorkFlowDasbhard /> } />
                <Route path='/attributes' element={ <WorkFlowDasbhard /> } />
                <Route path='/families' element={ <WorkFlowDasbhard /> } />
                <Route path='/association-types' element={ <WorkFlowDasbhard /> } />
                <Route path='/group-types' element={ <WorkFlowDasbhard /> } />
                <Route path='/Groups' element={ <WorkFlowDasbhard /> } />

                {/* Automation */}
                <Route path='/rules' element={ <WorkFlowDasbhard /> } />
                <Route path='/identifier-generator' element={ <WorkFlowDasbhard /> } />
            </Route>
            <Route index element={<Navigate to='/settings/categories' />} />
        </Routes>
    )
}

export {SettingIndex} 
