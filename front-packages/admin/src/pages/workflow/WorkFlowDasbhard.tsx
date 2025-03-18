import { Fragment, useContext } from 'react';
import { Container } from '@/components/container';
import { Demo4LayoutContext } from '@/layouts/admin/Demo4LayoutProvider';


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

const WorkFlowDasbhard = () => {
    const { currentLayout } = useLayout();

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

export { WorkFlowDasbhard };
