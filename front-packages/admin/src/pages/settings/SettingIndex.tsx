import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { useContext, useEffect, useMemo } from 'react';
import { SidebarContext } from '@/layouts/admin/DashboardLayoutProvider';
import {
    ChannelContainer,
    LocaleContainer,
    CurrencyContainer,
    CategoryContainer
} from './index';

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
                <Route path='/categories' element={ <CategoryContainer /> } />
                <Route path='/channels' element={ <ChannelContainer /> } />
                <Route path='/locales' element={ <LocaleContainer /> } />
                <Route path='/currencies' element={ <CurrencyContainer /> } />

                {/* Catalog settings */}
                <Route path='/attribute-groups' element={ <ChannelContainer /> } />
                <Route path='/attributes' element={ <ChannelContainer /> } />
                <Route path='/families' element={ <ChannelContainer /> } />
                <Route path='/association-types' element={ <ChannelContainer /> } />
                <Route path='/group-types' element={ <ChannelContainer /> } />
                <Route path='/Groups' element={ <ChannelContainer /> } />

                {/* Automation */}
                <Route path='/rules' element={ <ChannelContainer /> } />
                <Route path='/identifier-generator' element={ <ChannelContainer /> } />
            </Route>
            <Route index element={<Navigate to='/settings/categories' />} />
        </Routes>
    )
}

export {SettingIndex} 
