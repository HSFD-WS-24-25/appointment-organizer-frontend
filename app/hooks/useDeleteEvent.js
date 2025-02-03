import { useUser } from "@auth0/nextjs-auth0/client";

export const useDeleteEvent = () => {
  const { user } = useUser();

  const deleteEvent = async (eventId) => {
    let backend_url;

    if (process.env.NEXT_PUBLIC_BACKEND_URL === '') {
      backend_url = "https://eventplanner-backend.azurewebsites.net/";
    } else {
      backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    }

    try {
      if (!user) {
        console.error("User is not logged in");
        throw new Error("User is not logged in");
      }

      // Fetch the access token from the API route
      const tokenResponse = await fetch('/api/token');
      const { accessToken } = await tokenResponse.json();

      console.log('Token:', accessToken);

      // Delete request to the backend
      const response = await fetch(`${backend_url}/api/events/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Event deleted successfully!");
        return { success: true, message: "Event deleted successfully!" };
      } else {
        const errorData = await response.text();
        throw new Error(`Error deleting event: ${errorData}`);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
      return { success: false, message: error.message };
    }
  };

  return { deleteEvent };
};
