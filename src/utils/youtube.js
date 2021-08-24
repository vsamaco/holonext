export default class Youtube {
  BASE_URL = 'https://www.googleapis.com/youtube/v3'
  API_KEY = process.env.YOUTUBE_API_KEY

  getVideos(videoIds = []) {
    const url = new URL(this.BASE_URL + '/videos');
    const params = {
      key: this.API_KEY,
      part: 'snippet,liveStreamingDetails',
      type: 'video',
      id: videoIds.join(','),
    }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    return fetch(url)
      .then(this.handleErrors)
      .then(response => response.json())
      .then(response => response.items)
  }

  getSearch(q, broadcastType='live') {
    const url = new URL(this.BASE_URL + '/search');
    const params = {
      key: this.API_KEY,
      part: 'snippet',
      type: 'video',
      eventType: broadcastType,
      q: q,
    };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    return fetch(url)
      .then(this.handleErrors)
      .then(response => response.json())
      .then(response => response.items)
  }

  handleErrors = async (response) => {
    if (!response.ok) {
      const message = await response.json();
      throw Error(`${response.status} ${JSON.stringify(message)}`)
    }
    return response;
  }
}