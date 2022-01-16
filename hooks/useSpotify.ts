import spotifyApi from '@/lib/spotify';
import {signIn, useSession} from 'next-auth/react';
import {useEffect} from 'react';

export default function useSpotify() {
  const {data: session} = useSession();

  useEffect(() => {
    if (session) {
      if (session.error === 'RefreshAccessTokenError') {
        signIn();
      }

      spotifyApi.setAccessToken(session.accessToken as string);
    }
  }, [session]);

  return spotifyApi;
}
