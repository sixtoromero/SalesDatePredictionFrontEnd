export interface SalesDatePredictionModel {
    orderid?: number | null;
    custid?: number | null;
    empid?: number | null;
    orderdate?: Date | null; 
    requireddate?: Date | null;
    shippeddate?: Date | null;
    shipperid?: number | null;
    freight?: number | null;
    shipname?: string | null;
    shipaddress?: string | null;
    shipcity?: string | null;
    shipregion?: string | null;
    shippostalcode?: string | null;
    shipcountry?: string | null;
}