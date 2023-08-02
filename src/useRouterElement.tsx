import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import path from './constants/path'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import CartLayout from './layouts/CartLayout'
import UserLayout from './pages/User/layouts/UserLayout'
import Profile from './pages/User/pages/Profile'
import ChangePassword from './pages/User/pages/ChangePassword'
import HistoryPurchase from './pages/User/pages/HistoryPurchase'
import NotFound404 from './pages/NotFound404'
import CheckoutLayout from './layouts/CheckoutLayout'
import Checkout from './pages/Checkout'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassWord from './pages/ResetPassWord'
import BaoHanh from './components/BaoHanh'
import BaoMat from './components/BaoMat'
import DoiTra from './components/DoiTra'
import VerifyEmail from './pages/VerifyEmail'
import ReturnPay from './pages/ReturnPay/ReturnPay'
import GioiThieu from './components/GioiThieu'
import Blog from './pages/Blog'

// ----------------Check user đã login r thì k cho vào login,register nữa
function ProtectedRouter() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
// ----------------Check user đã Login chưa
function RejectRouter() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='' />
}
export default function useRouterElement() {
  const routeElements = useRoutes([
    {
      path: '',
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      ),
      children: [
        {
          path: path.cs1,
          element: (
            <MainLayout>
              <BaoHanh />
            </MainLayout>
          )
        },
        {
          path: path.cs2,
          element: (
            <MainLayout>
              <BaoMat />
            </MainLayout>
          )
        },
        {
          path: path.cs3,
          element: (
            <MainLayout>
              <DoiTra />
            </MainLayout>
          )
        },
        {
          path: path.gt,
          element: (
            <MainLayout>
              <GioiThieu />
            </MainLayout>
          )
        },
        {
          path: path.blog,
          element: (
            <MainLayout>
              <Blog />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },

    {
      path: '',
      element: <ProtectedRouter />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.changePassword,
              element: <ChangePassword />
            },
            {
              path: path.orderDetail,
              element: <HistoryPurchase />
            }
          ]
        },
        {
          path: path.checkout,
          element: (
            <CheckoutLayout>
              <Checkout />
            </CheckoutLayout>
          )
        },
        {
          path: path.payDone,
          element: (
            <CheckoutLayout>
              <ReturnPay />
            </CheckoutLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectRouter />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.verifyEmail,
          element: (
            <RegisterLayout>
              <VerifyEmail />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        },
        {
          path: path.forgotPassWord,
          element: (
            <RegisterLayout>
              <ForgotPassword />
            </RegisterLayout>
          )
        },
        {
          path: path.resetPassword,
          element: (
            <RegisterLayout>
              <ResetPassWord />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '*',
      element: <NotFound404 />
    }
  ])
  return routeElements
}
