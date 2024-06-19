/* eslint-disable @typescript-eslint/no-explicit-any */
import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Typography } from 'antd';
import Modal from 'antd/es/modal/Modal';
import React, { useEffect } from 'react';
import { IUser } from '@/utils/types';
import useCustomers from '@/hooks/useCustomers';

const { Text } = Typography;
const { Option } = Select;

interface EditUserModalProps {
    visible: boolean;
    onClose: () => void;
    user: IUser | null;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ visible, onClose, user }) => {
    const [form] = Form.useForm();
    const { updateUser } = useCustomers();
    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                fullName: user.fullName,
                email: user.email,
                telephone: user.telephone,
                role: user.role,
            });
        }
    }, [user, form]);

    const handleSubmit = () => {
        form.validateFields()
            .then(async (values) => {
                await updateUser({ ...values, id: user?.id });
                form.resetFields();
                onClose();
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            title="Edit User"
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
            <Text>Edit user information below:</Text>
            <Form form={form} className='pt-4' layout='vertical' requiredMark>
                <Form.Item label={'Name'} name={'fullName'} rules={[{ required: true, message: "Please input your name!" }]}>
                    <Input prefix={<UserOutlined />} placeholder="Enter your name" className='py-2' />
                </Form.Item>
                <Form.Item label='Email' name={'email'} rules={[{ type: 'email', required: true, message: 'Email is required!' }]}>
                    <Input type='email' name='email' placeholder='Enter your email' prefix={<MailOutlined />} className='py-2' />
                </Form.Item>
                <Form.Item name={'telephone'} rules={[{ required: true, message: 'Telephone is required!' }, { pattern: /^(?=.*[0-9]).{6,}$/, message: "Telephone must contain only numbers!" }]}>
                    <Input type='text' name='telephone' placeholder='Enter your number' prefix={<PhoneOutlined />} className='py-2' />
                </Form.Item>
                <Form.Item name='role' label='Role' rules={[{ required: true, message: 'Role is required!' }]}>
                    <Select placeholder='Select a role'>
                        <Option value='user'>User</Option>
                        <Option value='admin'>Admin</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditUserModal;
