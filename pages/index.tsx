import Sidebar from '@/components/Sidebar';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Sidebar />
        {/* Center */}
      </main>

      <div>{/* player */}</div>
    </div>
  );
}
