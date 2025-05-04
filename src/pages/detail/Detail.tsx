import getSearchNameOptions from "@/query/getSearchNameOptions";
import { Box, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export default function Detail() {
  const { countryName } = useParams();
  const { data, isLoading } = useQuery(getSearchNameOptions(countryName));
  console.log("data", data);

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

  return <div>Detail</div>;
}
