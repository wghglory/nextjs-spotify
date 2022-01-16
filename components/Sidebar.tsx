import {HomeIcon, SearchIcon, LibraryIcon, HeartIcon, RssIcon, PlusCircleIcon} from '@heroicons/react/outline';
import useSpotify from 'hooks/useSpotify';
import {signOut, useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';

function Sidebar() {
  const {data: session} = useSession();
  const [playlist, setPlaylist] = useState<SpotifyApi.PlaylistObjectSimplified[]>([]);
  const spotifyApi = useSpotify();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((res) => {
        setPlaylist(res.body.items);
      });
    }
  }, [spotifyApi, session]);

  //  session is like {
  //     "user": {
  //         "name": "Guanghui Wang",
  //         "email": "wghglory89@gmail.com",
  //         "image": "https://platform-lookaside.fbsbx.com..."
  //     },
  //     "expires": "2022-02-14T08:15:30.497Z",
  //     "accessToken": "xxxx",
  //     "refreshToken": "Ayyy",
  //     "username": "22fujndhf5ters54t5d3uesbq"
  // }
  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-auto no-scrollbar h-screen">
      <div className="space-y-4">
        <button onClick={() => signOut()} className="flex items-center space-x-2 hover:text-white">
          <p>Log out</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {playlist.map((p) => (
          <p key={p.id} className="cursor-pointer hover:text-white">
            {p.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
