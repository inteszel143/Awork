import { calendarById, getHomeCalendar } from "@/apis/home";
import { useQuery } from "@tanstack/react-query";

export const useHomeCalendar = (isFocused: any, token: string) => {
  return useQuery({
    queryKey: ["home-calendar"],
    enabled: isFocused,
    queryFn: () => getHomeCalendar(token),
  });
};

export const useCalendarById = (id: any, token: string, isFocused: any) => {
  return useQuery({
    queryKey: ["calendar-id"],
    enabled: isFocused,
    queryFn: () => calendarById(id, token),
  });
};
