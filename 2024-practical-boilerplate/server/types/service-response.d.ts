interface ServiceAPIResponse<T> {
  body: T;
  statusCode: number;
  headers?: Object;
  message: string;
}

interface ServiceAuthResponse<T> {
  body: T | any;
  statusCode: number;
  headers?: Object;
  message: string;
  token: string;
}

export { ServiceAPIResponse, ServiceAuthResponse }