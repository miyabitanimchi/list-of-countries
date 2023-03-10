export const SORT_BY = "Sort by";
export const MOST_POPULATED = "Most Populated";
export const LEAST_POPULATED = "Least Populated";
export const ALPHABETICAL_ORDER = "Alphabetical Order";
export const HIGH_LATITUDE_TO_LOW = "High Latitude to Low (Cold to Hot)";
export const LOW_LATITUDE_TO_HIGH = "Low Latitude to High (Hot to Cold)";

export const SORT_OPTIONS: readonly string[] = [
  SORT_BY,
  MOST_POPULATED,
  LEAST_POPULATED,
  ALPHABETICAL_ORDER,
  HIGH_LATITUDE_TO_LOW,
  LOW_LATITUDE_TO_HIGH,
] as const;
