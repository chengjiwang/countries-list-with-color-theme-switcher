import { Country } from "@/pages/home/type";
import { api, fields } from "@/utils/api";
import { queryOptions } from "@tanstack/react-query";

export default function getCountriesOptions() {
  return queryOptions({
    queryKey: ["country"],
    queryFn: async () => {
      return (await api.get<Country[]>(`/all?fields=${fields}`)).data;
    },
  });
}
