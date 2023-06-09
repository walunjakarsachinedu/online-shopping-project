import { Component, OnInit } from '@angular/core';
import { Order } from '../common/models/order';
import { OrderHistoryService } from '../common/services/order-history.service';
import { AuthService } from '../common/services/auth.service';
import { ProductService } from '../common/services/product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  history?: Order[];
  constructor(
    private orderHistory: OrderHistoryService,
    private authService: AuthService,
    private productService: ProductService,
    public location: Location,
  ) { }

  ngOnInit(): void {
    this.orderHistory.getById(this.authService.userId ?? '').subscribe(history => {
      this.history = history;
      this.history?.forEach(
        order => order.products.forEach(
          product => this.productService.getById(product.id).subscribe(
            products => product.product = products[0])
        ),
      );
    });
  }

  convertDateFormat(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString();
    return `${day}-${month}-${year}`;
  }


  toId(str: string): string {
    return "id" + str.replace(/[-:.'"]/g, "");
  }
  
  
}
