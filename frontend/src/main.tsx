// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { GoogleOAuthProvider } from '@react-oauth/google'
// import { Provider } from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react'
// import { store, persistor } from './redux/app/store.ts'
// import App from './App.tsx'
// import 'react-calendar/dist/Calendar.css';
// import './index.css'
// import ErrorBoundary from './Components/Error.tsx'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <GoogleOAuthProvider clientId='286482854197-7sil2tnla5ridrc9idi81vvk0htpchqo.apps.googleusercontent.com'>

//         {/* <React.StrictMode> */}
//         <ErrorBoundary children={undefined} />
//         <App />
//         <ErrorBoundary children={undefined} />
//         {/* </React.StrictMode> */}

//       </GoogleOAuthProvider>
//     </PersistGate>
//   </Provider>

// )


import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/app/store.ts'
import App from './App.tsx'
import 'react-calendar/dist/Calendar.css';
import './index.css'
import ErrorBoundary from './Components/Error.tsx'
import SocketProvider from './Contexts/Socketio.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SocketProvider>

        <GoogleOAuthProvider clientId='344300273639-vj76svmkb9p1a9qkbtba48heb88h871i.apps.googleusercontent.com'>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>

        </GoogleOAuthProvider>
      </ SocketProvider >
    </PersistGate>
  </Provider>
)
