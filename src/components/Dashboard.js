import React from 'react'
import Timeago from 'timeago-react'
import classnames from 'classnames'

import useVideos from '../hooks/useVideos'

const Dashboard = ({channels}) => {
  const { liveVideos, isLoading, isError } = useVideos();

  const sortChannels = (channel_a, channel_b) => {
    const videoA = liveVideos.find(v => v.channel_id === channel_a.external_id);
    const videoB = liveVideos.find(v => v.channel_id === channel_b.external_id);

    if(!videoA && !videoB) return 0;
    if (videoA?.live_broadcast_content && !videoB) return -1;
    if (videoB?.live_broadcast_content && !videoA) return 1;
    if (videoA?.live_broadcast_content === 'upcoming' && videoB?.live_broadcast_content === 'live') return 1;
    if (videoA?.live_broadcast_content === 'live' && videoB?.live_broadcast_content === 'upcoming') return -1;
    return 0;
  }

  return (
    <div className="container mx-auto bg-blue-900 px-5">
      <h1 className="text-6xl mt-20">HoloNEXT</h1>

      <div className="mt-5 flex gap-5 sticky top-0 py-5 px-5 bg-white text-black rounded-md overflow-x-scroll sm:overflow-x-auto border-b-2">
        {channels.sort(sortChannels).map(channel => {
          const video = liveVideos.find(v => v.channel_id === channel.external_id);
          const imageClass = classnames({
            'border-green-400': video && video.live_broadcast_content === 'live',
            'border-yellow-400': video && video.live_broadcast_content === 'upcoming',
          })

          const offlineClass = classnames({
            'grayscale filter': video?.live_broadcast_content !== 'live'
          })

          return (
            channel && (<div className="text-black flex flex-none sm:flex-grow flex-col justify-center items-center" key={channel.id}>
              <a href={video && `#video-${video.id}`} className={`w-12 sm:w-16 md:w-20 rounded-full border-4 p-1 ${imageClass}`}>
                <img className={`object-contain rounded-full  ${offlineClass}`} src={channel.thumbnails.default.url} title={channel.title}/>
              </a>
              <div className="text-sm overflow-ellipsis sm:text-lg font-semibold mt-2">{channel.first_name}</div>
            </div>)
          )
        })}
      </div>
      {isLoading && (<div className="mt-10 text-center text-lg text-white">
        Loading...
      </div>
      )}
      <ul className="mt-10 space-y-5 mb-48">
        {liveVideos.map(liveVideo => {
          const channel = channels.find(c => c.external_id === liveVideo.channel_id)
          const imageClass = classnames({
            'border-green-400': liveVideo && liveVideo.live_broadcast_content === 'live',
            'border-yellow-400': liveVideo && liveVideo.live_broadcast_content === 'upcoming',
          })

          const videoTime = liveVideo.live_broadcast_content === 'live' ? liveVideo.actual_start_time : liveVideo.scheduled_start_time;

          return channel && (<li className="rounded-md bg-white text-black" key={liveVideo.id}>
            <a className="relative -top-32 sm:-top-36 md:-top-40" name={`video-${liveVideo.id}`} />
            <div className="p-3">
              <div className="flex">
                <div className={`flex flex-none`}>
                  <div className={`w-14 h-14 sm:w-18 sm:h-18 md:w-24 md:h-24 rounded-full border-4 p-1 ${imageClass}`}>
                    <img className={`rounded-full object-contain`} src={channel.thumbnails.default.url} title={channel.title} />
                  </div>
                </div>
                <div className="ml-3 flex flex-col justify-center">
                  <div><span className="font-semibold">{channel.first_name} {channel.last_name}</span> &middot; <span className=" font-light"><Timeago datetime={videoTime} /></span></div>
                  <p>{liveVideo.title.trim()}</p>
                </div>
              </div>
              <div className="flex flex-col mt-3">
                <a href={`https://youtu.be/${liveVideo.external_id}`} target="_blank">
                  <img className="w-full" src={liveVideo.thumbnails.medium.url} title={liveVideo.title} />
                </a>
              </div>
            </div>
          </li>)
        })}
      </ul>
    </div>
  )
}

export default Dashboard
