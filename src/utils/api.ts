import axios from "axios";

const url = "https://restcountries.com/v3.1";

export const api = axios.create({ baseURL: url });
