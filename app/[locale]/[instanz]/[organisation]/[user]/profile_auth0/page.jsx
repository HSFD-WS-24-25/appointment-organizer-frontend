'use client';

import React from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { Avatar, Box, Card, CardContent, Typography, Button } from '@mui/material';
import DesignTitel from "@/app/[locale]/components/styledComponents/DesignTitel";
import StyledPaper from "@/app/[locale]/components/styledComponents/StyledPaper";
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

//import ErrorMessage from '../../components/ErrorMessage';

function Profile() {
  const t = useTranslations('ProfileAuth0');
  const { user, isLoading } = useUser();

  if (isLoading) return null;

  return (

    <>
      {user && (    
        <StyledPaper>
        <Box
        >
          <DesignTitel>{t('title')}</DesignTitel>
          <Card
            className="shadow-lg"
            sx={{
              maxWidth: 500,
              padding: 3,
              borderRadius: 4,
              backgroundColor: '#fff',
            }}
          >
            <Box className="flex justify-center mb-4">
              <Avatar
                alt={user.name}
                src={user.picture}
                sx={{
                  width: 180,
                  height: 180,
                  border: '3px solid #1976d2',
                }}
              />
            </Box>
            <CardContent>
              <Typography
                variant="h5"
                className="text-center"
                data-testid="profile-name"
                sx={{ fontWeight: 'bold', marginBottom: 2 }}
              >
                {user.name}
              </Typography>
              <Typography
                variant="body1"
                className="text-center text-gray-600"
                data-testid="profile-email"
                sx={{ marginBottom: 3 }}
              >
                {user.email}
              </Typography>
              <Box className="bg-gray-100 rounded-lg p-3 text-sm text-gray-700">
                <Typography>
                  <strong>{t('text_user_id')}</strong> {user.sub}
                </Typography>
                <Typography>
                  <strong>{t('text_nickname')}</strong> {user.nickname}
                </Typography>
              </Box>
              <Box className="mt-5 flex justify-center">
              </Box>
            </CardContent>
          </Card>
        </Box>
        </StyledPaper>
      )}
    </>
  );
}

export default withPageAuthRequired(Profile, {
  onRedirecting: () => null,
  onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});
