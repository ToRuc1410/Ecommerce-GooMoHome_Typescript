import ReactDOM from 'react-dom/client'
import App from 'src/App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from './contexts/app.context'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import 'src/i18n/i18n'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // tắt truy vấn sẽ tự động cập nhật data
      refetchOnWindowFocus: false,
      // load lại trang 3 lần khi lỗi
      retry: 0
    }
  }
})
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </AppProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </BrowserRouter>
)
