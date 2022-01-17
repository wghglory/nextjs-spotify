import {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';

import {currentTrackIdState} from '@/atoms/playerState';

import useSpotify from './useSpotify';

function useSongInfo() {
  const spotifyApi = useSpotify();
  const [currentIdTrack, setCurrentIdTrack] = useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState<any>(); // TODO: type

  useEffect(() => {
    if (currentIdTrack) {
      fetch(`https://api.spotify.com/v1/tracks/${currentIdTrack}`, {
        headers: {
          Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
        },
      })
        .then((res) => res.json())
        .then((trackInfo) => {
          console.log(trackInfo);
          setSongInfo(trackInfo);
        });
    }
  }, [currentIdTrack, spotifyApi]);

  return songInfo;
}
export default useSongInfo;
