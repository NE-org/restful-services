import useAuth from '@/hooks/useAuth';
import { setEncToken } from '@/store/local-storage';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form';
import Link from 'antd/es/typography/Link';
import { useNavigate } from 'react-router';

const RegisterForm = () => {
    const { Text, Title, } = Typography;
    const [form] = useForm();
    const navigate = useNavigate();
    const { register } = useAuth((data) => {
        notification.success({
            message: data.message,
        })
        setEncToken(data.token);
        navigate('/login')
    });

    /* 
        Disable dummy space key press on password field
    */
    const handleKeyDownPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === ' ') {
            event.preventDefault();
            return false;
        }
    }
    const handleOnSubmit = () => {
        form.validateFields()
            // Enable register function after field validation
            .then(async (values) => {
                await register(values);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }
    return (
        <div className="border border-gray-300 rounded-md p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <Form name='normal_login' onFinish={handleOnSubmit} layout='vertical' requiredMark className="space-y-6" form={form}>
                <div>
                    <Title className="text-3xl font-extrabold">Register</Title>
                    <Text className="text-sm mt-4">Create a student account and explore a world of possibilities. Your journey begins here.</Text>
                </div>
                <Form.Item label={'First Name'} name={'firstName'} rules={
                    [
                        {
                            required: true,
                            message: "Please input your first name!"
                        }
                    ]}                >
                    <Input placeholder="Enter your first name" className='py-3' />
                </Form.Item>
                <Form.Item label={'Last Name'} name={'lastName'} rules={
                    [
                        {
                            required: true,
                            message: "Please input your last name!"
                        }
                    ]}                >
                    <Input placeholder="Enter your last name" className='py-3' />
                </Form.Item>
                <Form.Item label={'E-mail'} name={'email'} rules={
                    [
                        {
                            type: 'email',
                            required: true,
                            message: "Please input your email!"
                        }
                    ]}                >
                    <Input prefix={<MailOutlined />} placeholder="Enter your email" className='py-3' />
                </Form.Item>
                <Form.Item
                    label={'Password'}
                    name="password"
                    rules={[
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
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Password"
                        className='py-3'
                        onKeyDown={handleKeyDownPress}
                    />
                </Form.Item>
                <Form.Item className="!mt-10">
                    <Button block type='primary' htmlType='submit' className="w-full shadow-xl  px-4 text-sm font-semibold rounded py-6 text-white bg-primary hover:bg-green-400 focus:outline-none">
                        Register
                    </Button>
                </Form.Item>
                <Text className="text-sm !mt-10 text-center">Already have an account <Link href="/login" className="text-green-600 hover:underline ml-1 whitespace-nowrap">Login here</Link></Text>
            </Form>
        </div>
    )
}

export default RegisterForm