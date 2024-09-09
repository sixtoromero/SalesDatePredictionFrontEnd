import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CustomerService } from '../../../services/Customers.service';
import { ResponseModel } from '../../../models/response.model';
import { SalesDatePredictionModel } from '../../../models/response/salesdateprediction.model';
import { finalize } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsDialogComponent } from '../order-details-dialog/order-details-dialog.component';

export interface Customer {
  customerName: string;
  lastOrderDate: Date;
  nextPredictedOrder: Date;
}

// const CUSTOMER_DATA: Customer[] = 
// [
//   {customerName: 'Customer AHPOP', lastOrderDate: new Date('2008-04-02'), nextPredictedOrder: new Date('2008-03-23')},
//   {customerName: 'Customer AHXHT', lastOrderDate: new Date('2008-05-05'), nextPredictedOrder: new Date('2008-08-09')},
// ];


@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css'] 
})
export class ListPageComponent implements AfterViewInit, OnInit  {

  public response: ResponseModel<SalesDatePredictionModel[]> = {
    Data: [], // Inicializa como un array vacío de SalesDatePredictionModel
    IsSuccess: false, // O el valor inicial que prefieras
    Message: '' // O cualquier mensaje inicial que desees
  };

  CUSTOMER_DATA: SalesDatePredictionModel[] =[];
  
  displayedColumns: string[] = ['CustomerName', 'LastOrderDate', 'NextPredictedOrder', 'actions'];
  //dataSource = new MatTableDataSource(CUSTOMER_DATA);
  dataSource = new MatTableDataSource<SalesDatePredictionModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  

  constructor(
    private ngxService: NgxUiLoaderService, 
    private customerService: CustomerService,
    public dialog: MatDialog){}

  ngOnInit(){
    this.getSalesDatePrediction();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getSalesDatePrediction = (): void => {
    
    this.ngxService.start();
    this.customerService.getSalesDatePrediction()
      .pipe(
        finalize(() => this.ngxService.stop()) // Esto se ejecuta al final de la suscripción, sea exitosa o con error.
      )
      .subscribe({
        next: (resp) => {       
          if (resp.IsSuccess && resp.Data) {
            this.dataSource.data = resp.Data;
            this.response = resp; // Asigna la respuesta cuando la llamada es exitosa.
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
  
  // Método para abrir el modal
  openOrderDetailsDialog(customer: SalesDatePredictionModel): void {
    
    console.log(customer);

    const dialogRef = this.dialog.open(OrderDetailsDialogComponent, {
      width: '90vw',  // 90% del ancho de la ventana
      maxWidth: '100vw',  // Ancho máximo para el modal      
      data: customer // Pasa los datos del cliente seleccionado al modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo fue cerrado');
    });
  }

}
