"use client"

import Sun from '@/components/icons/sun';
import Moon from '@/components/icons/moon';

import { startNowUpdate, useStore } from '@/app/lib/stores';
import { useEffect, useState } from 'react';

export const Clock = () => {
    const now = useStore((state) => state.now)
    
    const df = new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		year: 'numeric',
		month: 'long',
		timeZone: 'Asia/Jakarta'
	});

	const tf = new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		timeZone: 'Asia/Jakarta',
		timeZoneName: 'short'
	});

    const [isDay, setIsDay] = useState<boolean | null>(null);

    useEffect(() => {
        const checkDaytime = () => {
            const hours = now.getUTCHours() - 4;
            setIsDay(hours >= 6 && hours < 18);
        };

        checkDaytime();
        const stopNowUpdate = startNowUpdate();
        return () => {
            stopNowUpdate();
        };
    }, [now]);

    if (isDay === null) return null;

    return (
        <p className="mt-8 flex text-sm gap-2 items-center text-white">
            {isDay ? <Moon /> : <Sun />}
            {df.format(now)}
            &middot;
            {tf.format(now)}
        </p>
    )
}