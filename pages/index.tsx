import Sidebar from '@/components/Sidebar';
import AppContent from '@/components/AppContent';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify 2.0</title>
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>

      <main className="flex">
        <Sidebar />
        <AppContent />
      </main>

      <div>{/* player */}</div>
    </div>
  );
}
