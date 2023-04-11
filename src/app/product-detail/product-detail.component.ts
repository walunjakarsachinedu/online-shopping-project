import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../common/models/product';
import { AuthService } from '../common/services/auth.service';
import { ProductService } from '../common/services/product.service';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  constructor(private routerData: ActivatedRoute, private service: ProductService, public authService: AuthService, public router: Router) { }
  product!: Product;
  id!: string|null;
  
  ngOnInit(): void {
    this.routerData.paramMap.subscribe(value => this.id = value.get("id"));
    this.service.getById(this.id ?? '').subscribe(products => this.product = products[0]);
  }
}
