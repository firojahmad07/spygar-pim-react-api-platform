import React, { createContext, useState, ReactNode } from "react";

interface SidebarItem {
    title: string;
    path?: string;
    active?: boolean;
    children?: SidebarItem[];
}

interface SidebarContextType {
    sidebarMenu: SidebarItem[];
    setSidebarMenu: React.Dispatch<React.SetStateAction<SidebarItem[]>>;
    
    createRoute: string | undefined;
    setCreateRoute: React.Dispatch<React.SetStateAction<string | undefined>>;

    createModal: ReactNode | null;
    setCreateModal: React.Dispatch<React.SetStateAction<ReactNode | null>>;
}

// Create Context
export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Provider Component
export const DashboardLayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [sidebarMenu, setSidebarMenu] = useState<SidebarItem[]>([]);
    const [createRoute, setCreateRoute] = useState<string | undefined>(undefined);
    const [createModal, setCreateModal] = useState<ReactNode | null>(null);

    return (
        <SidebarContext.Provider value={{ 
            sidebarMenu,
            setSidebarMenu,
            createRoute,
            setCreateRoute,
            createModal,
            setCreateModal
        }}>
            {children}
        </SidebarContext.Provider>
    );
};
