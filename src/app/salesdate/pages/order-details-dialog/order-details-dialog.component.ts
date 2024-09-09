import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

interface Order {
  orderId: number;
  requiredDate: Date;
  shippedDate: Date;
  shipName: string;
  shipAddress: string;
  shipCity: string;
}

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.css']
})
export class OrderDetailsDialogComponent implements OnInit {
  orders = new MatTableDataSource<Order>();
  displayedColumns: string[] = ['orderId', 'requiredDate', 'shippedDate', 'shipName', 'shipAddress', 'shipCity'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    // Cargar los datos de las órdenes desde el parámetro `data`
    this.orders.data = [
      { orderId: 10359, requiredDate: new Date('12/19/2006'), shippedDate: new Date('11/26/2006'), shipName: 'Ship to 72-C', shipAddress: '1234 Wadhurst Rd.', shipCity: 'London' },
      // Agrega más datos de ejemplo...
    ];
  }
}
