import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './Redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
   <Provider store = {store}>
    <BrowserRouter>
      {/* <StrictMode> */}
        <App />
      {/* </StrictMode> */}
    </BrowserRouter>
  </Provider>,
)
