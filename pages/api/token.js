import { getAccessToken } from '@auth0/nextjs-auth0';

export default async function handler(req, res) {
    try {
        const { accessToken } = await getAccessToken(req, res, {
            audience: 'http://localhost:3001/api',
            scope: 'read:users',
        });

        res.status(200).json({ accessToken });
    } catch (err) {
        console.error(err);
        res.status(err.status || 500).json({ error: 'Failed to get access token' });
    }
}