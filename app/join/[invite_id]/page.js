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
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    // Fetch event data from the backend.
    // need to use our own route, because
    // otherwise the request needs to be authenticated
    // We will use an encrypted string (token) consisting of:
    // event_id + user_id
    // this token can only be decrypted by the backend
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
    }, [invite_id]);

    const handleSignUp = async (action) => {
        try {
            const response = await fetch(`${backendUrl}/api/invite/${invite_id}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    action,
                }),
            });
            alert(`You have ${action}ed the invitation.`);
        } catch (err) {
            console.error(err);
        }
    }

    if (error) {
        return <h1>Error: {error}</h1>;
    }

    return (
        <div>
            {eventData ? (
                <div>
                    <EventDetails event={eventData.event} inviteID={invite_id} onSignUp={handleSignUp} />
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
}
