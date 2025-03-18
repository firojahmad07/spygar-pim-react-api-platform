import { Fragment } from 'react';
import { Container } from '@/components/container';
import { Users } from '@/pages/network/user-table/team-crew/blocks/users';
import { Channels } from './Channels'

const ChannelContainer = () => {
    return (
        <Fragment>
            <Container>
                <Channels />
            </Container>
        </Fragment>
    );
};

export { ChannelContainer };
