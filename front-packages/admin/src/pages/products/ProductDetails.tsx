import { Route, Routes, Outlet, Navigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useMemo } from 'react';
import { SidebarContext } from '@/layouts/admin/DashboardLayoutProvider';
import { ProductLayout } from './ProductLayout';
import {
    CategoryContainer
} from '@/pages/settings/block/Category/Index'

import {
    Attributes,
    Assets,
    History,
    Comments
} from './index'

const ProductDetails = () => {
    const {id} = useParams()
    const context = useContext(SidebarContext)
        const sideBarMenuData = useMemo(
            () => [
                {
                    title: "Product Navigation",
                    children: [
                        { title: "Attributes", path: `/product/${id}/attributes` },
                        { title: "Categories", path: `/product/${id}/categories` },
                        { title: "Assets", path: `/product/${id}/assets` },
                        { title: "History", path: `/product/${id}/history` },
                        { title: "Comments", path: `/product/${id}/comments` }
                    ],
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
            <Route element={<ProductLayout />}>
                <Route path='/attributes' element={ <Attributes /> } />
                <Route path='/categories' element={ <CategoryContainer /> } />
                {/* user navigation */}
                <Route path='/assets' element={ <Assets /> } />
                <Route path='/history' element={ <History /> } />
                <Route path='/comments' element={ <Comments /> } />
            </Route>
            <Route index element={<Navigate to={`product/${id}/attributes`} />} />
        </Routes>
    )
}

export {ProductDetails} 
