import { useUser } from "@auth0/nextjs-auth0/client";

export const usePutEvent = () => {
  const { user } = useUser();

  const putEvent = async (eventId, updatedEventData) => {
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

      // PUT request to update an existing event
      const response = await fetch(`${backend_url}/api/events/${eventId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEventData), // Übergebe die aktualisierten Eventdaten
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Event updated successfully!", result);
        return { success: true, data: result };
      } else {
        const errorData = await response.text();
        throw new Error(`Error updating event: ${errorData}`);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
      return { success: false, message: error.message };
    }
  };

  return { putEvent };
};