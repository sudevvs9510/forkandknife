import { BrowserRouter as Router } from 'react-router-dom'
import MainRouter from './routes/MainRouters'

import { Toaster } from "react-hot-toast"

const App = () => {
  return (

    <Router>
      <MainRouter />
      <Toaster />
    </Router>

  )
}

export default App


