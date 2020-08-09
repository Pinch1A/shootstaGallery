//@flow

import React, { useState } from 'react'
import { Dropzone, Progress } from '../../components'
import { CheckCircle, Warning, NewFile } from '../../Icons'
import VideoService from '../../services/videoService'
import './Upload.scss'

const uploadStatus = {
  WAITING: 'waiting',
  PENDING: 'pending',
  INPROGRESS: 'inprogress',
  DONE: 'done',
  ERROR: 'error',
}

const getLabel = (name) => name.replace(/ /g, '').slice(0, -4)

const Upload = () => {
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadCompleted, setUploadCompleted] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({})
  const [errors, setErrors] = useState({})

  const clearState = () => {
    setFiles([])
    setUploadProgress({})
    setErrors({})
    setUploadCompleted(false)
  }

  const filesToState = (uploadList) => {
    uploadList.forEach((upfiles) => files.push(upfiles))
    setFiles(files)
    files.forEach((file) => {
      const fileLabel = getLabel(file.name)
      const newUploadProgress = {
        [fileLabel]: {
          status: uploadStatus.WAITING,
          percentage: 0,
        },
      }
      const newError = { [fileLabel]: {} }
      setUploadProgress((uploadProgress) => ({ ...uploadProgress, ...newUploadProgress }))
      setErrors((errors) => ({ ...errors, ...newError }))
    })
  }

  const renderProgress = (file) => {
    const fileLabel = getLabel(file.name)
    const fileUploadProgress = uploadProgress[fileLabel]
    return (
      fileUploadProgress !== uploadStatus.WAITING && (
        <div className="ProgressWrapper">
          <Progress status={fileUploadProgress.status} progress={fileUploadProgress.percentage} />
        </div>
      )
    )
  }

  const renderActions = () => {
    if (uploadCompleted) {
      return <button onClick={clearState}>Clear</button>
    } else {
      return (
        <button disabled={files.length <= 0 || uploading} onClick={uploadFiles}>
          Upload
        </button>
      )
    }
  }

  const sendRequest = (file) => {
    setUploading(true)

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Cache-Control': 'no-cache',
      },
      onUploadProgress: ({ loaded, total }) => {
        let percentCompleted = Math.floor((loaded * 100) / total)
        const fileLabel = getLabel(file.name)
        if (percentCompleted < 100) {
          uploadProgress[fileLabel] = {
            percentage: percentCompleted,
            status: uploadStatus.PENDING,
          }
          setUploadProgress({ ...uploadProgress })
        }
        if (percentCompleted === 100) {
          uploadProgress[fileLabel] = { status: uploadStatus.DONE, percentage: 100 }
          setUploadProgress({ ...uploadProgress })
        }
      },
    }

    let formData = new FormData()
    formData.append('file', file)

    VideoService.upload({ formData, config }).catch((error) => {
      const { message } = error.response.data
      const fileLabel = getLabel(file.name)
      uploadProgress[fileLabel] = { status: uploadStatus.ERROR, percentage: 100 }
      errors[fileLabel] = { message }
      setUploadProgress(uploadProgress)
      setErrors(errors)
    })
  }

  const uploadFiles = () => {
    files.forEach((file) => {
      sendRequest(file)
      setUploadCompleted(true)
      setUploading(false)
    })
  }
  return (
    <div className="Upload">
      <span className="Title">Upload Videos</span>
      <div className="Content">
        <div>
          <Dropzone filesToState={filesToState} disabled={uploading || uploadCompleted} />
        </div>
        <div className="Files">
          {files.length > 0 &&
            files.map((file, index) => {
              const fileLabel = getLabel(file.name)
              const fileUploadProgress = uploadProgress[fileLabel]
              const hasError = fileUploadProgress.status === uploadStatus.ERROR
              return (
                <div key={`${fileLabel}-${index}`} className="Row">
                  <div className="Item">
                    <div className="Filename">
                      <div className="name">
                        <NewFile width="20" height="20" />
                        {file.name}
                      </div>
                      {errors[fileLabel].message && (
                        <div className="error">{errors[fileLabel].message}</div>
                      )}
                    </div>
                    {fileUploadProgress.status === uploadStatus.DONE && (
                      <CheckCircle width="30" height="30" />
                    )}
                    {hasError && <Warning width="30" height="30" />}
                  </div>
                  {fileUploadProgress.status !== uploadStatus.WAITING && renderProgress(file)}
                </div>
              )
            })}
        </div>
      </div>
      <div className="Actions">{renderActions()}</div>
    </div>
  )
}

export default Upload
