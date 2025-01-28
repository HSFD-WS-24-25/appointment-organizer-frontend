'use client';

import React from 'react';
import {useUser} from '@auth0/nextjs-auth0/client';
import {useFetchApiData} from "@/app/[locale]/lib/useFetchApiData";
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

function App() {
    const t = useTranslations('Users');
    const { user, error: authError, isLoading } = useUser();
    const path = "/api/users";
    const method = 'GET';
    const {data: users, error: fetchError} = useFetchApiData(user, path, method);

    if (isLoading) return <div>{t('text_loading')}</div>;
    if (authError) return <div>{t('text_error_loading_user_data')}{authError.message}</div>;
    if (!user) return <div>{t('text_please_log_in')}</div>;
    if (fetchError) return <div>{t('text_error_fetching_user_data')}{fetchError.message}</div>;

    return (
        <div className="App">
            <h1>{t('title')}</h1>
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
