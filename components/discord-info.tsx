"use client"
import { useLanyard } from "react-use-lanyard";

import Discord from "@/components/icons/discord";
import { useEffect, useState } from "react";
import Image from "next/image";

const statusColors: Record<string, string> = {
    online: 'bg-emerald-500',
    idle: 'bg-amber-400',
    dnd: 'bg-rose-400',
    offline: 'bg-gray-600'
};

export const DiscordInfo = () => {
    const discordId = '496060002650554369';

    const [status, setStatus] = useState<any>(null); 
    const { data } = useLanyard({
        userId: discordId,
    });

    const customStatus = status?.data?.activities?.find(i => i.type === 4);

    useEffect(() => {
        if (data) {
            setStatus(data);
        }
    }, [data]);
    return (
        <div className="mt-8 flex rounded-full items-center bg-gray-900">
            <div className="relative w-20 h-20 shrink-0 rounded-full">
                {status ? (
                    <div>
                        <object
                            data={`https://cdn.discordapp.com/avatars/${discordId}/${status?.data?.discord_user?.avatar}`}
                            type="image/png"
                            className="w-20 h-20 rounded-full bg-gray-800 text-gray-400 grid place-items-center"
                            aria-label="Discord Avatar"
                        >
                            <Discord />
                        </object>

                        <span
                            className={`z-10 absolute w-4 h-4 bottom-1 right-1 rounded-full ring-4 ring-gray-900
                                ${statusColors[status?.data?.discord_status]}`}
                        />
                    </div>
                ) : (
                    <div
                        className="w-20 h-20 rounded-full bg-gray-800 text-gray-400 grid place-items-center"
                    >
                        <Discord />
                    </div>
                )}
            </div>

            <div className="ml-4 py-2 pr-6">
                <div className="line-clamp-1 break-all text-gray-400">
                    {status && (
                        <div>
                            <span className="font-semibold text-white">
                                {status?.data?.discord_user?.display_name}
                            </span>

                            <span className="ml-1">
                                {status?.data?.discord_user?.username}
                            </span>
                        </div>
                    )}
                </div>

                {customStatus && (
                    <p className="flex items-center text-sm">
                        {customStatus.emoji && (
                            <Image
                                src={`https://cdn.discordapp.com/emojis/${customStatus
                                    .emoji.id}.png`}
                                alt=""
                                className="w-5 h-5 mr-1"
                            />
                        )}
                            
                        <span className="line-clamp-1 break-all">
                            "{customStatus.state || ''}"
                        </span>
                    </p>
                )}
                    
            </div>
        </div>
    )
}