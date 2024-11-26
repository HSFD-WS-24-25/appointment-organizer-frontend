import {useEffect, useState} from "react";

export function useFetchApiData(user, path, method) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProtectedData = async () => {
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
                const response = await fetch(`http://localhost:3001/${path}`, {
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