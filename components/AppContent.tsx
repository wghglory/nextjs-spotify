import {ChevronDownIcon} from '@heroicons/react/outline';
import {shuffle} from 'lodash';
import {signOut, useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';

import {playlistIdState} from '@/atoms/playlistAtom';
import useSpotify from '@/hooks/useSpotify';

import SongList from './SongList';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];

function AppContent() {
  const {data: session} = useSession();
  const [color, setColor] = useState<string | undefined>();
  const spotifyApi = useSpotify();
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useState<SpotifyApi.SinglePlaylistResponse>();

  useEffect(() => {
    if (playlistId) {
      setColor(shuffle(colors).pop());
    }
  }, [playlistId]);

  useEffect(() => {
    if (playlistId) {
      spotifyApi
        .getPlaylist(playlistId)
        .then((res) => {
          setPlaylist(res.body);
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  }, [playlistId, spotifyApi]);

  return (
    <div className="flex-grow overflow-y-auto h-screen no-scrollbar">
      <header className="absolute right-8 top-6">
        <button
          className="flex items-center text-white bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
          onClick={() => signOut()}
        >
          <img className="rounded-full w-10 h-10" src={session?.user?.image || ''} alt="" />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </button>
      </header>

      <section className={`bg-gradient-to-b ${color} to-black h-80 flex items-end text-white gap-x-6 p-8`}>
        <img src={playlist?.images?.[0].url} alt="playlist image" className="w-44 h-44 shadow-2xl" />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl lg:text-5xl text-bold">{playlist?.name}</h1>
        </div>
      </section>

      {playlist && <SongList playlist={playlist} />}
    </div>
  );
}

export default AppContent;
