import CountryList from "@/components/CountryList";
import formatNumber from "@/utils/formatNumber";
import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { memo } from "react";
import { Country } from "./type";

type CountryCardProps = {
  country: Country;
};

function CountryCard({ country }: CountryCardProps) {
  return (
    <Card>
      <CardMedia
        component="img"
        sx={{ height: 180 }}
        image={country.flags.png}
        alt={country.flags.alt}
      />
      <CardContent>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 800, mb: 1 }}>
          {country.name.common}
        </Typography>

        <Stack direction="column" spacing={0.5}>
          <CountryList
            name="Population"
            value={formatNumber(country.population)}
          />
          <CountryList name="Region" value={country.region} />
          <CountryList name="Capital" value={country.capital[0]} />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default memo(CountryCard);
