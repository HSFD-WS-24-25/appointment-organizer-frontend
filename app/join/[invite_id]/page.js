'use client';
import { Box, TextField } from '@mui/material';
import DesignTitel from "@/app/components/styledComponents/DesignTitel";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import Preview from "@/app/[instanz]/[organisation]/[user]/preview/page";
import StyledPaper from "@/app/components/styledComponents/StyledPaper";

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
            //alert(`You have ${action}ed the invitation.`);
            // Refetch event data to update the state
            await fetchEventData();
        } catch (err) {
            console.error(err);
            //alert("An error occurred while processing your action.");
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
            //alert("Email submitted successfully.");
            // Refetch event data to update the state
            await fetchEventData();
            const data = await response.json();
            setEventData(data);
        } catch (err) {
            console.error(err);
            alert("Falsche E-Mail Adresse.");
        }
    };

    // Function to fetch event data
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

    if (error) {
        return <h1>Error: {error}</h1>;
    }

    if (!eventData) {
        return <h1>Loading...</h1>;
    }

    let content = null;

    if (eventData.check === "unused") {
        content = (
            <Preview formData={eventData.event} inviteID={invite_id} onSignUp={handleSignUp} />
        );
    } else if (eventData.check === "used") {
        content = (
            <StyledPaper>
              <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <DesignTitel variant="h4" gutterBottom>
                  E-Mail Authentifikation
                </DesignTitel>
                <form onSubmit={handleEmailSubmit} style={{ width: '100%', maxWidth: '400px' }}>
                  <TextField
                    label="E-Mail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Absenden
                  </Button>
                </form>
              </Box>
            </StyledPaper>
            );
}

        else if (eventData.check === "auth") {
            const eventDetails = eventData.dbEvents[0].event;
            content = (
                <Preview formData={eventDetails} inviteID={invite_id} onSignUp={handleSignUp} />
            );
    }

    return <div>{content}</div>;
}