import React from 'react'
import './Progress.scss'

const Progress = ({ status, progress }) => {
  return (
    <div className={`ProgressBar ${status}`}>
      <div className={`Progress ${status}`} style={{ width: `${progress}%` }} />
    </div>
  )
}

export default Progress
