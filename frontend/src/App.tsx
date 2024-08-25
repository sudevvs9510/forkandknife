import { BrowserRouter as Router } from 'react-router-dom'
import MainRouter from './routes/MainRouters'

import { Toaster } from "react-hot-toast"
import Notifications from './Components/Notifications'

const App = () => {
  return (

    <Router>
      <Notifications />
      <MainRouter />
      <Toaster />
    </Router>

  )
}

export default App


