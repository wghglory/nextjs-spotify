import {PauseIcon, PlayIcon, RewindIcon, SwitchHorizontalIcon} from '@heroicons/react/outline';
import {useSession} from 'next-auth/react';
import {useCallback, useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';

import {currentTrackIdState, isPlayingState} from '@/atoms/playerState';
import useSongInfo from '@/hooks/useSongInfo';
import useSpotify from '@/hooks/useSpotify';

function Player() {
  const spotifyApi = useSpotify();
  const {data: session, status} = useSession();
  const [currentTrackId, setCurrentIdTrack] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();

  const fetchCurrentSong = useCallback(() => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log('Now playing', data.body?.item);

        if (data.body?.item?.id) setCurrentIdTrack(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  }, [setCurrentIdTrack, setIsPlaying, songInfo, spotifyApi]);

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, fetchCurrentSong, spotifyApi, session]);

  return (
    <div className="n-24 bg-gradient-to-b from-black to-gray-900 grid-cols-3 text-xs m:text-base px-2 md:px-8">
      {/* Left */}
      <div className="flex items-center space-x-4">
        <img className="hidden md:inline h-10 w-10" src={songInfo?.album.images?.[0]?.url} alt="" />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon
          // onClick=(() => spotifyApi.skipToPrevious()} -- The API is not working
          className="button"
        />
        {isPlaying ? <PauseIcon className="button w-10 h-10" /> : <PlayIcon className="button w-10 h-10" />}
      </div>
    </div>
  );
}
