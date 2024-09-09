export interface SalesDatePredictionModel {
    CustId?: number | null;
    CustomerName?: string | null;
    LastOrderDate?: Date | null;
    NextPredictedOrder?: Date | null;    
}