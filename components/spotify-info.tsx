"use client"
import type { NowPlayingResponse } from '@/app/lib/types';

import Play from '@/components/icons/play'
import Pause from '@/components/icons/pause'
import MusicalNote from '@/components/icons/musical-note'

import { useEffect, useState } from 'react';
import { useStore, startFastNowUpdate } from '@/app/lib/stores';
import { NextResponse } from 'next/server';
import axios from 'axios';

export const SpotifyInfo = () => {
    const [data, setData] = useState<NowPlayingResponse | undefined>();
    const [lastFetched, setLastFetched] = useState(new Date());
    const fastNow = useStore(state => state.fastNow)

    async function fetchNowPlaying() {
        try {
            const response = await axios.get('/api/now-playing');
            const result = NextResponse.json(response);
            setData(result);
        } catch (error) {
            console.error(error)
        }
    }
    
    function clamp(t: number) {
        return Math.max(Math.min(t, 1), 0);
    }

    useEffect(() => {
        fetchNowPlaying();
        const id = setInterval(() => fetchNowPlaying(), 5000);
		return () => clearInterval(id);
    }, [])

    let progress = data?.track
        ? clamp(
                (data.progessMs + (fastNow.getTime() - lastFetched.getTime())) /
                    data.track.duration_ms
            )
        : 0;
    
    useEffect(() => {
        const stopFastNowUpdate = startFastNowUpdate();
        return () => stopFastNowUpdate
    }, [])

    return (
        <div className="mt-4 flex rounded-full items-center bg-gray-900">
            {data?.track?.album.images[0]?.url ? (
                <object
                    data={data.track.album.images[0].url}
                    type="image/png"
                    className="w-20 h-20 rounded-xl shrink-0 bg-gray-800 text-gray-400 grid place-items-center"
                    aria-label="Album Art"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            fillRule="evenodd"
                            d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V9.017 5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z"
                            clipRule="evenodd"
                        />
                    </svg>
                </object>
            ) : (
                <div
                    className="w-20 h-20 rounded-xl shrink-0 bg-gray-800 text-gray-400 grid place-items-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            fillRule="evenodd"
                            d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V9.017 5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            )}
                
            <div className="pl-4 py-2 pr-4 relative">
                <p className="line-clamp-1 break-all text-gray-400">
                    {data?.track ? (
                        <>
                            <a
                                href={data.track.external_urls.spotify}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mr-1 text-white font-semibold border-b border-transparent transition hv:border-current"
                            >
                                {data.track.name}
                            </a>

                            {data.track.artists.map((artist, i) => (
                                <span key={artist.id}>
                                    {i !== 0 && ', '}
                                    <a
                                        href={artist.external_urls.spotify}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="border-b border-transparent transition hv:border-current"
                                    >
                                        {artist.name}
                                    </a>
                                </span>
                            ))}
                        </>
                    ) : (
                        'Not Listening to Anything'
                    )}
                </p>

                <p className="flex items-center gap-1 text-sm text-gray-400">
                    <span className="shrink-0">
                        <MusicalNote />
                    </span>

                    <span className="line-clamp-1 break-all">
                        {data?.isPlayingNow
                            ? 'Listening Now'
                            : data?.track
                            ? 'Last Played on Spotify'
                            : 'Spotify'}
                    </span>
                </p>
            </div>

            {data?.isPlayingNow && (
                <div
                className="ml-auto shrink-0 w-12 h-12 mr-4 rounded-full progress"
                style={{ '--progress': progress } as React.CSSProperties} // Inline styles in React
                >
                <div className="w-10 h-10 rounded-full bg-gray-900 mt-1 ml-1 grid place-items-center text-gray-400">
                    {data.isPaused ? <Play /> : <Pause />}
                </div>
                </div>
            )}
        </div>
    )
}