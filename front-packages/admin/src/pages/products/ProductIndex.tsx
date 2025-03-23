import { Fragment, useContext, useEffect, useMemo } from 'react';
import { Container } from '@/components/container';
import { SidebarContext } from '@/layouts/admin/DashboardLayoutProvider';
import { ProductListing } from './ProductListing';

const ProductIndex = () => {
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
        <Fragment>
            <Container>
                <ProductListing />
            </Container>
        </Fragment>
    );
};

export { ProductIndex };
