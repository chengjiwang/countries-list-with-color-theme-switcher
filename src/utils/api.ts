import axios from "axios";

const url = "https://restcountries.com/v3.1";
export const fields =
  "name,flags,population,region,subregion,capital,currencies,languages,tld";

export const api = axios.create({ baseURL: url });
