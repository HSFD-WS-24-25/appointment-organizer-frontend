import { useUser } from "@auth0/nextjs-auth0/client";
import { useFetchApiData } from "@/app/[locale]/lib/useFetchApiData";

export const useFetchEvents = () => {
  const { user, error: authError, isLoading } = useUser();
  const path = "/api/events";
  const method = "GET";
  const { data: events, error: fetchError } = useFetchApiData(user, path, method);

  

  return { user, authError, isLoading, events, fetchError };
};
