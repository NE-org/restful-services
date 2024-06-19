/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloudUploadOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification, Select, Typography, Upload } from 'antd';
import Modal from 'antd/es/modal/Modal';
import React, { useEffect, useState } from 'react';
import { IMenu } from '@/utils/types';
import { uploadImageToCloudinary } from '@/utils/utilities';
import useMenu from '@/hooks/useMenu';
import useRestaurants from '@/hooks/useRestaurants';

const { Text } = Typography;
const { Option } = Select;

interface EditMenuProps {
    visible: boolean;
    onClose: () => void;
    menu: IMenu | null;
}

const EditMenu: React.FC<EditMenuProps> = ({ visible, onClose, menu }) => {
    const [form] = Form.useForm();
    const { updateMenus } = useMenu();
    const [uploading, setUploading] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const { restaurants } = useRestaurants();
    useEffect(() => {
        if (menu) {
            form.setFieldsValue({
                name: menu.name,
                restaurantId: menu.restaurantId,
                description: menu.description,
                icon: menu.icon,
                id: menu.id,
            });
        }
    }, [menu, form]);

    const handleSubmit = () => {
        form.validateFields()
            .then(async (values) => {
                values.icon = ''
                if (imageUrl) {
                    values.icon = imageUrl;
                }
                await updateMenus({ ...values, id: menu?.id });
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
            title="Edit Menu"
            open={visible}
            onCancel={onClose}
            footer={[
                <div key={1} className='flex flex-1 flex-row justify-between'>
                    <Button key="cancel" onClick={onClose} className='py-5'>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSubmit} className='py-5 bg-primary'>
                        Save Changes
                    </Button>
                </div>
            ]}
        >
            <Text>Edit menu information below:</Text>
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
                            <Option value={resto.id} >{resto.title}</Option>

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
        </Modal>
    );
};

export default EditMenu;
