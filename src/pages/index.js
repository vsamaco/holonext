import useSWR from 'swr'
import Head from 'next/head'
import Dashboard from '../components/Dashboard'
import RefreshIcon from '../assets/refreshIcon'
import useVideos from '../hooks/useVideos'

const fetcher = url => fetch(url).then(r => r.json())

export default function Home({channels}) {
  const { mutateVideos, isValidatingVideos } = useVideos();

  const refreshData = (event) => {
    console.log('refresh data');
    mutateVideos()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-blue-900 text-white relative">
      <Head>
        <title>HoloNEXT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="absolute top-5 right-5">
        <button disabled={isValidatingVideos} onClick={refreshData} className={`bg-gray-300 p-2 w-10 rounded-full ${isValidatingVideos ? 'text-red-300 animate-spin': 'text-black'}`}>
          <RefreshIcon />
        </button>
      </div>
      <Dashboard channels={channels} />
    </div>
  )
}

export async function getStaticProps() {
  const channels = await fetcher(`${process.env.HOLOSERVER_URL}/channels`)

  return {
    props: {
      channels,
    },
    revalidate: 3600, // seconds, 1hour
  }
}
