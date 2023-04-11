import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../common/models/product';
import { ProductService } from '../common/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) {}
  product!: Product;
  originalProduct!: Product;
  id!: string|null;
  email = "";

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(value => this.id = value.get("id"));
    this.productService.getById(this.id ?? '').subscribe(products => this.product = products[0]);
  }

  

  onCancel() {}

  onSave() {

  }
}
