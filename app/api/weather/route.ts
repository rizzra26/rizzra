import { NextResponse } from "next/server";

export async function GET() {
	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=-6.15&lon=106.91&units=imperial&appid=${process.env.WEATHER_API_KEY}`, {
            method: 'GET',
            headers: {
                'Cache-Control': 'public, max-age=0, s-maxage=300'
            }
        }
	)

    const data = await response.json();

	return NextResponse.json(data);
}