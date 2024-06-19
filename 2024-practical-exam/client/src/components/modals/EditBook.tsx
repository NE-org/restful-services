/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Typography } from 'antd';
import Modal from 'antd/es/modal/Modal';
import React, { useEffect } from 'react';
import { IBooks } from '@/utils/types';
import useBooks from '@/hooks/useBooks';

const { Text } = Typography;

interface EditBookModalProps {
    visible: boolean;
    onClose: () => void;
    book: IBooks | null;
}

const EditBookModal: React.FC<EditBookModalProps> = ({ visible, onClose, book }) => {
    const [form] = Form.useForm();
    const { updateBooks } = useBooks();
    useEffect(() => {
        if (book) {
            form.setFieldsValue({
                name: book.name,
                author: book.author,
                publisher: book.publisher,
                publicationYear: book.publicationYear,
                subject: book.subject
            });
        }
    }, [book, form]);

    const handleSubmit = () => {
        form.validateFields()
            .then(async (values) => {
                await updateBooks({ ...values, id: book?.id });
                form.resetFields();
                onClose();
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            title="Edit Book"
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Save
                </Button>,
            ]}
        >
            <Text>Edit book information below:</Text>
            <Form form={form} className='pt-4' layout='vertical' requiredMark>
                <Form.Item label='Name' name={'name'} rules={[{ required: true, message: 'Name is required!' }]}>
                    <Input type='text' name='name' placeholder='Enter book name' prefix={<PlusOutlined />} className='py-2' />
                </Form.Item>
                <Form.Item label='Author' name={'author'} rules={[{ required: true, message: 'Author is required!' }]}>
                    <Input type='text' name='author' placeholder='Enter author name' prefix={<PlusOutlined />} className='py-2' />
                </Form.Item>
                <Form.Item label='Publisher' name={'publisher'} rules={[{ required: true, message: 'Publisher is required!' }]}>
                    <Input type='text' name='publisher' placeholder='Enter publisher name' prefix={<PlusOutlined />} className='py-2' />
                </Form.Item>
                <Form.Item label='Publication Year' name={'publicationYear'} rules={[{ required: true, message: 'Publication year is required!', pattern: 
                /^[0-9]{4}$/
                }]}>
                    <InputNumber name='publicationYear' placeholder='Enter publication year' prefix={<PlusOutlined />} className='py-2' style={{ width: "100%"}} />
                </Form.Item>
                <Form.Item label='Subject' name={'subject'} rules={[{ required: true, message: 'Subject is required!' }]}>
                    <Input type='text' name='subject' placeholder='Enter subject' prefix={<PlusOutlined />} className='py-2' />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditBookModal;
