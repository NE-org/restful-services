import useAuth from '@/hooks/useAuth';
import { setEncToken } from '@/store/local-storage';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router';
// import { Link } from 'react-router-dom';

const LoginForm = () => {
    const { Text, Title, } = Typography;
    const [form] = useForm();
    const navigate = useNavigate();
    const { login } = useAuth((data) => {
        notification.success({
            message: data.message,
        })
        setEncToken(data.token);
        navigate('/dashboard')
    }); 
    const handleKeyDownPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === ' ') {
            event.preventDefault();
            return false;
        }
    }
    const handleOnSubmit = () => {
        form.validateFields()
            .then(async (values) => {
                await login(values);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }
    return (
        <div className="border border-gray-300 rounded-md p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <Form name='normal_login' onFinish={handleOnSubmit} layout='vertical' requiredMark className="space-y-6" form={form}>
                <div className="mb-10">
                    <Title className="text-3xl font-extrabold">Sign in</Title>
                    <Text className="text-sm mt-4">Sign in to your account and explore a world of possibilities. Your journey begins here.</Text>
                </div>
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
                        Log in
                    </Button>
                </Form.Item>
                {/* <Text className="text-sm !mt-10 text-center">Don't have an account <Link to="#" className="text-green-600 hover:underline ml-1 whitespace-nowrap">Register here</Link></Text> */}
            </Form>
        </div>
    )
}

export default LoginForm