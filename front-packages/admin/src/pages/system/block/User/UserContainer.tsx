import { Fragment } from 'react';
import { Container } from '@/components/container';
import { Users } from './Users'

const UserContainer = () => {
    return (
        <Fragment>
            <Container>
                <Users />
            </Container>
        </Fragment>
    );
};

export { UserContainer };
