export type TAction = 'create' | 'update' | 'delete';
export type TRole = 'admin' | 'user';
export type TStockStatus = 'available' | 'not_available';
export type TStatusPayment = 'pending' | 'paid' | 'failed';
export type TRestaurentStatus = 'open' | 'full' | 'clowded' | 'quiet' | 'moderate';

export interface IUser {
    id: string;
    fullName: string;
    email: string;
    telephone: string;
    password: string;
    role: TRole;
}

export interface IRestaurant {
    id: string;
    title: string;
    location: string;
    status: TRestaurentStatus;
    thumbnail: string;
    description: string;
    rating: number;
}

export interface IMenu {
    id: string;
    name: string;
    restaurantId: string;
    description: string;
    icon: string;
}
export interface IProduct {
    id?: string;
    name: string;
    description: string;
    type: string;
    price: number;
    menuId: string;
    stockStatus: TStockStatus;
    quantity: number;
    thumbnail: string;
}
export interface IOrders {
    id?: string;
    userId: string;
    productId: string;
    quantity: number;
    paymentStatus: TStatusPayment;
    total: number;
    paymentDate: Date;
}