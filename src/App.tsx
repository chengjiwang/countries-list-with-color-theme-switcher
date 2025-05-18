import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import Detail from "./pages/detail";
import Home from "./pages/home";
import RootLayout from "./pages/Root";
import theme from "./theme";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/details/:countryName", element: <Detail /> },
      ],
    },
  ],
  {
    basename: "/countries-list-with-color-theme-switcher",
  }
);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme} defaultMode="light">
        <CssBaseline />
        <RouterProvider
          router={router}
          // basename="/countries-list-with-color-theme-switcher"
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
