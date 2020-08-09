// @flow

import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { GalleryPage, UploadPage } from './pages'
import './App.scss'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={['/', '/gallery']} component={GalleryPage} />
        <Route exact path="/add" component={UploadPage} />
      </Switch>

      <div className="icons-ref">
        Icons made by
        <a href="https://icon54.com/" title="Pixel perfect">
          Pixel perfect
        </a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  )
}

export default App
