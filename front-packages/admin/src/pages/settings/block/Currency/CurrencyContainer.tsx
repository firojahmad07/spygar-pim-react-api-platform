import { Fragment } from 'react';
import { Container } from '@/components/container';
import { Currencies } from './Currencies'

const CurrencyContainer = () => {
    return (
        <Fragment>
            <Container>
                <Currencies />
            </Container>
        </Fragment>
    );
};

export { CurrencyContainer };
