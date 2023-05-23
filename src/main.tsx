import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './app'
import { BrowserRouter } from 'react-router-dom'
import Routas from './Routes'
// import AuthRoutes from './routes/Stack/auth.routes';
// import { AuthProvider } from './contexts/auth';
// import Routes from './routes';
// import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
   <BrowserRouter>
      <Routas />
    </BrowserRouter>
  </React.StrictMode>,
)

