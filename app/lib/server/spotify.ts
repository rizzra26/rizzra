import axios from 'axios';
import { NextResponse } from 'next/server';

import type { AccessToken } from '@spotify/web-api-ts-sdk';
type AccessTokenResponse = {
	access_token: string;
	token_type: string;
	expires_in: number;
	scope: string;
};

declare const btoa: (input: string) => string;

export const getSpotifyAccessToken = async () => {
  const url = 'https://accounts.spotify.com/api/token';
  const data = new URLSearchParams();
  data.append('grant_type', 'authorization_code');
  data.append('code', process.env.SPOTIFY_AUTHORIZATION_CODE);
  data.append('redirect_uri', process.env.NEXT_URL!);  // The same redirect URI used in the authorization step
  data.append('client_id', process.env.SPOTIFY_CLIENT_ID!);
  data.append('client_secret', process.env.SPOTIFY_CLIENT_SECRET!);
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('Access Token:', response.data.access_token);
  } catch (error) {
    console.error('Error exchanging code for token:', error.response?.data || error.message);
  }
};