import { useUser } from "@auth0/nextjs-auth0/client";

export const useDeleteUser = () => {
  const { user } = useUser();

  const deleteUser = async (user_id) => {
    console.log("User ID to delete:", user_id);

    let backend_url;

    if (!process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL === '') {
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

      // DELETE request to remove a user
      const response = await fetch(`${backend_url}/api/users/${user_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("User deleted successfully!");
        return { success: true };
      } else {
        const errorData = await response.text();
        throw new Error(`Error deleting User: ${errorData}`);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
      return { success: false, message: error.message };
    }
  };

  return { deleteUser };
};
