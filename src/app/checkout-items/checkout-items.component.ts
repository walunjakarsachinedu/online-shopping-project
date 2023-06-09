import { Component, OnInit } from '@angular/core';
import { CartItem } from '../common/models/cart-item';
import { ShoppingCartService } from '../common/services/shopping-cart.service';
import { Router, UrlSerializer } from '@angular/router';
import { AuthService } from '../common/services/auth.service';
import { ProductService } from '../common/services/product.service';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { MyValidators } from '../validators';
import { ToastrService } from 'ngx-toastr';
import { Location, LocationChangeEvent } from '@angular/common';
import { OrderHistoryService } from '../common/services/order-history.service';
import { Order } from '../common/models/order';
import { Observable, catchError, of, throwError } from 'rxjs';

@Component({
  selector: 'app-checkout-items',
  templateUrl: './checkout-items.component.html',
  styleUrls: ['./checkout-items.component.css']
})
export class CheckoutItemsComponent implements OnInit {
  products?: CartItem[];
  userId?: string;
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private cartService: ShoppingCartService,
    private productService: ProductService,
    private router: Router,
    private orderService: OrderHistoryService,
    public toastr: ToastrService,
    public location: Location,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      email: [authService.userEmail ?? '', [Validators.required, MyValidators.email]],
      ccn: ['', [Validators.required, MyValidators.creditCard]],
      cvv: ['', [Validators.required, MyValidators.cvv]],
      exp_date: ['', MyValidators.exp_date], 
    });
  }

  ngOnInit(): void {
    this.userId = this.authService.userId ?? '';
    this.cartService.getById(this.userId ?? '').subscribe(cart => {
      this.products = cart.products;
      this.products.forEach(cartItem => {
        this.productService.getById(cartItem.id).subscribe(products => {
          cartItem.product = products[0];
        });
      });
    });
  }

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

  makePayment() {

    if(!this.products) return;

    let now = new Date();
    let order = new Order(
      now.toISOString(),
      now.toISOString(),
      this.products
    );

    this.orderService.getById(this.authService.userId ?? '')
    .pipe(catchError((error) => of(undefined)))
    .subscribe((history) => {
      let request: Observable<any>;
      if(history) {
        request = this.orderService.patch(this.authService.userId ?? '', {
          id: this.authService.userId,
          history: history
        });
      } else {
        request = this.orderService.post({
          id: this.authService.userId ?? '',
          history: [order]
        });
      }
      request
      .pipe(catchError(er => throwError(() => this.toastr.error('Order failed. Please try again later'))))
      .subscribe(() => {
        this.cartService.deleteById(this.authService.userId ?? '').subscribe()
        this.toastr.success('Order placed successfully !!!');
        this.router.navigate(['/products']);
      });
    });
  }
}
