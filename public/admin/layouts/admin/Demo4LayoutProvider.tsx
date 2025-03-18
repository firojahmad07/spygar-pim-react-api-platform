import { createContext, Dispatch,SetStateAction, type PropsWithChildren, useContext, useEffect, useState } from 'react';
import { MENU_SIDEBAR } from '@/config';
import { useMenus } from '@/providers';
import { ILayoutConfig, useLayout } from '@/providers';
import { deepMerge } from '@/utils';
import { Demo4LayoutConfig } from '.';
import { useMenuChildren } from '@/components';
import { useLocation } from 'react-router';
interface SidebarItem {
  title: string,
  active?: boolean,
  path?: string
  children?: any
}
// Interface defining the properties of the layout provider context
export interface IDemo4LayoutProviderProps {
  layout: ILayoutConfig; // The layout configuration object
  mobileSidebarOpen: boolean; // Whether the mobile sidebar is open
  setMobileSidebarOpen: (open: boolean) => void; // Function to toggle the mobile sidebar
  setSidebarCollapse: (collapse: boolean) => void; 
  // sidebarData: SidebarItem[], // Default layout configuration
  // setSidebarMenu: any; 
}

// Initial layout provider properties, using Demo4 layout configuration as the default
const initalLayoutProps = {
  layout: Demo4LayoutConfig,
  mobileSidebarOpen: false, // Mobile sidebar is closed by default
  setMobileSidebarOpen: (open: boolean) => {
    console.log(`${open}`);
  },
  setSidebarCollapse: (collapse: boolean) => {
    console.log(`${collapse}`);
  },
  sidebarData: [],
  setSidebarMenu: (sidebarData: any) => {
    console.log(`${sidebarData}`);

  }
};

// Create a context to manage the layout-related state and logic for Demo4 layout
const Demo4LayoutContext = createContext(initalLayoutProps);

// Custom hook to access the layout context in other components
const useDemo4Layout = () => useContext(Demo4LayoutContext);

// Provider component that sets up the layout state and context for Demo4 layout
const Demo4LayoutProvider = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation(); // Gets the current path
  const { setMenuConfig } = useMenus(); // Hook to manage menu configurations
  // const { getLayout, setCurrentLayout } = useLayout(); // Hook to get and set layout configuration
  const { getLayout, updateLayout, setCurrentLayout } = useLayout(); // Layout management methods


  // Merge the Demo4 layout configuration with the current layout configuration fetched via getLayout
  const layoutConfig = deepMerge(Demo4LayoutConfig, getLayout(Demo4LayoutConfig.name));
 // Merges the default layout with the current one
  const getLayoutConfig = () => {
    return deepMerge(Demo4LayoutConfig, getLayout(Demo4LayoutConfig.name));
  };
  const [setLayout] = useState(getLayoutConfig); // State for layout configuration

  // Set the initial state for layout and mobile sidebar
  const [layout] = useState(layoutConfig); // Layout configuration is stored in state
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false); // Manage state for mobile sidebar
  const [sidebarData, setSidebarMenu] = useState([]);
 // Function to collapse or expand the sidebar
  const setSidebarCollapse = (collapse: boolean) => {
    const updatedLayout = {
      options: {
        sidebar: {
          collapse
        }
      }
    };

    updateLayout(Demo4LayoutConfig.name, updatedLayout); // Updates the layout with the collapsed state
    setLayout(getLayoutConfig()); // Refreshes the layout configuration
  };
  // Set the menu configuration for the primary menu using the provided MENU_SIDEBAR configuration
  setMenuConfig('primary', MENU_SIDEBAR);
  const secondaryMenu = useMenuChildren(pathname, MENU_SIDEBAR, 0); // Retrieves the secondary menu
  setMenuConfig('secondary', secondaryMenu);

  // When the layout state changes, set the current layout configuration in the layout provider
  useEffect(() => {
    setCurrentLayout(layout); // Update the current layout in the global layout state
  }, [layout, setCurrentLayout]); // Re-run this effect if layout or setCurrentLayout changes

  // Provide the layout state, sticky header state, and sidebar state to children components via context
  return (
    <Demo4LayoutContext.Provider
      value={{
        setSidebarCollapse,
        sidebarData,
        setSidebarMenu,
        layout, // The current layout configuration
        mobileSidebarOpen, // Whether the mobile sidebar is currently open
        setMobileSidebarOpen // Function to toggle the mobile sidebar state
      }}
    >
      {children} {/* Render child components that consume this context */}
    </Demo4LayoutContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export { Demo4LayoutProvider, useDemo4Layout, Demo4LayoutContext};
