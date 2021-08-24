import useSWR from 'swr'
import Head from 'next/head'
import Dashboard from '../components/Dashboard'
import RefreshIcon from '../assets/refreshIcon'

const fetcher = url => fetch(url).then(r => r.json())

export default function Home(props) {
  const { channels } = props;
  const { data, mutate, error, isValidating } = useSWR(
    `/api/videos`,
    fetcher,
    { initialData: props.liveVideos }
  )

  const refreshData = (event) => {
    console.log('refresh data');
    mutate()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-blue-900 text-white relative">
      <Head>
        <title>HoloNEXT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="fixed top-5 right-5">
        <button disabled={isValidating} onClick={refreshData} className={`bg-gray-300 p-2 w-10 rounded-full ${isValidating ? 'text-red-300 animate-spin': 'text-black'}`}>
          <RefreshIcon />
        </button>
      </div>
      <Dashboard channels={channels} liveVideos={data} />
    </div>
  )
}

export async function getStaticProps() {
  const channels = await fetcher(`${process.env.HOLOSERVER_URL}/channels`)
  const liveVideos = await fetcher(`${process.env.HOLOSERVER_URL}/videos?live_broadcast_content=live&live_broadcast_content=upcoming`)

  return {
    props: {
      channels,
      liveVideos,
    },
    revalidate: 900, // seconds, 15 minutes
  }
}
