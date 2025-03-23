import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/container';
import { Menu, MenuItem, MenuSub, MenuToggle } from '@/components/menu';
import { Tab, TabPanel, Tabs, TabsList } from '@/components/tabs';
import { Toolbar, ToolbarDescription, ToolbarHeading, ToolbarPageTitle } from '@/partials/toolbar';
// import { Contents } from './Contents';
import { useLayout } from '@/providers';

const SystemConfiguration = () => {
  const { currentLayout } = useLayout();

  return (
    <Fragment>
      <Container>
      <Tabs defaultValue={1} className="">
        <TabsList className="justify-between px-5 mb-2">
          <div className="flex items-center gap-5">
            <Tab value={1}>General</Tab>
            <Tab value={2}>Dashboard</Tab>
            <Tab value={3}>Store</Tab>
            <Tab value={4}>Others</Tab>
          </div>
        </TabsList>
        <TabPanel value={1}>
          <h1> tab 1</h1>
        </TabPanel>
        <TabPanel value={2}>
          <h1> tab 2</h1>
        </TabPanel>
        <TabPanel value={3}>
          <h1> tab 3</h1>

        </TabPanel>
        <TabPanel value={4}>
          <h1> tab 5</h1>

        </TabPanel>
      </Tabs>
      </Container>
    </Fragment>
  );
};

export { SystemConfiguration };
