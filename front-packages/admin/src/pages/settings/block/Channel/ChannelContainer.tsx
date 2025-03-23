import { Fragment } from 'react';
import { Container } from '@/components/container';
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
