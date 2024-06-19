import CreateNewUser from "@/components/modals/customers/CreateNewUser";
import SearchInput from "@/components/shared/SearchInput";
import CustomersTable from "@/components/tables/CustomersTable";
import DashboardLayout from "@/layout/DashboardLayout";
import { UserAddOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

const Dashboard = () => {
    const [IsNewUserModalVisible, setIsNewUserModalVisible] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');

    const showNewUserModal = () => {
        setIsNewUserModalVisible(true);
    };

    const handleNewUserModalClose = () => {
        setIsNewUserModalVisible(false);
    };

    const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    return (
        <DashboardLayout>
            <>
                <div className="bg-white p-10 rounded-lg">
                    <div className="flex flex-1 sm:flex-row flex-col gap-y-4 justify-between pb-6">
                        <div>
                            <h1 className="text-base font-medium">Manage Customers</h1>
                            <p className="text-gray-500 text-[14px]">Extract and manipulate the customers over here!</p>
                        </div>
                        <div className="flex flex-row gap-x-2">
                            <SearchInput searchQueryValue={searchValue} handleSearchQueryValue={handleSearchQueryChange} />
                            <Button className="py-5" onClick={showNewUserModal}>
                                <UserAddOutlined />
                                New User
                            </Button>
                        </div>
                    </div>
                    <CustomersTable searchQuery={searchValue} />
                </div>
                <CreateNewUser visible={IsNewUserModalVisible} onClose={handleNewUserModalClose} />
            </>
        </DashboardLayout>
    );
};

export default Dashboard;
