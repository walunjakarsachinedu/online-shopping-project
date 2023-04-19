import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../common/models/cart';
import { ShoppingCartService } from '../common/services/shopping-cart.service';
import { Product } from "../common/models/product";
import { ProductService } from '../common/services/product.service';
import { Location } from '@angular/common';
import { CartItem } from '../common/models/cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  customerId?: string;
  cart?: Cart;
  products?: Product[];
  constructor(
    private activatedRoute: ActivatedRoute, 
    private cartService: ShoppingCartService, 
    private productService: ProductService,
    public location: Location,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(v => {
      this.customerId = v.get('id') ?? undefined;  
      this.cartService.getById(this.customerId ?? '').subscribe(carts => {
        this.cart = carts;
        this.cart.products.forEach(cartItem => {
          this.productService.getById(cartItem.id).subscribe(products => {
            cartItem.product = products[0];
          });
        });
      });
    });
  }
  
  public updateProductQuatity(cartItem: CartItem, newQuantity: number) {
    let cart = JSON.parse(JSON.stringify(this.cart));;
    cart?.products?.forEach((p: CartItem) => {delete p.product;});
    cartItem.quantity +=  newQuantity;
    this.cartService.patch(this.cart?.id ?? "", cart).subscribe();

  }
}
