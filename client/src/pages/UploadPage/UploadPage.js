//@flow

import React from 'react'
import { Upload } from '../../components'
import { Link } from 'react-router-dom'
import './UploadPage.scss'

const UploadPage = () => (
  <div className="upload-page">
    <Link to="/" className="btn btn-outline-light btn-lg ">
      Back To Gallery
    </Link>
    <div className="Card">
      <Upload />
    </div>
  </div>
)

export default UploadPage
