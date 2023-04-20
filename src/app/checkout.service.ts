import { Injectable } from '@angular/core';
import { CartItem } from './common/models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  total?: number;
  products?: CartItem[];
  constructor() { }
}
