import { Component, OnInit } from '@angular/core';
import { Product } from '../common/models/product';
import { ProductService } from '../common/services/product.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(products => {
      this.products = products;
    })
  }  

  updateProductQuantity(product: Product, quantityChange: number) {
    product.quantity += quantityChange;
  }

  saveProduct() {
  }

  deleteProduct() {
    
  }
}
