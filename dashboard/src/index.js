import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Store } from './Redux/Store'
import {RouterProvider} from "react-router-dom";
import Router from './Router/Router.js'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(

  <Provider store={Store}>
    <RouterProvider router={Router}/> 
  </Provider>
    
)

