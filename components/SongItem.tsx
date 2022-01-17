import {useRecoilState} from 'recoil';

import {currentTrackIdState, isPlayingState} from '@/atoms/playerState';
import useSpotify from '@/hooks/useSpotify';
import {millisecondToMinutesAndSeconds} from '@/lib/time';

function SongItem({track, order}: {track: SpotifyApi.TrackObjectFull; order: number}) {
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  function playSong() {
    setCurrentTrackId(track.id);
    setIsPlaying(true);

    spotifyApi
      .play({
        uris: [track.uri],
      })
      .catch((err) => {
        // Details: Player command failed: Premium required PREMIUM_REQUIRED.
        console.log(err);
      });
  }

  return (
    <a
      className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img className="h-10 w-10" src={track.album.images?.[0]?.url} alt="" />
        <div>
          <p className="w-36 lg:w-64 text-white truncate">{track.name}</p>
          <p className="w-40">{track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline">{track.album.name}</p>
        <p>{millisecondToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </a>
  );
}

export default SongItem;
