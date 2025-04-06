import { api } from "@/utils/api";
import { Box, CircularProgress, Container, Grid } from "@mui/material";
import { queryOptions, useQuery } from "@tanstack/react-query";
import CountryCard from "./CountryCard";
import { Country } from "./type";

function getCountriesOptions() {
  return queryOptions({
    queryKey: ["country"],
    queryFn: async () => {
      return (
        await api.get<Country[]>(
          "/all?fields=name,flags,population,region,subregion,capital,currencies,languages,tld"
        )
      ).data;
    },
  });
}

export default function Home() {
  const { data, isLoading } = useQuery(getCountriesOptions());

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

  return (
    <Container maxWidth={false} sx={{ maxWidth: "1340px", mt: 6 }}>
      <Grid container spacing={6}>
        {(data || []).map((item) => (
          <Grid key={item.name.common} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <CountryCard country={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
