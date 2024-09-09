import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesDatePredictionModel } from '../../../models/response/salesdateprediction.model';

@Component({
  selector: 'app-order-new-dialog',
  templateUrl: './order-new-dialog.component.html',
  styleUrl: './order-new-dialog.component.css'
})
export class OrderNewDialogComponent implements OnInit {
  orderForm!: FormGroup; // Usa '!' para decirle a TypeScript que esta variable será definida antes de su uso
  customerName: string;
  employees: any[] = []; // Inicializa como un array vacío
  shippers: any[] = []; // Inicializa como un array vacío
  products: any[] = []; // Inicializa como un array vacío

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<OrderNewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.customerName = data.customerName;
  }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      employeeId: [null, Validators.required],
      shipperId: [null, Validators.required],
      shipName: ['', Validators.required],
      shipAddress: ['', Validators.required],
      shipCity: ['', Validators.required],
      shipCountry: ['', Validators.required],
      orderDate: [null, Validators.required],
      requiredDate: [null, Validators.required],
      shippedDate: [null],
      freight: [0, [Validators.required, Validators.min(0)]],
      productId: [null, Validators.required],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      discount: [0, [Validators.min(0)]],
    });

    // Aquí puedes inicializar tus listas
    this.loadEmployees();
    this.loadShippers();
    this.loadProducts();
  }

  loadEmployees(): void {
    this.employees = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }]; // Ejemplo de carga de datos
  }

  loadShippers(): void {
    this.shippers = [{ id: 1, name: 'Fast Shipping' }, { id: 2, name: 'Safe Delivery' }]; // Ejemplo de carga de datos
  }

  loadProducts(): void {
    this.products = [{ id: 1, name: 'Product A' }, { id: 2, name: 'Product B' }]; // Ejemplo de carga de datos
  }

  onSave(): void {
    if (this.orderForm.valid) {
      console.log('New Order', this.orderForm.value);
      this.dialogRef.close(this.orderForm.value);
    }
  }
}
