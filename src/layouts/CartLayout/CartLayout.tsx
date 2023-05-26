import CartHeader from 'src/components/CartHeader'
import Footer from 'src/components/Footer'

interface Props {
  children?: React.ReactNode
}
///------------------------------------ View Chính của Cart webSite-----------------------
export default function CartLayout({ children }: Props) {
  return (
    <>
      <CartHeader />
      {children}
      <Footer />
    </>
  )
}
