import { useContext, useEffect } from 'react'
import useRouterElement from './useRouterElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LocalStogareEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'
function App() {
  const routerElements = useRouterElement()
  const { reset } = useContext(AppContext)
  // lắng nghe sữ kiện khi clearLS
  useEffect(() => {
    LocalStogareEventTarget.addEventListener('clearLS', reset)
    // sau khi reset xong nên xóa sự kiện này đi bằng (componentWillUnmount)
    return () => {
      LocalStogareEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  return (
    <>
      {routerElements}
      <ToastContainer />
    </>
  )
}

export default App
