/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloudUploadOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification, Select, Typography, Upload } from 'antd';
import Modal from 'antd/es/modal/Modal';
import React, { useEffect, useState } from 'react';
import { IRestaurant } from '@/utils/types';
import useRestaurants from '@/hooks/useRestaurants';
import { uploadImageToCloudinary } from '@/utils/utilities';

const { Text } = Typography;
const { Option } = Select;

interface EditRestaurantProps {
    visible: boolean;
    onClose: () => void;
    restaurant: IRestaurant | null;
}

const EditRestaurant: React.FC<EditRestaurantProps> = ({ visible, onClose, restaurant }) => {
    const [form] = Form.useForm();
    const { updateRestaurant } = useRestaurants();
    const [uploading, setUploading] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (restaurant) {
            form.setFieldsValue({
                title: restaurant.title,
                description: restaurant.description,
                status: restaurant.status,
                location: restaurant.location,
                rating: restaurant.rating,
                id: restaurant.id,
            });
        }
    }, [restaurant, form]);

    const handleSubmit = () => {
        form.validateFields()
            .then(async (values) => {
                values.thumbnail = ''
                if (imageUrl) {
                    values.thumbnail = imageUrl;
                }
                await updateRestaurant({ ...values, id: restaurant?.id });
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
            title="Edit Restaurant"
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
            <Text>Edit restaurant information below:</Text>
            <Form form={form} className='pt-4' layout='vertical' requiredMark>
                <Form.Item label={'Name'} name={'title'} rules={
                    [
                        {
                            required: true,
                            message: "Please input the restaurant name!"
                        }
                    ]} className='font-medium' style={{ marginBottom: "10px" }} required>
                    <Input prefix={<UserOutlined />} placeholder="Enter the restaurant name!" className='py-2' />
                </Form.Item>
                <Form.Item label='Location' name={'location'} required rules={
                    [
                        {
                            required: true,
                            message: 'Location is required!'
                        }
                    ]} className='font-medium' style={{ marginBottom: "10px" }}>
                    <Input type='text' name='location' placeholder='Enter the location' prefix={<PlusOutlined />} className='py-2' />
                </Form.Item>
                <Form.Item name={'status'} required rules={[
                    {
                        required: true,
                        message: "Please select the status!",
                    },
                ]}
                    style={{ marginBottom: "10px" }} label='Status' className='font-medium'>
                    <Select placeholder='Select status'>
                        <Option value='open'>Open</Option>
                        <Option value='closed'>Closed</Option>
                    </Select>
                </Form.Item>
                <Form.Item label='Description' name={'description'} required rules={
                    [
                        {
                            required: true,
                            message: 'Description is required!'
                        }
                    ]} className='font-medium' style={{ marginBottom: "10px" }}>
                    <Input.TextArea rows={4} placeholder='Enter a description' className='py-2 h-12' style={{ resize: 'none', }} />
                </Form.Item>
                <Form.Item label='Rating' name={'rating'} required rules={[
                    {
                        required: true,
                        message: "Please input the rating!",
                    },
                    {
                        type: 'number',
                        min: 0,
                        max: 5,
                        message: "Rating must be between 0 and 5!",
                    }
                ]}
                    style={{ marginBottom: "10px" }} className='font-medium'>
                    <Input type='number' min={0} max={5} name='rating' placeholder='Enter rating' className='py-2' />
                </Form.Item>
                <Form.Item label='Thumbnail' name={'thumbnail'} style={{ marginBottom: "10px" }} className='font-medium'>
                    <Upload
                        customRequest={handleImageUpload}
                        listType="picture"
                        showUploadList={false}
                    >
                        <Button icon={<CloudUploadOutlined />} loading={uploading}>Click to Upload</Button>
                    </Upload>
                    {imageUrl &&
                        <div className='h-20 mt-2 overflow-y-auto'>
                            <img src={imageUrl} alt="thumbnail" style={{ marginTop: 10, maxWidth: '100%' }} />
                        </div>
                    }
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditRestaurant;
