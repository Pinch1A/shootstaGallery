import { getFileName } from './utils'
import fs from 'fs'
import path from 'path'
import mime from 'mime'

const videoFolder = process.env.DIR || './public/'

export const getAllVideos = (req, res) => {
  console.log('GET LIST', req.get('host'))
  fs.readdir(videoFolder, (err, files) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err)
    }
    const videoList = files.map((file) => {
      const name = file.replace(path.extname(file), '')
      const filePath = path.join(videoFolder, file)
      const url = `${req.protocol}://${req.get('host')}/${file}`
      const fileType = mime.getType(file)
      const fileObj = { name, filePath, url, fileType }
      return fileObj
    })
    return res.status(200).send(videoList)
  })
}

export const uploadFile = (req, res) => {
  if (!req.file) {
    const message = 'Not Supported.'
    console.log(message)
    return res.status(406).json({ fileName: '', message, status: 'error' })
  } else {
    const message = 'Successfully! uploaded'
    const fileName = getFileName(req.file)
    console.log(message)
    return res.status(200).json({ fileName, message, status: 'success' })
  }
}
