import axios from 'axios'

const getAll = () => {
  return axios.get('/videos')
}

const upload = ({ formData, config }) => {
  return axios.post('/upload', formData, config)
}

export default {
  getAll,
  upload,
}
