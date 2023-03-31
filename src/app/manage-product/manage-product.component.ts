import { Component, OnInit } from '@angular/core';
import { catchError, firstValueFrom, of } from 'rxjs';
import { Product } from '../common/models/product';
import { AuthService } from '../common/services/auth.service';
import { ProductService } from '../common/services/product.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {
  products: Product[] = [];
  changedQuantity: {[id: string]: number} = {}; // id: quantityChanged
  deletedProduct: {[id: string]: {product: Product, index: number}} = {}; // id: deletedProduct
  constructor(private productService: ProductService, public authService: AuthService) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(products => {
      this.products = products;
    })
  }  

  updateProductQuantity(product: Product, quantityChange: number) {
    this.changedQuantity[product.id] = (this.changedQuantity[product.id] ?? 0) + quantityChange;
    if(this.changedQuantity[product.id] === 0) delete this.changedQuantity[product.id];
    product.quantity += quantityChange;
  }

  setProductQuantity(product: Product, value: Event) {
    let quantity = Number((value.target as HTMLInputElement).value);
    let originalQuantity = (product.quantity - this.changedQuantity[product.id] ?? 0);

    this.changedQuantity[product.id] = quantity - originalQuantity;
    if(this.changedQuantity[product.id] === 0) delete this.changedQuantity[product.id];
    product.quantity = quantity;
  }

  deleteProduct(product: Product) {
    product.quantity -= this.changedQuantity[product.id] ?? 0;
    let index = this.products.indexOf(product);
    this.products.splice(index, 1);
    delete this.changedQuantity[product.id];
    this.deletedProduct[product.id] = {product: product, index: index};
  }

  saveChanges() {
    for(let id in this.deletedProduct) {
      this.productService.delete(id).subscribe();
    }
    for(let id in this.changedQuantity) {
      let product = this.products.find(product => product.id == id);
      this.productService.patch(id, {quantity: product!.quantity}).subscribe();
    }

    this.deletedProduct = {}; 
    this.changedQuantity = {};
  }

  cancelChanges() {
    for(let id in this.changedQuantity) {
      let product = this.products.find(product => product.id == id);
      product!.quantity -= this.changedQuantity[id] ?? 0;
    } 
    for(let id in this.deletedProduct) {
      this.products.splice(this.deletedProduct[id].index, 0, this.deletedProduct[id].product);
    }

    this.deletedProduct = {};
    this.changedQuantity = {};
  }

  get isDataChanged():boolean {
    return Object.keys(this.changedQuantity).length !== 0 || Object.keys(this.deleteProduct).length !== 0;
  }
}
