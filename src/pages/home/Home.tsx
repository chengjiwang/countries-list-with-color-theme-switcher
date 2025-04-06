import { api } from "@/utils/api";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
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
  const theme = useTheme();
  const [searchCountry, setSearchCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");

  const { data, isLoading } = useQuery(getCountriesOptions());

  const filteredCountries = useMemo(() => {
    return (data || []).filter((item) => {
      if (searchCountry === "" && selectedRegion === "all") {
        return true;
      }
      const matchesSearch = item.name.common
        .toLowerCase()
        .includes(searchCountry.toLowerCase());
      const matchesRegion =
        selectedRegion === "all" || item.region === selectedRegion;

      return matchesSearch && matchesRegion;
    });
  }, [data, searchCountry, selectedRegion]);

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

  const regionList = new Set(data?.map((item) => item.region));
  const uniqueRegions = Array.from(regionList);

  return (
    <Container maxWidth={false} sx={{ maxWidth: "1340px", mt: 6 }}>
      <Stack spacing={4}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={5}
          sx={{ justifyContent: "space-between" }}
        >
          <TextField
            variant="outlined"
            value={searchCountry}
            onChange={(e) => setSearchCountry(e.target.value)}
            placeholder="Search for country..."
            sx={{
              width: { xs: 300, md: 450 },
              background: theme.palette.background.paper,
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />

          <FormControl sx={{ width: 200 }}>
            <InputLabel>Filter by Region</InputLabel>
            <Select
              label="Filter by Region"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              sx={{ background: theme.palette.background.paper }}
            >
              <MenuItem value="all">All</MenuItem>
              {uniqueRegions.map((region) => (
                <MenuItem key={region} value={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Grid container spacing={6}>
          {filteredCountries.map((item) => (
            <Grid key={item.name.common} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <CountryCard country={item} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}
