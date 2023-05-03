import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Auth0Provider } from "@auth0/auth0-react";

const config = {
  domain: "dev-zcla3tzkhoocgn1y.us.auth0.com",
  clientId: "4XnRrKDQ94UFtWYnHpfnjQ5n3WXApUNm",
  audience: "https://dev-zcla3tzkhoocgn1y.us.auth0.com/api/v2/",
  scope: "read:current_user update:current_user_metadata update:users",
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain={config.domain}
        clientId={config.clientId}
        authorizationParams={{
          redirect_uri: window.location.origin + "/authorize",
          audience: config.audience,
          scope: config.scope
        }}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Auth0Provider>
    </Provider>

  </React.StrictMode>
  //
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
