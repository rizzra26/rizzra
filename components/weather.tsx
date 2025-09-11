"use client"
import { WeatherResponse } from "@/app/lib/types";

import Cloud from '@/components/icons/cloud';

import { useEffect, useState } from "react";

// const names: Record<string, string> = {
//     'clear sky': 'clear skies',
//     'few clouds': 'a few clouds',
//     'scattered clouds': 'scattered clouds',
//     'broken clouds': 'broken clouds',
//     'shower rain': 'rain showers',
//     rain: 'rain',
//     thunderstorm: 'thunderstorms',
//     snow: 'snow',
//     mist: 'mist'
// };

export const Weather = () => {
    const [data, setData] = useState<WeatherResponse | null>(null)

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('/api/weather');
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
    }, [])

    return (
        <p className="mt-2 flex text-sm gap-2 items-center text-white">
            <Cloud />

            <span>
                It's&nbsp;
                
                <b>{data?.main?.temp?.toFixed(0)} °F</b> with&nbsp;
                {data?.weather?.[0]?.description ? data.weather[0].description : ''}
                &nbsp;in&nbsp;
                <b>{`North Jakarta`}</b>.
            </span>
        </p>
    )
}