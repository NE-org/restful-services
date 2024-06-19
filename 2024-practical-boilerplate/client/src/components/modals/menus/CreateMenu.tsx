/* eslint-disable @typescript-eslint/no-explicit-any */
import useMenu from '@/hooks/useMenu';
import useRestaurants from '@/hooks/useRestaurants';
import { uploadImageToCloudinary } from '@/utils/utilities';
import { CloudUploadOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification, Select, Typography, Upload } from 'antd';
import Modal from 'antd/es/modal/Modal';
import React, { useState } from 'react';

const { Text } = Typography
const { Option } = Select;
interface CreateMenuProps {
    visible: boolean;
    onClose: () => void;
}

const CreateMenu: React.FC<CreateMenuProps> = ({ visible, onClose }) => {
    const [form] = Form.useForm();
    const [uploading, setUploading] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const { createMenus } = useMenu()
    const { restaurants } = useRestaurants();
    const handleSubmit = () => {
        form.validateFields()
            .then(async (values) => {
                values.icon = ''
                if (imageUrl) {
                    values.icon = imageUrl;
                }
                await createMenus(values);
                form.resetFields();
                onClose();
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const handleImageUpload = async (info: any) => {
        setUploading(true);
        try {
            const url = await uploadImageToCloudinary(info.file);
            setImageUrl(url);
            notification.success({ message: 'Image uploaded successfully!' });
        } catch (error) {
            notification.error({ message: 'Image upload failed!' });
        } finally {
            setUploading(false);
        }
    };


    return (
        <Modal
            title="Create Menu"
            open={visible}
            onCancel={onClose}
            loading={false}
            confirmLoading
            footer={[
                <div key={1} className='flex flex-1 flex-row justify-between'>
                    <Button key="cancel" onClick={onClose} className='py-5'>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSubmit} className='py-5 bg-primary'>
                        Save
                    </Button>
                </div>
            ]}>
            <Text>Welcome new menu, register over here!</Text>
            <Form form={form} className='pt-4' layout='vertical' requiredMark>
                <Form.Item label={'Name'} name={'name'} rules={
                    [
                        {
                            required: true,
                            message: "Please input the menu category name!"
                        }
                    ]} className='font-medium' style={{ marginBottom: "10px" }} required>
                    <Input prefix={<UserOutlined />} placeholder="Enter the menu category name!" className='py-2' />
                </Form.Item>

                <Form.Item name={'restaurantId'} required rules={[
                    {
                        required: true,
                        message: "Please select the restaurant!",
                    },
                ]}
                    style={{ marginBottom: "10px" }} label='Restaurant' className='font-medium'>
                    <Select placeholder='Select restaurant'>
                        {restaurants ? restaurants.map((resto) => (
                            <Option key={resto.id} value={resto.id} >{resto.title}</Option>

                        )) : <Option value={''}>No Restaurants !</Option>}
                    </Select>
                </Form.Item>
                <Form.Item label='Description' name={'description'} required rules={
                    [
                        {
                            required: true,
                            message: 'Description is required!'
                        }
                    ]} className='font-medium' style={{ marginBottom: "10px" }}>
                    <Input.TextArea rows={4} placeholder='Enter a description' className='py-2 h-12' style={{ resize: 'none' }} />
                </Form.Item>

                <Form.Item label='Icon' name={'icon'} style={{ marginBottom: "10px" }} className='font-medium'>
                    <Upload
                        customRequest={handleImageUpload}
                        listType="picture"
                        showUploadList={false}
                    >
                        <Button icon={<CloudUploadOutlined />} loading={uploading}>Click to Upload</Button>
                    </Upload>
                    {imageUrl && <img src={imageUrl} alt="thumbnail" style={{ marginTop: 10, maxWidth: '100%' }} />}
                </Form.Item>
            </Form>
        </Modal >
    );
};

export default CreateMenu;
