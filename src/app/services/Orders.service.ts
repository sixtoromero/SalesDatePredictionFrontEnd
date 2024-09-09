import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environments } from '../../environments/environments';
import { ResponseModel } from '../models/response.model';
import { OrdersModel } from '../models/Orders.model';


  
@Injectable({
    providedIn: 'root'
})
export class OrderService {

    endPoint = `${environments.base_url}/Orders`;

    constructor(
        private _http: HttpClient,
        private router: Router) { }        

    getClientOrders(Custid: number): Observable<ResponseModel<OrdersModel[]>> {          
        return this._http.get<ResponseModel<OrdersModel[]>>(`${this.endPoint}/GetClientOrders?Custid=${Custid}`);
    }
}