import CountryList from "@/components/CountryList";
import getCodeListsOptions from "@/query/getCodeListsOptions";
import getSearchNameOptions from "@/query/getSearchNameOptions";
import formatNumber from "@/utils/formatNumber";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router";

export default function Detail() {
  const { countryName } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery(
    getSearchNameOptions(countryName)
  );

  const borders = data?.[0]?.borders || [];
  const bordersQuery = useQuery({
    ...getCodeListsOptions(borders),
    enabled: borders.length > 0,
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data || data.length === 0 || !data[0]) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" color="error">
          Unable to load country data. Please try again later.
        </Typography>
      </Box>
    );
  }

  const languages = Object.values(data[0].languages).join(", ");
  const currencies = Object.values(data[0].currencies)
    .map((currency) => `${currency.name}`)
    .join(", ");
  const firstNativeName = Object.values(data[0].name.nativeName)[0]?.common;

  return (
    <Container maxWidth={false} sx={{ maxWidth: "1340px", mt: 6, px: 4 }}>
      <Stack spacing={6}>
        <Link to="/">
          <Button
            variant="outlined"
            startIcon={<KeyboardBackspaceIcon />}
            sx={{ color: "text.primary", borderColor: "text.primary" }}
          >
            Back
          </Button>
        </Link>

        <Grid container spacing={8}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <img
              src={data[0].flags.png}
              alt={data[0].flags.alt}
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <Stack spacing={4}>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 800 }}>
                {data[0].name.common}
              </Typography>

              <Grid container spacing={6}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack direction="column" spacing={1}>
                    <CountryList name="Native Name" value={firstNativeName} />
                    <CountryList
                      name="Population"
                      value={formatNumber(data[0].population)}
                    />
                    <CountryList name="Region" value={data[0].region} />
                    <CountryList name="Sub Region" value={data[0].subregion} />
                    <CountryList name="Capital" value={data[0].capital[0]} />
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack direction="column" spacing={1}>
                    <CountryList
                      name="Top level domain"
                      value={data[0].tld[0]}
                    />
                    <CountryList name="Currencies" value={currencies} />
                    <CountryList name="Languages" value={languages} />
                  </Stack>
                </Grid>
              </Grid>

              <Stack
                spacing={1}
                direction={{ xs: "column", md: "row" }}
                sx={{
                  alignItems: {
                    md: "center",
                  },
                }}
              >
                <Typography sx={{ fontWeight: 600, minWidth: 140 }}>
                  Border Countries:
                </Typography>

                {borders.length > 0 ? (
                  <Grid container spacing={1}>
                    {bordersQuery.data?.map((border) => {
                      return (
                        <Button
                          key={border.name.common}
                          variant="outlined"
                          sx={{
                            color: "text.primary",
                            borderColor: "text.primary",
                          }}
                          onClick={() =>
                            navigate(`/details/${border.name.common}`)
                          }
                        >
                          {border.name.common}
                        </Button>
                      );
                    })}
                  </Grid>
                ) : (
                  <Typography>No border countries</Typography>
                )}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
