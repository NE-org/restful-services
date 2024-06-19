import { Layout } from 'antd'
import React from 'react'
import loginImage from '/assets/images/login-image.png'

const AuthLayout = ({ children }: { children: React.ReactElement }) => {
    return (
        <Layout className="site-layout bg-white min-h-screen text-[#333] flex fle-col items-center justify-center py-6 px-4">
            <div className="grid md:grid-cols-2 items-center gap-4 max-w-7xl w-full">
                {children}
                <div className="md:block lg:block lg:h-[400px] md:h-[300px] max-md:mt-10">
                    <img src={`${loginImage}`} className="w-full h-full object-cover" alt="Experience" />
                </div>
            </div>
        </Layout>
    )
}

export default AuthLayout