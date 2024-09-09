import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environments } from '../../environments/environments';
import { ResponseModel } from '../models/response.model';
import { SalesDatePredictionModel } from '../models/response/salesdateprediction.model';

  
@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    endPoint = `${environments.base_url}/Customer`;

    constructor(
        private _http: HttpClient,
        private router: Router) { }        

    getSalesDatePrediction(): Observable<ResponseModel<SalesDatePredictionModel[]>> {          
        return this._http.get<ResponseModel<SalesDatePredictionModel[]>>(`${this.endPoint}/GetSalesDatePrediction`);
    }
}