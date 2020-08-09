import React from 'react'
import { Link } from 'react-router-dom'

import { VideoItem } from '../../components'
import './GalleryList.scss'

const GalleryList = ({ videoList, error }) => {
  return (
    <>
      {error ? (
        <div className="error-message">{error}</div>
      ) : videoList.length > 0 ? (
        <div className="gallery-wrap">
          {videoList.map((item, index) => (
            <VideoItem {...item} key={index} />
          ))}
        </div>
      ) : (
        <div className="empty-list">
          Your video gallery is empty, please <Link to="/add">&nbsp;upload</Link>
        </div>
      )}
    </>
  )
}

export default GalleryList
