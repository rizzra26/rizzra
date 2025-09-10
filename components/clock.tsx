"use client"

import Sun from '@/components/icons/sun';
import Moon from '@/components/icons/moon';

import { startNowUpdate, useStore } from '@/app/lib/stores';
import { useEffect } from 'react';

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

    const isDay = now.getUTCHours() - 4 >= 6 && now.getUTCHours() - 4 < 18;

    useEffect(() => {
        const stopNowUpdate = startNowUpdate();
        return () => stopNowUpdate()
    }, [])

    return (
        <p className="mt-8 flex text-sm gap-2 items-center text-white">
            {isDay ? <Moon /> : <Sun />}
            {df.format(now)}
            &middot;
            {tf.format(now)}
        </p>
    )
}