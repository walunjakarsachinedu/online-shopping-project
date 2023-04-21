import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../common/models/product';
import { AuthService } from '../common/services/auth.service';
import { ProductService } from '../common/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  constructor(
    private productService: ProductService, 
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) {}
  product!: Product;
  originalProduct!: Product;
  id!: string|null;
  email = "";

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(value => this.id = value.get("id"));
    this.productService.getById(this.id ?? '').subscribe(products => {
      this.product = products[0];
      this.originalProduct = {...this.product};
    });
  }

  

  onCancel() {
    this.product = {...this.originalProduct};
  }

  onSave() {
    this.originalProduct = {...this.product};
    this.productService.patch(this.product.id, this.product).subscribe((v) => this.toastr.success("Product details changed successfully!"));
  }
}
