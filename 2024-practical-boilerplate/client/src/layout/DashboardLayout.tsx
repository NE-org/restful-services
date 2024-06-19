import Sidebar from "@/components/shared/Sidebar"
import { useAuthentication } from "@/contexts/PersistenceProvider"
import { formatPathname } from "@/utils/utilities"
import { CloseOutlined, MenuOutlined } from "@ant-design/icons"
import { Avatar, Typography } from "antd"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"

const DashboardLayout = ({ children }: { children: React.ReactElement }) => {
  const { Text } = Typography
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const { authState } = useAuthentication();
  console.log(authState)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <div className="h-screen overflow-hidden flex items-center justify-center">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20"
          onClick={closeSidebar}
        />
      )}
      <div className={`fixed z-30 h-full top-0 left-0 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75 ${isSidebarOpen ? 'block pt-16' : 'hidden'} lg:block`}>
        <Sidebar />
      </div>
      <div className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
        <nav className="bg-white border-b border-gray-200 fixed z-30 w-full px-3 py-4 lg:px-5 lg:pl-3">
          <div className="flex bg-white w-3/4 items-center justify-between">
            <div className="flex items-center justify-start">
              <button onClick={toggleSidebar} className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded">
                {isSidebarOpen ? <CloseOutlined /> : <MenuOutlined />}
              </button>
              <Text className="text-base font-medium">{formatPathname(location.pathname)}</Text>
            </div>
            <div className="flex flex-row gap-x-3 place-items-center justify-center">
              <div className="flex flex-1 flex-col justify-end">
                <h1 className="text-base font-medium text-end">{authState?.fullName}</h1>
                <p className="text-[12px] font-normal text-gray-400">{authState.email}</p>
              </div>
              <div>
                <Avatar className="bg-green-600 text-white"  >{authState.fullName.charAt(0)}</Avatar>
              </div>
            </div>
          </div>
        </nav>
        <div className="pt-20 px-8">
          {children}
        </div>
      </div>
    </div >
  )
}

export default DashboardLayout