import { Layout } from 'antd'
import React from 'react'
import loginImage from '/assets/images/login-image.png'
import logo from '/assets/logo.svg'
import Link from 'antd/es/typography/Link'
import Typography from 'antd/es/typography/Typography'

const AuthLayout = ({ children }: { children: React.ReactElement }) => {
    const Text = Typography
    return (
        <Layout className="site-layout bg-white min-h-screen text-[#333] flex fle-col items-center justify-center py-6 px-4">
            <div className="grid md:grid-cols-2 items-center gap-4 max-w-7xl w-full">
                {children}
                <div className="hidden md:block lg:block lg:h-[400px] md:h-[300px] max-md:mt-10">
                    <Link href="/" className="font-bold justify-center pb-10 flex=row flex items-center lg:ml-2.5">
                        <img src={`${logo}`} className="h-6 mr-4" alt="Windster Logo" />
                        <Text className="self-center whitespace-nowrap text-xl flex flex-row justify-center items-center"><Text className='text-primary text-2xl'>E</Text>-Book</Text>
                    </Link>
                    <img src={`${loginImage}`} className="w-full h-full object-cover" alt="Experience" />
                </div>
            </div>
        </Layout>
    )
}

export default AuthLayout