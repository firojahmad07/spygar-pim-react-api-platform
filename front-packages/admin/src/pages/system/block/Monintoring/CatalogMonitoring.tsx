import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/container';
import { Toolbar, ToolbarDescription, ToolbarHeading, ToolbarPageTitle } from '@/partials/toolbar';
import { Contents } from './Contents';
import { useLayout } from '@/providers';

const CatalogMonitoring = () => {
  const { currentLayout } = useLayout();

  return (
    <Fragment>
      <Container>
        <Contents />
      </Container>
    </Fragment>
  );
};

export { CatalogMonitoring };
