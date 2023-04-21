import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../common/models/cart';
import { ShoppingCartService } from '../common/services/shopping-cart.service';
import { Product } from "../common/models/product";
import { ProductService } from '../common/services/product.service';
import { Location } from '@angular/common';
import { CartItem } from '../common/models/cart-item';
import { catchError, of } from 'rxjs';
import { CheckoutService } from '../checkout.service';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  customerId?: string;
  cart?: Cart;
  products?: Product[];
  total: number = 0;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private cartService: ShoppingCartService, 
    private productService: ProductService,
    public location: Location,
    public router: Router,
    public authService: AuthService,
    public checkoutService: CheckoutService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(v => {
      this.customerId = this.authService.currentUser.id ?? undefined;  
      this.cartService.getById(this.customerId ?? '')
      .subscribe(carts => {
        if(!carts) return;
        this.cart = carts;
        this.cart.products.forEach(cartItem => {
          this.productService.getById(cartItem.id).subscribe(products => {
            cartItem.product = products[0];
            this.total += cartItem.product.price * cartItem.quantity;
          });
        });
      });
    });
  }

  get getTotal() : number {
    let total = 0;
    this.cart?.products.forEach(cartItem => {
      if(!cartItem.product) return;
      total += cartItem.product?.price * cartItem.quantity; 
    })
    return total;
  }

  get getTotalCount() : number {
    let count = 0;
    this.cart?.products.forEach(cartItem => {
      if(!cartItem.product) return;
      count += cartItem.quantity; 
    })
    return count;
  }

  get cartWithoutProductDetails() : Cart {
    let cart = JSON.parse(JSON.stringify(this.cart));;
    cart?.products?.forEach((p: CartItem) => {delete p.product;});
    return cart;
  }
  
  public updateProductQuatity(cartItem: CartItem, newQuantity: number) {
    if(cartItem.quantity + newQuantity < 0) return;
    cartItem.quantity +=  newQuantity;
    this.cartService.patch(this.cart?.id ?? "", this.cartWithoutProductDetails).subscribe();
  }

  public deleteProductFromCart(cartItem: CartItem) {
   let index = this.cart?.products.indexOf(cartItem); 
   this.cart?.products.splice(index!, 1);
    this.cartService.patch(this.cart?.id ?? "", this.cartWithoutProductDetails).subscribe();
  }

  public checkoutItem() {
    this.checkoutService.products = this.cart?.products;
    this.checkoutService.total = this.total;
    this.router.navigate(["/checkout-items"]);
  }
}
