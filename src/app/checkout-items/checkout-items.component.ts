import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { CartItem } from '../common/models/cart-item';
import { ShoppingCartService } from '../common/services/shopping-cart.service';
import { UrlSerializer } from '@angular/router';
import { AuthService } from '../common/services/auth.service';
import { ProductService } from '../common/services/product.service';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { MyValidators } from '../validators';

@Component({
  selector: 'app-checkout-items',
  templateUrl: './checkout-items.component.html',
  styleUrls: ['./checkout-items.component.css']
})
export class CheckoutItemsComponent implements OnInit {
  products?: CartItem[];
  userId?: string;
  doHaveCode = false;
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private cartService: ShoppingCartService,
    private productService: ProductService,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      email: ['', [Validators.required, MyValidators.email]],
      ccn: ['', [Validators.required, MyValidators.creditCard]],
      cvv: ['', [Validators.required, MyValidators.cvv]],
      exp_date: ['', MyValidators.exp_date], 
    });
  }

  ngOnInit(): void {
    this.userId = this.authService.currentUser.id;
    this.cartService.getById(this.userId ?? '').subscribe(cart => {
      this.products = cart.products;
      this.products.forEach(cartItem => {
        this.productService.getById(cartItem.id).subscribe(products => {
          cartItem.product = products[0];
        });
      });
    });
  }

  // get getTotal() : number {
  //   let total = 0; 
  //   this.products?.forEach(cartItem => total += cartItem?.product?.price ?? 0);
  //   return total;
  // }

  get isFormInValid() {
    return this.form.get("email")?.errors ||
    this.form.get("ccn")?.errors ||
    this.form.get("exp_date")?.errors ||
    this.form.get("cvv")?.errors;
  }

  get getTotal() : number {
    let total = 0;
    this.products?.forEach(cartItem => {
      if(!cartItem.product) return;
      total += cartItem.product?.price * cartItem.quantity; 
    })
    return total;
  }
}
