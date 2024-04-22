"use client";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
interface SiteDataContextType {
  siteName: string;
  siteLogo: string | null;
  isMicroSite: boolean;
}

//const hasAddress: Boolean = true;

const SiteDataContext = createContext<SiteDataContextType | undefined>(
  undefined
);

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a SiteDataProvider");
  }
  return context;
};

export const SiteDataProvider = ({
  children,
  siteName,
  siteLogo,
  isMicroSite,
}: {
  children: ReactNode;
  siteName: string;
  siteLogo: string;
  isMicroSite: boolean;
}) => {
  return (
    <SiteDataContext.Provider
      value={{
        siteName,
        siteLogo,
        isMicroSite,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};
