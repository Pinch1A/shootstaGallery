import React from 'react'
import Upload from './Upload'
import { shallow, mount } from 'enzyme'

// Helper Function to simulate File
const createFileFromMockFile = (file): File => {
  const blob = new Blob([file.body], { type: file.mimeType })
  blob['lastModifiedDate'] = new Date()
  blob['name'] = file.name
  return blob
}
// Helper Function to simulate FileList structure
const createMockFileList = (files: MockFile[]) => {
  const fileList: FileList = {
    length: files.length,
    item(index: number): File {
      return fileList[index]
    },
  }
  files.forEach((file, index) => (fileList[index] = createFileFromMockFile(file)))
  return fileList
}

describe('Upload', () => {
  it('should render the card with disabled Upload button', () => {
    const wrapper = mount(<Upload />)
    const uploadButton = wrapper.find('.Actions').find('button')
    expect(uploadButton).toBeDefined()
    expect(uploadButton.prop('disabled')).toBe(true)
  })
  it('should render file name on upload', () => {
    const wrapper = mount(<Upload />)
    const fileList = createMockFileList([
      {
        body: 'test',
        mimeType: 'text/plain',
        name: 'test.txt',
      },
    ])
    const inputField = wrapper.find('[type="file"]')
    inputField.simulate('change', {
      target: {
        files: fileList,
      },
    })
    expect(wrapper.find('.name').text()).toEqual('test.txt')
    const uploadButton = wrapper.find('.Actions').find('button')
    expect(uploadButton.prop('disabled')).toBe(false)
  })
})
