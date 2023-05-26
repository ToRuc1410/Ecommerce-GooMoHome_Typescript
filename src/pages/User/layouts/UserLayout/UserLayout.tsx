import { Outlet } from 'react-router-dom'
import UserSideNav from '../../Components/UserSideNav'

export default function UserLayout() {
  return (
    <div className='bg-neutral-200 py-5'>
      <div className='container'>
        <div className='grid grid-cols-12 '>
          <div className='col-span-3'>
            <UserSideNav />
          </div>
          <div className='col-span-9'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
