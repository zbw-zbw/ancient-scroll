"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface NavbarVisibilityContextValue {
  navbarVisible: boolean;
  setNavbarVisible: (visible: boolean) => void;
}

const NavbarVisibilityContext = createContext<NavbarVisibilityContextValue>({
  navbarVisible: true,
  setNavbarVisible: () => {},
});

export const useNavbarVisibility = () => useContext(NavbarVisibilityContext);

export default function NavbarVisibilityProvider({ children }: { children: React.ReactNode }) {
  const [navbarVisible, setNavbarVisible] = useState(true);
  const handleSetVisible = useCallback((visible: boolean) => {
    setNavbarVisible(visible);
  }, []);
  return (
    <NavbarVisibilityContext.Provider value={{ navbarVisible, setNavbarVisible: handleSetVisible }}>
      {children}
    </NavbarVisibilityContext.Provider>
  );
}
