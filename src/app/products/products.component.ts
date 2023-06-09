import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../common/models/product';
import { AuthService } from '../common/services/auth.service';
import { ProductService } from '../common/services/product.service';
import { Util } from '../utils';
import { ShoppingCartService } from '../common/services/shopping-cart.service';
import { Cart } from '../common/models/cart';
import { CartItem } from '../common/models/cart-item';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products: Product[] = [];
  Util = Util;
  console = console;
  cart?: Cart;
  userId?: string;

  constructor(private productService: ProductService, 
    public router: Router, 
    public authService: AuthService,
    public cartService: ShoppingCartService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(products => {
      this.products = products;
    });
    this.userId = this.authService.userId ?? '';
    this.cartService.getById(this.userId!).subscribe((cart: Cart) => {
      this.cart = cart;
    });
  }

  onChange(event: Event) {
    const query =  (event.target as HTMLInputElement).value;
    this.productService.filterProducts(query).subscribe(products => {
      this.products = products;
    });
  }

  addProductToCard(id: string) {
    let request: Observable<any>;
    if(!this.cart) {
      this.cart = new Cart(this.userId!, [new CartItem(id, 1)]);
      request = this.cartService.post(this.cart);
    }
    else {
      let product = this.cart?.products?.find(p => p.id == id);
      if(product) product.quantity++;
      else this.cart?.products.push(new CartItem(id, 1));
      request = this.cartService.patch(this.userId!, this.cart);
    }
    request
    .pipe(catchError(e => throwError(() => this.toastr.error("Failed to add product to cart. Please try again later"))))
    .subscribe(() => {
      this.cartService.updateCartCount(this.cart!.products.length);
      this.toastr.success("Product successfully added to shopping cart");
    });
  }
}
  
