import { format, parseISO } from "date-fns";

export function formatDate(isoDate?: string): string {
  if (!isoDate) {
    return "";
  }

  return format(parseISO(isoDate), "MMMM d, yyyy");
}

export function formatTime(isoTime?: string): string {
  if (!isoTime) {
    return "";
  }

  return format(parseISO(isoTime), "h:mma");
}

function combineDateTime(formattedDate: string, formattedTime: string): string {
  return `${formattedDate} at ${formattedTime}`;
}

export function formatDateTime(date: string, time: string): string {
  try {
    const formattedDate = formatDate(date);
    const formattedTime = formatTime(time);
    return combineDateTime(formattedDate, formattedTime);
  } catch (error) {
    console.error("Invalid date or time format", error);
    return "Invalid date or time";
  }
}

export const getCurrentFormattedDate = (): string => {
  return format(new Date(), "MMMM dd, yyyy");
};
