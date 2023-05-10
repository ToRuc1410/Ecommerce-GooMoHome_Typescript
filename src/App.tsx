import useRouterElement from './useRouterElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const routerElements = useRouterElement()
  return (
    <>
      {routerElements}
      <ToastContainer />
    </>
  )
}

export default App
