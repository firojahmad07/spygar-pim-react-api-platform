import { CompanyProfile } from './blocks';
import { Outlet } from 'react-router';
import { Fragment } from 'react';
import { Container } from '@/components/container';

const ProductLayout = () => {
  
  return (
    <Fragment>
      <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
        <div className="col-span-2">
          <CompanyProfile />
        </div>
        <Outlet />
      </div>
      </Container>

    </Fragment>
  );
};

export { ProductLayout };
