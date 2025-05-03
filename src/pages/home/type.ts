type NativeName = {
  [key: string]: {
    official: string;
    common: string;
  };
};

type Currencies = {
  [key: string]: {
    name: string;
    symbol: string;
  };
};

export type Country = {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: {
    common: string;
    official: string;
    nativeName: NativeName;
  };
  tld: string[];
  currencies: Currencies;
  capital: string[];
  region: string;
  subregion: string;
  languages: {
    [key: string]: string;
  };
  population: number;
};
