import React from 'react'
import './videoItem.scss'

const VideoItem = (props) => {
  const { name, url, fileType } = props
  return (
    <div className="video-card">
      <div className="flex video-name">{name}</div>
      <div>
        <video controls>
          <source src={url} type={fileType} />
          <div className="loading-video">Your Browser does not support HTML5 Video Tag</div>
        </video>
      </div>
    </div>
  )
}

export default VideoItem
