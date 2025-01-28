'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import EventDetails from "@/app/[instanz]/[organisation]/[user]/preview/page";

export default function JoinPage() {
    const { invite_id } = useParams();
    const [eventData, setEventData] = useState(null);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    // Fetch event data from the backend.
    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/invite/${invite_id}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setEventData(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            }
        };

        if (invite_id) {
            fetchEventData();
        }
    }, [invite_id, backendUrl]);

    const handleSignUp = async (action) => {
        try {
            const response = await fetch(`${backendUrl}/api/invite/${invite_id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action }),
            });

            if (!response.ok) {
                throw new Error("Failed to process your action.");
            }
            alert(`You have ${action}ed the invitation.`);
        } catch (err) {
            console.error(err);
            alert("An error occurred while processing your action.");
        }
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${backendUrl}/api/invite/${invite_id}/auth`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            alert("Email submitted successfully.");
        } catch (err) {
            console.error(err);
            alert("Failed to submit email.");
        }
    };

    if (error) {
        return <h1>Error: {error}</h1>;
    }

    if (!eventData) {
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            {eventData.check === "unused" ? (
                <EventDetails event={eventData.event} inviteID={invite_id} onSignUp={handleSignUp}/>) : (
                <div>
                    <h1>Invitation already used or invalid.</h1>
                    <form onSubmit={handleEmailSubmit}>
                        <label>
                            Email:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </form>
                </div>
            )}
        </div>
    );
}
