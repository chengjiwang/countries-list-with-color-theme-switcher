import { Stack, Typography } from "@mui/material";
import { memo } from "react";

type CountryListProps = {
  name: string;
  value: string | number;
};

function CountryList({ name, value }: CountryListProps) {
  return (
    <Stack direction="row">
      <Typography sx={{ fontWeight: 600 }}>{name}:</Typography>
      <Typography sx={{ pl: 0.5 }}>{value}</Typography>
    </Stack>
  );
}

export default memo(CountryList);
