/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import useRequest from 'hooks/useRequest'
import React from 'react'
import YouTube from 'react-youtube'

export default function TrailerContent({ url }) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYjdhMTlmNWY1ZmI3ZWQ5MzlmMGFkZTRhZWI0NWExOSIsInN1YiI6IjY1NWRiY2Q1NjI5YjJjMDExZWNmZTBkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p98-cyyEnQxxRsqI5aYmD4Lq-PsAON--NCT0IOkl8go'
    }
  }
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  }
  const youtube_parser = (url) => {
    console.log(url, typeof url)
    return String(url).match(
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\\/&]{10,12})/
    )[1]
  }
  const youtubeID = youtube_parser(url)
  console.log(youtubeID)

  return <YouTube videoId={String(youtubeID)} opts={opts} className='h-full w-full' />
}
