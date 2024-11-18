'use client';

import React from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import {Avatar} from "@mui/material";

//import ErrorMessage from '../../components/ErrorMessage';

function Profile() {
  const { user, isLoading } = useUser();

  if (isLoading) return null;

  return (
    <>
      {user && (
        <div
          className="flex flex-col md:flex-row items-center mb-5 text-center md:text-left"
          data-testid="profile"
        >
          <Avatar
              alt="Remy Sharp"
              src={user.picture}
              sx={{ width: 90, height: 90 }}
          />
          <div className="md:w-5/6 ml-2">
            <h2 data-testid="profile-name" className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-muted text-gray-500" data-testid="profile-email">
              {user.email}
            </p>
            user.sub: {user.sub}
            <p></p>
            user.nickname: {user.nickname}
          </div>
        </div>
      )}
    </>
  );
}

export default withPageAuthRequired(Profile, {
  onRedirecting: () => null,
  onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});
