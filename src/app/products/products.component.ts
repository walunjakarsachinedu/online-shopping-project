import { Component, OnInit } from '@angular/core';
import { Product } from '../common/models/product';
import { ProductService } from '../common/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(products => {
      this.products = products;
    });
  }
}
  
