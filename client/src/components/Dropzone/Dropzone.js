import React, { useState, useRef } from 'react'
import './Dropzone.scss'
import { CloudComputing } from '../../Icons'

function fileListToArray(list) {
  const array = []
  for (var i = 0; i < list.length; i++) {
    array.push(list.item(i))
  }
  return array
}

const Dropzone = ({ disabled, filesToState }) => {
  const fileInputRef = useRef()
  const [hightlight, setHighlight] = useState(false)
  const onFilesAdded = (data) => {
    let list
    if (disabled) return
    if (data.target && data.target.files) {
      list = fileListToArray(data.target.files)
      data.target.value = null
    }
    filesToState(list || data)
  }

  const openFileDialog = () => {
    if (disabled) return
    fileInputRef.current.click()
  }
  const onDragOver = (evt) => {
    evt.preventDefault()
    if (disabled) return
    setHighlight(true)
  }
  const onDragLeave = () => {
    setHighlight(false)
  }

  const onDrop = (event) => {
    event.preventDefault()

    if (disabled) return

    const files = [...event.dataTransfer.files]
    onFilesAdded(files)
    setHighlight(false)
  }

  return (
    <div
      className={`dropzone ${hightlight ? 'Highlight' : ''}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={openFileDialog}
      style={{ cursor: disabled ? 'default' : 'pointer' }}
    >
      <CloudComputing heigth="220" width="250" />
      <input
        ref={fileInputRef}
        className="FileInput"
        type="file"
        multiple
        onChange={onFilesAdded}
      />
      <span className="drag-label">Drag Your files or click </span>
    </div>
  )
}

export default Dropzone
