/* eslint-disable @typescript-eslint/no-explicit-any */
import useMenu from '@/hooks/useMenu'
import { IMenu } from '@/utils/types';
import { paginate } from '@/utils/utilities';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Checkbox, Table, Tag } from 'antd';
import { useState } from 'react'
import DeleteConfirmationModal from '../modals/customers/DeleteConfirmationModal';
import EditMenu from '../modals/menus/EditMenu';
import useRestaurants from '@/hooks/useRestaurants';

const MenuTable = () => {
    const { menus, error, deletedMenu } = useMenu();
    const { restaurants } = useRestaurants()
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
    const [currentMenu, setCurrentMenu] = useState<IMenu | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(1);

    console.log(menus);
    if (error) {
        return <div>Error fetching Menus</div>;
    }

    const handleCheckboxChange = (key: string, menu: IMenu) => {
        if (key) setSelectedKey(prevKey => (prevKey === key ? null : key));
        if (menu) setCurrentMenu(menu);
    }

    const handleEdit = (menu: IMenu) => {
        setCurrentMenu(menu);
        setIsEditModalVisible(true);
    }

    const handleDelete = () => {
        setIsDeleteModalVisible(true);
    }

    const confirmDelete = () => {
        if (currentMenu && currentMenu.id) {
            deletedMenu(currentMenu.id)
            setIsDeleteModalVisible(false)
            setSelectedKey(null)
        }
    }
    const handleTableChange = (pagination: any) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };


    const paginatedData = paginate(menus || [], pageSize, currentPage);

    const baseColumns = [
        {
            title: '',
            dataIndex: 'checkbox',
            key: 'checkbox',
            render: (_: null, record: IMenu) => (
                <Checkbox checked={record.id === selectedKey} onChange={() => handleCheckboxChange(record.id, record)} />
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Restaurant',
            dataIndex: 'restaurantId',
            key: 'restaurantId',
            render: (restaurantId: string) => {
                const restaurant = restaurants?.find(resto => resto.id === restaurantId);
                return restaurant ? restaurant.title : '';
            },
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Icon',
            dataIndex: 'icon',
            key: 'icon',
            render: (icon: string) => {
                return (
                    icon != '' ? <Tag><img src={icon} alt="thumbnail" style={{ width: '50px' }} /></Tag> : 'No icon'
                )
            }
        }
    ]
    const actionColumn = {
        title: 'Action',
        key: 'action',
        render: (_: null, record: IMenu) => (
            record.id === selectedKey ? (
                <span className='flex flex-1 flex-row gap-x-4'>
                    <Button onClick={() => handleEdit(record)}><EditOutlined /> Edit</Button>
                    <Button danger onClick={handleDelete}><DeleteOutlined /> Delete</Button>
                </span>
            ) : null
        ),
    };

    const columns = selectedKey ? [...baseColumns, actionColumn] : baseColumns;

    return (
        <div style={{ overflowX: 'auto' }}>
            <Table<IMenu>
                dataSource={paginatedData}
                columns={columns}
                rowKey="id"
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: menus?.length || 0,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20', '50'],
                }}
                onChange={handleTableChange}
            />
            {currentMenu && (
                <EditMenu
                    visible={isEditModalVisible}
                    onClose={() => setIsEditModalVisible(false)}
                    menu={currentMenu}
                />
            )}
            <DeleteConfirmationModal
                visible={isDeleteModalVisible}
                onConfirm={confirmDelete}
                onCancel={() => setIsDeleteModalVisible(false)}
            />
        </div>
    )
}

export default MenuTable