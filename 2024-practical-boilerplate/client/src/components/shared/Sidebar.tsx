import { ForkOutlined, LoginOutlined, MergeCellsOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import Link from 'antd/es/typography/Link'
import { Typography } from 'antd'
import useAuth from '@/hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';

const Sidebar = () => {
  const { Text } = Typography;
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation()

  const pageDirectories = [
    {
      id: 1,
      name: 'Customers',
      path: '/',
      icon: <UsergroupAddOutlined />
    },
    {
      id: 2,
      name: 'Restaurants',
      path: '/restaurants',
      icon: <MergeCellsOutlined />
    },
    {
      id: 3,
      name: 'Menu',
      path: '/menus',
      icon: <ForkOutlined />
    }
  ]
  const handleLogOut = () => {
    logout()
    navigate('/login')
  }

  const checkActive = (path: string) => {
    return location.pathname === path
  }
  return (
    <aside className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex-1 px-3 bg-white divide-y space-y-1">
          <ul className="space-y-2 flex-1 flex-col flex h-5/6  pb-2">
            <li className='pb-4'>
              <Link href="#" className="text-xl font-bold flex items-center lg:ml-2.5">
                <img src="https://demo.themesberg.com/windster/images/logo.svg" className="h-6 mr-2" alt="Windster Logo" />
                <Text className="self-center whitespace-nowrap">Windster</Text>
              </Link>
            </li>
            {
              pageDirectories.map((route, index) => (
                <Link key={index} href={route.path} className={` ${checkActive(route.path) ? 'bg-primary border border-white border-dashed text-white font-medium text-md' : ''} text-base text-gray-900 font-normal rounded-lg hover:text-black hover:bg-green-200 duration-300 flex items-center p-2 group `}>
                  {route.icon}
                  <span className='ml-3 flex-1 whitespace-nowrap'>{
                    route.name
                  }</span>
                </Link>
              ))
            }
          </ul>
          <div className="space-y-2 pt-2">
            <Link onClick={handleLogOut} className='text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group '>
              <LoginOutlined />
              <span className='ml-3 flex-1 whitespace-nowrap'>Log out</span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar