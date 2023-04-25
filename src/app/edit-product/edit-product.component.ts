import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../common/models/product';
import { ProductService } from '../common/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from '../validators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  form: FormGroup;

  constructor(
    private productService: ProductService, 
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public location: Location,
    private router: Router,
  ) {
    this.form = fb.group({
      name: fb.control('', [Validators.required]),
      description: fb.control('', [Validators.required]),
      image: fb.control('', [Validators.required]),
      price: fb.control('', [Validators.required]),
      quantity: fb.control('', [Validators.required]),
    });
  }
  originalProduct!: ProductData;
  id?: string|null;
  email = "";

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(value => this.id = value.get("id"));
    if(this.id) this.productService.getById(this.id ?? '').subscribe(products => {
      this.originalProduct = {
        name: products[0].name,
        description: products[0].description,
        image: products[0].image,
        price: products[0].price,
        quantity: products[0].quantity,
      };
      this.form.setValue(this.originalProduct);
    });
  }

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  get image() {
    return this.form.get('image');
  }
  
  get price() {
    return this.form.get('price');
  }
  
  get quantity() {
    return this.form.get('quantity');
  }

  get isFormValid() {
    return this.name!.errors || this.description!.errors || this.image!.errors || this.price!.errors || this.quantity!.errors;
  }

  onCancel() {
    if(this.id) this.form.setValue({...this.originalProduct});
  }

  onSave() {
    let product: ProductData = {name: this.name?.value, description: this.description?.value, image: this.image?.value, price: this.price?.value, quantity: this.quantity?.value};
    if(this.id) this.originalProduct = product;
    if(this.id) this.productService.patch(this.id, product).subscribe((v) => this.toastr.success("Product details changed successfully!"));
    else this.productService.post(product).subscribe((v) => this.toastr.success("Product added successfully!"));
    this.router.navigate(["/manage-products"]);    
  }
}

type ProductData = {name?: string, description?: string, image?: string, price?: number, quantity?: number};