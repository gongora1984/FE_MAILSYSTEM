export interface ApiResponseModel<T> {
  status: string;
  data?: T;
  message: string;
}

export interface ApiResponseModelGeneric {
  status: string;
  data?: object;
  message: string;
}
