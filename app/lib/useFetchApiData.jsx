import {useEffect, useState} from "react";

export function useFetchApiData(user, path, method) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    let backend_url
    if (process.env.NEXT_PUBLIC_BACKEND_URL === '') {
        backend_url = "https://eventplanner-backend.azurewebsites.net/"
    } else {
        backend_url = process.env.NEXT_PUBLIC_BACKEND_URL
    }
    useEffect(() => {
        const fetchProtectedData = async () => {
            console.log(backend_url)
            try {
                if (!user) {
                    console.log('User is not logged in');
                    return;
                }

                // Fetch the access token from the API route
                const tokenResponse = await fetch('/api/token');
                const {accessToken} = await tokenResponse.json();

                console.log('Token:', accessToken);

                // Use the token to access the protected backend route

                const response = await fetch(`${backend_url}${path}`, {
                    method, // Directly use the method string
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                console.error('Error fetching protected data:', err);
                setError(err);
            }
        };

        fetchProtectedData();
    }, [user, path, method]);

    return {data, error};
}