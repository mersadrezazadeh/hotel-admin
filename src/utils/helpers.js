import { differenceInDays, formatDistance, parseISO } from "date-fns-jalali";

const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
export const toPersianNumber = (value) =>
  value.toString().replace(/\d/g, (x) => persianDigits[x]);

export const formatCurrency = (value) =>
  // value.toLocaleString("fa-IR");
  new Intl.NumberFormat("fa", { style: "currency", currency: "IRR" })
    .format(value)
    .replace("ریال", "");

// Works for both date objects and strings(from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(String(dateStr)), new Date(), {
    addSuffix: true,
  });

// Convert today date to ISO date string for Supabase
export const getToday = function (options = {}) {
  // Date is different in every render(ms and sec change), so it must be end of the day for comparing it with createdAt date(earlier date) in Supabase
  const today = new Date();

  // Set to end of the day
  if (options?.end) today.setUTCHours(23, 59, 59, 999);
  // Set to beginning of the day
  else today.setUTCHours(0, 0, 0, 0);

  return today.toISOString();
};
