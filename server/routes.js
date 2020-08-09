import express from 'express'
import { upload } from './middleware'
import { getAllVideos, uploadFile } from './controllers'
const router = express.Router()

router.get('/videos', getAllVideos)
router.post('/upload', upload.single('file'), uploadFile)

export default router
