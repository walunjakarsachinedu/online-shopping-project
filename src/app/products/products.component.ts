import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../common/models/product';
import { AuthService } from '../common/services/auth.service';
import { ProductService } from '../common/services/product.service';
import { Util } from '../utils';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products: Product[] = [];
  Util = Util;
  console = console;

  constructor(private productService: ProductService, public router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(products => {
      this.products = products;
    });
  }
}
  
