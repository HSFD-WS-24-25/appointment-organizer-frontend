import { useUser } from "@auth0/nextjs-auth0/client";

export const usePutUser = () => {
  const { user } = useUser();

  const putUser = async (user_id, updatedUserData) => {
    console.table(updatedUserData);
    console.log("Updated Data (JSON):", JSON.stringify(updatedUserData, null, 2));
    
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

      // PUT request to update an existing user
      const response = await fetch(`${backend_url}/api/users/${user_id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData), // Übergebe die aktualisierten Userdaten
      });

      if (response.ok) {
        const result = await response.json();
        console.log("User updated successfully!", result);
        return { success: true, data: result };
      } else {
        const errorData = await response.text();
        throw new Error(`Error updating User: ${errorData}`);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
      return { success: false, message: error.message };
    }
  };

  return { putUser };
};
