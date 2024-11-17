'use client'
import React, { useEffect, useState } from 'react';

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch data from the backend
        fetch('http://localhost:3001/api/users')
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

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
