export type SalesByGender = {
  gender: string;
  sum: number;
};

export type ChartSeriesData = {
  x: string;
  y: number;
};

export type Store = {
  id: number;
  name: string;
};

export type FilterData = {
  store?: Store;
};

export type PieChartConfig = {
  labels: string[];
  series: number[];
};
