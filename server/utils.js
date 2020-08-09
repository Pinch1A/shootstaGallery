const path = require('path')

export const fileFilter = (req, file, cb) => {
  if (!file.mimetype.includes('video/')) {
    req.fileValidationError = 'goes wrong on the mimetype'
    return cb(null, false, new Error('goes wrong on the mimetype'))
  }
  cb(null, true)
}

export const getFileName = (file) => {
  const { originalname } = file
  const ext = path.extname(originalname)
  const name = originalname.replace(ext, '')
  return name.replace(/\s/g, '') + ext
}
