import CreateMenu from "@/components/modals/menus/CreateMenu"
import MenuTable from "@/components/tables/MenuTable"
import DashboardLayout from "@/layout/DashboardLayout"
import { PlusOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useState } from "react"
// import Title from "antd/es/typography/Title"

const Menu = () => {
  // const { Text } = Typography
  const [IsNewMenu, setIsNewMenu] = useState<boolean>(false)

  const showNewMenuModal = () => {
    setIsNewMenu(true);
  };

  const handleNewMenuModalClose = () => {
    setIsNewMenu(false);
  };
  return (
    <DashboardLayout>
      <>
        <div className="bg-white p-10 rounded-lg">
          <div className="flex flex-1 sm:flex-row flex-col gap-y-4 justify-between pb-6">
            <div>
              <h1 className="text-base font-medium">Manage Menus</h1>
              <p className="text-gray-500 text-[14px]">Extract and manipulate the Menus overe here!</p>
            </div>
            <Button className="py-5" onClick={showNewMenuModal}>
              <PlusOutlined />
              New Menu
            </Button>
          </div>
          <MenuTable />
        </div>
        <CreateMenu visible={IsNewMenu} onClose={handleNewMenuModalClose} />
      </>
    </DashboardLayout>
  )
}

export default Menu