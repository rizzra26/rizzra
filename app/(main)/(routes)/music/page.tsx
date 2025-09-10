import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Music - Rizky",
    description: "Music i've listened to the most on spotify"
}

const MusicPage = () => {
    return (
        <div className='wrapper fade'>
            <p>Music</p>
        </div>
    )
}

export default MusicPage;