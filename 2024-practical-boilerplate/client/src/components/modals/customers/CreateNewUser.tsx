import useAuth from '@/hooks/useAuth';
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification, Select, Typography } from 'antd';
import Modal from 'antd/es/modal/Modal';
import React from 'react';

const { Text } = Typography
const { Option } = Select;
interface CreateNewUserProps {
    visible: boolean;
    onClose: () => void;
}

const CreateNewUser: React.FC<CreateNewUserProps> = ({ visible, onClose }) => {
    const [form] = Form.useForm();
    const handleKeyDownPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === ' ') {
            event.preventDefault();
            return false;
        }
    }

    const { register } = useAuth((data) => {
        notification.success({
            message: data.message,
        })
        onClose();
    })

    const handleSubmit = () => {
        form.validateFields()
            .then(async (values) => {
                console.log('Form values:', values);
                await register(values);
                form.resetFields();
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            title="Create customer"
            open={visible}
            onCancel={onClose}
            loading={false}
            confirmLoading
            footer={[
                <div key={1} className='flex flex-1 flex-row justify-between'>
                    <Button key="cancel" onClick={onClose} className='py-5'>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSubmit} className='py-5'>
                        Save
                    </Button>
                </div>
            ]}>
            <Text>Welcome new customer, register over here!</Text>
            <Form form={form} className='pt-4' layout='vertical' requiredMark>
                <Form.Item label={'Name'} name={'fullName'} rules={
                    [
                        {
                            required: true,
                            message: "Please input your name!"
                        }
                    ]} className='font-medium' style={{ marginBottom: "10px" }} required>
                    <Input prefix={<UserOutlined />} placeholder="Enter your name!" className='py-2' />
                </Form.Item>
                <Form.Item label='Email' name={'email'} required rules={
                    [
                        {
                            type: 'email',
                            required: true,
                            message: 'Email is required!'
                        }
                    ]} className='font-medium' style={{ marginBottom: "10px" }}>
                    <Input type='email' name='email' placeholder='Enter your email' prefix={<MailOutlined />} className='py-2' />
                </Form.Item>
                <Form.Item name={'password'} required rules={[
                    {
                        required: true,
                        message: "Please input your Password!",
                    },
                    {
                        min: 6,
                        message: "Password must be at least 6 characters long!"
                    },
                    {
                        pattern: /^(?=.*[a-z]).{6,}$/,
                        message: "Password must contain at least one letter!"
                    }
                ]}
                    style={{ marginBottom: "10px" }} label='Password' className='font-medium'>
                    <Input type='password' name='password' placeholder='Enter your password' prefix={<LockOutlined />} className='py-2' onKeyDown={handleKeyDownPress} />
                </Form.Item>
                <Form.Item name={'telephone'} required rules={
                    [
                        {
                            required: true,
                            message: 'Telephone is required!'
                        },
                        {
                            pattern: /^(?=.*[0-9]).{6,}$/,
                            message: "Telephone must contain only numbers!"
                        }
                    ]

                } style={{ marginBottom: "10px" }} label='Telephone' className='font-medium'>
                    <Input type='text' name='telephone' placeholder='Enter your number' prefix={<PhoneOutlined />} className='py-2' />
                </Form.Item>
                <Form.Item
                    name='role'
                    label='Role'
                    required
                    rules={[
                        {
                            required: true,
                            message: 'Role is required!',
                        },
                    ]}
                    style={{ marginBottom: '10px' }}
                    className='font-medium'
                >
                    <Select placeholder='Select a role'>
                        <Option value='user'>User</Option>
                        <Option value='admin'>Admin</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateNewUser;
