import { Spin } from 'antd'

const PageLoader = () => {
  return (
    <div className='flex bg-white flex-col justify-center place-items-center items-center h-screen w-screen'>
        <Spin className='spin' size='large' />
    </div>
  )
}

export default PageLoader