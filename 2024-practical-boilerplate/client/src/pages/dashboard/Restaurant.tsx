import CreateNewRestaurant from "@/components/modals/restaurants/CreateNewRestaurant"
import RestaurantTable from "@/components/tables/RestaurantTable"
import DashboardLayout from "@/layout/DashboardLayout"
import { PlusOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useState } from "react"
// import Title from "antd/es/typography/Title"

const Restaurant = () => {
  // const { Text } = Typography
  const [IsNewRestaurant, setIsNewRestaurant] = useState<boolean>(false)

  const showNewUserModal = () => {
    setIsNewRestaurant(true);
  };

  const handleNewUserModalClose = () => {
    setIsNewRestaurant(false);
  };
  return (
    <DashboardLayout>
      <>
        <div className="bg-white p-10 rounded-lg">
          <div className="flex flex-1 sm:flex-row flex-col gap-y-4 justify-between pb-6">
            <div>
              <h1 className="text-base font-medium">Manage Restaurants</h1>
              <p className="text-gray-500 text-[14px]">Extract and manipulate the restaurants overe here!</p>
            </div>
            <Button className="py-5" onClick={showNewUserModal}>
              <PlusOutlined />
              New Restaurant
            </Button>
          </div>
          <RestaurantTable />
        </div>
        <CreateNewRestaurant visible={IsNewRestaurant} onClose={handleNewUserModalClose} />
      </>
    </DashboardLayout>
  )
}

export default Restaurant