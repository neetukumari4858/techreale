import React, { useState, useMemo } from "react"
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LayersIcon from '@mui/icons-material/Layers';
import LogoutIcon from '@mui/icons-material/Logout';
import { extendTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DashbordPage, ManageProductsPage, ManageOrdersPage } from '../pages';
import { Container } from '@mui/material';

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};
const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'manageproducts',
    title: 'Manage Products',
    icon: <LayersIcon />,
  },
  {
    segment: 'manageorders',
    title: 'Manage Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'logout',
    title: 'Logout',
    icon: <LogoutIcon />,
  },
];

const getPageComponent = (pathname) => {
  switch (pathname) {
    case "/dashboard":
      return <DashbordPage />
    case "/manageproducts":
      return <ManageProductsPage />
    case "/manageorders":
      return <ManageOrdersPage />
    case "/logout":
      return handleLogout()
    default:
      return <DashbordPage />
  }
}

const demoTheme = extendTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export function useDemoRouter(initialPath) {
  const [pathname, setPathname] = useState(initialPath);
  const router = useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);
  return router;
}

export default function Dashboard() {
  const router = useDemoRouter('/dashboard');
  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      branding={{
        title: 'Book Maganer',
      }}
    >
      <DashboardLayout>
        <Container>
          {getPageComponent(router.pathname)}
        </Container>
      </DashboardLayout>
    </AppProvider>

  );
}
