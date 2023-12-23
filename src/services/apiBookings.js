import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase.from("bookings").select(
    "id, createdAt, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, phone)",
    // Instead of data.length, get count of array and passing it to pagination component
    { count: "exact" },
  );

  // FILTER
  if (filter) query[filter.method || "eq"](filter.field, filter.value);

  // SORT
  if (sortBy)
    query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  // PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error("مشکلی در دریافت لیست رزور ها رخ داد");
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("مشکلی در دریافت جزئیات رزرو رخ داد");
  }

  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("مشکلی در تغییر وضعیت رزرو رخ داد");
  }

  return data;
}

export async function deleteBooking(id) {
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("مشکلی در حذف رزرو رخ داد");
  }
}

// Returns all bookings that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// date: ISOString
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("createdAt, totalPrice, extraPrice")
    .gte("createdAt", date)
    .lte("createdAt", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("مشکلی در دریافت اطلاعات رزرو ها رخ داد");
  }

  return data;
}

// Returns all stays that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("مشکلی در دریافت اطلاعات رزرو ها رخ داد");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getTodayActivities() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .or(
      `and(status.eq.تایید نشده,startDate.eq.${getToday()}),and(status.eq.چک این,endDate.eq.${getToday()})`,
    )
    .order("createdAt");

  // Equivalent to down below. But by querying this, we only download the data we actually need, otherwise we would need all bookings ever created
  // (stay.status === "تایید نشده" && isToday(new Date(stay.startDate))) || (stay.status === "چک این" && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("مشکلی در دریافت اطلاعات رزرو ها رخ داد");
  }

  return data;
}
