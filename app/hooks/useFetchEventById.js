import { useUser } from "@auth0/nextjs-auth0/client";
import { useFetchApiData } from "@/app/lib/useFetchApiData";

export const useFetchEventById = (eventId) => {
  const { user, error: authError, isLoading } = useUser();
  const path = `/api/events/${eventId}`;
  const method = "GET";
  const { data: event, error: fetchError } = useFetchApiData(user, path, method);

  return { user, authError, isLoading, event, fetchError };
};