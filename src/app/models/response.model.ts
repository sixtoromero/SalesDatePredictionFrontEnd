export interface ResponseModel<T> {
    Data: T;
    IsSuccess: boolean;
    Message: string;
}