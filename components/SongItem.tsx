import useSpotify from '@/hooks/useSpotify';
import {millisecondToMinutesAndSeconds} from '@/lib/time';

function SongItem({track, order}: {track: SpotifyApi.TrackObjectFull; order: number}) {
  const spotifyApi = useSpotify();

  return (
    <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer">
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
    </div>
  );
}

export default SongItem;
