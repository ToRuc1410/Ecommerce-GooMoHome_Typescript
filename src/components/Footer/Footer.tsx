import { Link } from 'react-router-dom'
import path from 'src/constants/path'

export default function Footer() {
  return (
    <footer className='bg-neutral-100 lg:py-16'>
      <div className='container'>
        <div className='grid grid-cols-12 lg:gap-6'>
          <div className='col-span-3'>
            <div className='pt-5 text-[11px] font-thin md:text-sm lg:text-2xl'> Thông Tin Liên Hệ </div>
            <div className='mt-2 text-[8px] md:text-sm lg:pl-10 lg:text-sm'>
              <div>Thời gian làm việc: 8:00am - 20:00pm</div>
              <div className='mt-2'>Liên hệ: 0968835592 (zalo)</div>
              <div className='mt-2'>Gmail: goomohome@gmail.com</div>
              <div className='ml-1 pt-5 text-[10px] font-thin md:text-sm lg:text-lg'>Hướng Dẫn</div>
              <div className='lg:pl-5'>
                <div className='flex items-center text-[10px] font-thin md:text-sm lg:py-2 lg:text-lg'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='mr-2 h-2 w-2 lg:h-4 lg:w-4'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
                    />
                  </svg>
                  <Link to={path.cs1} className=' text-[8px] font-thin hover:text-orange md:text-sm  lg:text-sm'>
                    Chính sách bảo hành
                  </Link>
                </div>
                <div className='flex items-center text-[10px] font-thin md:text-sm lg:py-1 lg:text-lg'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='mr-2 h-2 w-2 lg:h-4 lg:w-4'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
                    />
                  </svg>
                  <Link to={path.cs2} className='text-[8px] font-thin hover:text-orange md:text-sm lg:py-2 lg:text-sm'>
                    Chính sách bảo mật thông tin
                  </Link>
                </div>
                <div className='flex items-center py-1 text-[10px] font-thin md:text-sm lg:text-lg'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='mr-2 h-2 w-2 lg:h-4 lg:w-4'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
                    />
                  </svg>
                  <Link
                    to={path.cs3}
                    className='text-[8px]  font-thin hover:text-orange md:text-sm  lg:py-2 lg:text-sm'
                  >
                    Chính sách đổi trả hoàn tiền
                  </Link>
                </div>
              </div>
              <div className='mt-4 flex justify-around'>
                <a href='https://www.facebook.com/sannhuagiago.goomohome' target='_blank' rel='noopener noreferrer'>
                  <svg
                    style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}
                    version='1.1'
                    viewBox='0 0 512 512'
                    className='h-5 w-5 md:h-8 md:w-8 lg:h-10 lg:w-10'
                    xmlSpace='preserve'
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                  >
                    <g>
                      <path
                        d='M512,256c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.978l0,48.022l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z'
                        style={{ fill: '#1877f2', fillRule: 'nonzero' }}
                      />
                      <path
                        d='M355.65,330l11.35,-74l-71,0l0,-48.022c0,-20.245 9.917,-39.978 41.719,-39.978l32.281,0l0,-63c0,0 -29.297,-5 -57.305,-5c-58.476,0 -96.695,35.44 -96.695,99.6l0,56.4l-65,0l0,74l65,0l0,178.89c13.033,2.045 26.392,3.11 40,3.11c13.608,0 26.966,-1.065 40,-3.11l0,-178.89l59.65,0Z'
                        style={{ fill: '#fff', fillRule: 'nonzero' }}
                      />
                    </g>
                  </svg>
                </a>
                <a
                  href='https://www.youtube.com/channel/UCK0LRvE9iOJhSAak_fr5Vow'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <svg
                    enableBackground='new 0 0 32 32'
                    id='Layer_1'
                    viewBox='0 0 32 32'
                    className='h-5 w-5 md:h-8 md:w-8 lg:h-10 lg:w-10'
                    xmlSpace='preserve'
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    target='_blank'
                  >
                    <g>
                      <path
                        d='M31.67,9.179c0,0-0.312-2.353-1.271-3.389c-1.217-1.358-2.58-1.366-3.205-1.443C22.717,4,16.002,4,16.002,4   h-0.015c0,0-6.715,0-11.191,0.347C4.171,4.424,2.809,4.432,1.591,5.79C0.633,6.826,0.32,9.179,0.32,9.179S0,11.94,0,14.701v2.588   c0,2.763,0.32,5.523,0.32,5.523s0.312,2.352,1.271,3.386c1.218,1.358,2.815,1.317,3.527,1.459C7.677,27.919,15.995,28,15.995,28   s6.722-0.012,11.199-0.355c0.625-0.08,1.988-0.088,3.205-1.446c0.958-1.034,1.271-3.386,1.271-3.386s0.32-2.761,0.32-5.523v-2.588   C31.99,11.94,31.67,9.179,31.67,9.179z'
                        fill='#E02F2F'
                      />
                      <polygon fill='#FFFFFF' points='12,10 12,22 22,16  ' />
                    </g>
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                  </svg>
                </a>
                <a
                  href='https://www.instagram.com/domanh.dong/?igshid=MzNlNGNkZWQ4Mg%3D%3D'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <svg
                    id='Apple'
                    viewBox='0 0 512 512'
                    className='h-5 w-5 md:h-8 md:w-8 lg:h-10 lg:w-10'
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                  >
                    <defs>
                      <style
                        dangerouslySetInnerHTML={{
                          __html: '.cls-1{fill:url(#Nepojmenovaný_přechod_27);}.cls-2{fill:#fff;}'
                        }}
                      />
                      <linearGradient
                        gradientUnits='userSpaceOnUse'
                        id='Nepojmenovaný_přechod_27'
                        x1='328.27'
                        x2='183.73'
                        y1='508.05'
                        y2='3.95'
                      >
                        <stop offset={0} stopColor='#ffdb73' />
                        <stop offset='0.08' stopColor='#fdad4e' />
                        <stop offset='0.15' stopColor='#fb832e' />
                        <stop offset='0.19' stopColor='#fa7321' />
                        <stop offset='0.23' stopColor='#f6692f' />
                        <stop offset='0.37' stopColor='#e84a5a' />
                        <stop offset='0.48' stopColor='#e03675' />
                        <stop offset='0.55' stopColor='#dd2f7f' />
                        <stop offset='0.68' stopColor='#b43d97' />
                        <stop offset='0.97' stopColor='#4d60d4' />
                        <stop offset={1} stopColor='#4264db' />
                      </linearGradient>
                    </defs>
                    <title />
                    <rect
                      className='cls-1'
                      height='465.06'
                      rx='107.23'
                      ry='107.23'
                      width='465.06'
                      x='23.47'
                      y='23.47'
                    />
                    <path
                      className='cls-2'
                      d='M331,115.22a66.92,66.92,0,0,1,66.65,66.65V330.13A66.92,66.92,0,0,1,331,396.78H181a66.92,66.92,0,0,1-66.65-66.65V181.87A66.92,66.92,0,0,1,181,115.22H331m0-31H181c-53.71,0-97.66,44-97.66,97.66V330.13c0,53.71,44,97.66,97.66,97.66H331c53.71,0,97.66-44,97.66-97.66V181.87c0-53.71-43.95-97.66-97.66-97.66Z'
                    />
                    <path
                      className='cls-2'
                      d='M256,198.13A57.87,57.87,0,1,1,198.13,256,57.94,57.94,0,0,1,256,198.13m0-31A88.87,88.87,0,1,0,344.87,256,88.87,88.87,0,0,0,256,167.13Z'
                    />
                    <circle className='cls-2' cx='346.81' cy='163.23' r='21.07' />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className='col-span-3 lg:pl-10'>
            <div className='pt-5 text-[12px] font-thin md:text-sm lg:text-2xl'>Về Chúng Tôi</div>
            <p className='flex flex-col text-[10px] font-thin md:flex-col md:text-sm lg:flex-row lg:py-2 lg:text-sm'>
              <span className='py-2'>Trụ Sở Hà Nội</span>
              <a href={`tel:${'0968835592'}`} className='ml-2 py-1 text-blue-500'>
                <span className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-4 w-4'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3'
                    />
                  </svg>

                  {'0968835592'}
                </span>
              </a>
            </p>
            <div className=''>
              <iframe
                title='Hà Nội'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.367548093658!2d105.83229507492754!3d20.977898880658753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac5976677423%3A0xff4ba4fd8924767e!2zMzMwIFAuIFRy4buLbmggxJDDrG5oIEPhu611LCDEkOG7i25oIEPDtG5nIEjhuqEsIFRoYW5oIFh1w6JuLCBIw6AgTuG7mWksIFZpZXRuYW0!5e0!3m2!1sen!2sus!4v1689173927168!5m2!1sen!2sus'
                className='h-20 w-20 text-xs md:h-40 md:w-40 lg:h-60 lg:w-60'
                referrerPolicy='no-referrer-when-downgrade'
                loading='lazy'
              ></iframe>
            </div>
            <div className='mt-4  text-[10px] font-thin md:text-sm lg:text-sm'>
              Trụ sở Hà Nội: 330 Trịnh Đình Cử, Định Công, Hoàng Mai, Hà Nội
            </div>
          </div>
          <div className='col-span-3 pt-8 md:pt-9 lg:pt-11'>
            <div className='text-[10px] font-thin md:text-sm lg:pl-5 lg:text-sm'>
              <p className='flex flex-col  md:flex-col lg:flex-row lg:py-3'>
                <span className='pb-2 pt-3'>Trụ Sở TP. HCM</span>
                <a href={`tel:${'0968835592'}`} className='ml-2 py-1 text-blue-500'>
                  <span className='flex'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-4 w-4'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3'
                      />
                    </svg>

                    {'0968835592'}
                  </span>
                </a>
              </p>
            </div>
            <div className=''>
              <iframe
                title='Hồ Chí Minh'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.7779266991215!2d106.59445597469667!3d10.751591189395707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752c4cd6a0b3a5%3A0xa33b337665af167a!2zMzAgxJDGsOG7nW5nIHPhu5EgNTAsIFTDom4gVOG6oW8sIELDrG5oIFTDom4sIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1689058748701!5m2!1svi!2s'
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                // height={'100'}
                // width={'80'}
                className='h-20 w-20 text-xs md:h-40 md:w-40 lg:h-60 lg:w-60'
              ></iframe>
              <div className='mt-4  text-[10px] font-thin md:text-sm lg:text-sm'>
                Trụ Sở TP.HCM: 30 Đường Số 50, Phường Tân Tạo, Quận Bình Tân, TP.HCM
              </div>
            </div>
          </div>
          <div className='col-span-3 pb-5'>
            <div className='flex pt-10'>
              <div className='mr-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-5 w-5 text-gray-500 md:h-10 md:w-10 lg:h-12 lg:w-12'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                  />
                </svg>
              </div>
              <span className='text-[8px] font-thin md:text-sm lg:text-sm'>
                Sản phẩm chất lượng Sàn gỗ được tuyển chọn kĩ lưỡng, tỷ lệ đồng màu đạt trên 90% đối với gỗ tự nhiên
              </span>
            </div>
            <div className='flex pt-2'>
              <div className='mr-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-5 w-5 text-gray-500 md:h-10 md:w-10 lg:h-12 lg:w-12'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12'
                  />
                </svg>
              </div>
              <span className='text-[8px] font-thin md:text-sm lg:text-sm '>
                Hỗ Trợ Giao hàng Chúng tôi hỗ trợ giao hàng với những đơn hàng khách hàng yêu cầu thi công từ 50m2 và
                trong bán kính 30km nội thành HCM.
              </span>
            </div>
            <div className='flex pt-2'>
              <div className='mr-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-5 w-5 text-gray-500 md:h-10 md:w-10 lg:h-12 lg:w-12'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z'
                  />
                </svg>
              </div>
              <span className='text-[8px] font-thin md:text-sm lg:text-sm'>
                Dịch vụ khách hàng Chúng tôi luôn có những chính sách tốt nhất dành cho khách hàng thân thiết.
              </span>
            </div>
            <div className='flex pt-2'>
              <div className='mr-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-5 w-5 text-gray-500 md:h-14 md:w-14 lg:h-16 lg:w-16'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                  />
                </svg>
              </div>
              <span className='text-[8px] font-thin md:text-sm lg:text-sm'>
                Mẫu mã đa dạng Liên tục cho ra những sản phẩm đẹp nhất, nhằm đáp ứng mọi nhu cầu khách hàng.
              </span>
            </div>
          </div>
        </div>
      </div>
      {/*?xml version="1.0" ?*/}
      <div className='fixed bottom-4 right-4 h-12 w-12 '>
        <a href='https://zalo.me/domanhdong' target='_blank' rel='noopener noreferrer'>
          <svg
            height={50}
            id='Layer_1'
            viewBox='0 0 460.1 436.6'
            width={50}
            xmlns='http://www.w3.org/2000/svg'
            className='rounded-2xl bg-white'
          >
            <style
              dangerouslySetInnerHTML={{
                __html:
                  '.st0{fill:#fdfefe}.st1{fill:#0180c7}.st2{fill:#0172b1}.st3{fill:none;stroke:#0180c7;stroke-width:2;stroke-miterlimit:10}'
              }}
            />
            <title />
            <path
              className='st0'
              d='M82.6 380.9c-1.8-.8-3.1-1.7-1-3.5 1.3-1 2.7-1.9 4.1-2.8 13.1-8.5 25.4-17.8 33.5-31.5 6.8-11.4 5.7-18.1-2.8-26.5C69 269.2 48.2 212.5 58.6 145.5 64.5 107.7 81.8 75 107 46.6c15.2-17.2 33.3-31.1 53.1-42.7 1.2-.7 2.9-.9 3.1-2.7-.4-1-1.1-.7-1.7-.7-33.7 0-67.4-.7-101 .2C28.3 1.7.5 26.6.6 62.3c.2 104.3 0 208.6 0 313 0 32.4 24.7 59.5 57 60.7 27.3 1.1 54.6.2 82 .1 2 .1 4 .2 6 .2H290c36 0 72 .2 108 0 33.4 0 60.5-27 60.5-60.3v-.6-58.5c0-1.4.5-2.9-.4-4.4-1.8.1-2.5 1.6-3.5 2.6-19.4 19.5-42.3 35.2-67.4 46.3-61.5 27.1-124.1 29-187.6 7.2-5.5-2-11.5-2.2-17.2-.8-8.4 2.1-16.7 4.6-25 7.1-24.4 7.6-49.3 11-74.8 6zm72.5-168.5c1.7-2.2 2.6-3.5 3.6-4.8 13.1-16.6 26.2-33.2 39.3-49.9 3.8-4.8 7.6-9.7 10-15.5 2.8-6.6-.2-12.8-7-15.2-3-.9-6.2-1.3-9.4-1.1-17.8-.1-35.7-.1-53.5 0-2.5 0-5 .3-7.4.9-5.6 1.4-9 7.1-7.6 12.8 1 3.8 4 6.8 7.8 7.7 2.4.6 4.9.9 7.4.8 10.8.1 21.7 0 32.5.1 1.2 0 2.7-.8 3.6 1-.9 1.2-1.8 2.4-2.7 3.5-15.5 19.6-30.9 39.3-46.4 58.9-3.8 4.9-5.8 10.3-3 16.3s8.5 7.1 14.3 7.5c4.6.3 9.3.1 14 .1 16.2 0 32.3.1 48.5-.1 8.6-.1 13.2-5.3 12.3-13.3-.7-6.3-5-9.6-13-9.7-14.1-.1-28.2 0-43.3 0zm116-52.6c-12.5-10.9-26.3-11.6-39.8-3.6-16.4 9.6-22.4 25.3-20.4 43.5 1.9 17 9.3 30.9 27.1 36.6 11.1 3.6 21.4 2.3 30.5-5.1 2.4-1.9 3.1-1.5 4.8.6 3.3 4.2 9 5.8 14 3.9 5-1.5 8.3-6.1 8.3-11.3.1-20 .2-40 0-60-.1-8-7.6-13.1-15.4-11.5-4.3.9-6.7 3.8-9.1 6.9zm69.3 37.1c-.4 25 20.3 43.9 46.3 41.3 23.9-2.4 39.4-20.3 38.6-45.6-.8-25-19.4-42.1-44.9-41.3-23.9.7-40.8 19.9-40 45.6zm-8.8-19.9c0-15.7.1-31.3 0-47 0-8-5.1-13-12.7-12.9-7.4.1-12.3 5.1-12.4 12.8-.1 4.7 0 9.3 0 14v79.5c0 6.2 3.8 11.6 8.8 12.9 6.9 1.9 14-2.2 15.8-9.1.3-1.2.5-2.4.4-3.7.2-15.5.1-31 .1-46.5z'
            />
            <path
              className='st1'
              d='M139.5 436.2c-27.3 0-54.7.9-82-.1-32.3-1.3-57-28.4-57-60.7 0-104.3.2-208.6 0-313C.5 26.7 28.4 1.8 60.5.9c33.6-.9 67.3-.2 101-.2.6 0 1.4-.3 1.7.7-.2 1.8-2 2-3.1 2.7-19.8 11.6-37.9 25.5-53.1 42.7-25.1 28.4-42.5 61-48.4 98.9-10.4 66.9 10.5 123.7 57.8 171.1 8.4 8.5 9.5 15.1 2.8 26.5-8.1 13.7-20.4 23-33.5 31.5-1.4.8-2.8 1.8-4.2 2.7-2.1 1.8-.8 2.7 1 3.5.4.9.9 1.7 1.5 2.5 11.5 10.2 22.4 21.1 33.7 31.5 5.3 4.9 10.6 10 15.7 15.1 2.1 1.9 5.6 2.5 6.1 6.1z'
            />
            <path
              className='st2'
              d='M139.5 436.2c-.5-3.5-4-4.1-6.1-6.2-5.1-5.2-10.4-10.2-15.7-15.1-11.3-10.4-22.2-21.3-33.7-31.5-.6-.8-1.1-1.6-1.5-2.5 25.5 5 50.4 1.6 74.9-5.9 8.3-2.5 16.6-5 25-7.1 5.7-1.5 11.7-1.2 17.2.8 63.4 21.8 126 19.8 187.6-7.2 25.1-11.1 48-26.7 67.4-46.2 1-1 1.7-2.5 3.5-2.6.9 1.4.4 2.9.4 4.4v58.5c.2 33.4-26.6 60.6-60 60.9h-.5c-36 .2-72 0-108 0H145.5c-2-.2-4-.3-6-.3z'
            />
            <path
              className='st1'
              d='M155.1 212.4c15.1 0 29.3-.1 43.4 0 7.9.1 12.2 3.4 13 9.7.9 7.9-3.7 13.2-12.3 13.3-16.2.2-32.3.1-48.5.1-4.7 0-9.3.2-14-.1-5.8-.3-11.5-1.5-14.3-7.5s-.8-11.4 3-16.3c15.4-19.6 30.9-39.3 46.4-58.9.9-1.2 1.8-2.4 2.7-3.5-1-1.7-2.4-.9-3.6-1-10.8-.1-21.7 0-32.5-.1-2.5 0-5-.3-7.4-.8-5.7-1.3-9.2-7-7.9-12.6.9-3.8 3.9-6.9 7.7-7.8 2.4-.6 4.9-.9 7.4-.9 17.8-.1 35.7-.1 53.5 0 3.2-.1 6.3.3 9.4 1.1 6.8 2.3 9.7 8.6 7 15.2-2.4 5.7-6.2 10.6-10 15.5-13.1 16.7-26.2 33.3-39.3 49.8-1.1 1.3-2.1 2.6-3.7 4.8z'
            />
            <path
              className='st1'
              d='M271.1 159.8c2.4-3.1 4.9-6 9-6.8 7.9-1.6 15.3 3.5 15.4 11.5.3 20 .2 40 0 60 0 5.2-3.4 9.8-8.3 11.3-5 1.9-10.7.4-14-3.9-1.7-2.1-2.4-2.5-4.8-.6-9.1 7.4-19.4 8.7-30.5 5.1-17.8-5.8-25.1-19.7-27.1-36.6-2.1-18.3 4-33.9 20.4-43.5 13.6-8.1 27.4-7.4 39.9 3.5zm-35.4 36.5c.2 4.4 1.6 8.6 4.2 12.1 5.4 7.2 15.7 8.7 23 3.3 1.2-.9 2.3-2 3.3-3.3 5.6-7.6 5.6-20.1 0-27.7-2.8-3.9-7.2-6.2-11.9-6.3-11-.7-18.7 7.8-18.6 21.9zM340.4 196.9c-.8-25.7 16.1-44.9 40.1-45.6 25.5-.8 44.1 16.3 44.9 41.3.8 25.3-14.7 43.2-38.6 45.6-26.1 2.6-46.8-16.3-46.4-41.3zm25.1-2.4c-.2 5 1.3 9.9 4.3 14 5.5 7.2 15.8 8.6 23 3 1.1-.8 2-1.8 2.9-2.8 5.8-7.6 5.8-20.4.1-28-2.8-3.8-7.2-6.2-11.9-6.3-10.8-.6-18.4 7.6-18.4 20.1zM331.6 177c0 15.5.1 31 0 46.5.1 7.1-5.5 13-12.6 13.2-1.2 0-2.5-.1-3.7-.4-5-1.3-8.8-6.6-8.8-12.9v-79.5c0-4.7-.1-9.3 0-14 .1-7.7 5-12.7 12.4-12.7 7.6-.1 12.7 4.9 12.7 12.9.1 15.6 0 31.3 0 46.9z'
            />
            <path
              className='st0'
              d='M235.7 196.3c-.1-14.1 7.6-22.6 18.5-22 4.7.2 9.1 2.5 11.9 6.4 5.6 7.5 5.6 20.1 0 27.7-5.4 7.2-15.7 8.7-23 3.3-1.2-.9-2.3-2-3.3-3.3-2.5-3.5-3.9-7.7-4.1-12.1zM365.5 194.5c0-12.4 7.6-20.7 18.4-20.1 4.7.1 9.1 2.5 11.9 6.3 5.7 7.6 5.7 20.5-.1 28-5.6 7.1-16 8.3-23.1 2.7-1.1-.8-2-1.8-2.8-2.9-3-4.1-4.4-9-4.3-14z'
            />
            <path
              className='st3'
              d='M66 1h328.1c35.9 0 65 29.1 65 65v303c0 35.9-29.1 65-65 65H66c-35.9 0-65-29.1-65-65V66C1 30.1 30.1 1 66 1z'
            />
          </svg>
        </a>
      </div>
    </footer>
  )
}
