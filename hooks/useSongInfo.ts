import {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';

import {currentTrackIdState} from '@/atoms/playerState';

import useSpotify from './useSpotify';

function useSongInfo() {
  const spotifyApi = useSpotify();
  const [currentIdTrack, setCurrentIdTrack] = useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState<SpotifyApi.SingleTrackResponse>();

  useEffect(() => {
    if (currentIdTrack) {
      fetch(`https://api.spotify.com/v1/tracks/${currentIdTrack}`, {
        headers: {
          Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
        },
      })
        .then((res) => res.json())
        .then((trackInfo: SpotifyApi.SingleTrackResponse) => {
          setSongInfo(trackInfo);
        });
    }
  }, [currentIdTrack, spotifyApi]);

  return songInfo;
}
export default useSongInfo;
