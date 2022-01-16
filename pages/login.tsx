import {InferGetServerSidePropsType} from 'next';
import Image from 'next/image';
import {ClientSafeProvider, getProviders, signIn} from 'next-auth/react';

function LoginPage({providers}: {providers: InferGetServerSidePropsType<typeof getServerSideProps>}) {
  return (
    <div className="flex flex-col items-center justify-center bg-black h-screen">
      <Image className="w-52 mb-5" src="/assets/spotify.png" width={208} height={208} alt="Spotify logo" />

      {providers &&
        (Object.values(providers) as unknown as ClientSafeProvider[]).map((provider: ClientSafeProvider) => (
          <div key={provider.name}>
            <button
              className="bg-[#18d860] text-white p-5 rounded-full mt-4"
              onClick={() => {
                // https://developer.spotify.com/dashboard/applications/0e3eff139050415a9635bc8e4394622a
                // Spotify settings redirect uris: http://localhost:3000/api/auth/callback/spotify
                signIn(provider.id, {callbackUrl: '/'});
              }}
            >
              Login with {provider.name}
            </button>
          </div>
        ))}
    </div>
  );
}

export default LoginPage;

export async function getServerSideProps() {
  const providers = await getProviders();

  // {
  //   spotify: {
  //     id: 'spotify',
  //     name: 'Spotify',
  //     type: 'oauth',
  //     signinUrl: 'http://localhost:3000/api/auth/signin/spotify',
  //     callbackUrl: 'http://localhost:3000/api/auth/callback/spotify'
  //   }
  // }

  return {
    props: {providers},
  };
}
