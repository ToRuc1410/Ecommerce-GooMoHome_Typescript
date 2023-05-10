import { Link, useMatch } from 'react-router-dom'
import path from 'src/constants/path'
export default function RegisterHeader() {
  const registerMatch = useMatch(path.register)
  const isRegister = Boolean(registerMatch)
  return (
    <header className='py-5'>
      <div className='container'>
        <nav className='flex items-end'>
          <Link to={path.home}>
            <img
              className='h-8 lg:h-11'
              src='https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=819.000032544136,fit=crop/YbNbPPqn2EfwxjP7/chat-hon-to-cu-1-png-m7V2704oB7HDV1b2.png'
              alt='Goomo Home logo'
              data-v-fb585256
              data-qa='builder-siteheader-img-logo'
            />
          </Link>
          <div className='ml-5 text-xl lg:text-2xl'>{isRegister ? ' Đăng ký' : 'Đăng Nhập'}</div>
        </nav>
      </div>
    </header>
  )
}
