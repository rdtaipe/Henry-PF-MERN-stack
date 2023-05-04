import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Store, actions } from './Redux/Store'
import { RouterProvider } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Router from './Router/Router.js'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'
import styled from 'styled-components'


const config = {
  domain: "dev-zcla3tzkhoocgn1y.us.auth0.com",
  clientId: "4XnRrKDQ94UFtWYnHpfnjQ5n3WXApUNm",
  audience: "https://dev-zcla3tzkhoocgn1y.us.auth0.com/api/v2/",
  scope: "read:current_user update:current_user_metadata",
}

const server = {
  local: "http://localhost:5000",
  production: "https://wgxjjo-5000.csb.app",
};

const ActionsProvider = () => {
  const dispatch = useDispatch()
  dispatch(actions.addActions(actions))
  dispatch(actions.setUrlBase(server.production))
  return <></>
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(

  <Provider store={Store}>
    <ActionsProvider/>
     <Auth0Provider
      domain={config.domain}
      clientId={config.clientId}
      authorizationParams={{
        redirect_uri: window.location.origin+"/authorize",
        audience: config.audience,
        scope: config.scope
      }}
    > 
      <RouterProvider router={Router} />
   </Auth0Provider> 

 </Provider > 
)



