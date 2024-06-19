/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";

export const formatPathname = (pathname: string) => {
    const path = pathname.replace('/', '');
    return path.charAt(0).toUpperCase() + path.slice(1);
};

export const paginate = (data: any[], pageSize: number, currentPage: number) => {
    const offset = (currentPage - 1) * pageSize;
    return data.slice(offset, offset + pageSize);
};

export const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const cloud_name = 'real-service-ltd';
    const preset_key = 'practice_template';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset_key);

    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData);

    return response.data.secure_url;
};