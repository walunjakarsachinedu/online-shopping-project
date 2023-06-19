import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../common/models/product';
import { AuthService } from '../common/services/auth.service';
import { ProductService } from '../common/services/product.service';
import { Location } from '@angular/common';
import { ShoppingCartService } from '../common/services/shopping-cart.service';
import { Cart } from '../common/models/cart';
import { CartItem } from '../common/models/cart-item';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  constructor(private routerData: ActivatedRoute, 
    private service: ProductService, 
    public authService: AuthService, 
    public router: Router,
    public location: Location,
    private cartService: ShoppingCartService,
    private toastr: ToastrService,
  ) { }
  product!: Product;
  id!: string|null;
  userId?: string;
  cart?: Cart;
  
  ngOnInit(): void {
    this.routerData.paramMap.subscribe(value => this.id = value.get("id"));
    this.service.getById(this.id ?? '').subscribe(products => this.product = products[0]);

    this.userId = this.authService.userId ?? '';
    this.cartService.getById(this.userId!).subscribe((cart: Cart) => {
      this.cart = cart;
    });
  }

  addProductToCard(productId: string) {
    let request: Observable<any>;
    if(!this.cart) {
      this.cart = new Cart(this.id ?? '', [new CartItem(productId, 1)]);
      request = this.cartService.post(this.cart);
    } else {
        let product = this.cart?.products?.find(p => p.id == productId);
        if(product) product.quantity++;
        else this.cart?.products.push(new CartItem(productId, 1));
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
