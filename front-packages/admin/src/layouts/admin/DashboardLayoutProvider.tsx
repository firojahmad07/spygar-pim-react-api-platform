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
}
// Create Context
export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Provider Component
export const DashboardLayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [sidebarMenu, setSidebarMenu] = useState<SidebarItem[]>([]);

    return (
        <SidebarContext.Provider value={{ 
            sidebarMenu,
            setSidebarMenu 
            }}>
            {children}
        </SidebarContext.Provider>
    );
};