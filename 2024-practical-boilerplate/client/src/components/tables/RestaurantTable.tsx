/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table, Button, Checkbox, Tag } from 'antd';
import React, { useState } from 'react';
import DeleteConfirmationModal from '@/components/modals/customers/DeleteConfirmationModal';
import { IRestaurant } from '@/utils/types';
import { paginate } from '@/utils/utilities';
import useRestaurants from '@/hooks/useRestaurants';
import EditRestaurant from '../modals/restaurants/EditRestaurant';

const RestaurantTable: React.FC = () => {
    const { restaurants, error, deleteRestaurant } = useRestaurants();
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
    const [currentRestaurant, setCurrentRestaurant] = useState<IRestaurant | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(4);


    if (error) {
        return <div>Error loading customers</div>;
    }

    const handleCheckboxChange = (key: string, restaurant: IRestaurant) => {
        if (key) setSelectedKey(prevKey => (prevKey === key ? null : key));
        if (restaurant) setCurrentRestaurant(restaurant);
    };

    const handleEdit = (resto: IRestaurant) => {
        setCurrentRestaurant(resto);
        setIsEditModalVisible(true);
    };

    const handleDelete = () => {
        setIsDeleteModalVisible(true);
    };

    const confirmDelete = () => {
        if (currentRestaurant && currentRestaurant.id) {
            deleteRestaurant(currentRestaurant.id);
            setIsDeleteModalVisible(false);
            setSelectedKey(null);
        }
    };

    const handleTableChange = (pagination: any) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const paginatedData = paginate(restaurants || [], pageSize, currentPage);


    const baseColumns = [
        {
            title: '',
            dataIndex: 'checkbox',
            key: 'checkbox',
            render: (_: null, record: IRestaurant) => (
                <Checkbox
                    checked={record.id === selectedKey}
                    onChange={() => handleCheckboxChange(record.id, record)}
                />
            ),
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const color = status === 'open' ? 'green' : status === 'full' ? 'red' : 'orange';
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (thumbnail: string) => (
                thumbnail != '' ? <img src={thumbnail} alt="thumbnail" style={{ width: '50px' }} /> : 'No Thumbnail'
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (description: string, record: IRestaurant) => (
                record.id === selectedKey ? (
                    description
                ) : description.slice(0, 20) + '....'
            )
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating: string) => {
                if (parseInt(rating) >= 3) {
                    return <Tag color='green'>{rating}</Tag>
                }
                return <Tag color='red'>{rating}</Tag>
            }
        },
    ];

    const actionColumn = {
        title: 'Action',
        key: 'action',
        render: (_: null, record: IRestaurant) => (
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
            <Table<IRestaurant>
                dataSource={paginatedData}
                columns={columns}
                rowKey="id"
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: restaurants?.length || 0,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20', '50'],
                }}
                onChange={handleTableChange}
            />
            {currentRestaurant && (
                <EditRestaurant
                    visible={isEditModalVisible}
                    onClose={() => setIsEditModalVisible(false)}
                    restaurant={currentRestaurant}
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

export default RestaurantTable;
