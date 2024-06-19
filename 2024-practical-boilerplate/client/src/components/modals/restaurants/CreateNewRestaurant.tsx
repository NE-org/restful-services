/* eslint-disable @typescript-eslint/no-explicit-any */
import useRestaurants from '@/hooks/useRestaurants';
import { uploadImageToCloudinary } from '@/utils/utilities';
import { CloudUploadOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, notification, Select, Typography, Upload } from 'antd';
import Modal from 'antd/es/modal/Modal';
import React, { useState } from 'react';

const { Text } = Typography
const { Option } = Select;
interface CreateNewRestaurantProps {
    visible: boolean;
    onClose: () => void;
}

const CreateNewRestaurant: React.FC<CreateNewRestaurantProps> = ({ visible, onClose }) => {
    const [form] = Form.useForm();
    const [uploading, setUploading] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const { createRestaurant } = useRestaurants()

    const handleSubmit = () => {
        form.validateFields()
            .then(async (values) => {
                values.thumbnail = ''
                if (imageUrl) {
                    values.thumbnail = imageUrl;
                }
                await createRestaurant(values);
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
            title="Create Restaurant"
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
            <Text>Welcome new restaurant, register over here!</Text>
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
                        <Option value='clowded'>Clowded</Option>
                        <Option value='quiet'>Quiet</Option>
                        <Option value='moderate'>Moderate</Option>
                        <Option value='full'>Full</Option>
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
                    <InputNumber type='number' min={0} max={5} name='rating' placeholder='Enter rating' className='py-2' style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label='Thumbnail' name={'thumbnail'} style={{ marginBottom: "10px" }} className='font-medium'>
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

export default CreateNewRestaurant;
