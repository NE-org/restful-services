/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table, Button, Checkbox, Tag } from 'antd';
import React, { useState, useEffect } from 'react';
import useCustomers from '@/hooks/useCustomers';
import EditUserModal from '@/components/modals/customers/EditCustomer';
import DeleteConfirmationModal from '@/components/modals/customers/DeleteConfirmationModal';
import { IUser } from '@/utils/types';
import { paginate } from '@/utils/utilities';

interface CustomersTableProps {
    searchQuery: string;
}

const CustomersTable: React.FC<CustomersTableProps> = ({ searchQuery }) => {
    const { customers, error, deleteUser } = useCustomers();
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(3);
    const [filteredCustomers, setFilteredCustomers] = useState<IUser[]>([]);

    useEffect(() => {
        if (customers) {
            setFilteredCustomers(
                customers.filter(customer =>
                    customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    customer.telephone.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    customer.role.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [customers, searchQuery]);

    if (error) {
        return <div>Error loading customers</div>;
    }

    const handleCheckboxChange = (key: string, user: IUser) => {
        if (key) setSelectedKey(prevKey => (prevKey === key ? null : key));
        if (user) setCurrentUser(user);
    };

    const handleEdit = (user: IUser) => {
        setCurrentUser(user);
        setIsEditModalVisible(true);
    };

    const handleDelete = () => {
        setIsDeleteModalVisible(true);
    };

    const confirmDelete = () => {
        if (currentUser && currentUser.id) {
            deleteUser(currentUser.id);
            setIsDeleteModalVisible(false);
            setSelectedKey(null);
        }
    };

    const handleTableChange = (pagination: any) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const paginatedData = paginate(filteredCustomers || [], pageSize, currentPage);

    const baseColumns = [
        {
            title: '',
            dataIndex: 'checkbox',
            key: 'checkbox',
            render: (_: null, record: IUser) => (
                <Checkbox
                    checked={record.id === selectedKey}
                    onChange={() => handleCheckboxChange(record.id, record)}
                />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Telephone',
            dataIndex: 'telephone',
            key: 'telephone',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (_: string, record: IUser) => (
                <Tag>{record.role}</Tag>
            ),
        },
    ];

    const actionColumn = {
        title: 'Action',
        key: 'action',
        render: (_: null, record: IUser) => (
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
            <Table<IUser>
                dataSource={paginatedData}
                columns={columns}
                rowKey="id"
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: filteredCustomers?.length || 0,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20', '50'],
                    style: { color: 'green'}
                }}
                onChange={handleTableChange}
            />
            {currentUser && (
                <EditUserModal
                    visible={isEditModalVisible}
                    onClose={() => setIsEditModalVisible(false)}
                    user={currentUser}
                />
            )}
            <DeleteConfirmationModal
                visible={isDeleteModalVisible}
                onConfirm={confirmDelete}
                onCancel={() => setIsDeleteModalVisible(false)}
            />
        </div>
    );
};

export default CustomersTable;
