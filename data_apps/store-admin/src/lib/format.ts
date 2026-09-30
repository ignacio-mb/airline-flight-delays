export const round = (value: number, places: number) => {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
};

export const usd = (value: number | null | undefined) =>
  value == null || Number.isNaN(value)
    ? "—"
    : value.toLocaleString("en-US", { style: "currency", currency: "USD" });

// Metabase returns dates as ISO strings; keep the calendar date as written.
export const toDateInput = (value: unknown) =>
  value == null ? "" : String(value).slice(0, 10);

// Midnight UTC, so the stored DATE is the day the user picked in any time zone.
export const fromDateInput = (value: string) => {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};
