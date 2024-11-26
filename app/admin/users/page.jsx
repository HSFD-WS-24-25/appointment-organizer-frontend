'use client';

import React from 'react';
import {useUser} from '@auth0/nextjs-auth0/client';
import {useFetchApiData} from "../../lib/useFetchApiData";

function App() {
    const { user, error: authError, isLoading } = useUser();
    const path = "api/users";
    const method = 'GET';
    const {data: users, error: fetchError} = useFetchApiData(user, path, method);

    if (isLoading) return <div>Loading...</div>;
    if (authError) return <div>Error loading user data: {authError.message}</div>;
    if (!user) return <div>Please log in</div>;
    if (fetchError) return <div>Error fetching user data: {fetchError.message}</div>;

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
