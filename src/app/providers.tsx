// app/providers.tsx
'use client'
import posthog from 'posthog-js'
import {PostHogProvider} from 'posthog-js/react'
import {useEffect, useState} from "react";

if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        capture_pageview: false // Disable automatic pageview capture, as we capture manually
    })
}

export function PHProvider({
                               children,
                           }: {
    children: React.ReactNode
}) {
    const [host, setHost] = useState<string>("")

    useEffect(() => {
        setHost(window.location.host)
    }, []);

    if(host == "zoozle.in"){
        return <PostHogProvider client={posthog}>{children}</PostHogProvider>
    } else {
        return <>{children}</>
    }
}