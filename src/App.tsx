import { CssBaseline, ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/home";
import RootLayout from "./pages/Root";
import theme from "./theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ path: "/", element: <Home /> }],
  },
]);

function App() {
  return (
    <>
      <ThemeProvider theme={theme} defaultMode="light">
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
