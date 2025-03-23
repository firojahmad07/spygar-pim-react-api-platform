import { Fragment } from 'react';
import { Container } from '@/components/container';
import { Locales } from './Locales'

const LocaleContainer = () => {
    return (
        <Fragment>
            <Container>
                <Locales />
            </Container>
        </Fragment>
    );
};

export { LocaleContainer };
