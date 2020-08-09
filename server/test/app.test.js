/* eslint-env mocha */

const chai = require('chai'),
  fs = require('fs'),
  chaiHttp = require('chai-http')

const expect = chai.expect
chai.use(chaiHttp)

const app = require('../app')
const videoFolder = './public'

describe('GET /videos', () => {
  it('should return a list of videos', (done) => {
    let publicFolderSize
    fs.readdir(videoFolder, (err, files) => {
      publicFolderSize = files.length
    })

    chai
      .request(app)
      .get('/videos')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array').to.have.lengthOf(publicFolderSize)
        done()
      })
  })
})
