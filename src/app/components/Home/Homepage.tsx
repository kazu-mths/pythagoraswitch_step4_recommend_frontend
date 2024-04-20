'use client';
import { useRef, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Login() {
    const formRef = useRef<HTMLFormElement>(null);
    const user_token: string | null = useSearchParams().get("token");
    const router = useRouter();

    const handleSend = async (event: any) => {
        event.preventDefault();

        router.push(`/recommend?token=${user_token}`);
    };


    return (
        <>
            <div>
                <form ref={formRef} onSubmit={handleSend} style={{ width: '100%' }}>
                    <button type="submit">white</button>
                </form>
            </div>
        </>
    );
}
