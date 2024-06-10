import { BrowserRouter as Router } from 'react-router-dom'
import MainRouter from './routes/MainRouters'
import ErrorBoundaryWrapper from './Components/Error'
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <ErrorBoundaryWrapper>
      <Router>
        <MainRouter />
        {/* <ToastContainer /> */}
      </Router>
    </ErrorBoundaryWrapper>
  )
}

export default App


