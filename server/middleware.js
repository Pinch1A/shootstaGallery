import multer from 'multer'
import { getFileName } from './utils'

const fileFilter = function (req, file, cb) {
  if (!file.mimetype.includes('video/')) {
    req.fileValidationError = 'goes wrong on the mimetype'
    return cb(null, false, new Error('goes wrong on the mimetype'))
  }
  cb(null, true)
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.DIR)
  },
  filename: function (req, file, cb) {
    const nameLabel = getFileName(file)
    cb(null, nameLabel)
  },
})

export const upload = multer({ storage, fileFilter })
