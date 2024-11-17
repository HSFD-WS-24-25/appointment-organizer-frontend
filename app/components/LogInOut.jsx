
'use client';
import { useUser } from '@auth0/nextjs-auth0/client';

const LogInOut = () => {
const {user, isLoading} = useUser();

  if(!user && !isLoading) {
    return <a href="/api/auth/login">Login</a>;
  } else {
    return  <div>
                <a href="profile">Profile</a>
                <br/>
                <a href="/api/auth/logout">Logout</a>
            </div>;
  }
};

export default LogInOut;