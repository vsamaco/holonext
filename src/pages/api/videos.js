const fetcher = url => fetch(url).then(r => r.json())

export default async function videosAPI(req, res) {
  console.log('videos api')
  // https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#filters
  const videos = await fetcher(`${process.env.HOLOSERVER_URL}/videos?live_broadcast_content=live&live_broadcast_content=upcoming`)
  res.status(200).json(videos)
}
