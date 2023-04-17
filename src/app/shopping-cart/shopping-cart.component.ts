import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../common/models/cart';
import { ShoppingCartService } from '../common/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  customerId?: string;
  cart?: any;
  constructor(private activatedRoute: ActivatedRoute, private cartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(v => {
      this.customerId = v.get('id') ?? undefined;  
      this.cartService.getById(this.customerId ?? '').subscribe(cart => {
        this.cart = cart;
      });
    });
  }
}
