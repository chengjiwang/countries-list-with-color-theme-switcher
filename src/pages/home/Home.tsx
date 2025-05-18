import getCountriesOptions from "@/query/getCountriesOptions";
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
  Pagination,
  Select,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import CountryCard from "./CountryCard";

export default function Home() {
  const theme = useTheme();
  const [searchCountry, setSearchCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

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

  const paginatedCountries = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredCountries.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCountries, page]);

  useEffect(() => {
    setPage(1);
  }, [filteredCountries]);

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
          {paginatedCountries.map((item) => (
            <Grid key={item.name.common} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <CountryCard country={item} />
            </Grid>
          ))}
        </Grid>

        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            pt: 2,
            pb: 4,
          }}
        >
          <Pagination
            showFirstButton
            showLastButton
            boundaryCount={2}
            count={Math.ceil(filteredCountries.length / itemsPerPage)}
            page={page}
            onChange={(_, value) => {
              setPage(value);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            color="primary"
          />
        </Stack>
      </Stack>
    </Container>
  );
}
