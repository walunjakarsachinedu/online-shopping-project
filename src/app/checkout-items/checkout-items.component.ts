import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { CartItem } from '../common/models/cart-item';

@Component({
  selector: 'app-checkout-items',
  templateUrl: './checkout-items.component.html',
  styleUrls: ['./checkout-items.component.css']
})
export class CheckoutItemsComponent implements OnInit {
  products!: CartItem[];
  constructor(
    public checkService: CheckoutService,
  ) {}

  ngOnInit(): void {
    this.products = this.checkService.products!;
  }
}
