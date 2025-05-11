import { Country } from "@/pages/home/type";
import { api, fields } from "@/utils/api";
import { queryOptions } from "@tanstack/react-query";

export default function getCodeListsOptions(codes: string[] | undefined) {
  return queryOptions({
    queryKey: ["codeLists", codes],
    queryFn: async () => {
      return (
        await api.get<Country[]>(`alpha/?codes=${codes}&&fields=${fields}`)
      ).data;
    },
  });
}
