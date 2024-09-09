import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { OrderService } from '../../../services/Orders.service';
import { OrdersModel } from '../../../models/Orders.model';
import { SalesDatePredictionModel } from '../../../models/response/salesdateprediction.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.css']
})
export class OrderDetailsDialogComponent implements OnInit {
  orders = new MatTableDataSource<OrdersModel>();
  displayedColumns: string[] = ['orderId', 'requiredDate', 'shippedDate', 'shipName', 'shipAddress', 'shipCity'];  
  //dataSource = new MatTableDataSource<OrdersModel>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SalesDatePredictionModel,
    private ngxService: NgxUiLoaderService,
    private ordersService: OrderService ) { }

  ngOnInit(): void {
    // Cargar los datos de las órdenes desde el parámetro `data`
    //console.log('data', this.data);    
    //this.CustId = this.data.CustId ?? undefined;
    this.getClientOrders(this.data.CustId ?? 0);
    // this.orders.data = [
    //   { orderId: 10359, requiredDate: new Date('12/19/2006'), shippedDate: new Date('11/26/2006'), shipName: 'Ship to 72-C', shipAddress: '1234 Wadhurst Rd.', shipCity: 'London' },
    //   // Agrega más datos de ejemplo...
    // ];
  }

  getClientOrders = (CustId: number): void => {    
    this.ngxService.start();
    this.ordersService.getClientOrders(CustId)
      .pipe(
        finalize(() => this.ngxService.stop()) // Esto se ejecuta al final de la suscripción, sea exitosa o con error.
      )
      .subscribe({
        next: (resp) => {       
          if (resp.IsSuccess && resp.Data) {
            this.orders.data = resp.Data;
          } else {
            console.error('Failed to load data:', resp.Message);
          }
          //console.log('resultado', this.response);          
        },
        error: (err) => {          
          this.ngxService.stop();
          //console.error('Error al obtener la predicción de fecha de venta:', err);
          // Aquí puedes manejar el error, mostrar un mensaje o cualquier otra acción que desees.
        }
      });
  };
}
