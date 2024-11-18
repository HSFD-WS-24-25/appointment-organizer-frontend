'use client';

import React from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';

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
          <div className="md:w-1/6">
            <img
              src={user.picture}
              alt="Profile"
              className="rounded-full w-24 h-24 md:w-32 md:h-32 mb-3 md:mb-0"
              decode="async"
              data-testid="profile-picture"
            />
          </div>
          <div className="md:w-5/6">
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
