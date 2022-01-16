import SongItem from './SongItem';

function SongList({playlist}: {playlist: SpotifyApi.SinglePlaylistResponse}) {
  return (
    <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
      {playlist?.tracks.items.map((item, i) => (
        <SongItem key={item.track.id} track={item.track} order={i} />
      ))}
    </div>
  );
}

export default SongList;
