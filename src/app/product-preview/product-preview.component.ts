import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../common/models/product';

@Component({
  selector: 'product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.css']
})
export class ProductPreviewComponent {
  @Output() onAddToCart = new EventEmitter<string>();
  @Input() product?: Product;
  constructor(public router: Router) { }
}
