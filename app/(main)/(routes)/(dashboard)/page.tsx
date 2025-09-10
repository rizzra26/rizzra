"use client"
import { SocialLink } from "@/components/social-link";
import { Clock } from "@/components/clock";
import { Weather } from "@/components/weather";
import { DiscordInfo } from "@/components/discord-info";
import { SpotifyInfo } from "@/components/spotify-info";

import GitHub from "@/components/icons/github";
import Envelope from "@/components/icons/envelope";
import LinkedIn from "@/components/icons/linkedin";
import Spotify from "@/components/icons/spotify";

const DashboardPage = () => {
	const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/pdf/CV_Rizky_Ramadhan.pdf'; // Path relatif ke file di dalam folder public
    link.download = 'CV_Rizky_Ramadhan.pdf'; // Nama file yang akan diunduh
    link.click(); // Memulai unduhan
  };
    return (
        <main className="wrapper fade">
			<h1 className="header">Rizky Ramadhan</h1>

			<p className="mt-4 text-gray-400">
				Hey! I'm <b>Rizky</b>, a fullstack developer from&nbsp;
				<b>Jakarta, Indonesia</b>.
			</p>

			<div className="flex justify-between">
				<div className="mt-4 flex gap-6">
					<SocialLink href="https://github.com/rizzra26" name="GitHub">
						<GitHub />
					</SocialLink>

					<SocialLink
						href="https://www.linkedin.com/in/rizkira"
						name="LinkedIn"
					>
						<LinkedIn />
					</SocialLink>

					<SocialLink
						href="https://open.spotify.com/user/22ah5au2dajm7rqn3znkf4tnq?si=95e89d77cb0046f5"
						name="Spotify"
					>
						<Spotify />
					</SocialLink>

					<SocialLink href="mailto:rizzra26@gmail.com" name="Email">
						<Envelope />
					</SocialLink>
				</div>
			</div>

			<Clock />
			<Weather />

			<div className="mt-8 gap-6 flex">
				<a className="px-6 py-2 border-1 border-white rounded-full text-white text-[14px] hover:bg-white hover:text-black transition duration-300" href="https://resume.rizzra.com" target="_blank">See resume</a>
				<div className="diagonal-line-container ml-2">
					<span className="diagonal-line"></span>
				</div>
				<button onClick={handleDownload} className="px-6 cursor-pointer py-2 border-1 border-white rounded-full text-white text-[14px] hover:bg-white hover:text-black transition duration-300">Download cv</button>
			</div>

			<DiscordInfo />
			{/* <SpotifyInfo /> */}
		</main>
    )
}

export default DashboardPage;