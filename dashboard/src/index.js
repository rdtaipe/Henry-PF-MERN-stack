import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Store } from './Redux/Store'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App/App'

const auth0Config = {
    domain: "dev-zcla3tzkhoocgn1y.us.auth0.com",
    clientId: "4XnRrKDQ94UFtWYnHpfnjQ5n3WXApUNm",
    audience: "https://dev-zcla3tzkhoocgn1y.us.auth0.com/api/v2/",
    scope: "read:current_user update:current_user_metadata",
}


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Auth0Provider 
    domain={auth0Config.domain}
    clientId={auth0Config.clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: auth0Config.audience,
      scope: auth0Config.scope
    }}
    
  >
  <Provider store={Store}>
    <App/>
      {/* <RouterProvider router={Router}/>  */}
  </Provider>
  </Auth0Provider>
    
)

