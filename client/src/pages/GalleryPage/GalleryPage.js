// @flow
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { GalleryList } from '../../components'
import VideoService from '../../services/videoService'
import { Upload } from '../../Icons'
import './GalleryPage.scss'

const GalleryPage = () => {
  const [videoList, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    VideoService.getAll()
      .then((res) => {
        setLoading(false)
        setList(res.data)
      })
      .catch((e) => {
        setLoading(false)
        setError('Something wrong..')
      })

    return setList([])
  }, [])

  return (
    <div className="gallery">
      <div className="header">
        <div className="flex title">Video Gallery</div>
        <Link type="button" className="btn btn-outline-dark btn-lg" to="/add">
          <Upload width="30" heigth="30" />
          <span>Add More Videos</span>
        </Link>
      </div>
      {loading ? (
        <div> Fetching data... </div>
      ) : (
        <GalleryList videoList={videoList} error={error} />
      )}
    </div>
  )
}

export default GalleryPage
