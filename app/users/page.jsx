'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

function App() {
    const { user, error, isLoading } = useUser();
    const [users, setUsers] = useState([]);

    const fetchProtectedData = async () => {
        try {
            if (!user) {
                console.log('User is not logged in');
                return;
            }

            // Fetch the access token from the API route
            const tokenResponse = await fetch('/api/token');
            const { accessToken } = await tokenResponse.json();

            console.log('Token:', accessToken);

            // Use the token to access the protected backend route
            const response = await fetch('http://localhost:3001/api/users', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const data = await response.json();
            setUsers(data);
        } catch (err) {
            console.error('Error fetching protected data:', err);
        }
    };

    useEffect(() => {
        fetchProtectedData();
    }, [user]); // Re-fetch protected data whenever the user changes

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading user data: {error.message}</div>;
    if (!user) return <div>Please log in</div>;

    return (
        <div className="App">
            <h1>User List</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.firstName} {user.lastName} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
