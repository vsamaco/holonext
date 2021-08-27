import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

function useVideos() {
  const { data, error, isValidating, mutate } = useSWR(
    `/api/videos`,
    fetcher,
    { initialData: [], revalidateOnMount: true }
  )

  return {
    liveVideos: data,
    isLoading: !error && !data,
    isError: error,
    mutateVideos: mutate,
    isValidatingVideos: isValidating,
  }
}

export default useVideos
