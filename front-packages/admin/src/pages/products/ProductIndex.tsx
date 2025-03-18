import { Fragment, useContext, useEffect, useMemo } from 'react';
import { Container } from '@/components/container';
import { SidebarContext } from '@/layouts/admin/DashboardLayoutProvider';

import {
    Toolbar,
    ToolbarActions,
    ToolbarDescription,
    ToolbarHeading,
    ToolbarPageTitle
} from '@/partials/toolbar';

import { NetworkUserTableTeamCrewContent } from '@/pages/network/user-table/team-crew/NetworkUserTableTeamCrewContent';
import { Users } from '@/pages/network/user-table/team-crew/blocks/users';

import { useLayout } from '@/providers';

const ProductIndex = () => {
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
        <Fragment>
            {currentLayout?.name === 'demo1-layout' && (
                <Container>
                    <Toolbar>
                        <ToolbarHeading>
                            <ToolbarPageTitle />
                            <ToolbarDescription>
                                <div className="flex items-center flex-wrap gap-1.5 font-medium">
                                    <span className="text-md text-gray-700">All Members:</span>
                                    <span className="text-md text-gray-800 font-medium me-2">49,053</span>
                                    <span className="text-md text-gray-700">Pro Licenses</span>
                                    <span className="text-md text-gray-800 font-medium">724</span>
                                </div>
                            </ToolbarDescription>
                        </ToolbarHeading>
                        <ToolbarActions>
                            <a href="#" className="btn btn-sm btn-light">
                                Import CSV
                            </a>
                            <a href="#" className="btn btn-sm btn-primary">
                                Add Member
                            </a>
                        </ToolbarActions>
                    </Toolbar>
                </Container>
            )}

            <Container>
                <Users />
            </Container>
        </Fragment>
    );
};

export { ProductIndex };
