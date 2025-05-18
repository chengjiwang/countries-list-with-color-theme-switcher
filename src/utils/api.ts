import axios from "axios";

const url = "https://restcountries.com/v3.1";
export const fields =
  "name,flags,population,region,subregion,capital,currencies,languages,tld,borders";

export const api = axios.create({ baseURL: url });
