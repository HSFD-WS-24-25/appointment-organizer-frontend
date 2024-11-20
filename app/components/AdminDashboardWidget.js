/* this module creates the central admin dashboard widget */

import React from 'react';
import { Grid2, Card, CardContent, Typography, Box } from '@mui/material';
import RegisteredParticipantsCard from './RegisteredParticipantsCard';
import EventActivityCard from './EventActivityCard';

export function AdminDashboardWidget() {

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            {/* Sidebar */}


            {/* Main Content */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 3,
                }}
            >
                {/* Dashboard Content Box */}
                <Box
                    sx={{
                        maxWidth: 1000,
                        width: '100%',
                        backgroundColor: 'white',
                        padding: 3,
                        borderRadius: 2,
                        boxShadow: 1,
                        boxSizing: 'border-box',
                    }}
                >
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        Dashboard
                    </Typography>

                    {/* Secondary Box */}
                    <Box
                        sx={{
                            maxWidth: 1000,
                            width: '100%',  // Ensure it takes the full width of the parent
                            backgroundColor: 'white',
                            boxSizing: 'border-box', // Include padding and border within the width
                        }}
                    >
                        {/* First row - Notifications, Participants, and Events */}
                        <Grid2 container spacing={2} sx={{ width: '100%', pt: 2, pb: 1, pl: 2, pr: 2, boxSizing: 'border-box' }} >



                            {/* TODO replace all cards with grid items*/}
                            {/* Notifications Card */}
                            {/* msut be replaced with data retrieval logic*/}
                            <Grid2 item size={4}>
                                <Card sx={{ height: '100%', width: '100%', maxHeight: '100%' }}>
                                    <CardContent>
                                        <Grid2 container direction="column" spacing={2} alignItems="center" width={'100%'} height={'100%'}>
                                            <Grid2 item size={2} width={'100%'}>
                                                <Typography variant="subtitle1">Notifications</Typography>
                                            </Grid2>
                                            <Grid2 item size={8} width={'100%'} >
                                                <Typography variant="h3" align="center">126</Typography>
                                            </Grid2>
                                            {/* TODO ensure text overflow does not expand card*/}
                                            <Grid2 item size={2} width={'100%'} maxHeight={'100%'} sx={{ overflow: 'hidden' }}>
                                                <Typography>Max Mustermann registered</Typography>
                                                <Typography>Fritz Heidel requested organizer role</Typography>
                                                <Typography>Franz was reported</Typography>

                                            </Grid2>

                                        </Grid2>
                                    </CardContent>
                                </Card>
                            </Grid2>

                            {/* Participants Card */}
                            {/* msut be replaced with data retrieval logic*/}
                            <Grid2 item size={4} >
                                <Card sx={{ height: '100%', width: '100%' }}>
                                    <CardContent>
                                        <Typography variant="subtitle1">Participants</Typography>
                                        <Typography variant="h3" align="center">1,123</Typography>
                                    </CardContent>
                                </Card>
                            </Grid2>

                            {/* Events Card */}
                            <Grid2 item size={4}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="subtitle1">Events</Typography>
                                        <Typography variant="h3" align="center">150</Typography>
                                    </CardContent>
                                </Card>
                            </Grid2>
                        </Grid2>

                        {/* Second row - Registered Users and Event Activity */}
                        <Grid2 container spacing={2} sx={{ width: '100%', p: 2, boxSizing: 'border-box' }} >


                            {/* Registered Participants Chart */}
                            <Grid2 item size={6}>
                                <RegisteredParticipantsCard />
                            </Grid2>

                            {/* Event Activity Chart */}
                            <Grid2 item size={6}>
                                <EventActivityCard />
                            </Grid2>
                        </Grid2>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default AdminDashboardWidget;
