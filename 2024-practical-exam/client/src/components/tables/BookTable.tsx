/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table, Button, Checkbox, Tag } from 'antd';
import React, { useState, useEffect } from 'react';
import { paginate } from '@/utils/utilities';
import useBooks from '@/hooks/useBooks';
import { IBooks } from '@/utils/types';
import EditBookModal from '../modals/EditBook';
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal';

interface BookTableProps {
    searchQuery: string;
}

const BookTable: React.FC<BookTableProps> = ({ searchQuery }) => {
    const { books, error, deleteBook } = useBooks();
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
    const [currentBooks, setCurrentBooks] = useState<IBooks | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(3);
    const [filteredBooks, setfilteredBooks] = useState<IBooks[]>([]);

    useEffect(() => {
        if (books) {
            setfilteredBooks(
                books.filter(book =>
                    book.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [books, searchQuery]);

    if (error) {
        return <div>Error loading books</div>;
    }

    const handleCheckboxChange = (key: string, book: IBooks) => {
        if (key) setSelectedKey(prevKey => (prevKey === key ? null : key));
        if (book) setCurrentBooks(book);
    };

    const handleEdit = (book: IBooks) => {
        setCurrentBooks(book);
        setIsEditModalVisible(true);
    };

    const handleDelete = () => {
        setIsDeleteModalVisible(true);
    };

    const confirmDelete = () => {
        if (currentBooks && currentBooks.id) {
            deleteBook(currentBooks.id);
            setIsDeleteModalVisible(false);
            setSelectedKey(null);
        }
    };

    const handleTableChange = (pagination: any) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const paginatedData = paginate(filteredBooks || [], pageSize, currentPage);

    const baseColumns = [
        {
            title: '',
            dataIndex: 'checkbox',
            key: 'checkbox',
            render: (_: null, record: IBooks) => (
                <Checkbox
                    checked={record.id === selectedKey}
                    onChange={() => handleCheckboxChange(record.id, record)}
                />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <span>{text}</span>,
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
            render: (text: string) => <span>{text}</span>,
        },
        {
            title: 'Publisher',
            dataIndex: 'publisher',
            key: 'publisher',
            render: (text: string) => <span>{text}</span>,
        },
        {
            title: 'Publication Year',
            dataIndex: 'publicationYear',
            key: 'publicationYear',
            render: (text: number) => <span>{text}</span>,
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
            render: (text: string) => <Tag color='green'>{text}</Tag>,
        },
    ];

    const actionColumn = {
        title: 'Action',
        key: 'action',
        render: (_: null, record: IBooks) => (
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
            <Table<IBooks>
                dataSource={paginatedData}
                columns={columns}
                rowKey="id"
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: filteredBooks?.length || 0,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20', '50'],
                    style: { color: 'green'}
                }}
                onChange={handleTableChange}
            />
            {currentBooks && (
                <EditBookModal
                    visible={isEditModalVisible}
                    onClose={() => setIsEditModalVisible(false)}
                    book={currentBooks}
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

export default BookTable;
