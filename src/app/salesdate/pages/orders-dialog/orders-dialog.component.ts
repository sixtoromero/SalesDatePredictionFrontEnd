import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort'; // Importa MatSort
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { OrderService } from '../../../services/Orders.service';
import { OrdersModel } from '../../../models/Orders.model';
import { SalesDatePredictionModel } from '../../../models/response/salesdateprediction.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-orders-dialog',
  templateUrl: './orders-dialog.component.html',
  styleUrls: ['./orders-dialog.component.css']
})
export class OrdersDialogComponent implements OnInit, AfterViewInit {
  orders = new MatTableDataSource<OrdersModel>();
  displayedColumns: string[] = ['orderid', 'requireddate', 'shippeddate', 'shipname', 'shipaddress', 'shipcity'];  

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al MatPaginator
  @ViewChild(MatSort) sort!: MatSort; // Referencia al MatSort

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SalesDatePredictionModel,
    private ngxService: NgxUiLoaderService,
    private ordersService: OrderService
  ) {}

  ngOnInit(): void {
    this.getClientOrders(this.data.CustId ?? 0);
  }

  ngAfterViewInit(): void {
    // Configurar el paginador y el ordenamiento después de que la vista se haya inicializado
    this.orders.paginator = this.paginator;
    this.orders.sort = this.sort;    
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
            // this.orders.paginator = this.paginator; // Reasignar el paginador después de cargar los datos
            // this.orders.sort = this.sort; // Reasignar el ordenamiento después de cargar los datos
          } else {
            console.error('Failed to load data:', resp.Message);
          }
        },
        error: (err) => {          
          this.ngxService.stop();
          console.error('Error al obtener las órdenes del cliente:', err);
        }
      });
  };
}
