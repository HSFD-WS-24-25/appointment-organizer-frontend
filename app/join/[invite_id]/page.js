'use client';

import { useParams } from "next/navigation";

export default function joinPage() {

    const params = useParams();
    const invite_id = params.invite_id;
    let backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    console.log(invite_id);

    // Fetch event data from the backend.
    // need to use our own route, because
    // otherwise the request needs to be authenticated
    // We will use an encrypted string (token) consisting of:
    // event_id + user_id + creation_date_invitation (+ validity + secret)
    // this token can only be decrypted by the backend
    fetch(`${backendUrl}/api/invite/${invite_id}`)
        .then(res => console.log(res))
    return (<h1>Test with id: {params.invite_id}</h1>
    )
}