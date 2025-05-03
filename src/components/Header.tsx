import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
  useColorScheme,
  useTheme,
} from "@mui/material";

export default function Header() {
  const { mode, setMode } = useColorScheme();
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      sx={{ background: theme.palette.background.paper }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1340px",
        }}
      >
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="h1"
            sx={{
              flexGrow: 1,
              color: "text.primary",
              fontWeight: 800,
            }}
          >
            Where in the world?
          </Typography>

          <Button
            startIcon={
              mode === "light" ? (
                <LightModeOutlinedIcon />
              ) : (
                <DarkModeOutlinedIcon />
              )
            }
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            sx={{
              color: "text.primary",
            }}
          >
            {mode === "light" ? "Light Mode" : "Dark Mode"}
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
