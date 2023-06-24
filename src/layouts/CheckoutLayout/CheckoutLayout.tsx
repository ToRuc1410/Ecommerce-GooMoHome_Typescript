import Footer from 'src/components/Footer'
import CheckoutHeader from 'src/components/CheckoutHeader'

interface Props {
  children?: React.ReactNode
}
///------------------------------------ View Chính của Cart webSite-----------------------
export default function CheckoutLayout({ children }: Props) {
  return (
    <>
      <CheckoutHeader />
      {children}
      <Footer />
    </>
  )
}
