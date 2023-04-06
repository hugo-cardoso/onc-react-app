export enum ChartTypeEnum {
  STAR = 'STAR',
  IAC = 'IAC',
  TAXI = 'TAXI',
  SID = 'SID',
  ADC = 'ADC',
  PDC = 'PDC',
}

export type Chart = {
  id: string;
  name: string;
  type: ChartTypeEnum;
  chartUrl: string;
}

export enum AirportViewEnum {
  INFO = 'Info',
  CHARTS = 'Charts',
}

export type AirportRunway = {
  headboards: string[];
  ident: string;
  length: string;
  width: string;
  type: string;
}

export type AirportLocation = {
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  state: string;
}

export type Airport = {
  id: string;
  name: string;
  charts: Chart[];
  icao: string;
  runways: AirportRunway[];
  location: AirportLocation;
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}
