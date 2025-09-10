import axios from 'axios';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import type { NowPlayingResponse } from '@/app/lib/types';
import { getSpotifyAccessToken } from '@/app/lib/server/spotify';

export async function GET() {
  try {
    const accessToken = await getSpotifyAccessToken();
  } catch (error) {
    console.error('Error fetching current track:', error);
  }
}