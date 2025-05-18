import { Country } from "@/pages/home/type";
import { api, fields } from "@/utils/api";
import { queryOptions } from "@tanstack/react-query";

export default function getSearchNameOptions(name: string | undefined) {
  return queryOptions({
    queryKey: ["name", name],
    queryFn: async () => {
      return (
        await api.get<Country[]>(`name/${name}?fullText=true&fields=${fields}`)
      ).data;
    },
  });
}
