'use client';

import { useUser } from "@clerk/nextjs";

export default function Page() {
    const { user, isLoaded } = useUser();

    if (!isLoaded) {
        return <div>loading...</div>
    }

    return <div>hello {user?.username}</div>
}